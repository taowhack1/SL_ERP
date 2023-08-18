import React, { useState } from 'react'
import MainLayout from '../../../../components/MainLayout';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Input, Row, Space, Table } from 'antd';
import { useMemo } from 'react';
import SOSearchTool from './search_so';
import useSubTable from '../../../../include/js/customHooks/useSubTable';
import moment from 'moment';
import Swal from 'sweetalert2';
import $ from "jquery";


const RPMChecking = () => {
    const role = (new URLSearchParams(document.location.search))?.get('role') || null

    const [search, setSearch] = useState({
        keyword: '',
        keyword2: '',
        status: 0,
        date_start: '',
        date_end: '',
        loading: false,
        data: []
    })

    const layoutConfig = useMemo(
        () => ({
            projectId: 10, // project ID from DB
            title: "PRODUCTION", // project name
            home: "/production", // path
            show: true, // bool show sub - tool bar
            breadcrumb: ["Production", "Operations", "Material Checking"], // [1,2,3] = 1 / 2 / 3
            search: false, // bool show search
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
            onSearch: (keyword) => {
                console.log("search", keyword)
            },
            searchValue: null,
            searchBar: null,
            onConfirm: () => console.log("Confirm"),
            onApprove: () => console.log("Approve"),
            onReject: () => console.log("Reject"),
            onCancel: () => console.log("Cancel"),
            openModal: () => console.log("openModal"),
            // actionTitle: <span>Export Data</span>,
        }),
        []
    );

    const onSeachData = async (objSearch) => {
        console.log("objSearch", objSearch)
        setSearch({
            loading: true,
            ...objSearch,
            data: []
        })

        const data = await getData(objSearch)

        console.log("data", data)
        setSearch(prev => ({
            ...prev,
            loading: false,
            data: data
        }))
    }

    const getData = (objSearch) => {
        return new Promise((res, rej) => {
            console.log("getData", objSearch)
            let data = mockupData

            if (objSearch?.keyword2 != '') {
                data = data?.filter(so => so?.detail?.some(item => item.item_no.indexOf(objSearch?.keyword2) >= 0))
            }

            if (objSearch?.keyword != '') {
                data = data?.filter(so => so.so_no_name_mrp_no.indexOf(objSearch?.keyword) >= 0)
            }

            if (objSearch?.status != '0') {
                data = data?.filter(so => so.so_status_id == objSearch?.status)
            }

            if (objSearch?.date_state != '' && objSearch?.date_end != '') {
                data = data?.filter(so =>
                    moment(so.so_delivery_date, 'DD/MM/YYYY').format('X') >= moment(objSearch.date_start, 'DD/MM/YYYY').format('X')
                    &&
                    moment(so.so_delivery_date, 'DD/MM/YYYY').format('X') <= moment(objSearch.date_end, 'DD/MM/YYYY').format('X')
                )
            }

            setTimeout(() => {
                res(data)
            }, 1000)

        }).catch(error => {
            console.log("error", error)
        })
    }

    const getDataDetail = ({ so_mrp_id = null }) => {
        if (!so_mrp_id) {
            return {
                success: true, data: {
                    detail: []
                }
            }
        }

        return {
            success: true,
            data: {
                detail: search?.data?.find((obj) => obj.so_mrp_id == so_mrp_id)?.detail || []
            }
        }
    }

    const { expandedRowRender, handleExpand } = useSubTable({
        columns: () => column_material({ role }),
        fetchDataFunction: getDataDetail,
        rowKey: "so_mrp_id",
        dataKey: "detail", //* detail key
    });

    const handleExpand2 = (expanded, row) => {
        handleExpand(expanded, row, {
            so_mrp_id: row.so_mrp_id,
        });
    };

    const onSave = ({ so_mrp_id = null }) => {
        Swal.fire({
            title: "บันทึกข้อมูลเรียบร้อยแล้ว.",
            icon: "success",
            confirmButtonText: `ตกลง`,
        }).then((result) => {
            console.log("then")
        });
    }

    //*--------------------------------------------

    let head_column = []

    let pu_column = [
        {
            title: "",
            dataIndex: "so_mrp_id",
            key: "so_mrp_id",
            width: "5%",
            align: "center",
            ellipsis: true,
            render: (val) => <div className="text-right">
                <Button type="default" onClick={() => onSave({ val })}>บันทึก</Button>
            </div>
        }
    ]

    if (role !== 'pu') {
        pu_column = []
    }

    head_column = [...columns1({ onSave }), ...pu_column]

    //*--------------------------------------------

    return (
        <>
            <MainLayout {...layoutConfig}>
                <Row className='row-tab-margin-lg'>
                    <Col span={24}>
                        <Table
                            title={() => <SOSearchTool onSearch={onSeachData} />}
                            loading={search?.loading}
                            columns={head_column}
                            dataSource={search?.data}
                            bordered
                            size='small'
                            rowKey='so_mrp_id'
                            onRow={(record) => {
                            }}
                            expandable={{ expandedRowRender: expandedRowRender }}
                            onExpand={(expanded, row) => {
                                handleExpand2(expanded, row);
                                console.log("expand")
                            }}
                        />
                    </Col>
                </Row>
            </MainLayout>
        </>
    );
}

