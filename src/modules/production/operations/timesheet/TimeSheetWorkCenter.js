import { Card } from "antd";
import React from "react";
import WorkCenter from "./workCenter/WorkCenter";

const TimeSheetWorkCenter = () => {
  return (
    <div style={{ minHeight: 500 }}>
      <Card title={<h3>Select Machine</h3>}>
        <WorkCenter />
      </Card>
    </div>
  );
};

export default React.memo(TimeSheetWorkCenter);
