import React, { useContext, useEffect } from "react";
import Text from "antd/lib/typography/Text";
import { Button, Table } from "antd";
import ModalEstimateFormCalculator from "./ModalEstimateFormCalculator";
import { NPREstimateContext } from "./EstimateForm";
const columns = ({ onOpen }) => [
  {
    title: "Batch Size.",
    align: "left",
    dataIndex: "batch",
    width: "5%",
    render: (val) => val,
  },
  {
    title: "Date",
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

  useEffect(() => {
    //Do Something.
  }, []);
  return (
    <>
      <Button className="primary" onClick={onOpen}>
        Add
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

// const npr_data = [
//   {
//     batch_size:100,
//     estimate_detail:[
//       {
//         name:"ราคาวัตถุดิบ "
//       }
//     ],
//     npr_formula_detail:[
//       {
//         item:1,
//         qtyByBatchSize:1,
//         uom_no:"kg"
//       },
//       {
//         item:2,
//         qtyByBatchSize:0.5,
//         uom_no:"kg"
//       },
//     ],
//     npr_price_detail:[
//       {
//         item:1,
//         qtyByBatchSize:100,
//         uom_no:"pcs"
//       },
//       {
//         item:2,
//         qtyByBatchSize:100,
//         uom_no:"pcs"
//       },
//     ]
//   }
// ]
