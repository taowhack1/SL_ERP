import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getSatisfication } from "../../../../actions/sales/satisficationActions";
import MainLayout from "../../../../components/MainLayout";
import { sortData } from "../../../../include/js/function_main";
const columns = [
  {
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    ellipsis: false,
    render: (val) => val + 1,
  },
  {
    title: "Item Category",
    dataIndex: "category_name",
    align: "left",
    ellipsis: true,
  },
  {
    title: "Number of Subject.",
    dataIndex: "npr_satisfaction_spec_detail",
    width: "15%",
    align: "right",
    ellipsis: false,
    render: (val) => val.length,
  },
];
const SatisficationCategoryList = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState();
  const history = useHistory();
  const layoutConfig = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: ["Sales", "Master", "Satisfication"],
    search: true,
    create: "",
    buttonAction: [],
    create: "/sales/master/satisfication/create",
    discard: "",
    onCancel: () => {
      console.log("Cancel");
    },
    onSearch: (w) => {
      const text = w.toUpperCase();
    },
  };
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const resp = await getSatisfication();
      setState(sortData(resp.data));
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <>
      <MainLayout {...layoutConfig}>
        <Table
          size="small"
          bordered
          loading={loading}
          columns={columns}
          dataSource={state}
          rowKey="id"
          onRow={(record) => ({
            onClick: () =>
              history.push(
                `/sales/master/satisfication/edit/${record.category_id}`
              ),
          })}
          pagination={{ pageSize: 20 }}
        />
      </MainLayout>
    </>
  );
};

export default SatisficationCategoryList;
