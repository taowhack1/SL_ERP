import React, { memo, useState } from "react"
import { Table, Button, Popconfirm, Tag, Empty } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"
import Text from "antd/lib/typography/Text"
import { getStatusByName } from "../../../include/js/function_main"
import CustomTable from "../../../components/CustomTable"
import SOFilter from "../SOFilter" // Keep existing search functionality
import { convertDigit } from "../../../include/js/main_config"
import axios from 'axios'

// Memoized expanded row component for better performance
const ExpandedRowRender = memo(({ record, onOpen, data }) => {
    console.log("----> expandded : ", data)
    const columns = [
        {
            title: "No.",
            dataIndex: "id",
            width: "5%",
            align: "center",
            className: "tb-col-sm",
            render: (val, _, index) => index + 1,
        },
        {
            title: (
                <div className="text-center">
                    <Text>Item</Text>
                </div>
            ),
            dataIndex: "item_no_name",
            align: "left",
            ellipsis: true,
            className: "tb-col-sm",
        },
        {
            title: (
                <div className="text-center">
                    <Text>Qty.</Text>
                </div>
            ),
            dataIndex: "so_detail_qty",
            align: "right",
            width: "8%",
            className: "tb-col-sm",
            render: (val) => convertDigit(val || 0, 2),
        },
        {
            title: (
                <div className="text-center">
                    <Text>UOM</Text>
                </div>
            ),
            dataIndex: "uom_no",
            align: "left",
            width: "6%",
            className: "tb-col-sm",
        },
        {
            title: (
                <div className="text-center">
                    <Text>Unit Price</Text>
                </div>
            ),
            dataIndex: "so_detail_price",
            align: "right",
            width: "8%",
            className: "tb-col-sm",
            render: (val) => convertDigit(val || 0, 2),
        },
        {
            title: (
                <div className="text-center">
                    <Text>Total Price</Text>
                </div>
            ),
            dataIndex: "so_detail_total_price",
            align: "right",
            width: "8%",
            className: "tb-col-sm",
            render: (val) => convertDigit(val || 0, 2),
        },
        {
            title: (
                <div className="text-center">
                    <Text>ยอดค้างส่ง</Text>
                </div>
            ),
            dataIndex: "tg_so_detail_qty_delivery",
            align: "right",
            width: "8%",
            className: "tb-col-sm",
            render: (val) => convertDigit(val || 0, 2),
        },
        {
            title: (
                <div className="text-center">
                    <Text>Delivery Date</Text>
                </div>
            ),
            dataIndex: "so_detail_delivery_date",
            align: "center",
            width: "10%",
            className: "tb-col-sm",
            render: (val, row) => {
                return record?.so_production_type_id === 3 ? <Text>-</Text> : row?.button_create_dr ? <Text>{val}</Text> : ""
            },
        },
        {
            title: (
                <div className="text-center">
                    <Text>Delivery Status</Text>
                </div>
            ),
            dataIndex: "delivery_trans_status_name",
            align: "center",
            width: "15%",
            className: "tb-col-sm",
            render: (val, row) => {
                return record?.so_production_type_id === 3 ? <Text>-</Text> : row?.button_create_dr ? <Text>{val}</Text> : ""
            },
        },
        {
            title: (
                <div className="text-center">
                    <EllipsisOutlined />
                </div>
            ),
            dataIndex: "so_detail_id",
            align: "center",
            width: "8%",
            className: "tb-col-sm",
            render: (val, row) => {
                return record?.so_production_type_id === 3 ? (
                    <Text>-</Text>
                ) : row?.button_create_dr ? (
                    <Popconfirm
                        title="Do you want do create Delivery Request ?."
                        onConfirm={() => onOpen(val)}
                        className="cursor"
                    >
                        <Button size="small" className="primary">
                            Open DR
                        </Button>
                    </Popconfirm>
                ) : (
                    ""
                )
            },
        },
    ]

    console.log("1")
    return (
        <CustomTable
            columns={columns}
            dataSource={data}
            bordered
            rowKey="so_detail_id"
            pagination={false}
            rowClassName="row-table-detail"
        />
    )
})

