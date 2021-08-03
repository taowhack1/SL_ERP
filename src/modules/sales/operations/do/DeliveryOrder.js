/** @format */

import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import useKeepLogs from "../../../logs/useKeepLogs";
import { Table, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Search from "../../../../components/Search";
import { getDO, getDRRefList } from "../../../../actions/sales/doActions";
import { EllipsisOutlined, SearchOutlined } from "@ant-design/icons";
import { getStatusByName } from "../../../../include/js/function_main";
const columnsDR = [
  {
    title: (
      <div className="text-center">
        <Text strong>ใบร้องขอให้ส่งของ ( DR )</Text>
      </div>
    ),
    className: "col-sm bg-tb-secondary",
    children: [
      {
        title: "No.",
        align: "center",
        dataIndex: "id",
        width: "5%",
        className: "col-sm",
        render: (val, record, index) => index + 1,
      },
      {
        title: "DR No.",
        align: "center",
        dataIndex: "dr_no",
        className: "col-sm",
        // width: "15%",
      },
      {
        title: "รหัสลูกค้า",
        align: "center",
        dataIndex: "customer_no",
        className: "col-sm",
        // width: "15%",
      },
      {
        title: "วัน/เวลา ที่ต้องถึงลูกค้า",
        align: "center",
        className: "col-sm",
        // width: "15%",
        render: (_, row) => `${row.dr_delivery_date} ${row.dr_delivery_time}`,
      },
    ],
  },
];
const columnsDo = [
  {
    title: (
      <div className="text-center">
        <Text strong>ใบส่งของ ( DO )</Text>
      </div>
    ),
    className: "col-sm bg-tb-primary",
    children: [
      {
        title: (
          <div className="text-center">
            <Text strong>No.</Text>
          </div>
        ),
        width: "5%",
        className: "col-sm",
        align: "center",
        render: (_, row, index) => index + 1,
      },
      {
        title: (
          <div className="text-center">
            <Text strong>DO No.</Text>
          </div>
        ),
        width: "10%",
        dataIndex: "do_no",
        className: "col-sm",
        align: "center",
        render: (val) => val || "-",
      },
      {
        title: (
          <div className="text-center">
            <Text strong>ชื่อลูกค้า</Text>
          </div>
        ),
        // width: "10%",
        dataIndex: "customer_no_name",
        className: "col-sm",
        align: "left",
        render: (val) => val || "-",
      },
      {
        title: (
          <div className="text-center">
            <Text strong>วัน/เวลา ที่ออกรถ</Text>
          </div>
        ),
        // width: "10%",
        dataIndex: "do_delivery_date",
        className: "col-sm",
        align: "center",
        render: (_, row) => `${row.do_delivery_date} ${row.do_delivery_time}`,
      },
      {
        title: (
          <div className="text-center">
            <Text strong>สถานะ</Text>
          </div>
        ),
        width: "10%",
        dataIndex: "trans_status_name",
        className: "col-sm",
        align: "center",
        render: (val) => getStatusByName(val),
      },
      {
        title: (
          <div className="text-center">
            <Text strong>
              <EllipsisOutlined />
            </Text>
          </div>
        ),
        width: "5%",
        dataIndex: "do_id",
        className: "col-sm",
        align: "center",
        render: (val) => <SearchOutlined className="button-icon" />,
      },
    ],
  },
];
const DeliveryOrder = () => {
  const keepLog = useKeepLogs();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user_name } = useSelector((state) => state.auth.authData);
  const { loading } = useSelector((state) => state.sales);
  const [stateDR, setStateDR] = useState([]);
  const [stateDO, setStateDO] = useState([]);
  useEffect(() => {
    const getDataDR = async () => {
      const resp = await getDRRefList();
      console.log("DR List", resp.data);
      resp.success && setStateDR(resp.data);
    };
    const getDOList = async () => {
      const resp = await getDO(user_name);
      console.log("DO List", resp.data);
      resp.success && setStateDO(resp.data);
    };
    getDataDR();
    getDOList();
  }, [user_name]);

  const layoutConfig = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: ["Sales", "Operation", "Delivery Order"],
    search: false,
    create: "/sales/operation/do/create/",
    buttonAction: ["Create"],
    discard: "",
    onSearch: (w) => {
      const text = w.toUpperCase();
    },
  };

  const createDo = (record) => {
    // dispatch(get_so_by_id(record.so_id, user_name));
    const { dr_id, customer_id } = record;
    if (!dr_id) return false;
    history.push("/sales/operation/do/create/", { dr_id, customer_id });
  };

  const viewDo = (id) => {
    // dispatch(get_so_by_id(record.so_id, user_name));
    history.push("/sales/operation/do/view/" + id);
  };

  return (
    <>
      <MainLayout {...layoutConfig}>
        {loading ? (
          <DetailLoading />
        ) : (
          <>
            <Row gutter={[8, 16]}>
              <Col span={8}>
                <Col span={24} align="right">
                  <Search className="top-search" style={{ width: "50%" }} />
                </Col>
                <Table
                  size={"small"}
                  rowKey={"dr_id"}
                  columns={columnsDR}
                  bordered
                  dataSource={stateDR}
                  pagination={{
                    pageSize: 15,
                  }}
                  onRow={(record) => ({
                    onClick: (e) => {
                      createDo(record);
                    },
                  })}
                />
              </Col>
              <Col span={16}>
                <Col span={24} align="right">
                  <Search className="top-search" style={{ width: "20%" }} />
                </Col>
                <Table
                  size={"small"}
                  rowKey={"do_id"}
                  columns={columnsDo}
                  bordered
                  dataSource={stateDO}
                  pagination={{
                    pageSize: 15,
                  }}
                  onRow={(record) => ({
                    onClick: (e) => {
                      // viewDo(record);
                      if (["path", "svg", "P"].includes(e.target.tagName)) {
                        viewDo(record.do_id);
                        keepLog.keep_log_action(`Click ${record.do_no}`);
                      }
                    },
                  })}
                />
              </Col>
            </Row>
            ,
          </>
        )}
      </MainLayout>
    </>
  );
};

export default DeliveryOrder;
