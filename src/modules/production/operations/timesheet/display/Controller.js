import { Button, Col, Row, Divider } from "antd";
import React, { useContext } from "react";
import { TimesheetContext } from "../TimeSheet";
import { TSCtrlContext } from "../TimesheetDisplay";

const Controller = () => {
  const {
    controller: { timesheetID, on_time_sheet_type_id },
  } = useContext(TimesheetContext);
  const { onClickController, loading } = useContext(TSCtrlContext);
  let disabledControl = timesheetID ? false : true;
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
        <Col span={8} className="text-center">
          {/* <h2>เริ่มนับเวลา</h2> */}
          {on_time_sheet_type_id === 1 ? (
            <Button
              block
              disabled={loading || disabledControl}
              className="ts-ctrl-btn btn-group-1 primary"
              onClick={() => onClickController({ time_sheet_type_id: 1 })}
            >
              จบการตั้งค่าเครื่อง
            </Button>
          ) : (
            <Button
              block
              disabled={
                loading ||
                disabledControl ||
                ![null, 1].includes(on_time_sheet_type_id)
              }
              className="ts-ctrl-btn btn-group-1"
              onClick={() => onClickController({ time_sheet_type_id: 1 })}
            >
              ตั้งค่าเครื่อง
            </Button>
          )}
          {on_time_sheet_type_id === 2 ? (
            <Button
              block
              disabled={loading || disabledControl}
              className="ts-ctrl-btn btn-group-1 primary"
              onClick={() => onClickController({ time_sheet_type_id: 2 })}
            >
              จบการผสม
            </Button>
          ) : (
            <Button
              block
              disabled={
                loading ||
                disabledControl ||
                ![null, 2].includes(on_time_sheet_type_id)
              }
              className="ts-ctrl-btn btn-group-1"
              onClick={() => onClickController({ time_sheet_type_id: 2 })}
            >
              ผสม
            </Button>
          )}

          {on_time_sheet_type_id === 3 ? (
            <Button
              block
              disabled={loading || disabledControl}
              className="ts-ctrl-btn btn-group-1 primary"
              onClick={() => onClickController({ time_sheet_type_id: 3 })}
            >
              จบการถ่ายถังผสม
            </Button>
          ) : (
            <Button
              block
              disabled={
                loading ||
                disabledControl ||
                ![null, 3].includes(on_time_sheet_type_id)
              }
              className="ts-ctrl-btn btn-group-1"
              onClick={() => onClickController({ time_sheet_type_id: 3 })}
            >
              ถ่ายถังผสม
            </Button>
          )}
        </Col>
        <Col span={8} className="text-center">
          {on_time_sheet_type_id === 4 ? (
            <Button
              block
              disabled={loading || disabledControl}
              className="ts-ctrl-btn btn-group-1 primary"
              onClick={() => onClickController({ time_sheet_type_id: 4 })}
            >
              จบการบรรจุ & แพ็คสินค้า
            </Button>
          ) : (
            <Button
              block
              disabled={
                loading ||
                disabledControl ||
                ![null, 4].includes(on_time_sheet_type_id)
              }
              className="ts-ctrl-btn btn-group-1"
              onClick={() => onClickController({ time_sheet_type_id: 4 })}
            >
              บรรจุ & แพ็คสินค้า
            </Button>
          )}
        </Col>
        <Col span={8} className="text-center">
          {on_time_sheet_type_id === 6 ? (
            <Button
              block
              disabled={loading || disabledControl}
              className="ts-ctrl-btn btn-group-1 primary"
              onClick={() => onClickController({ time_sheet_type_id: 6 })}
            >
              จบการทำความสะอาด
            </Button>
          ) : (
            <Button
              block
              disabled={
                loading ||
                disabledControl ||
                ![null, 6].includes(on_time_sheet_type_id)
              }
              className="ts-ctrl-btn btn-group-1"
              onClick={() => onClickController({ time_sheet_type_id: 6 })}
            >
              ทำความสะอาด
            </Button>
          )}

          <Button
            block
            disabled={
              loading ||
              disabledControl ||
              ![null].includes(on_time_sheet_type_id)
            }
            className="ts-ctrl-btn btn-group-3"
            onClick={() => onClickController({ time_sheet_type_id: 7 })}
          >
            จบงาน
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Controller);
