import React from "react";
import { useSelector } from "react-redux";

import CustomTable from "../../../../../../components/CustomTable";

import { detailColumns } from "./timeConfig";

const TimesheetTableLog = ({ status }) => {
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
      </div>
    </>
  );
};

export default React.memo(TimesheetTableLog);
