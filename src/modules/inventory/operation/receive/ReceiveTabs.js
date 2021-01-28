import React from "react";
import { Row, Col, Input, Tabs } from "antd";
import Detail from "./Receive_Detail";
import CustomRemark from "../../../../components/CustomRemark";

const { TextArea } = Input;
const ReceiveTabs = ({ mainState, readOnly, remarkFields, saveForm }) => {
  return (
    <>
      <Row className="col-2 row-tab-margin-l">
        <Col span={24}>
          <Tabs defaultActiveKey={"1"}>
            <Tabs.TabPane
              tab={
                <span>
                  <span className="require">* </span>
                  Receive Detail
                </span>
              }
              key={"1"}
            >
              <Detail
                readOnly={readOnly}
                // po_id={state.po_id}
                mainState={mainState}
                saveForm={saveForm}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Notes" key={"2"}>
              <CustomRemark fields={remarkFields} saveForm={saveForm} />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default ReceiveTabs;
