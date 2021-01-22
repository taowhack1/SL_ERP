import { Table } from "antd";
import React, { useContext } from "react";
import { totalFormulaColumns } from "../config/item";
import SearchTable from "../../../components/SearchTable";
import { sortData } from "../../../include/js/function_main";
import { ItemContext } from "../../../include/js/context";
import CustomTable from "../../../components/CustomTable";

const TotalFormula = () => {
  const { PartReducer, FormulaReducer } = useContext(ItemContext);
  const partData = [
    {
      id: 0,
      item_part_description: "A",
      item_part_sort: 1,
    },
    {
      id: 1,
      item_part_description: "B",
      item_part_sort: 2,
    },
    {
      id: 2,
      item_part_description: "C",
      item_part_sort: 3,
    },
    {
      id: 3,
      item_part_description: "E",
      item_part_sort: 4,
    },
    {
      id: 4,
      item_part_description: "F",
      item_part_sort: 5,
    },
  ];

  const formulaData = [
    [
      {
        id: 0,
        item_id_formula: 1,
        item_no_name: "[ 101SRLA00100 ] TEST 1",
        item_formula_percent_qty: 3.5432,
      },
      {
        id: 1,
        item_id_formula: 2,
        item_no_name: "[ 101SRLA00100 ] TEST 2",
        item_formula_percent_qty: 6,
      },
    ],
    [
      {
        id: 0,
        item_id_formula: 3,
        item_no_name: "[ 101SRLA00100 ] TEST 3",
        item_formula_percent_qty: 12.0531,
      },
      {
        id: 1,
        item_id_formula: 4,
        item_no_name: "[ 101SRLA00100 ] TEST 4",
        item_formula_percent_qty: 4,
      },
      {
        id: 2,
        item_id_formula: 1,
        item_no_name: "[ 101SRLA00100 ] TEST 1",
        item_formula_percent_qty: 14,
      },
    ],
    [
      {
        id: 0,
        item_id_formula: 5,
        item_no_name: "[ 101SRLA00100 ] TEST 5",
        item_formula_percent_qty: 7.5,
      },
    ],
    [
      {
        id: 0,
        item_id_formula: 3,
        item_no_name: "[ 101SRLA00100 ] TEST 3",
        item_formula_percent_qty: 15.0531,
      },
      {
        id: 1,
        item_id_formula: 4,
        item_no_name: "[ 101SRLA00100 ] TEST 4",
        item_formula_percent_qty: 2,
      },
      {
        id: 2,
        item_id_formula: 1,
        item_no_name: "[ 101SRLA00100 ] TEST 1",
        item_formula_percent_qty: 0.0001,
      },
    ],
    [
      {
        id: 0,
        item_id_formula: 3,
        item_no_name: "[ 101SRLA00100 ] TEST 3",
        item_formula_percent_qty: 5.0531,
      },
      {
        id: 1,
        item_id_formula: 4,
        item_no_name: "[ 101SRLA00100 ] TEST 4",
        item_formula_percent_qty: 8,
      },
      {
        id: 2,
        item_id_formula: 1,
        item_no_name: "[ 101SRLA00100 ] TEST 1",
        item_formula_percent_qty: 0.0001,
      },
    ],
  ];

  const combinePart = () => {
    const temp = [];
    FormulaReducer.data.map((arr, partIndex) => {
      console.log(
        "isMixPart",
        PartReducer.data[partIndex].item_part_description.indexOf("+")
      );
      return PartReducer.data[partIndex].item_part_description.indexOf("+") >= 1
        ? false
        : temp.push(
            ...arr.map((item, index) => {
              return {
                ...item,
                isFirstItem: index === 0 ? 1 : 0,
                item_part_sort: PartReducer.data[partIndex].item_part_sort,
                item_part_description:
                  PartReducer.data[partIndex].item_part_description,
              };
            })
          );
    });
    return temp.length ? sortData(temp) : [];
  };
  const combineData = combinePart();
  //   console.log("map Part ", formulaData);
  //   formulaData.map((arr) => combineData.push(...arr));
  return (
    <>
      <CustomTable
        loading={false}
        columns={totalFormulaColumns}
        rowClassName="row-table-detail"
        dataSource={combineData}
        onChange={() => console.log("change page")}
        bordered
        pagination={{ pageSize: 100 }}
        size="small"
        rowKey="id"
      />
    </>
  );
};

export default React.memo(TotalFormula);
