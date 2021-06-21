import React, { useContext, useEffect } from "react";
import Text from "antd/lib/typography/Text";
import { Button, Table } from "antd";
import ModalEstimateFormCalculator from "./ModalEstimateFormCalculator";
import { NPREstimateContext } from "./EstimateForm";
import { getNPREstimate } from "../../../../actions/sales/nprActions";
import {
  EditTwoTone,
  EllipsisOutlined,
  PrinterTwoTone,
} from "@ant-design/icons";
import { convertDigit } from "../../../../include/js/main_config";
const columns = ({ onOpen, onPrint }) => [
  {
    title: "No.",
    align: "center",
    width: "5%",
    render: (_, _2, index) => index + 1,
  },
  {
    title: (
      <div className="text-center">
        <Text>Batch Size</Text>
      </div>
    ),
    align: "right",
    dataIndex: "npr_product_cost_detail_batch_size",
    width: "10%",
    render: (val) => convertDigit(val, 4),
  },
  {
    title: (
      <div className="text-center">
        <Text>FG Qty.</Text>
      </div>
    ),
    align: "right",
    dataIndex: "npr_product_cost_detail_fg_qty",
    width: "10%",
    render: (val) => convertDigit(val, 4),
  },
  {
    title: "Markup %",
    align: "center",
    children: [
      {
        title: (
          <div className="text-center">
            <Text>Raw Material</Text>
          </div>
        ),
        align: "right",
        dataIndex: "npr_estimate_detail_sub",
        width: "10%",
        render: (val) =>
          convertDigit(
            val.find((val) => val.npr_estimate_type_id === 1)
              .npr_estimate_detail_sub_mark_up_percent_qty,
            4
          ) + " %",
      },
      {
        title: (
          <div className="text-center">
            <Text>Packaging</Text>
          </div>
        ),
        align: "right",
        dataIndex: "npr_estimate_detail_sub",
        width: "10%",
        render: (val) =>
          convertDigit(
            val.find((val) => val.npr_estimate_type_id === 2)
              .npr_estimate_detail_sub_mark_up_percent_qty,
            4
          ) + " %",
      },
      {
        title: (
          <div className="text-center">
            <Text>Production</Text>
          </div>
        ),
        align: "right",
        dataIndex: "npr_estimate_detail_sub",
        width: "10%",
        render: (val) =>
          convertDigit(
            val.find((val) => val.npr_estimate_type_id === 3)
              .npr_estimate_detail_sub_mark_up_percent_qty,
            4
          ) + " %",
      },
    ],
  },
  {
    title: (
      <div className="text-center">
        <Text>Total Price</Text>
      </div>
    ),
    align: "right",
    dataIndex: "tg_npr_estimate_detail_total_amount",
    width: "10%",
    render: (val) => (
      <Text strong className="text-primary">
        {convertDigit(val, 4)}
      </Text>
    ),
  },
  {
    title: "Currency",
    align: "center",
    width: "5%",
    render: (_) => <Text strong>THB</Text>,
  },
  {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    width: "5%",
    ellipsis: true,
    dataIndex: "npr_estimate_detail_id",
    render: (val, record) => {
      return (
        <EditTwoTone
          className="button-icon  font-m"
          onClick={() => onOpen(record)}
        />
      );
    },
  },
];

const EstimateFormTabHistory = () => {
  const {
    onOpen,
    onPrint,
    estimate: { npr_estimate_detail },
    modal: { visible },
  } = useContext(NPREstimateContext);
  return (
    <>
      <Button className="primary" onClick={() => onOpen()}>
        Add New
      </Button>

      <Table
        className="mt-1"
        size={"small"}
        rowKey={"id"}
        rowClassName={"row-table-detail"}
        columns={columns({ onOpen, onPrint })}
        dataSource={npr_estimate_detail}
        bordered
        pagination={{
          pageSize: 15,
        }}
      />
      <ModalEstimateFormCalculator {...{ visible, readOnly: false }} />
    </>
  );
};

export default React.memo(EstimateFormTabHistory);
