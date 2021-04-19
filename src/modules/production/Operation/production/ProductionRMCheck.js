import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Tabs } from "antd";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTable from "../../../../components/CustomTable";
import { getRMMockupData, RPMCheckColumns } from "./productionConfigs";
import RMBarcodeScanner from "./RMBarcodeScanner";

const ProductionRMCheck = ({ state }) => {
  return (
    <>
      <RMBarcodeScanner />
      <Tabs>
        <Tabs.TabPane tab={"Raw Material"} key={"1"}>
          <CustomTable
            columns={RPMCheckColumns()}
            dataSource={getRMMockupData(20)}
            rowKey="id"
            pageSize={1000}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default ProductionRMCheck;
