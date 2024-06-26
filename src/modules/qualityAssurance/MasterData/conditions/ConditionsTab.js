import { Row, Col, Tabs } from "antd";
import React, { useContext } from "react";
import {
  qcTestItemMethodFields,
  qcTestItemSpecFields,
  qcTestItemColumns,
  qcTestItemSubjectFields,
} from "../../configs/qcTestItemConfig";
import { QCContext } from "./ConditionsForm";
import QCItemTestTable from "./ConditionsDetail";
const initialStateSubject = qcTestItemSubjectFields;
const initialStateSpecification = qcTestItemSpecFields;
const initialStateMethod = qcTestItemMethodFields;
const MRPTabPanel = () => {
  const {
    data_head,
    subjectData,
    subjectDispatch,
    specificationData,
    specificationDispatch,
    methodData,
    methodDispatch,
    commonData,
  } = useContext(QCContext);
  console.log("Panel Render", subjectData);
  return (
    <Row className="col-2">
      <Col span={24}>
        <Tabs
          defaultActiveKey={"1"}
          //   onChange={callback}
          className="row-tab-margin-lg"
        >
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Subject"}</span>}
            key={"1"}
          >
            {/* <TabMRPDetail /> */}
            <QCItemTestTable
              field={{
                title: "Subject",
                id: "qa_subject_id",
                name: "qa_subject_name",
                description: "qa_subject_remark",
                status: "qa_subject_actived",
              }}
              initialState={initialStateSubject}
              dataSource={subjectData}
              dispatchData={subjectDispatch}
              commonData={commonData}
              columns={qcTestItemColumns}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Specification"}</span>}
            key={"2"}
          >
            <QCItemTestTable
              field={{
                title: "Specification",
                id: "qa_specification_id",
                name: "qa_specification_name",
                description: "qa_specification_remark",
                status: "qa_specification_actived",
              }}
              initialState={initialStateSpecification}
              dataSource={specificationData}
              dispatchData={specificationDispatch}
              commonData={commonData}
              columns={qcTestItemColumns}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Method"}</span>}
            key={"3"}
          >
            <QCItemTestTable
              field={{
                title: "Method",
                id: "qa_method_id",
                name: "qa_method_name",
                description: "qa_method_remark",
                status: "qa_method_actived",
              }}
              initialState={initialStateMethod}
              dataSource={methodData}
              dispatchData={methodDispatch}
              commonData={commonData}
              columns={qcTestItemColumns}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default React.memo(MRPTabPanel);
