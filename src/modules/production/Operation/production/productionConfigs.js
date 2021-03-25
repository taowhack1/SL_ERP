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
    dataIndex: "id",
  },
  {
    title: "RM Code",
    align: "center",
    dataIndex: "item_no",
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="%(W/W)" />
      </div>
    ),
    width: "15%",
    align: "right",
    dataIndex: "item_formula_qty",
    render: (val) => convertDigit(val, 4),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Spec. Qty." />
      </div>
    ),
    width: "15%",
    align: "right",
    dataIndex: "item_issue_qty",
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
    dataIndex: "item_net_weight",
    render: (val) => convertDigit(val, 6),
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
      record.item_net_weight >= record.item_issue_qty ? (
        <CheckOutlined style={{ color: "#2CDB00" }} />
      ) : record.item_net_weight !== 0 ? (
        <Text className="require">Qty is not enough</Text>
      ) : null,
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
