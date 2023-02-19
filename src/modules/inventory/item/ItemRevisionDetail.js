import { Checkbox, Col, Collapse, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import CustomLabel from "../../../components/CustomLabel";
import { pad2number } from "../../../include/js/function_main";
const { Panel } = Collapse;
const ItemRevisionDetail = ({ data_head, readOnly, upDateFormValue }) => {
  return (
    <>
      {/* <Collapse defaultActiveKey={["1"]}>
        <Panel header="Revision Detail" key="1"> */}
      <Row className="col-2 mt-2 detail-tab-row">
        <Col span={12}>
          <CustomLabel label={"Revision Detail"} />
        </Col>
        <Col span={12}></Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={6}>
              <CustomLabel label={"Current Revision :"} />
            </Col>
            <Col span={16}>
              <Text className="text-value">
                {pad2number(+data_head.item_revision_no) ?? "00"}
              </Text>
            </Col>
          </Row>
          {!readOnly && (
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label={"Change Revision :"} />
              </Col>
              <Col span={17}>
                <Checkbox
                  name="isChangeRevision"
                  checked={data_head.isChangeRevision}
                  onChange={(e) =>
                    upDateFormValue({
                      isChangeRevision: e.target.checked ? 1 : 0,
                      item_no_ref: data_head.item_no,
                    })
                  }
                />
              </Col>
            </Row>
          )}
        </Col>
        <Col span={12}></Col>
      </Row>
      {!readOnly && (
        <Row className="col-2">
          <Col span={24}>
            <span
              style={{
                color: "red",
                fontSize: 12,
                fontWeight: "bold",
                padding: 10,
              }}
            >{`* If "Change Revision" is checked. System will create a new item and set item code to the next revision.`}</span>
          </Col>
        </Row>
      )}
      {/* </Panel>
      </Collapse> */}
    </>
  );
};

export default ItemRevisionDetail;
