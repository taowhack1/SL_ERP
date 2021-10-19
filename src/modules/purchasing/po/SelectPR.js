import React, { useContext, useEffect, useState } from "react";
import { Button, Checkbox, Input, Table } from "antd";
import Search from "../../../components/Search";
import { useFetch } from "../../../include/js/customHooks";
import { convertDigit } from "../../../include/js/main_config";
import { POContext } from "./POFormDisplay";
import { ClearOutlined } from "@ant-design/icons";
const apiGetPRItems = `/purchase/po/pr/pr_detail`;
const initialSearch = {
  item: null,
  vendor: null,
  pr: null,
  remark: null,
};
const SelectPR = (props) => {
  const [state, setState] = useState({
    loading: false,
    data: [],
  });
  const [search, setSearch] = useState(initialSearch);
  const {
    // control,
    poState: { pr_selected },
    onSelect,
    po_id,
  } = useContext(POContext);
  const {
    data: prItems,
    error: getPRItemsError,
    loading: getPRItemsLoading,
  } = useFetch(`${apiGetPRItems}/${po_id !== "new" ? po_id : 0}`);

  console.log("PR:", prItems);

  const onSearch = (searchData) => {
    console.log(searchData);
    setSearch((prev) => ({ ...prev, ...searchData }));
  };
  const clearSearch = () => setSearch(initialSearch);
  console.log("search", search);

  useEffect(() => {
    setState((prev) => ({ ...prev, data: prItems }));
  }, [prItems]);

  useEffect(() => {
    let searchResult = prItems;
    // if (search?.item) {
    //   searchResult = searchResult?.filter(
    //     (obj) => obj?.item_no_name?.indexOf(search?.item) >= 0
    //   );
    // }
    if (search?.item) {
      searchResult = searchResult?.filter(
        (obj) => obj?.item_no_name?.indexOf(search?.item) >= 0
      );
    }
    if (search?.vendor) {
      searchResult = searchResult?.filter(
        (obj) => obj?.vendor_no_name?.indexOf(search?.vendor) >= 0
      );
    }
    if (search?.pr) {
      searchResult = searchResult?.filter(
        (obj) => obj?.pr_no?.indexOf(search?.pr) >= 0
      );
    }
    if (search?.remark) {
      searchResult = searchResult?.filter(
        (obj) => obj?.po_detail_remark?.indexOf(search?.remark) >= 0
      );
    }
    setState((prev) => ({ ...prev, data: searchResult }));
  }, [search, prItems]);

  return (
    <>
      <div className="w-100">
        <Button
          style={{ float: "right" }}
          className="primary"
          onClick={clearSearch}
          icon={<ClearOutlined />}
        >
          Clear Search
        </Button>
      </div>
      <Table
        bordered
        rowKey="id"
        size="small"
        rowClassName="row-table-detail"
        loading={getPRItemsLoading}
        columns={prItemsColumns({ onSelect, pr_selected, search, onSearch })}
        dataSource={state?.data || []}
        pagination={{ pageSize: 40 }}
      />
    </>
  );
};

export default React.memo(SelectPR);

const prItemsColumns = ({ onSelect, pr_selected, search, onSearch }) => [
  {
    title: (
      <div className="text-center">
        <b></b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "pr_detail_id",
    render: (id, row, index) => (
      <Checkbox
        checked={
          pr_selected?.find(({ pr_detail_id }) => pr_detail_id === id)
            ? true
            : false
        }
        onChange={(e) => onSelect({ checked: e.target.checked, data: row })}
      />
    ),
  },
  {
    title: (
      <Search
        placeholder="Item Code / Description"
        searchValue={search?.item}
        onSearch={(val) => onSearch({ item: val })}
      />
    ),
    align: "left",
    width: "25%",
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Quantity</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "po_detail_qty",
    render: (val) => convertDigit(val, 6) || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>UOM</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "uom_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <Search
        placeholder="Vendor"
        searchValue={search?.vendor}
        onSearch={(val) => onSearch({ vendor: val })}
      />
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "15%",
    dataIndex: "vendor_no_name",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Due Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "po_detail_due_date",
    render: (val) => val || "-",
  },
  {
    title: (
      <Search
        placeholder="PR No."
        searchValue={search?.pr}
        onSearch={(val) => onSearch({ pr: val })}
      />
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "pr_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <Search
        placeholder="Remark"
        searchValue={search?.remark}
        onSearch={(val) => onSearch({ remark: val })}
      />
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "po_detail_remark",
    ellipsis: true,
    render: (val) => val || "-",
  },
];
