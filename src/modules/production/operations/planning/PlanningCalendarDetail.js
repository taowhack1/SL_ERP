import React, { useEffect, useState, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../../../include/js/customHooks";
import {
  clearPlanningCalendar,
  filterPlanningCalendar,
} from "../../../../actions/production/planningActions";
import { StarFilled } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { sortData } from "../../../../include/js/function_main";
import { Spin } from "antd";
import ModalFormPlan from "./form/ModalFormPlan";

const apiCostCenterCalendar = `/production/plan_job/calendar/machine/0`;
const apiPlanJob = `/production/plan_job/calendar/0`;
const PlanningCalendarDetail = ({ configs }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    visible: false,
    plan_job_id: null,
  });

  const openModal = ({ plan_job_id }) => {
    console.log("plan_job_id", plan_job_id);
    setModal({ ...modal, visible: true, plan_job_id });
  };

  const closeModal = (data) =>
    setModal({
      visible: false,
      plan_job_id: null,
    });

  const calendarPlan = useRef();
  const {
    data: costCenter,
    error,
    loading: loadingFetch,
  } = useFetch(apiCostCenterCalendar);
  const {
    data: planList,
    loading: loadingPlan,
    fetchData,
  } = useFetch(apiPlanJob);
  const { filter } = useSelector(
    (state) => state.production.operations.planning
  );
  const { favoriteWorkCenter } = filter;
  const [state, setState] = useState({ costCenter: [], plan: [] });

  const toggleFavorite = useCallback(
    (workCenterId) => {
      const element = document.getElementById(`fav-${workCenterId}`);
      element.classList.toggle("fav-icons-selected");
      dispatch(
        filterPlanningCalendar({
          favoriteWorkCenter: favoriteWorkCenter.includes(workCenterId)
            ? favoriteWorkCenter.filter((id) => id !== workCenterId)
            : [...favoriteWorkCenter, workCenterId],
        })
      );
    },
    [favoriteWorkCenter]
  );

  const renderLabelContent = (e) => {
    const eventTitle = `[ ${e.resource._resource.id} ] ${e.fieldValue}`;
    return (
      <div className="pd-left-1 d-flex flex-between" title={eventTitle}>
        <div>
          <StarFilled
            className={
              favoriteWorkCenter.includes(e.resource._resource.id)
                ? "fav-icons fav-icons-selected"
                : "fav-icons"
            }
            id={`fav-${e.resource._resource.id}`}
            onClick={(_) => {
              toggleFavorite(`${e.resource._resource.id}`);
            }}
          />
        </div>
        <div className="pd-left-3">
          <Text>{"[ " + e.resource._resource.id + " ]"}</Text>
          <br />
          <Text className="pre-wrap">{e.fieldValue}</Text>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("filter", filter);
    const filterState = () => {
      let data = costCenter || [];
      const favData = data.filter((obj) => favoriteWorkCenter.includes(obj.id));
      console.log("favData", favData);
      const oldData = data.filter(
        (obj) => !favoriteWorkCenter.includes(obj.id)
      );
      console.log("oldData", oldData);
      data = [...favData, ...oldData];
      setState((prev) => ({
        ...prev,
        costCenter: sortData(data, "sortNo", 1),
      }));
    };

    filterState();
  }, [filter, costCenter]);

  const configs2 = {
    resources: state.costCenter || [],
    resourceLabelContent: renderLabelContent,
    eventContent: (eventContent) =>
      renderEventContent2(eventContent, openModal),
    events: planList,
    id: "planningCalendar",
    ref: calendarPlan,
    customButtons: {
      clearFilter: {
        text: "CLEAR FILTER",
        click: () => dispatch(clearPlanningCalendar()),
      },
    },
    headerToolbar: {
      left: "clearFilter",
      center: "title",
      right: "prev,next",
    },
  };
  console.log("calendar Render...............", planList);
  return (
    <>
      {/* {loading || loadingFetch ? (
        <h2>Loading...</h2>
      ) : ( */}
      <Spin spinning={loadingPlan}>
        <FullCalendar
          {...configs}
          {...configs2}
          schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
          plugins={[resourceTimelinePlugin, interactionPlugin]}
        />
        <div className="w-80 d-flex flex-column mt-2">
          <div
            className="d-flex flex-row"
            style={{ border: "1px solid #c5c5c5", padding: 5 }}
          >
            <div
              style={{ backgroundColor: "blue", width: 24, height: 24 }}
            ></div>
            <Text strong className="ml-2">
              Day Shift
            </Text>
          </div>
          <div
            className="d-flex flex-row"
            style={{ border: "1px solid #c5c5c5", padding: 5 }}
          >
            <div
              style={{ backgroundColor: "purple", width: 24, height: 24 }}
            ></div>
            <Text strong className="ml-2">
              Night Shift
            </Text>
          </div>
          {/* <div
            className="d-flex flex-row"
            style={{ border: "1px solid #c5c5c5", padding: 5 }}
          >
            <div
              style={{ backgroundColor: "green", width: 24, height: 24 }}
            ></div>
            <Text strong className="ml-2">
              Complete
            </Text>
          </div> */}
        </div>
        <ModalFormPlan
          {...{
            title: "Plan Detail",
            // visible: true,
            visible: modal.visible,
            closeModal,
            plan_job_id: modal.plan_job_id,
            updateCalendar: fetchData,
          }}
        />
      </Spin>
      {/* )} */}
    </>
  );
};

