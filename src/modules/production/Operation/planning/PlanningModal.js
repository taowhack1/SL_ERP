import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Row,
  TimePicker,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import {
  getOtherPlanRef,
  getPlanningCalendarData,
  savePlanJob,
} from "../../../../actions/production/planningActions";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import { AppContext } from "../../../../include/js/context";
import FormLeft from "./modal/FormLeft";
import FormRight from "./modal/FormRight";

const PlanningModal = (props) => {
  const dispatch = useDispatch();
  const { data, config } = props;
  const {
    auth: { user_name, department_id },
  } = useContext(AppContext);
  const [selectedPlan, setSelectedPlan] = useState(data);
  const [otherPlan, setOtherPlan] = useState([]);
  const [conditions, setConditions] = useState({
    loading: false,
    isUpdate: false,
  });
  const jobDetail = data;
  useEffect(() => {
    const getData = async (mrp_id) => {
      const resp = await getOtherPlanRef(mrp_id);
      if (resp.success) {
        setOtherPlan(resp.data);
      }
    };
    setSelectedPlan(data);
    getData(data.mrp_id);
  }, [data.plan_job_id]);

  const formLeftConfig = useMemo(
    () => ({
      selectedPlan,
      setSelectedPlan,
      user_name,
      department_id,
      setOtherPlan,
      conditions,
      setConditions,
    }),
    [selectedPlan, setSelectedPlan, setOtherPlan, conditions, setConditions]
  );
  const formRightConfig = useMemo(
    () => ({
      plan_job_id: selectedPlan.plan_job_id,
      otherPlan,
      jobDetail,
      setSelectedPlan,
      setOtherPlan,
      conditions,
      setConditions,
    }),
    [
      selectedPlan.plan_job_id,
      otherPlan,
      jobDetail,
      setSelectedPlan,
      setOtherPlan,
      conditions,
      setConditions,
    ]
  );

  const onSave = async () => {
    console.log("otherPlan", otherPlan);
    setConditions((prev) => ({ ...prev, loading: true }));
    const resp = await savePlanJob(otherPlan);
    if (resp.success) {
      if (resp.success) {
        dispatch(getPlanningCalendarData());

        await Swal.fire({
          title: "Update Successfully!",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: `Back to Calendar`,
          cancelButtonText: `Stay here`,
          // cancelButtonColor: "blue",
        }).then((result) => {
          if (result.isConfirmed) {
            config.closeModal();
          } else {
          }
        });

        // message.success("Save Successfully.");
      }
    } else {
      message.error("Error !. Can't update plan. Please contact system admin.");
    }
    setConditions((prev) => ({ ...prev, loading: false }));
  };
  console.log("otherPlan", otherPlan);
  return (
    <>
      <Modal
        onCancel={config.closeModal}
        onOk={config.saveModal}
        footer={[
          !conditions.isUpdate ? (
            <Button
              onClick={config.closeModal}
              key={"close"}
              loading={conditions.loading}
            >
              {"Close"}
            </Button>
          ) : (
            <Popconfirm
              title="Are you sure ?"
              onConfirm={config.closeModal}
              key={"close"}
              loading={conditions.loading}
            >
              <Button>{"Discard"}</Button>
            </Popconfirm>
          ),

          <Button
            loading={conditions.loading}
            className={conditions.isUpdate ? "" : "primary"}
            onClick={onSave}
            key={"save"}
            disabled={conditions.isUpdate ? true : false}
          >
            Save
          </Button>,
        ]}
        destroyOnClose
        {...config}
      >
        <div className="flex-container" style={{ minHeight: "50vh" }}>
          <div style={{ width: "35%" }}>
            <FormLeft {...formLeftConfig} />
          </div>
          <div style={{ width: "65%" }}>
            <FormRight {...formRightConfig} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(PlanningModal);
