import { DatePicker, Row, Col, Tabs, InputNumber } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import moment from "moment";
import TabWorkOrderDetail from "./TabWorkOrderDetail";
import TabWorkOrderRM from "./TabWorkOrderRM";
import TabWorkOrderPK from "./TabWorkOrderPK";
import { useSelector } from "react-redux";
import TabWorkOrderPKDetail from "./TabWorkOrderPKDetail";

const WorkOrderTabPanel = ({
  readOnly,
  data_rm_detail,
  rmDetailDispatch,
  data_pk_detail,
  pkDetailDispatch,
}) => {
  const itemList = useSelector(
    (state) => state.inventory.master_data.item_list
  );
  console.log("WorkOrderTabPanel");
  return (
    <Row className="col-2">
      <Col span={24}>
        <Tabs
          defaultActiveKey={"1"}
          //   onChange={callback}
          className="row-tab-margin-lg"
        >
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
              itemList={itemList.filter((item) => item.type_id === 1)}
              readOnly={readOnly}
              data_rm_detail={data_rm_detail}
              rmDetailDispatch={rmDetailDispatch}
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
              itemList={itemList.filter((item) => item.type_id === 2)}
              readOnly={readOnly}
              data_pk_detail={data_pk_detail}
              pkDetailDispatch={pkDetailDispatch}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<span className="tab_pane">{"Notes"}</span>}
            key={"4"}
          >
            <TextArea
              name="work_center_remark"
              placeholder="Remark"
              //   onChange={(e) =>
              //     upDateFormValue({ work_center_remark: e.target.value })
              //   }
              //   value={data_head.work_center_remark}
            />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default React.memo(WorkOrderTabPanel);
