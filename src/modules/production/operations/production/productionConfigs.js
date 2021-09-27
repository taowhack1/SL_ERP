import {
  CheckOutlined,
  CiCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
import { convertDigit } from "../../../../include/js/main_config";

export const RPMCheckColumns = () => [
  {
    title: "No.",
    width: "7%",
    align: "center",
    render: (value, record, index) => index + 1,
  },
  {
    title: "Part No.",
    align: "center",
    dataIndex: "item_part_no",
  },
  {
    title: "RM Code",
    align: "center",
    dataIndex: "item_no",
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Batch No." />
      </div>
    ),
    width: "15%",
    align: "center",
    dataIndex: "stock_batch",
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Require. Weight." />
      </div>
    ),
    width: "15%",
    align: "right",
    dataIndex: "weight_machine_net",
    render: (val) => convertDigit(val, 6),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Net Weight" />
      </div>
    ),
    width: "15%",
    align: "right",
    dataIndex: "weight_machine_net_scan",
    render: (val) => convertDigit(val || 0, 6),
  },
  {
    title: "UoM",
    width: "7%",
    align: "center",
    dataIndex: "uom_no",
  },
  {
    title: "Checked",
    width: "15%",
    align: "center",
    render: (_, record) =>
      record.weight_machine_net_scan === record.weight_machine_net ? (
        <CheckOutlined style={{ color: "#2CDB00" }} />
      ) : record.weight_machine_net_scan < record.weight_machine_net ? (
        <Text className="require">Qty is not enough</Text>
      ) : (
        <Text className="require">Over Quantity.</Text>
      ),
  },
];

export const getRMMockupData = (number = 10) => {
  let data = [];
  for (let i = 1; i < number; i++) {
    const randomQty = Math.random() * 10;
    data.push({
      id: i,
      item_no: "10" + Math.round(randomQty) + "SRLA000" + i * 100,
      item_formula_qty: randomQty + 1,
      item_issue_qty: randomQty,
      item_net_weight: Math.random() * 10,
      uom_no: "kg",
    });
  }
  return data;
};
