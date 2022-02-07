/** @format */

import { Col, Row, Table } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import useKeepLogs from "../../../logs/useKeepLogs";
import Authorize from "../../../system/Authorize";
import SearchTableWhereUse from "./SearchTableWhereUse";

const whereUse_columPK = [
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
    dataIndex: "fg_uom_no_name",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "Type",
    dataIndex: "fg_type_no_name",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "Categoty",
    dataIndex: "fg_category_name",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "PK Qty.",
    dataIndex: "item_packaging_qty",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "PK Unit",
    dataIndex: "pk_uom_no_name",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
  {
    title: "PK Remark",
    dataIndex: "item_packaging_remark",
    width: "10%",
    align: "left",
    ellipsis: false,
  },
];
const WhereUseTablePK = (props) => {
  const listDataWhereUsePK = props && props.dataSource;
  const whereUsePKLoading = props && props.loading;
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
  const propsData = {
    inputName: "Item Package",
    placeholder: "Item Package",
    field_id: "item_id",
    field_name: "item_no_name",
    type_id: 2,
    state,
    onChangeItem,
    listItemLoading,
    listDataItem,
  };
  console.log("page Active PK :>> ", propsData);
  return (
    <>
      <Row className='row-tab-margin-sm'>
        <Col span={24}>
          <Table
            loading={whereUsePKLoading ? true : listItemLoading ? true : false}
            title={() => <SearchTableWhereUse data={propsData} />}
            bordered
            size={"small"}
            rowKey={"item_id"}
            columns={whereUse_columPK}
            dataSource={listDataWhereUsePK}></Table>
        </Col>
      </Row>
    </>
  );
};

export default WhereUseTablePK;