const SalesOrdersTable = ({
    data,
    loading,
    pagination,
    onChange,
    onRowClick,
    onOpen,
    isProduction = false,
    refSearchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    error,
}) => {
    const [expandedData, setExpandedData] = useState({});

    const baseColumns = [
        {
            title: "SO No.",
            dataIndex: "so_no",
            key: "so_no",
            width: "8%",
            align: "center",
            sorter: {
                compare: (a, b) => a.so_id - b.so_id,
                multiple: 3,
            },
            // Keep existing SOFilter for table search
            ...SOFilter("so_no", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
            render: (value) => value || "-",
        },
        {
            title: "Quotation Ref.",
            dataIndex: "qn_no",
            key: "qn_no",
            width: "10%",
            align: "center",
            sorter: {
                compare: (a, b) => a.qn_id - b.qn_id,
                multiple: 3,
            },
            ...SOFilter("qn_no", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
            render: (value) => value || "-",
        },
        {
            title: "PO No.",
            dataIndex: "so_customer_po_no",
            key: "so_customer_po_no",
            width: "10%",
            align: "center",
            ...SOFilter("so_customer_po_no", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
            render: (value) => value || "-",
        },
        {
            title: "Order Date",
            dataIndex: "so_order_date",
            key: "so_order_date",
            width: "8%",
            align: "center",
            ...SOFilter("so_order_date", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
            render: (value) => value || "-",
        },
        {
            title: "Delivery Date",
            dataIndex: "tg_so_delivery_date",
            key: "tg_so_delivery_date",
            width: "8%",
            align: "center",
            ...SOFilter("tg_so_delivery_date", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
            render: (value) => value || "-",
        },
        {
            title: "Customer",
            dataIndex: "customer_no_name",
            key: "customer_no_name",
            align: "left",
            ellipsis: true,
            ...SOFilter("customer_no_name", refSearchInput, searchText, setSearchText, searchedColumn, setSearchedColumn),
            render: (value) => value || "-",
        },
        {
            title: "Salesperson",
            dataIndex: isProduction ? "so_created_by_no_name" : "so_sales_person_no_name",
            key: isProduction ? "so_created_by_no_name" : "so_sales_person_no_name",
            width: isProduction ? "15%" : "10%",
            align: "left",
            ellipsis: true,
            ...SOFilter(
                isProduction ? "so_created_by_no_name" : "so_sales_person_no_name",
                refSearchInput,
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn,
            ),
            render: (value) => value || "-",
        },
        {
            title: "Total Value",
            dataIndex: "tg_so_total_amount",
            key: "tg_so_total_amount",
            width: "10%",
            align: "right",
            sorter: {
                compare: (a, b) => a.tg_so_total_amount - b.tg_so_total_amount,
                multiple: 3,
            },
            render: (value) => convertDigit(value, 2),
        },
        {
            title: "Status",
            dataIndex: "trans_status_name",
            key: "trans_status_name",
            width: "8%",
            align: "center",
            sorter: {
                compare: (a, b) => a.tg_trans_status_id - b.tg_trans_status_id,
                multiple: 3,
            },
            ellipsis: true,
            render: (value, record, index) => {
                return (
                    <div id={`open-dr-${index}`} className="cursor" onClick={() => onOpen()}>
                        {getStatusByName(record.trans_status_name)}
                    </div>
                )
            },
        },
    ]

    // Add production status column for production type
    if (isProduction) {
        baseColumns.push({
            title: "Production Status",
            dataIndex: "so_production_status_name",
            key: "so_production_status_name",
            width: "8%",
            align: "center",
            sorter: {
                compare: (a, b) => a.so_production_status_name - b.so_production_status_name,
                multiple: 3,
            },
            ellipsis: true,
            render: (value) => {
                return (
                    <Tag color="default" className="w-100">
                        {value}
                    </Tag>
                )
            },
        })
    }

    // Show error state
    if (error) {
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <Empty description={<span>เกิดข้อผิดพลาดในการโหลดข้อมูล: {error}</span>} />
            </div>
        )
    }

    const handleExpand = async (expanded, record) => {
        if (expanded && !expandedData[record.so_no]) {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_SERVER_V2}/sales/so/detail`, {
                    params: { so_no: record.so_no },
                });

                setExpandedData((prev) => ({
                    ...prev,
                    [record.so_no]: res.data || [],
                }));

            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <Table
            onChange={onChange}
            loading={loading}
            columns={baseColumns}
            dataSource={data}
            pagination={false}
            scroll={{ y: 500 }}
            rowKey="so_id"
            size="small"
            bordered
            rowClassName="row-pointer"
            expandable={{
                expandedRowRender: (record) => <ExpandedRowRender
                    record={record}
                    onOpen={onOpen}
                    data={expandedData[record.so_no] || []}
                />,
                onExpand: handleExpand
            }}
            onRow={(record, rowIndex) => ({
                onClick: (e) => onRowClick(e, record),
            })}
            locale={{
                emptyText: loading ? "กำลังโหลดข้อมูล..." : "ไม่พบข้อมูล",
            }}
        />
    )
}

export default memo(SalesOrdersTable)
