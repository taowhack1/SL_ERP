import React, { useContext, useEffect } from "react";
import Text from "antd/lib/typography/Text";
import { Button, Table } from "antd";
import ModalEstimateFormCalculator from "./ModalEstimateFormCalculator";
import { NPREstimateContext } from "./EstimateForm";
import { getNPREstimate } from "../../../../actions/sales/nprActions";
const columns = ({ onOpen }) => [
  {
    title: "No.",
    align: "center",
    width: "5%",
    render: (_, _2, index) => index + 1,
  },
  {
    title: "Batch Size.",
    align: "left",
    dataIndex: "batch",
    width: "5%",
    render: (val) => val,
  },
  {
    title: "Create Date",
    align: "center",
    dataIndex: "date",
    width: "10%",
  },
  {
    title: "Sale",
    align: "left",
    dataIndex: "sale",
    width: "15%",
  },
  {
    title: (
      <div className="text-center">
        <Text>Action</Text>
      </div>
    ),
    align: "left",
    dataIndex: "npr_product_name",
    align: "center",
    width: "10%",
    ellipsis: true,
    render: (val) => {
      return (
        <>
          <Button className="primary" onClick={() => console.log("Print")}>
            Print
          </Button>
          <Button className="primary" onClick={onOpen}>
            Edit
          </Button>
        </>
      );
    },
  },
];

const EstimateFormTabHistory = () => {
  const {
    onOpen,
    modal: { visible },
  } = useContext(NPREstimateContext);

  //? x = ( ราคาต้นทุน + ( ราคาต้นทุน * ( เผื่อเสีย / 100 ) ) )
  //? total = x + ( x * ( markup / 100 ) )

  return (
    <>
      <Button className="primary" onClick={onOpen}>
        Add New
      </Button>

      <Table
        className="mt-1"
        size={"small"}
        rowKey={"id"}
        columns={columns({ onOpen })}
        dataSource={[]}
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
