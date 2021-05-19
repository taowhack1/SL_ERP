/** @format */

import { Col, Row, Tabs } from "antd";
import React from "react";
import CustomLabel from "../../../components/CustomLabel";
import { NprComponentsColumns } from "./nprconfig";
import NprTabComponents from "./NprTabComponents";
import NprTabDetail from "./NprTabDetail";

const NprDetail = ({
  readOnly = false,
  stateDispatch,
  nprstate,
  detailField,
  control,
  register,
  defaultValues,
  setValue,
  errors,
  getValues,
}) => {
  return (
    <>
      <Row className='col-12'>
        <Col span={24}>
          <Tabs defaultActiveKey='1'>
            {/* Tab Components Ingerdients List */}
            <Tabs.TabPane
              tab={
                <CustomLabel
                  readOnly={readOnly}
                  require
                  label={"Components/Ingredients List"}
                />
              }
              key='1'>
              <NprTabComponents
                columns={NprComponentsColumns}
                stateDispatch={stateDispatch}
                nprstate={nprstate}
                dataDetail={nprstate}
                {...{
                  control,
                  register,
                  defaultValues,
                  getValues,
                  setValue,
                  errors,
                }}
                detailField={"detailField"}></NprTabComponents>
            </Tabs.TabPane>
            {/* Tab detail of sample */}
            <Tabs.TabPane
              tab={
                <CustomLabel
                  readOnly={readOnly}
                  require
                  label={"Details of Sample Request"}
                />
              }
              key='2'>
              <NprTabDetail
                control={control}
                readOnly={readOnly}></NprTabDetail>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default NprDetail;
