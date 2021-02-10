import { Table } from "antd";
import React, { useContext } from "react";
import { totalFormulaColumns } from "../config/item";
import SearchTable from "../../../components/SearchTable";
import { sortData } from "../../../include/js/function_main";
import { ItemContext } from "../../../include/js/context";
import CustomTable from "../../../components/CustomTable";

const TotalFormula = () => {
  const { statePart, FormulaReducer } = useContext(ItemContext);
  const combinePart = () => {
    const temp = [];
    statePart
      .map((obj) => obj.item_formula)
      .map((arr, partIndex) => {
        console.log(
          "isMixPart",
          statePart[partIndex].item_part_description.indexOf("+")
        );
        return statePart[partIndex].item_part_description.indexOf("+") >= 1 ||
          statePart[partIndex].item_part_description.length > 1
          ? false
          : temp.push(
              ...arr.map((item, index) => {
                return {
                  ...item,
                  isFirstItem: index === 0 ? 1 : 0,
                  item_part_sort: statePart[partIndex].item_part_sort,
                  item_part_description:
                    statePart[partIndex].item_part_description,
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
        pageSize={100}
        size="small"
        rowKey="id"
      />
    </>
  );
};

export default React.memo(TotalFormula);