export default RPMChecking

const columns1 = ({ onSave }) => [
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
        dataIndex: "so_no_name_mrp_no",
        key: "so_no_name_mrp_no",
        width: "80%",
        align: "left",
        sorter: {
            compare: (a, b) => a.so_id - b.so_id,
            multiple: 3,
        },
        ellipsis: true,
        render: (val) => val
    },
    {
        title: "Delivery Date",
        dataIndex: "so_delivery_date",
        key: "so_delivery_date",
        width: "10%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        sorter: {
            compare: (a, b) => moment(a.so_delivery_date, 'DD/MM/YYYY').format('X') - moment(b.so_delivery_date, 'DD/MM/YYYY').format('X'),
            // multiple: 3,
        },
        ellipsis: true,
        render: (val) => val
    },
]

const column_material = ({ role }) => [
    {
        title: "Type",
        dataIndex: "item_type_no",
        key: "item_type_no",
        width: "5%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        sorter: {
            compare: (a, b) => a.item_type_id - b.item_type_id,
            multiple: 3,
        },
        ellipsis: true,
        render: (val) => <div className='text-center'>
            <span>{val}</span>
        </div>,
    },
    {
        title: "Code",
        dataIndex: "item_no",
        key: "item_no",
        width: "10%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        sorter: {
            compare: (a, b) => a.id - b.id,
            multiple: 3,
        },
        render: (val) => <div className='text-center'>
            <span>{val}</span>
        </div>,
    },
    {
        title: "Trade Name",
        dataIndex: "item_name",
        key: "item_name",
        width: "20%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        render: (val) => <div className='text-left'>
            <span>{val}</span>
        </div>,
    },
    {
        title: "Qty",
        dataIndex: "issue_qty",
        key: "issue_qty",
        width: "8%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        sorter: {
            compare: (a, b) => a.issue_qty - b.issue_qty,
            multiple: 3,
        },
        render: (val) => <div className='text-right'>
            <span>{val}</span>
        </div>,
    },
    {
        title: "UOM",
        dataIndex: "uom_no",
        key: "uom_no",
        width: "5%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        render: (val) => <div className='text-center'>
            <span>{val}</span>
        </div>,
    },
    {
        title: "Due date วางแผน",
        dataIndex: "pr_detail_due_date",
        key: "pr_detail_due_date",
        width: "10%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        sorter: {
            compare: (a, b) => moment(a.pr_detail_due_date, 'DD/MM/YYYY').format('X') - moment(b.pr_detail_due_date, 'DD/MM/YYYY').format('X'),
            multiple: 2,
        },
        render: (val) => <div className='text-center'>
            <span>{val}</span>
        </div>,
    },
    {
        title: "PO",
        dataIndex: "uom_no",
        key: "uom_no",
        width: "5%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        render: (val) => <div className='text-center'>
            <span>{val}</span>
        </div>,
    },
    {
        title: "Due date จัดซื้อ",
        dataIndex: "po_detail_due_date",
        key: "po_detail_due_date",
        width: "10%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        sorter: {
            compare: (a, b) => moment(a.po_detail_due_date, 'DD/MM/YYYY').format('X') - moment(b.po_detail_due_date, 'DD/MM/YYYY').format('X'),
            multiple: 2,
        },
        render: (val) => <div className='text-center'>
            {role == 'pu' ? <DatePicker
                format={"DD/MM/YYYY"}
                className={"full-width"}
                name="po_detail_due_date"
                placeholder="Due Date"
                defaultValue={
                    val
                        ? moment(val, "DD/MM/YYYY")
                        : ""
                }
            /> : <span>{val}</span>}
        </div>,
    },
    {
        title: "สถานะรับเข้า",
        dataIndex: "receive_status",
        key: "receive_status",
        width: "10%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        sorter: {
            compare: (a, b) => a.receive_status_id - b.receive_status_id,
            // multiple: 3,
        },
        render: (val) => <div className='text-center'>
            <span>{val}</span>
        </div>,
    },
    {
        title: "PU Remark",
        dataIndex: "pu_remark",
        key: "pu_remark",
        width: "20%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        render: (val) => <div className='text-left'>
            {
                role === 'pu' ? <Input size="small" className='w-100' placeholder='หมายเหตุ' /> : <span>{val}</span>
            }
        </div>,
    },
    {
        title: "",
        dataIndex: "material_status",
        key: "material_status",
        width: "3%",
        align: "center",
        sortDirections: ['ascend', 'descend', null],
        ellipsis: true,
        render: (val) => <div className='text-center'>
            {role == 'pu' ? <Checkbox defaultChecked={val == 2 ? true : false} onChange={(e, b, c) => {
                // console.log(a, b, c)
                console.log("onchange", e, b, c)

                $(e.target).closest('tr').removeClass('active-row')
                // console.log("thisCheckbox", thisCheckbox)
            }} /> : ''}
        </div>,
    }
]

