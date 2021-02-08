import React from "react";
import { Row, Col, Input, Tabs } from "antd";
import Detail from "./Receive_Detail";
import CustomRemark from "../../../../components/CustomRemark";
import ReceiveDetailWithoutPO from "./ReceiveDetailWithoutPO";

const { TextArea } = Input;
const ReceiveTabs = ({ mainState, readOnly, remarkFields, saveForm }) => {
  const getTableDetail = (po_id) =>
    po_id ? (
      <Detail
        readOnly={readOnly}
        // po_id={state.po_id}
        mainState={mainState}
        saveForm={saveForm}
      />
    ) : (
      <ReceiveDetailWithoutPO
        readOnly={readOnly}
        // po_id={state.po_id}
        mainState={mainState}
        saveForm={saveForm}
      />
    );
  return (
    <>
      <Row className="col-2 row-tab-margin-l">
        <Col span={24}>
          <Tabs defaultActiveKey={"1"}>
            <Tabs.TabPane
              tab={
                <span>
                  {!readOnly && <span className="require">* </span>}
                  {"Receive Detail"}
                </span>
              }
              key={"1"}
            >
              {getTableDetail(mainState.po_id)}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Notes" key={"2"}>
              <CustomRemark
                fields={remarkFields}
                saveForm={saveForm}
                readOnly={readOnly}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default ReceiveTabs;
