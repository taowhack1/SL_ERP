import React, { useEffect, useMemo, useState } from "react";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import { useSelector } from "react-redux";
import MainLayout from "../../../../components/MainLayout";
import { Button, Col, Input, Row, Table, Tabs, DatePicker } from "antd";
import axios from "axios";
import Form from "./DLForm";
import $ from 'jquery'
import numeral from "numeral";
import confirm from "antd/lib/modal/confirm";
import SODetailTable from "./SODetailTable";
import { useCallback } from "react";

const { RangePicker } = DatePicker
const xlsxHeader = [
    {
        label: "No.",
        key: "id",
    },
    {
        label: "SO No.",
        key: "so_no",
    },
    {
        label: "Description",
        key: "so_description",
    },
    {
        label: "Customer",
        key: "customer_name",
    },
    {
        label: "จำนวนชั่วโมง",
        key: "sum_tg_time_sheet_time",
    },
    {
        label: "RM",
        key: "rm_cost_avg",
    },
    {
        label: "PK",
        key: "pk_cost_avg",
    },
    {
        label: "DL",
        key: "dl_cost_avg",
    },
    {
        label: "OH",
        key: "oh_cost_avg",
    },
    {
        label: "รวมต้นทุนการผลิต",
        key: "cost_avg",
    },
    {
        label: "ยอด WIP ยกมา",
        key: "wip_cost_avg",
    },
    {
        label: "Invoice No.",
        key: "invoice_no",
    },
    {
        label: "ราคาขายไม่รวม Vat",
        key: "so_detail_total_price",
    },
    {
        label: "WIP",
        key: "wip_cost_avg",
    },
    {
        label: "กำไร/ขาดทุน",
        key: "profit_avg",
    },
];
const DLInput = () => {
    const { filter } = useSelector(
        (state) => state?.inventory?.report?.issue || {}
    );

    const [searchData, setSearchData] = useState({
        keyword: 0,
        start_date: 0,
        end_date: 0,
    });

    const [data1, setData1] = useState({
        loading: false,
        data: [],
    });

    const [dl, setDL] = useState({
        loading: false,
        so_detail_id: null,
        so_id: null,
        item_id: null,
        customer_id: null,
        dl_cost_id: null,
        action: 'new',
        data: [],
    });

    const layoutConfig = useMemo(
        () => ({
            projectId: 10, // project ID from DB
            title: "PRODUCTION", // project name
            home: "/production", // path
            show: true, // bool show sub - tool bar
            breadcrumb: ["Production", "Operations", "DL Input"], // [1,2,3] = 1 / 2 / 3
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
            actionTitle: <span>Export Data</span>,
            searchBar: null,
        }),
        [filter]
    );

    const onSearch = async () => {
        setData1((prev) => ({ ...prev, loading: true }));
        await axios
            .get(
                `/production/dl_cost/list/${searchData.keyword}&${searchData.start_date}&${searchData.end_date}`
            )
            .then((resp) => {
                console.log("resp", resp);
                setData1((prev) => ({
                    ...prev,
                    loading: false,
                    data: resp.data || [],
                }));
            })
            .catch((error) => {
                console.log("error", error);
                setData1((prev) => ({ ...prev, loading: false }));
            });
    };

    const onChangeSearch = (obj) => {
        setSearchData(prev => ({ ...prev, ...obj }))
    }

    const setDLData = (action = "", obj = {}) => {
        let actionComplete = false
        switch (action) {
            case "change_so_detail":
                // let confirmAction = false
                // if (obj?.so_detail_id != dl?.so_detail_id && dl?.so_detail_id != null) {
                // if (confirm({ title: 'คุณต้องการเปลี่ยนรายการใช่หรือไม่ ?', okText: "ใช่", cancelText: 'ไม่ใช่' })) {
                setDL(prev => ({ ...prev, ...obj, data: [] }))
                //     actionComplete = true
                // }
                // }
                break;
            case "add_dl_row":
                setDL(prev => ({ ...prev, data: [...prev.data, obj] }))
                actionComplete = true
                break;
            case "remove_dl_row":
                setDL(prev => ({ ...prev, data: prev.data.filter(obj1 => obj1.id !== obj?.id) }))
                actionComplete = true
                break;
            case "set_dl_data":
                setDL(prev => ({ ...prev, ...obj, action: 'edit' }))
                actionComplete = true
                break;
            case "set_dl_loading":
                setDL(prev => ({ ...prev, loading: obj?.loading || false }))
                break;
            case "reset_dl":
                setDL({
                    loading: false,
                    so_detail_id: null,
                    so_id: null,
                    item_id: null,
                    customer_id: null,
                    action: 'new',
                    data: [],
                })
                actionComplete = true
                break;
            default:
                break;
        }
        return actionComplete
    }


    useEffect(() => {
        const getData = async (dl_cost_id) => {
            setDLData("set_dl_loading", { loading: true });
            return await axios
                .get(
                    `/production/dl_cost/${dl_cost_id}`
                )
                .then((resp) => {
                    console.log("resp", resp);
                    if (resp?.length) {
                        setDLData("set_dl_data", { data: resp[0]?.dl_cost_detail });
                    } else {
                        setDLData("set_dl_loading", { loading: false });
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                    setDLData("set_dl_loading", { loading: false });
                });
        };

        if (dl?.so_detail_id && dl?.dl_cost_id) {
            getData(dl?.dl_cost_id);
        }
    }, [dl?.so_detail_id]);

    const setSelectedRow = useCallback((action, data) => {
        setDLData(action, data)
    }, [data1])

    console.log("dl", dl)
    return (
        <>
            <MainLayout {...layoutConfig}>
                <div className="search-table mt-2 pb-2">
                    <Row className="search-header">
                        <Text className="search-title" strong>
                            <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
                            Search Tool.
                        </Text>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <div className="d-flex flex-row space-around w-100">
                                <div className="mr-3">
                                    <Text strong className="mr-1">{`SO No. :`}</Text>
                                    <Input placeholder={"SO No. / Description / Customer"} style={{ width: '250px' }} onBlur={(e) => onChangeSearch({ keyword: e.target.value || 0 })} />
                                </div>
                                <div>
                                    <Text strong className="mr-1">{`วันที่ :`}</Text>
                                    <RangePicker
                                        style={{ width: 350 }}
                                        format={"DD/MM/YYYY"}
                                        onChange={(data) => {
                                            console.log("data", data)
                                            data
                                                ? onChangeSearch({
                                                    date_start: data[0].format("YYYY-MM-DD"),
                                                    date_end: data[1].format("YYYY-MM-DD"),
                                                })
                                                : onChangeSearch({
                                                    date_start: 0,
                                                    date_end: 0,
                                                });
                                        }}
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col span={2}></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col span={24} className="text-center">
                            <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>ค้นหาข้อมูล</Button>
                        </Col>
                    </Row>

                    <Row className="mt-3 pd-2">
                        <SODetailTable {...({ data1, setSelectedRow })} />
                    </Row>
                </div>
                <div className="mt-3">
                    <Form dl={dl} setDLData={setDLData} />
                </div>
            </MainLayout>
        </>
    );
};



export default DLInput;
