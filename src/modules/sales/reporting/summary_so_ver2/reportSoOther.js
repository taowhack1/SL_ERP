/** @format */

import { Col, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { convertDigit } from "../../../../include/js/main_config";
import SearchTableSO from "./SearchTableSO";

const ReportSoOther = () => {
  const columns = [
    {
      title: "SO No.",
      dataIndex: "so_no",
      width: "5%",
      align: "left",
      ellipsis: false,
    },
    {
      title: "Order Date",
      dataIndex: "so_order_date",
      width: "5%",
      align: "center",
      ellipsis: false,
    },
    {
      title: "Delivery Date",
      dataIndex: "tg_so_delivery_date",
      width: "5%",
      align: "left",
      ellipsis: false,
    },
    {
      title: "Customer Name",
      dataIndex: "customer_no_name",
      width: "15%",
      align: "left",
      ellipsis: false,
    },
    {
      title: "Sale OEM",
      dataIndex: "so_sales_oem",
      width: "5%",
      align: "left",
      ellipsis: false,
    },
    {
      title: "Description",
      dataIndex: "so_description",
      width: "15%",
      align: "left",
      ellipsis: true,
    },
    {
      title: "Quantity / Pcs.",
      dataIndex: "sum_so_detail_qty",
      width: "5%",
      align: "right",
      ellipsis: false,
      render: (val) => convertDigit(val ? val : 0, 4),
    },
    {
      title: "Value (Ex Vat)",
      dataIndex: "tg_so_total_amount",
      width: "10%",
      align: "right",
      ellipsis: false,
      render: (val) => convertDigit(val ? val : 0, 2),
    },
  ];

  const [mainSoOther, setmainSoOther] = useState({
    stateData: { date_start: null, date_end: null, sale_oem: null },
    loading: false,
    page: null,
    listDataSoOther: [],
  });
  const propsData = {
    searchPage: "Other",
    mainSoOther,
    setmainSoOther,
  };
  return (
    <>
      <Row className='row-tab-margin-sm'>
        <Col span={24}>
          <Table
            bordered
            size={"small"}
            title={() => <SearchTableSO data={propsData} />}
            columns={columns}
            dataSource={mainSoOther?.listDataSoOther}
            summary={(pageData) => {
              let totalBorrow = 0;
              //let totalRepayment = 0;

              pageData.forEach(({ tg_so_total_amount }) => {
                totalBorrow += tg_so_total_amount;
                //totalRepayment += repayment;
              });
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={5}></Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text strong>Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell></Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text strong>
                        {convertDigit(totalBorrow ? totalBorrow : 0, 2)}
                      </Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}></Table>
        </Col>
      </Row>
    </>
  );
};

export default ReportSoOther;