export default React.memo(PlanningCalendarDetail);

const renderEventContent2 = (eventInfo, openModal) => {
  const eventProps = eventInfo.event._def;
  const { sumDayHour, sumNightHour } = eventProps.extendedProps;
  const data = eventProps.extendedProps.extends;
  const dayShift = data.job_detail.filter((obj) => obj.shift_job_id === 1);
  const nightShift = data.job_detail.filter((obj) => obj.shift_job_id === 2);
  return (
    <div
      // onClick={() =>
      //   eventProps.extendedProps.extends.isPlan && openModal(data)
      // }
      className="text-center arrow"
    >
      {dayShift.length ? (
        dayShift.map((plan) => {
          const { plan_job_no, mrp_no, plan_job_plan_time, id, so_no = '' } = plan;
          return (
            <div
              key={id}
              style={{
                border: "1px solid #c0c0c0",
                padding: 1,
                borderRadius: 2,
                backgroundColor: "blue",
                marginBottom: 5,
              }}
              className="text-center pointer"
              onClick={() => openModal(plan)}
            >
              <b>{`S/O No. : ${so_no}`}</b><br />
              <b>{`${plan_job_no}`}</b><br />
              <b>{`${plan_job_plan_time}`}</b>
            </div>
          );
        })
      ) : (
        <Text key={"empty"}>{`< - - - ว่าง - - - >`}</Text>
      )}
      <div
        style={{
          border: "1px solid #c0c0c0",
          padding: 1,
          borderRadius: 2,
          backgroundColor: "orange",
          marginBottom: 5,
        }}
        className="text-center"
      >
        <b>{`Day : ${sumDayHour} Hr.`}</b>
      </div>
      {nightShift.length ? (
        nightShift.map((plan) => {
          const { plan_job_no, plan_job_plan_time, id } = plan;
          return (
            <div
              key={id}
              style={{
                border: "1px solid #c0c0c0",
                padding: 1,
                borderRadius: 2,
                backgroundColor: "purple",
                marginBottom: 5,
              }}
              className="text-center pointer"
              onClick={() => openModal(plan)}
            >
              <b>{`${plan_job_no} - ${plan_job_plan_time}`}</b>
            </div>
          );
        })
      ) : (
        <Text key={"empty2"}>{`< - - - ว่าง - - - >`}</Text>
      )}
      <div
        style={{
          border: "1px solid #c0c0c0",
          padding: 1,
          borderRadius: 2,
          backgroundColor: "orange",
          marginBottom: 5,
        }}
        className="text-center"
      >
        <b>{`Night : ${sumNightHour} Hr.`}</b>
      </div>
    </div>
  );
};
