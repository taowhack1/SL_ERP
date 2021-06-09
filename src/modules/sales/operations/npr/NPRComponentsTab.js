import {
  DeleteTwoTone,
  EllipsisOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, InputNumber, Row, Table, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTable from "../../../../components/CustomTable";
import { convertDigit } from "../../../../include/js/main_config";
import { NPRFormContext } from "./NPRViewById";
const componentColumns = [
  {
    title: "Item Code",
    dataIndex: "npr_detail_item_no",
    align: "left",
    width: "13%",
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: "Description",
    dataIndex: "npr_detail_item_name",
    align: "left",
    ellipsis: true,
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: "Supply by",
    dataIndex: "npr_detail_supply_by",
    align: "left",
    width: "10%",
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: "Supplier",
    dataIndex: "npr_detail_supply_name",
    align: "left",
    width: "20%",
    ellipsis: true,
    className: "tb-col-sm",
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
    className: "tb-col-sm",
    render: (val) => convertDigit(val || 0, 4),
  },
  {
    title: "Picture",
    dataIndex: "",
    align: "center",
    width: "5%",
    className: "tb-col-sm",
    render: (val) => <PictureOutlined className="button-icon" />,
  },
];
const NPRComponentsTab = () => {
  const { state, department } = useContext(NPRFormContext);

  const expandedRowRender = () => {
    const columns = [
      {
        title: "No.",
        dataIndex: "id",
        width: "5%",
        align: "center",
        className: "tb-col-sm",
        render: (val, _, index) => index + 1,
      },
      {
        title: (
          <div className="text-center">
            <Text>Item</Text>
          </div>
        ),
        dataIndex: "item_no_name",
        align: "left",
        ellipsis: true,
        className: "tb-col-sm",
        render: (val) => (
          <CustomSelect
            placeholder="Item"
            value={val}
            showSearch
            allowClear
            size={"small"}
            className="full-width"
          />
        ),
      },
      {
        title: (
          <div className="text-center">
            <Text>Price / Unit</Text>
          </div>
        ),
        dataIndex: "item_cost",
        align: "right",
        width: "15%",
        className: "tb-col-sm",
        render: (val) => (
          <InputNumber
            value={val}
            placeholder="Cost"
            step={1}
            min={0}
            size="small"
            className="full-width"
          />
        ),
      },
      {
        title: (
          <div className="text-center">
            <Text>Currency</Text>
          </div>
        ),
        dataIndex: "currency_no",
        align: "left",
        width: "10%",
        className: "tb-col-sm",
      },
      {
        title: (
          <div className="text-center">
            <Text>MOQ</Text>
          </div>
        ),
        dataIndex: "item_moq",
        align: "right",
        width: "10%",
        className: "tb-col-sm",
        render: (val) => (
          <InputNumber
            value={val}
            placeholder="MOQ"
            step={1}
            min={0}
            size="small"
            className="full-width"
          />
        ),
      },
      {
        title: (
          <div className="text-center">
            <Text>UOM</Text>
          </div>
        ),
        dataIndex: "moq_uom_no",
        align: "left",
        width: "10%",
        className: "tb-col-sm",
      },
      {
        title: <EllipsisOutlined />,
        dataIndex: "id",
        align: "center",
        width: "5%",
        className: "tb-col-sm",
        render: (val) => <DeleteTwoTone className="button-icon" />,
      },
    ];
    const mockupData = [
      {
        id: 0,
        item_no_name: "[TEST] TEST Item 1",
        item_cost: 120,
        currency_no: "THB",
        item_moq: 100,
        moq_uom_no: "pcs",
      },
      {
        id: 1,
        item_no_name: "[TEST] TEST Item 2",
        item_cost: 80,
        currency_no: "THB",
        item_moq: 100,
        moq_uom_no: "pcs",
      },
    ];
    return (
      <>
        <CustomTable
          columns={columns}
          dataSource={mockupData}
          bordered
          rowKey={"id"}
          pagination={false}
          rowClassName="row-table-detail"
          onAdd={() => console.log("add")}
        />
      </>
    );
  };
  return (
    <>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="d-flex flex-space">
          <h3>Packaging Components</h3>
          <Button
            // htmlType={"submit"}
            className={"primary"}
            size="small"
            loading={false}
          >
            Save
          </Button>
        </div>
        <div className="form-section-detail" style={{ padding: 10 }}>
          <Table
            columns={componentColumns}
            dataSource={state.npr_detail}
            pagination={false}
            rowKey={"npr_detail_id"}
            size={"small"}
            className="full-width"
            expandable={{ expandedRowRender }}
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

export default NPRComponentsTab;
