import { DatePicker, Row, Col, Tabs, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import QCItemTestTabSubject from "./QCItemTestTabSubject";

const WorkOrderTabPanel = ({
  readOnly,
  displayFields,
  data_detail,
  detailDispatch,
}) => {
  const itemList = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  console.log("panel-render");
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
            {/* <TabWorkOrderDetail /> */}
            <QCItemTestTabSubject readOnly={readOnly} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Specification"}</span>}
            key={"2"}
          >
            {/* <QCItemTestTabSubject readOnly={readOnly} /> */}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Method"}</span>}
            key={"3"}
          >
            {/* <QCItemTestTabSubject readOnly={readOnly} /> */}
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default React.memo(WorkOrderTabPanel);
