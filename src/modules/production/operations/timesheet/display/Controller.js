import { Button, Col, Row, Divider } from "antd";
import React, { useContext } from "react";
import { useFetch } from "../../../../../include/js/customHooks";
import { TimesheetContext } from "../TimeSheet";
import { TSCtrlContext } from "../TimesheetDisplay";

const apiGetCtrlBtn = `/list/time_sheet_type`;
const Controller = () => {
  const {
    data: btnList,
    error,
    loading: getBtnLoading,
  } = useFetch(apiGetCtrlBtn);
  const {
    controller: { timesheetID, on_time_sheet_type_id },
    closeJob = false,
  } = useContext(TimesheetContext);
  const { onClickController, loading, onCloseJob, tsLog } =
    useContext(TSCtrlContext);

  const { button_qty } = tsLog?.data || {};
  let disabledControl = timesheetID ? false : true;
  console.log("Controller : ", on_time_sheet_type_id);
  return (
    <div className="ts-controller">
      <Divider />
      <Row className="col-2" gutter={24}>
        <Col span={24}>
          <div className="text-center">
            <h2>
              <b>แผงควบคุมการทำงาน</b>
            </h2>
            {!timesheetID && (
              <h3>
                <b>
                  <span className="require">
                    * กรุณายืนยัน Job ก่อนเริ่มการทำงาน
                  </span>
                </b>
              </h3>
            )}
          </div>
        </Col>
        <Divider className="divider-sm" />
        {btnList?.map(
          ({
            time_sheet_type_id,
            time_sheet_type_no,
            time_sheet_type_name,
          }) => (
            <Col span={8} className="text-center" key={time_sheet_type_id}>
              {on_time_sheet_type_id === time_sheet_type_id ? (
                <Button
                  block
                  disabled={loading || disabledControl}
                  className="ts-ctrl-btn btn-group-1 primary"
                  onClick={() =>
                    onClickController({
                      time_sheet_type_id: time_sheet_type_id,
                      time_sheet_status_id: 3,
                      time_sheet_log_qty: 0,
                      time_sheet_log_remark: `จบ ${time_sheet_type_name}`,
                    })
                  }
                >
                  {`จบ ${time_sheet_type_name}`}
                </Button>
              ) : (
                <Button
                  block
                  disabled={
                    loading ||
                    disabledControl ||
                    ![null, 0, time_sheet_type_id].includes(
                      on_time_sheet_type_id
                    ) ||
                    closeJob
                  }
                  className="ts-ctrl-btn btn-group-1"
                  onClick={() =>
                    onClickController({
                      time_sheet_type_id: time_sheet_type_id,
                      time_sheet_status_id: 2,
                      time_sheet_log_qty: 0,
                      time_sheet_log_remark: `เริ่ม ${time_sheet_type_name}`,
                    })
                  }
                >
                  {time_sheet_type_name}
                </Button>
              )}
            </Col>
          )
        )}
        <Col span={22} offset={1}>
          <Button
            block
            className={
              button_qty
                ? "primary mt-3 ts-ctrl-btn btn-group-1"
                : "mt-3 ts-ctrl-btn btn-group-1"
            }
            onClick={onCloseJob}
            disabled={!button_qty}
          >
            จบการทำงาน
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Controller);
