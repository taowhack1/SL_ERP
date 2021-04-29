import { Button } from "antd";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

import CustomTable from "../../../../../../components/CustomTable";
import { ProductionContext } from "../../../../../../include/js/context";

import { detailColumns } from "./timeConfig";

const TimesheetTableLog = ({ status, setStatus, showConfirmEditQty }) => {
  const { form } = useContext(ProductionContext);
  const { start: timesheet } = useSelector(
    (state) => state.production.timesheet
  );
  const { time_sheet_log_detail } = timesheet;
  return (
    <>
      <div className="full-width mt-2 pd-left-1 pd-right-1">
        <CustomTable
          columns={detailColumns(status)}
          dataSource={time_sheet_log_detail}
          rowKey="ids"
          rowClassName={(row, index) =>
            index % 2 === 0 ? "row-hl row-table-detail" : "row-table-detail"
          }
          pagination={false}
          scroll={{ y: (window.innerHeight * 0.75) / 2 }}
          size={"small"}
        />
        <div className="full-width mt-2" style={{ padding: "0px 20%" }}>
          <div className="flex-space">
            <Button
              block
              className={
                timesheet.time_sheet_type_id === 3
                  ? "primary timesheet-btn"
                  : "timesheet-btn"
              }
              disabled={timesheet.time_sheet_type_id === 3 ? false : true}
            >
              Close Job
            </Button>
            <Button
              block
              className={"timesheet-btn"}
              disabled={timesheet.time_sheet_type_id === 3 ? false : true}
              onClick={showConfirmEditQty}
            >
              Edit Quantity
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(TimesheetTableLog);
