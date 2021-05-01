import { Checkbox, Col, Row, Table, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";

const componentColumns = [
  {
    title: "Item Code",
    dataIndex: "item_no",
    align: "left",
    render: (val) => <Text strong>{val}</Text>,
    width: "13%",
  },
  {
    title: "Description",
    dataIndex: "item_name",
    align: "left",
    width: "20%",
  },
  {
    title: "Supply by",
    dataIndex: "weight_machine_user_name",
    align: "left",
    render: (val) => <Text strong>{val}</Text>,
    width: "15%",
  },
  {
    title: "Supplier",
    dataIndex: "",
    align: "left",
    width: "20%",
  },
  {
    title: "% Waste with customer",
    dataIndex: "",
    align: "left",
    width: "10%",
  },
  {
    title: "Picture",
    dataIndex: "",
    align: "left",
    width: "5%",
  },
];
const NPRConponentsTab = ({ state }) => {
  return (
    <>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="form-section-detail" style={{ padding: 10 }}>
          <Table
            columns={componentColumns}
            dataSource={[]}
            pagination={false}
            rowKey={"id"}
            size={"small"}
            className="full-width"
            bordered
          />
          <Row className="col-2 row-margin-vertical">
            <Col span={24}>
              <CustomLabel label="Remark :" />
            </Col>
            <Col span={24}>
              <Text className="ml-4">{state.npr_responsed_remark || "-"}</Text>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default NPRConponentsTab;
