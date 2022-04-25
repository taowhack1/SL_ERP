/** @format */

import { Table } from "antd";
import React, { useState } from "react";
import { Col, Row } from "react-flexbox-grid";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import { useFetch } from "../../../../include/js/customHooks";
import {
  convertDigit,
  header_config,
} from "../../../../include/js/main_config";
import axios from "axios";
import SearchTableItemBalance from "./SearchTableItemBalance";
import { CSVLink, CSVDownload } from "react-csv";
import { api_get_all_item_list } from "../../../../include/js/api";
import { sortData } from "../../../../include/js/function_main";
import moment from "moment";
const api_itemBalance = "/inventory/report/item_balance";
const api_itemBalance_deep = "/inventory/report/item_balance_deep";
const sharedOnCell = (_, index) => {
  console.log("sharedOnCell", index);
  if (index === 5) {
    return { colSpan: 0 };
  }
};
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    props: {},
  };
  // if (index === 4) {
  //   obj.props.colSpan = 0;
  //   console.log("value", value);
  // }
  return obj;
};
function findLastIndex(array, searchKey, searchValue) {
  var index = array
    .slice()
    .reverse()
    .findIndex((x) => x[searchKey] === searchValue);
  var count = array.length - 1;
  var finalIndex = index >= 0 ? count - index : index;
  return finalIndex;
}
//convertDigit(vat ? vat : 0, 4)
const columnFindDetail = (convertDigit, listItemBalance) => [
  {
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    ellipsis: false,
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.id - b.id,
    //render: (val) => val + 1,
    //onCell: sharedOnCell,
    render: (val, row, index) => val + 1,
  },
  {
    title: "Item no",
    dataIndex: "item_no",
    width: "10%",
    align: "left",
    ellipsis: false,
    onCell: sharedOnCell,
    render: (text, row, index) => {
      let count = 0;
      let item = 0;
      if (item !== row.item_id) {
        item = row.item_id;
        count++;
      }
      // if (index !== 4) {
      return text;
      // }
      // return {
      //   children: <a href='javascript:;'>{"รวมเป็นเงิน"}</a>,
      //   props: {
      //     colSpan: 1,
      //   },
      // };
    },
  },
  {
    title: "Item Name",
    dataIndex: "item_name",
    width: "15%",
    align: "left",
    ellipsis: true,
    //onCell: sharedOnCell,
    render: renderContent,
  },
  {
    title: "Unit",
    dataIndex: "uom_no",
    width: "5%",
    align: "left",
    ellipsis: false,
    //onCell: sharedOnCell,
    render: renderContent,
  },
  {
    title: "วันที่",
    dataIndex: "stock_detail_created",
    width: "10%",
    align: "left",
    ellipsis: false,
    //onCell: sharedOnCell,
    render: renderContent,
  },
  {
    title: "จำนวนที่รับ",
    dataIndex: "stock_in_qty",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 6),
    //onCell: sharedOnCell,
    //render: renderContent,
  },
  {
    title: "จำนวนที่เบิกใช้",
    dataIndex: "stock_disburse_qty",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 6),
    //onCell: sharedOnCell,
    //render: renderContent,
  },
  {
    title: "คงเหลือ",
    dataIndex: "calculate_history",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 6),
    // onCell: sharedOnCell,
    // render: renderContent,
  },
  {
    title: "ราคาต่อหน่วย",
    dataIndex: "tg_item_cost_avg", //stock_unit_price tg_item_cost_avg
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 4),
    //onCell: sharedOnCell,
    //render: renderContent,
  },
  {
    title: "รวมเป็นเงิน",
    dataIndex: "calculate",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 4),
    //onCell: sharedOnCell,
    //render: renderContent,
  },
  {
    title: "ประเภทเอกสาร",
    dataIndex: "trans_no",
    width: "5%",
    align: "left",
    ellipsis: false,
    //onCell: sharedOnCell,
    render: renderContent,
  },
  {
    title: "เอกสาร",
    dataIndex: "document_no",
    width: "10%",
    align: "left",
    ellipsis: false,
    //onCell: sharedOnCell,
    render: renderContent,
  },
];
const column = (convertDigit) => [
  {
    title: "Item no",
    dataIndex: "item_no",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "Item Name",
    dataIndex: "item_name",
    width: "20%",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Unit",
    dataIndex: "uom_no",
    width: "5%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "จำนวนที่รับ",
    dataIndex: "tg_stock_qty_inbound",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 6),
  },
  {
    title: "จำนวนที่เบิกใช้",
    dataIndex: "tg_stock_qty_outbound",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 6),
  },
  {
    title: "คงเหลือ",
    dataIndex: "tg_stock_qty_balance",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 6),
  },
  {
    title: "ราคาต่อหน่วย",
    dataIndex: "tg_item_cost_avg",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 6),
  },
  {
    title: "รวมเป็นเงิน",
    dataIndex: "total_price",
    width: "10%",
    align: "right",
    ellipsis: false,
    render: (val) => convertDigit(val ? val : 0, 6),
  },
  {
    title: "PO ล่าสุด",
    dataIndex: "po_no",
    width: "10%",
    align: "left",
    ellipsis: false,
    render: (val) => val || "-",
  },
];

