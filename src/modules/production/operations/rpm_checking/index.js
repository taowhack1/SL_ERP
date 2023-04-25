import React from 'react'
import MainLayout from '../../../../components/MainLayout';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Table } from 'antd';
import Text from 'antd/lib/typography/Text';
import { useMemo } from 'react';

const RPMChecking = () => {
    const layoutConfig = useMemo(
        () => ({
            projectId: 10, // project ID from DB
            title: "PRODUCTION", // project name
            home: "/production", // path
            show: true, // bool show sub - tool bar
            breadcrumb: ["Production", "Operations", "Material Checking"], // [1,2,3] = 1 / 2 / 3
            search: false, // bool show search
            searchValue: null, //search string
            buttonAction: [], // button
            badgeCont: 0, //number
            step: null, // object {current:0,step:[],process_complete:bool}
            create: "", // path or "modal" and use openModal() instead
            edit: "", // object {data: any , path : "string"} or function
            discard: "", //path
            back: "", //path
            save: () => {
                console.log("save")
            }, //path if not path use "function" and use onSave instead.
            onSave: () => {

            },
            onConfirm: () => console.log("Confirm"),
            onApprove: () => console.log("Approve"),
            onReject: () => console.log("Reject"),
            onCancel: () => console.log("Cancel"),
            onSearch: (keyword) => console.log("Search Key", keyword),
            openModal: () => console.log("openModal"),
            // actionTitle: <span>Export Data</span>,
            searchBar: null,
        }),
        []
    );


    return (
        <>
            <MainLayout {...layoutConfig}>
                <Row className="search-header">
                    <Table
                        bordered
                        loading={false}
                        columns={columns1}
                        dataSource={mockupData}
                        // onChange={onChange}
                        rowKey={"item_id"}
                        expandable={{ expandedRowRender: () => console.log("expand") }}
                        onExpand={(expanded, row) => {
                            // handleExpand2(expanded, row);
                            console.log("expand")
                        }}
                        pagination={{
                            pageSize: 15,
                            pageSizeOptions: [15, 30, 50, 100],
                            showSizeChanger: true,
                        }}
                        size="small"
                    // onRow={(record, rowIndex) => {
                    //     return {
                    //         onClick: (e) => {
                    //             setRowClick(true);
                    //             $(e.target)
                    //             .closest("tbody")
                    //             .find("tr")
                    //             .removeClass("selected-row");
                    //             $(e.target).closest("tr").addClass("selected-row");
                    //         },
                    //     };
                    // }}
                    />
                </Row>
            </MainLayout>
        </>
    );
}

export default RPMChecking
const columns1 = [
    {
        title: "No.",
        dataIndex: "id",
        key: "id",
        width: "5%",
        align: "center",
        sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 2,
        },
        render: (val, rec, index) => index + 1,
    },
    {
        title: "Description",
        dataIndex: "so_no_name",
        key: "so_no_name",
        width: "95%",
        align: "left",
        sorter: {
            compare: (a, b) => a.so_id - b.so_id,
            multiple: 3,
        },
        ellipsis: true,
        render: (val) => val
    }
]

const columns = [
    {
        title: "No.",
        dataIndex: "id",
        key: "id",
        width: "5%",
        align: "center",
        sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 2,
        },
        render: (val, rec, index) => index + 1,
    },
    {
        title: "Type",
        dataIndex: "item_type_no",
        key: "item_type_no",
        width: "10%",
        align: "left",
        sorter: {
            compare: (a, b) => a.type_id - b.type_id,
            multiple: 3,
        },
        ellipsis: true,
        render: (val) => val
    },
    {
        title: "Code",
        dataIndex: "item_no",
        key: "item_no",
        width: "10%",
        align: "center",
        ellipsis: true,
    },
    {
        title: "Trade Name",
        dataIndex: "item_name",
        key: "item_name",
        width: "20%",
        align: "center",
        ellipsis: true,
    },
    {
        title: "Qty",
        dataIndex: "issue_qty",
        key: "issue_qty",
        width: "10%",
        align: "right",
        ellipsis: true,
    },
    {
        title: "UOM",
        dataIndex: "issue_qty",
        key: "issue_qty",
        width: "5%",
        align: "right",
        ellipsis: true,
    },
    {
        title: "Due date วางแผน",
        dataIndex: "pr_detail_due_date",
        key: "pr_detail_due_date",
        width: "10%",
        align: "right",
        ellipsis: true,
    },
    {
        title: "Due date จัดซื้อ",
        dataIndex: "po_detail_due_date",
        key: "po_detail_due_date",
        width: "10%",
        align: "right",
        ellipsis: true,
    },
    {
        title: "PU Remark",
        dataIndex: "pu_remark",
        key: "pu_remark",
        width: "20%",
        align: "right",
        ellipsis: true,
    },
]

