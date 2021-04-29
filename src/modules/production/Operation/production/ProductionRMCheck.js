import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Tabs } from "antd";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimesheetScanRMList } from "../../../../actions/production/timesheetActions";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTable from "../../../../components/CustomTable";
import { ProductionContext } from "../../../../include/js/context";
import { getRMMockupData, RPMCheckColumns } from "./productionConfigs";
import RMBarcodeScanner from "./RMBarcodeScanner";

const ProductionRMCheck = () => {
  const { form } = useContext(ProductionContext);
  const { RMList } = form.rmChecking;
  console.log("RMLIST ", RMList);
  return (
    <>
      <RMBarcodeScanner />
      <Tabs>
        <Tabs.TabPane tab={"Raw Material"} key={"1"}>
          <CustomTable
            columns={RPMCheckColumns()}
            dataSource={RMList}
            rowKey="id"
            pageSize={1000}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(ProductionRMCheck);