const ItemBalanceMain = () => {
  const [typeReport, setTypeReport] = useState(column);
  const [data, setData] = useState([]);
  const [listItemBalance, setlistItemBalance] = useState([]);
  const [ItemBalanceLoading, setItemBalanceLoading] = useState(false);
  const [mainState, setMainState] = useState({
    date_start: null,
    date_end: null,
    item_id: null,
    isBalanceZero: 0,
  });
  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const typeButtonSubmit = async (type) => {
    type === "find"
      ? setTypeReport(column(convertDigit))
      : setTypeReport(columnFindDetail(convertDigit, listItemBalance));

    const { data: data } = await getPRListForPO(type);
    setlistItemBalance(data);
    console.log("object data:>> ", data);
    let newarray = [];
    var result = [];
    data.reduce(function (res, value) {
      if (!res[value.item_id]) {
        res[value.item_id] = {
          item_id: value.item_id,
          stock_disburse_qty: 0,
          stock_in_qty: 0,
          balance: 0,
        };
        result.push(res[value.item_id]);
      }
      res[value.item_id].stock_disburse_qty += parseFloat(
        value.stock_disburse_qty
      );
      res[value.item_id].stock_in_qty += parseFloat(value.stock_in_qty);
      res[value.item_id].balance =
        res[value.item_id].stock_in_qty - res[value.item_id].stock_disburse_qty;

      return res;
    }, {});
    console.log("result", result);
    console.log("groupBy", groupBy(data, "item_id"));
  };
  // const calculate = () => {
  //   let balanceValue = 0;
  //   let DataTransformer = [];
  //   if (data.length > 0) {
  //     DataTransformer = Object.values(
  //       ...data
  //         .filter((obj) => obj.date == date)
  //         .map((obj) => {
  //           return obj.detail;
  //         })
  //     );
  //   }
  // };
  const getPRListForPO = (type) => {
    let savedata = mainState;
    if (type !== "find") {
      savedata = {
        ...mainState,
        date_start: moment(mainState.date_start).format("DD-MM-yyyy"),
        date_end: moment(mainState.date_end).format("DD-MM-yyyy"),
      };
    }
    try {
      setItemBalanceLoading(true);
      return axios
        .post(
          `${type === "find" ? api_itemBalance : api_itemBalance_deep}`,
          { ...savedata },
          header_config
        )
        .then((resp) => {
          if (resp.status === 200) {
            setItemBalanceLoading(false);
            return {
              success: true,
              data: sortData(resp.data),
              //data: resp.data,
              message: "Success",
            };
          } else {
            return { success: false, data: [], message: resp };
          }
        })
        .catch((error) => {
          console.error(error);
          if (error?.response) {
            console.error(error.response);
          }
          return { success: false, data: [], message: error };
        });
    } catch (error) {
      console.log(error);
      return { success: false, data: [], message: error };
    }
  };
  const current_project = useSelector((state) => state.auth.currentProject);
  const auth = useSelector((state) => state.auth.authData);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Item Balance"],
    search: false,
    buttonAction: [],
  };

  const { data: listDataItem, loading: ItemLoading } = useFetch(
    `${api_get_all_item_list}/${auth?.user_name}`,
    !auth?.user_name
  );

  const propsData = {
    type_id: 1,
    typeButtonSubmit,
    setMainState,
    mainState,
    listItemBalance,
    ItemBalanceLoading,
    listDataItem,
    ItemLoading,
    setlistItemBalance,
  };
  console.log("mainState :>> ", mainState);
  return (
    <>
      <MainLayout {...config}>
        <Table
          loading={ItemLoading ? true : ItemBalanceLoading ? true : false}
          title={() => <SearchTableItemBalance data={propsData} />}
          bordered
          size={"small"}
          rowKey={"id"}
          columns={typeReport}
          dataSource={listItemBalance}></Table>
      </MainLayout>
    </>
  );
};

export default ItemBalanceMain;
