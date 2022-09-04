import React from 'react'
import $ from 'jquery'
import { Table } from 'antd';
import numeral from 'numeral';

const SODetailTable = ({ data1, setSelectedRow }) => {

    console.log("@@@@@@")
    return (
        <Table
            bordered
            rowClassName={"row-table_detail"}
            size={"small"}
            loading={data1.loading}
            columns={columns}
            dataSource={data1.data}
            rowKey="so_detail_id"
            onRow={(row) => ({
                onClick: (e) => {
                    // console.log("row", row);
                    console.log("index", row);
                    setSelectedRow("change_so_detail", {
                        so_detail_id: row?.so_detail_id,
                        so_id: row?.so_id,
                        item_id: row?.item_id,
                        customer_id: row?.customer_id,
                        action: row?.dl_cost_id ? 'edit' : 'new'
                    })

                    // if (success) {
                    $(e.target)
                        .closest("tbody")
                        .find("tr")
                        .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");
                    // }
                },
            })}
            scroll={{
                x: 2000,
                y: 400,
            }}
            pagination={false}
        />
    )
}

const columns = [
    {
        className: "tb-col-sm",
        dataIndex: "so_no",
        key: "so_no",
        ellipsis: false,
        sorter: (a, b) => a.id - b.id,
        align: "center",
        title: <b>SO No.</b>,
        render: (val) => <div className="w-100 text-center">{val}</div>,
        width: 60,
        fixed: true,
    },
    {
        className: "tb-col-sm",
        dataIndex: "item_no_name",
        key: "item_no_name",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-left">{val}</div>,
        title: <b>Item</b>,
        width: 350,
    },
    {
        className: "tb-col-sm",
        dataIndex: "customer_name",
        key: "customer_name",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-left">{val}</div>,
        sorter: (a, b) => a.id - b.id,
        title: <b>Customer</b>,
        width: 200,
    },
    {
        className: "tb-col-sm",
        dataIndex: "so_order_date",
        key: "so_order_date",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-center">{val}</div>,
        sorter: (a, b) => a.id - b.id,
        title: <b>Order date</b>,
        width: 90,
    },
    {
        className: "tb-col-sm",
        dataIndex: "so_detail_delivery_date",
        key: "so_detail_delivery_date",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-center">{val}</div>,
        sorter: (a, b) => a.id - b.id,
        title: <b>Delivery</b>,
        width: 90,
    },
    {
        className: "tb-col-sm",
        dataIndex: "tg_dl_cost_worker",
        key: "tg_dl_cost_worker",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-center">
            {val || 0}
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: <b>Worker</b>,
        width: 60,
    },
    {
        className: "tb-col-sm",
        dataIndex: "tg_dl_cost_time",
        key: "tg_dl_cost_time",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-center">
            {val || "00:00:00"}
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: <b>Man Hours</b>,
        width: 80,
    },
    {
        className: "tb-col-sm",
        dataIndex: "tg_dl_cost_wage",
        key: "tg_dl_cost_wage",
        ellipsis: false,
        align: "center",
        render: (val) => <div className="w-100 text-right">
            {numeral(val || 0).format("#,###.##")}
        </div>,
        sorter: (a, b) => a.id - b.id,
        title: <b>DL</b>,
        width: 80,
    },
];

export default React.memo(SODetailTable)