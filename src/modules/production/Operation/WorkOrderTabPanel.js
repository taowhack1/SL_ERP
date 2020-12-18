import { DatePicker, Row, Col, Tabs, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React, { useContext, useMemo } from "react";
import moment from "moment";
import TabWorkOrderDetail from "./TabWorkOrderDetail";
import TabWorkOrderRM from "./TabWorkOrderRM";
import TabWorkOrderPK from "./TabWorkOrderPK";
import { useSelector } from "react-redux";
import TabWorkOrderPKDetail from "./TabWorkOrderPKDetail";
import { WOContext } from "./WorkOrderCreate";
import TabWorkOrderRemark from "./TabWorkOrderRemark";

const WorkOrderTabPanel = () => {
  const itemList = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  const getItemList = useMemo(() => itemList, [itemList]);
  console.log("WorkOrderTabPanel");
  return (
    <Row className="col-2">
      <Col span={24}>
        <Tabs defaultActiveKey={"1"} className="row-tab-margin-lg">
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                <span className="require">* </span>
                {"Detail"}
              </span>
            }
            key={"1"}
          >
            <TabWorkOrderDetail />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                <span className="require">* </span>
                {"Raw Material"}
              </span>
            }
            key={"2"}
          >
            <TabWorkOrderRM
              itemList={getItemList.filter((item) => item.type_id === 1)}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span className="tab_pane">
                <span className="require">* </span>
                {"Packaging"}
              </span>
            }
            key={"3"}
          >
            <TabWorkOrderPKDetail
              itemList={getItemList.filter((item) => item.type_id === 2)}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Notes"}</span>}
            key={"4"}
          >
            <TabWorkOrderRemark />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default React.memo(WorkOrderTabPanel);
