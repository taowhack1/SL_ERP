import React, { useCallback, useEffect, useMemo, useState } from "react";

import Text from "antd/lib/typography/Text";
import moment from "moment";
import { Col, Row, Space } from "antd";
import CustomLabel from "../../../../components/CustomLabel";
import { useDispatch, useSelector } from "react-redux";
import { getPlanningCalendarData } from "../../../../actions/production/planningActions";
import DetailLoading from "../../../../components/DetailLoading";
import { convertTimeToHr } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";
import Search from "../../../../components/Search";

import PlanningModal from "./PlanningModal";
import $ from "jquery";
import PlanningCalendarDetail from "./PlanningCalendarDetail";
let countRender = 1;

const materialStatusBar = () => (
  <Row className="col-2 mt-1">
    <Col span={20} offset={4}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomLabel label={"Material Status : "} />
        <div
          style={{
            backgroundColor: "#59FF34",
            borderRadius: "50%",
            width: "14px",
            height: "14px",
            border: "1px solid gray",
            marginRight: 10,
          }}
          className={"ml-2"}
        ></div>
        <CustomLabel label={"Ready"} readOnly={true} />
        <div
          style={{
            backgroundColor: "red",
            borderRadius: "50%",
            width: "14px",
            height: "14px",
            border: "1px solid gray",
            marginRight: 10,
          }}
          className={"ml-2"}
        ></div>
        <CustomLabel label={"Not Ready"} readOnly={true} />
      </div>
    </Col>
  </Row>
);

const CustomFullCalendar = () => {
  const dispatch = useDispatch();
  const { costCenter, plan } = useSelector(
    (state) => state.production.operations.planning
  );

  const { loading } = useSelector((state) => state.production);

  const [state, setState] = useState({
    costCenter,
    plan,
  });

  const [modal, setModal] = useState({
    visible: false,
    data: {},
  });

  const openModal = (plan) => {
    console.log("plan", plan);
    setModal({ ...modal, visible: true, data: plan });
  };

  const closeModal = (data) =>
    setModal({
      visible: false,
      data: {},
    });

  const saveModal = (data) => {
    setModal({
      visible: false,
      data: {},
    });
  };

  const onSearch = (type, text) => {
    switch (type) {
      case "costCenter":
        setState({
          ...state,
          costCenter: costCenter.filter(
            (obj) =>
              obj.id.indexOf(text) >= 0 ||
              obj.title.toUpperCase().indexOf(text.toUpperCase()) >= 0
          ),
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(getPlanningCalendarData());
  }, [dispatch]);

  const configs = useMemo(() => {
    const renderLabelContent = (e) => {
      const eventTitle = `[ ${e.resource._resource.id} ] ${e.fieldValue}`;
      return (
        <div className="pd-left-1" title={eventTitle}>
          <Text>{"[ " + e.resource._resource.id + " ]"}</Text>
          <br />
          <Text className="pre-wrap">{e.fieldValue}</Text>
        </div>
      );
    };

    const renderEventContent2 = (eventInfo) => {
      const eventProps = eventInfo.event._def;
      const data = eventProps.extendedProps.extends;
      const dayShift = data.job_detail.filter((obj) => obj.shift_job_id === 1);
      const nightShift = data.job_detail.filter(
        (obj) => obj.shift_job_id === 2
      );
      return (
        <div
          // onClick={() =>
          //   eventProps.extendedProps.extends.isPlan && openModal(data)
          // }
          className="text-center arrow"
        >
          {dayShift.length ? (
            dayShift.map((plan) => {
              const { plan_job_no, plan_job_plan_time, id } = plan;
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
                  <b>{`${plan_job_no} - ${plan_job_plan_time}`}</b>
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
            <b>{`Day : 03:00 Hr.`}</b>
          </div>
          {nightShift.length ? (
            nightShift.map(({ plan_job_no, plan_job_plan_time, id }) => (
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
              >
                <b>{`${plan_job_no}`}</b>
              </div>
            ))
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
            <b>{`Night : 04:00 Hr.`}</b>
          </div>
        </div>
      );
    };

    return {
      resourceAreaWidth: 230,
      editable: true,
      eventContent: renderEventContent2,
      initialView: "resourceTimelineMonth",
      aspectRatio: 2.5,
      timeZone: "UTC",
      initialDate: moment().format("YYYY-MM-DD HH:mm:ss"),
      resourceLabelContent: renderLabelContent,
      resourceOrder: "sortNo",
      eventOrder: "sort",
      views: {
        resourceTimelineMonth: {
          slotMinWidth: 160,
          slotLabelFormat: (value) => {
            return (
              moment(value.date.marker).format("ddd") +
              " | " +
              moment(value.date.marker)
                .utc(true)
                .subtract(7, "hours")
                .format("DD/MM/YY")
            );
          },
          businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
          },
        },
        resourceTimelineDay: {
          slotLabelFormat: (obj) => {
            return moment(obj.date.marker)
              .utc(true)
              .subtract(7, "hours")
              .format("H:mm");
          },
        },
      },
      nowIndicator: true,
      events: state.plan,
      timeZone: "UTC",
      customButtons: {
        addPlanButton: {
          text: "Add Plan",
          click: () => console.log("Add Plan"),
        },
      },
      headerToolbar: {
        left: "addPlanButton",
        center: "title",
        right: "prev,next",
      },
      resourceAreaHeaderContent: (
        <div className="require full-width">
          {/* Cost Center <br /> */}
          <Search
            onSearch={(text) => onSearch("costCenter", text)}
            placeholder={"Cost Center"}
          />
        </div>
      ),
      // eventOrder: ["id"],
      resources: state.costCenter,
      eventTimeFormat: {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      },
    };
  }, [state]);
  useEffect(() => setState((prev) => ({ ...prev, plan })), [plan]);
  return (
    <>
      <div style={{ margin: "50px auto", width: "95%", height: 800 }}>
        {loading ? (
          <DetailLoading />
        ) : (
          <>
            <PlanningCalendarDetail configs={configs} />
            {/* {materialStatusBar()} */}
            <PlanningModal
              config={{
                title: "Plan Detail",
                visible: modal.visible,
                closeModal: closeModal,
                saveModal: saveModal,
                width: "80%",
              }}
              data={modal.data}
              readOnly={false}
            />
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(CustomFullCalendar);