const mockupData = [
    {
        id: 1,
        so_id: 1,
        so_no: '0002723',
        so_no_name: '[0002723] 1649212 GINO MCCRAY DESIRE EAU DE TOILETTE 48 ml.',
        mrp_no: 'MRP230400001',
        job_id: 'J23040001-1',
        detail: [
            {
                id: 1,
                item_no: 'C212JASA000200',
                item_name: 'Shipper CC double O Bloom Eau De Perfume Pack 12',
                issue_qty: 69,
                uom_no: 'pcs',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'รอของเข้า',
                pu_remark: ''
            },
            {
                id: 1,
                item_no: 'C102SRLA008000',
                item_name: 'Alcoh-AA',
                issue_qty: 32.55720,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'รอเข้า',
                pu_remark: 'รอราคาเรทเดือน 2'
            },
            {
                id: 1,
                item_no: 'C104SRLA003100',
                item_name: 'TS31643CO ADORE CONC',
                issue_qty: 5.62,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '30/01/2023',
                receive_status: 'มาแล้ว',
                pu_remark: ''
            },
            {
                id: 1,
                item_no: 'C102SRLA006000',
                item_name: 'Eumulgin HRE 40',
                issue_qty: 1.3,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'มีของในสต็อก',
                pu_remark: ''
            },
        ]
    },
    {
        id: 2,
        so_id: 2,
        so_no: '0002823',
        so_no_name: '[0002823] 1649113 GINO MCCRAY ADORE EAU DE TOILLETTE 48 ml.',
        mrp_no: 'MRP230400001',
        job_id: 'J23040001-1',
        detail: [
            {
                id: 1,
                item_no: 'C212JASA000200',
                item_name: 'Shipper CC double O Bloom Eau De Perfume Pack 12',
                issue_qty: 69,
                uom_no: 'pcs',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'รอของเข้า',
                pu_remark: ''
            },
            {
                id: 1,
                item_no: 'C102SRLA008000',
                item_name: 'Alcoh-AA',
                issue_qty: 32.55720,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'รอเข้า',
                pu_remark: 'รอราคาเรทเดือน 2'
            },
            {
                id: 1,
                item_no: 'C104SRLA003100',
                item_name: 'TS31643CO ADORE CONC',
                issue_qty: 5.62,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '30/01/2023',
                receive_status: 'มาแล้ว',
                pu_remark: ''
            },
            {
                id: 1,
                item_no: 'C102SRLA006000',
                item_name: 'Eumulgin HRE 40',
                issue_qty: 1.3,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'มีของในสต็อก',
                pu_remark: ''
            },
        ]
    },
    {
        id: 3,
        so_id: 3,
        so_no: '0003423',
        so_no_name: '[0003423] 1346616 SCENTIO MILK PLUS WHITENING Q10 HAND CREAM',
        mrp_no: 'MRP230400001',
        job_id: 'J23040001-1',
        detail: [
            {
                id: 1,
                item_no: 'C212JASA000200',
                item_name: 'Shipper CC double O Bloom Eau De Perfume Pack 12',
                issue_qty: 69,
                uom_no: 'pcs',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'รอของเข้า',
                pu_remark: ''
            },
            {
                id: 1,
                item_no: 'C102SRLA008000',
                item_name: 'Alcoh-AA',
                issue_qty: 32.55720,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'รอเข้า',
                pu_remark: 'รอราคาเรทเดือน 2'
            },
            {
                id: 1,
                item_no: 'C104SRLA003100',
                item_name: 'TS31643CO ADORE CONC',
                issue_qty: 5.62,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '30/01/2023',
                receive_status: 'มาแล้ว',
                pu_remark: ''
            },
            {
                id: 1,
                item_no: 'C102SRLA006000',
                item_name: 'Eumulgin HRE 40',
                issue_qty: 1.3,
                uom_no: 'Kg.',
                pr_due_date: '-',
                po_due_date: '06/02/2023',
                receive_status: 'มีของในสต็อก',
                pu_remark: ''
            },
        ]
    },
]