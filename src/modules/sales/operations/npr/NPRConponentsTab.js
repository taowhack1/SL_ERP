import { Checkbox, Col, Row, Table, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import { convertDigit } from "../../../../include/js/main_config";
import { NPRFormContext } from "./RDForm";
const componentColumns = [
  {
    title: "Item Code",
    dataIndex: "npr_detail_item_no",
    align: "left",
    width: "13%",
    render: (val) => val || "-",
  },
  {
    title: "Description",
    dataIndex: "npr_detail_item_name",
    align: "left",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: "Supply by",
    dataIndex: "npr_detail_supply_by",
    align: "left",
    width: "10%",
    render: (val) => val || "-",
  },
  {
    title: "Supplier",
    dataIndex: "npr_detail_supply_name",
    align: "left",
    width: "20%",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>% Waste with customer</Text>
      </div>
    ),
    dataIndex: "npr_detail_watse_percent_qty",
    align: "right",
    width: "7%",
    render: (val) => convertDigit(val || 0, 4),
  },
  {
    title: "Picture",
    dataIndex: "",
    align: "left",
    width: "5%",
    render: (val) => val || "-",
  },
];
const NPRConponentsTab = () => {
  const { state } = useContext(NPRFormContext);
  return (
    <>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="form-section-detail" style={{ padding: 10 }}>
          <Table
            columns={componentColumns}
            dataSource={state.npr_detail}
            pagination={false}
            rowKey={"npr_detail_id"}
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
