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
      {/* <div className="flex-container flex-wrap">
        <div className="col-border-right half-width">
          <Row className="col-2">
            <Col span={6}>
              <CustomLabel label="Plan" />
            </Col>
            <Col span={16}>
              <CustomSelect placeholder={"Plan"} />
            </Col>
          </Row>
        </div>
        <div className="half-width"></div>
      </div> */}

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