const mockupData = [
    {
        id: 1,
        so_id: 1,
        so_no: '0002723',
        so_no_name: '[0002723] 1649212 GINO MCCRAY DESIRE EAU DE TOILETTE 48 ml.',
        so_no_name_mrp_no: '[0002723] 1649212 GINO MCCRAY DESIRE EAU DE TOILETTE 48 ml. - [MRP23040001]',
        mrp_no: 'MRP230400001',
        job_id: 'J23040001-1',
        so_mrp_id: '11',
        so_status_id: 1,
        so_delivery_date: '20/04/2023',
        detail: [
            {
                id: 1,
                item_no: 'C212JASA000200',
                item_name: 'Shipper CC double O Bloom Eau De Perfume Pack 12',
                issue_qty: 69,
                uom_no: 'pcs',
                pr_detail_due_date: '05/02/2023',
                item_type_id: 2,
                item_type_no: 'PK',
                po_detail_due_date: '06/02/2023',
                receive_status_id: 1,
                receive_status: 'รอของเข้า',
                pu_remark: '',
                material_status: 1
            },
            {
                id: 2,
                item_no: 'C102SRLA008000',
                item_name: 'Alcoh-AA',
                issue_qty: 32.55720,
                uom_no: 'Kg.',
                pr_detail_due_date: '05/02/2023',
                item_type_id: 1,
                item_type_no: 'RM',
                po_detail_due_date: '06/02/2023',
                receive_status_id: 1,
                receive_status: 'รอของเข้า',
                pu_remark: 'รอราคาเรทเดือน 2',
                material_status: 1
            },
            {
                id: 3,
                item_no: 'C104SRLA003100',
                item_name: 'TS31643CO ADORE CONC',
                issue_qty: 5.62,
                uom_no: 'Kg.',
                pr_detail_due_date: '05/02/2023',
                item_type_id: 1,
                item_type_no: 'RM',
                po_detail_due_date: '30/01/2023',
                receive_status_id: 2,
                receive_status: 'มาแล้ว',
                pu_remark: '',
                material_status: 2,
                is_active: 1
            },
            {
                id: 4,
                item_no: 'C102SRLA006000',
                item_name: 'Eumulgin HRE 40',
                issue_qty: 1.3,
                uom_no: 'Kg.',
                pr_detail_due_date: '-',
                item_type_id: 1,
                item_type_no: 'RM',
                po_detail_due_date: '06/02/2023',
                receive_status_id: 3,
                receive_status: 'มีของในสต็อก',
                pu_remark: '',
                material_status: 2,
                is_active: 1
            },
        ]
    },
    {
        id: 2,
        so_id: 2,
        so_no: '0002823',
        so_no_name: '[0002823] 1649113 GINO MCCRAY ADORE EAU DE TOILLETTE 48 ml.',
        so_no_name_mrp_no: '[0002823] 1649113 GINO MCCRAY ADORE EAU DE TOILLETTE 48 ml. - [MRP23040002]',
        mrp_no: 'MRP230400001',
        job_id: 'J23040001-1',
        so_mrp_id: '12',
        so_status_id: 1,
        so_delivery_date: '25/05/2023',
        detail: [
            {
                id: 1,
                item_no: 'C212JASA000200',
                item_name: 'Shipper CC double O Bloom Eau De Perfume Pack 12',
                issue_qty: 69,
                uom_no: 'pcs',
                pr_detail_due_date: '-',
                item_type_id: 2,
                item_type_no: 'PK',
                po_detail_due_date: '06/02/2023',
                receive_status_id: 1,
                receive_status: 'รอของเข้า',
                pu_remark: '',
                material_status: 1
            },
            {
                id: 2,
                item_no: 'C102SRLA008000',
                item_name: 'Alcoh-AA',
                issue_qty: 32.55720,
                uom_no: 'Kg.',
                pr_detail_due_date: '-',
                item_type_id: 1,
                item_type_no: 'RM',
                po_detail_due_date: '06/02/2023',
                receive_status_id: 1,
                receive_status: 'รอของเข้า',
                pu_remark: 'รอราคาเรทเดือน 2',
                material_status: 1
            },
            {
                id: 3,
                item_no: 'C104SRLA003100',
                item_name: 'TS31643CO ADORE CONC',
                issue_qty: 5.62,
                uom_no: 'Kg.',
                pr_detail_due_date: '-',
                item_type_id: 1,
                item_type_no: 'RM',
                po_detail_due_date: '30/01/2023',
                receive_status_id: 2,
                receive_status: 'มาแล้ว',
                pu_remark: '',
                material_status: 2,
                is_active: 1
            }
        ]
    },
    {
        id: 3,
        so_id: 3,
        so_no: '0003423',
        so_no_name: '[0003423] 1346616 SCENTIO MILK PLUS WHITENING Q10 HAND CREAM',
        so_no_name_mrp_no: '[0003423] 1346616 SCENTIO MILK PLUS WHITENING Q10 HAND CREAM - [MRP23040003]',
        mrp_no: 'MRP230400001',
        job_id: 'J23040001-1',
        so_mrp_id: '13',
        so_status_id: 3,
        so_delivery_date: '02/05/2023',
        detail: [
            {
                id: 1,
                item_no: 'C212JASA000200',
                item_name: 'Shipper CC double O Bloom Eau De Perfume Pack 12',
                issue_qty: 69,
                uom_no: 'pcs',
                pr_detail_due_date: '-',
                item_type_id: 2,
                item_type_no: 'PK',
                po_detail_due_date: '06/02/2023',
                receive_status_id: 2,
                receive_status: 'มีของในสต็อก',
                pu_remark: '',
                material_status: 2,
                is_active: 1
            },
            {
                id: 2,
                item_no: 'C102SRLA008000',
                item_name: 'Alcoh-AA',
                issue_qty: 32.55720,
                uom_no: 'Kg.',
                pr_detail_due_date: '-',
                item_type_id: 1,
                item_type_no: 'RM',
                po_detail_due_date: '06/02/2023',
                receive_status_id: 2,
                receive_status: 'มีของในสต็อก',
                pu_remark: '',
                material_status: 2,
                is_active: 1
            }
        ]
    },
]