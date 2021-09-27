import { Card } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { TimesheetContext } from "./TimeSheet";
import Worker from "./worker/Worker";

const TimesheetWorker = () => {
  const { selectedWorker } = useContext(TimesheetContext);
  return (
    <div style={{ minHeight: 500 }}>
      <Card>
        <Worker />
      </Card>
      <div className="select-emp-label">
        <Text strong>{`จำนวนคนทำงาน : ${selectedWorker?.length} คน`}</Text>
      </div>
    </div>
  );
};

export default React.memo(TimesheetWorker);
