/** @format */

import { Col, Row, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import useKeepLogs from "../../../logs/useKeepLogs";
import Authorize from "../../../system/Authorize";
import SearchTableWhereUse from "./SearchTableWhereUse";
const whereUse_colum = [
  {
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    ellipsis: false,
    render: (val) => val,
  },
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
    dataIndex: "uom_no_name",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "type",
    dataIndex: "type_no_name",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "Categoty",
    dataIndex: "category_name",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "Item Ref",
    dataIndex: "item_no_ref",
    width: "10%",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Formula Effective date",
    dataIndex: "item_formula_effective_date",
    width: "5",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Process Effective Date",
    dataIndex: "item_process_effective_date",
    width: "5",
    align: "center",
    ellipsis: false,
  },
  {
    title: "Item Created",
    dataIndex: "item_created",
    width: "5",
    align: "center",
    ellipsis: false,
  },
];
const WhereUseTable = (props) => {
  const listDataWhereUse = props && props.dataSource;
  const whereUseLoading = props && props.loading;
  const listDataItem = props && props.listItem;
  const listItemLoading = props && props.listItemLoading;
  const onChangeItem = props && props.onChangeItem;
  const state = props && props.state;
  const history = useHistory();
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  const auth = useSelector((state) => state.auth.authData);
  const current_menu = useSelector((state) => state.auth.currentMenu);
  props &&
    props.dataSource &&
    console.log(
      "listDataWhereUse props:>> ",
      listDataWhereUse,
      whereUseLoading
    );
  const propsData = {
    inputName: "Item Raw material",
    placeholder: "Item Raw material",
    field_id: "item_id",
    field_name: "item_no_name",
    type_id: 1,
    state,
    onChangeItem,
    listItemLoading,
    listDataItem,
  };
  console.log("page Active RM :>> ", propsData);
  return (
    <>
      <Row className='row-tab-margin-sm'>
        <Col span={24}>
          <Table
            loading={whereUseLoading ? true : listItemLoading ? true : false}
            title={() => <SearchTableWhereUse data={propsData} />}
            bordered
            size={"small"}
            rowKey={"item_id"}
            columns={whereUse_colum}
            dataSource={listDataWhereUse}></Table>
        </Col>
      </Row>
    </>
  );
};

export default WhereUseTable;
