import React from 'react'
import { Tag, Button, Popconfirm } from "antd";
import Text from "antd/lib/typography/Text";
import { getStatusByName } from '../../../include/js/function_main';
import { convertDigit } from '../../../include/js/main_config';
import { EllipsisOutlined } from "@ant-design/icons";
import CustomTable from "../../../components/CustomTable";

export const so_columns = ({
    onOpen,
    refSearchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    SOFilter
}) => [
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
            ...SOFilter(
                "so_no",
                refSearchInput,
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn
            ),
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
            ...SOFilter(
                "qn_no",
                refSearchInput,
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn
            ),
            render: (value) => value || "-",
        },
        {
            title: "PO No.",
            dataIndex: "so_customer_po_no",
            key: "so_customer_po_no",
            width: "10%",
            align: "center",
            ...SOFilter(
                "so_customer_po_no",
                refSearchInput,
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn
            ),
            render: (value) => value || "-",
        },
        {
            title: "Order Date",
            dataIndex: "so_order_date",
            key: "so_order_date",
            width: "8%",
            align: "center",
            ...SOFilter(
                "so_order_date",
                refSearchInput,
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn
            ),
            render: (value) => value || "-",
        },
        {
            title: "Delivery Date",
            dataIndex: "tg_so_delivery_date",
            key: "tg_so_delivery_date",
            width: "8%",
            align: "center",
            ...SOFilter(
                "tg_so_delivery_date",
                refSearchInput,
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn
            ),
            render: (value) => value || "-",
        },
        {
            title: "Customer",
            dataIndex: "customer_no_name",
            key: "customer_no_name",
            // width: "18%",
            align: "left",
            ...SOFilter(
                "customer_no_name",
                refSearchInput,
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn
            ),
            ellipsis: true,
            render: (value) => value || "-",
        },
        {
            title: "Salesperson",
            dataIndex: "so_sales_person_no_name",
            key: "so_sales_person_no_name",
            width: "10%",
            align: "left",
            ...SOFilter(
                "so_sales_person_no_name",
                refSearchInput,
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn
            ),
            ellipsis: true,
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
                    <div
                        id={`open-dr-${index}`}
                        className='cursor'
                        onClick={() => onOpen()}>
                        {getStatusByName(record.trans_status_name)}
                    </div>
                );
            },
        },
    ];
export const so_columns_Production = ({
    onOpen,
    refSearchInput,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
}) => [
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
            render: (value) => value || "-",
        },
        {
            title: "PO No.",
            dataIndex: "so_customer_po_no",
            key: "so_customer_po_no",
            width: "10%",
            align: "center",
            render: (value) => value || "-",
        },
        {
            title: "Order Date",
            dataIndex: "so_order_date",
            key: "so_order_date",
            width: "8%",
            align: "center",
            render: (value) => value || "-",
        },
        {
            title: "Delivery Date",
            dataIndex: "tg_so_delivery_date",
            key: "tg_so_delivery_date",
            width: "8%",
            align: "center",
            render: (value) => value || "-",
        },
        {
            title: "Customer",
            dataIndex: "customer_no_name",
            key: "customer_no_name",
            align: "left",
            ellipsis: true,
            render: (value) => value || "-",
        },
        {
            title: "Salesperson",
            dataIndex: "so_created_by_no_name",
            key: "so_created_by_no_name",
            width: "15%",
            align: "left",
            ellipsis: true,
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
                    <div
                        id={`open-dr-${index}`}
                        className='cursor'
                        onClick={() => onOpen()}>
                        {getStatusByName(record.trans_status_name)}
                    </div>
                );
            },
        },
        {
            title: "Production Status",
            dataIndex: "so_production_status_name",
            key: "so_production_status_name",
            width: "8%",
            align: "center",
            sorter: {
                compare: (a, b) =>
                    a.so_production_status_name - b.so_production_status_name,
                multiple: 3,
            },
            ellipsis: true,
            render: (value, record, index) => {
                return (
                    <Tag color='default' className='w-100'>
                        {record.so_production_status_name}
                    </Tag>
                );
            },
        },
    ];


export const expandRow = (record, index, onOpen) => {
    const columns = ({ openDR }) => [
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
                <div className='text-center'>
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
                <div className='text-center'>
                    <Text>Qty.</Text>
                </div>
            ),
            dataIndex: "so_detail_qty",
            align: "right",
            width: "8%",
            className: "tb-col-sm",
            render: (val, row) => convertDigit(val || 0, 2),
        },
        {
            title: (
                <div className='text-center'>
                    <Text>UOM</Text>
                </div>
            ),
            dataIndex: "uom_no",
            align: "left",
            width: "6%",
            className: "tb-col-sm",
            render: (val, row) => val,
        },
        {
            title: (
                <div className='text-center'>
                    <Text>Unit Price</Text>
                </div>
            ),
            dataIndex: "so_detail_price",
            align: "right",
            width: "8%",
            className: "tb-col-sm",
            render: (val, row) => convertDigit(val || 0, 2),
        },
        {
            title: (
                <div className='text-center'>
                    <Text>Total Price</Text>
                </div>
            ),
            dataIndex: "so_detail_total_price",
            align: "right",
            width: "8%",
            className: "tb-col-sm",
            render: (val, row) => convertDigit(val || 0, 2),
        },
        {
            title: (
                <div className='text-center'>
                    <Text>ยอดค้างส่ง</Text>
                </div>
            ),
            dataIndex: "tg_so_detail_qty_delivery",
            align: "right",
            width: "8%",
            className: "tb-col-sm",
            render: (val, row) => convertDigit(val || 0, 2),
        },
        {
            title: (
                <div className='text-center'>
                    <Text>Delivery Date</Text>
                </div>
            ),
            dataIndex: "so_detail_delivery_date",
            align: "center",
            width: "10%",
            className: "tb-col-sm",
            render: (val, row) => {
                return record?.so_production_type_id == 3 ? (
                    <>
                        <Text>-</Text>
                    </>
                ) : row?.button_create_dr ? (
                    <Text>{val}</Text>
                ) : (
                    ""
                );
            },
        },
        {
            title: (
                <div className='text-center'>
                    <Text>Delivery Status</Text>
                </div>
            ),
            dataIndex: "delivery_trans_status_name",
            align: "center",
            width: "15%",
            className: "tb-col-sm",
            render: (val, row) => {
                return record?.so_production_type_id == 3 ? (
                    <>
                        <Text>-</Text>
                    </>
                ) : row?.button_create_dr ? (
                    <Text>{val}</Text>
                ) : (
                    ""
                );
            },
        },
        {
            title: (
                <div className='text-center'>
                    <EllipsisOutlined />
                </div>
            ),
            dataIndex: "so_detail_id",
            align: "center",
            width: "8%",
            className: "tb-col-sm",
            render: (val, row) => {
                return record?.so_production_type_id == 3 ? (
                    <>
                        <Text>-</Text>
                    </>
                ) : row?.button_create_dr ? (
                    <Popconfirm
                        title='Do you want do create Delivery Request ?.'
                        onConfirm={() => openDR(val)}
                        className='cursor'>
                        <Button size='small' className='primary'>
                            Open DR
                        </Button>
                    </Popconfirm>
                ) : (
                    ""
                );
            },
        },
    ];
    return (
        <>
            <CustomTable
                columns={columns({ openDR: onOpen })}
                dataSource={record.so_detail}
                bordered
                rowKey={"so_detail_id"}
                pagination={false}
                rowClassName='row-table-detail'
            />
        </>
    );
};