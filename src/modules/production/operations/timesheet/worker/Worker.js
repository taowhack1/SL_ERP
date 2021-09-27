import { Card, message, Spin } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { setTimesheet } from "../../../../../actions/production/timesheetActions";
import { api_get_production_emp } from "../../../../../include/js/api";
import { useFetch } from "../../../../../include/js/customHooks";
import { TimesheetContext } from "../TimeSheet";

const Worker = () => {
  const dispatch = useDispatch();
  const { selectedWorker } = useContext(TimesheetContext);
  const { data: empPD, loading } = useFetch(api_get_production_emp);

  const onSelect = (id, name) => {
    if (selectedWorker.includes(id)) {
      dispatch(
        setTimesheet({
          selectedWorker: selectedWorker.filter((fid) => fid !== id),
        })
      );
      message.warning({
        content: (
          <span>
            ลบ <b>{name}</b> ออกจากการปฏิบัติงาน
          </span>
        ),
      });
    } else {
      // if (form.plan.plan_job_plan_worker === select.length)
      //   return message.warning({
      //     content: `Number of worker has limit by plan ( ${form.worker.length} / ${form.plan.plan_job_plan_worker} )`,
      //     key: "limit",
      //     duration: 4,
      //   });
      dispatch(setTimesheet({ selectedWorker: [...selectedWorker, id] }));

      message.success({
        content: (
          <span>
            เพิ่ม <b>{name}</b> เข้าปฏิบัติงาน
          </span>
        ),
      });
    }
  };

  return (
    <>
      <Spin spinning={loading}>
        {empPD?.map(
          ({
            employee_no,
            employee_no_name,
            employee_image,
            employee_name_eng,
          }) => (
            <Card.Grid
              className={
                selectedWorker.includes(employee_no)
                  ? "worker-card selected"
                  : "worker-card"
              }
              key={employee_no}
              onClick={() => onSelect(employee_no, employee_no_name)}
            >
              <Card
                cover={
                  <img
                    alt="employee_image"
                    height={120}
                    src={
                      `${process.env.REACT_APP_SERVER}${employee_image}` ||
                      require("../../../../../image/unnamed.png")
                    }
                  />
                }
              >
                <Meta title={`[ ${employee_no} ]`}></Meta>
                <Meta title={employee_name_eng}></Meta>
              </Card>
            </Card.Grid>
          )
        )}
      </Spin>
    </>
  );
};

export default React.memo(Worker);
