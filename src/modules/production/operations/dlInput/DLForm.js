import { DeleteOutlined } from '@ant-design/icons'
import { Button, InputNumber, TimePicker } from 'antd'
import DatePicker from 'antd/es/date-picker'
import numeral from 'numeral'
import React, { useState } from 'react'
import CustomTable from '../../../../components/CustomTable'
import moment from 'moment'
import { useEffect } from 'react'
import { getNumberFormat } from '../../../../include/js/main_config'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useSelector } from 'react-redux'

const defaultNewRow = {
    dl_cost_detail_id: 0,
    dl_cost_detail_date: null,
    dl_cost_detail_time: null,
    dl_cost_detail_wage: null,
    dl_cost_detail_worker: null
}
const DLForm = ({ dl, setDLData }) => {
    const { user_name } = useSelector(state => state?.auth?.authData) || {}
    const [state, setState] = useState({
        loading: false,
        data: [defaultNewRow]
    })

    const addRow = () => {
        setState(prev => ({ ...prev, data: [...prev.data, { ...defaultNewRow, dl_cost_detail_id: Math.ceil((Math.random(10) * 1000) / Math.random(10)) }] }))
    }
    const deleteRow = (index2) => {
        console.log("deleteRow", index2)
        setState(prev => ({ ...prev, data: prev.data.filter((obj, index) => index !== index2) }))
    }



    const setVal = (index, data) => {
        setState(prev => ({ ...prev, data: prev.data.map((obj, index1) => index1 === index ? ({ ...obj, ...data }) : obj) }))
    }

    const onSave = async () => {
        console.log("save", state)
        setState((prev) => ({ ...prev, loading: true }));
        const saveObj = {
            so_id: dl?.so_id,
            so_detail_id: dl?.so_detail_id,
            item_id: dl?.item_id,
            customer_id: dl?.customer_id,
            user_name: user_name,
            commit: 1,
            dl_cost_detail: state?.data || []
        }
        if (dl?.dl_cost_id) {

            await axios
                .put(
                    `/production/dl_cost/${dl?.dl_cost_id}`, [saveObj]
                )
                .then((resp) => {
                    console.log("getDLData", resp);
                    if (resp?.data[0]?.success) {
                        Swal.fire({
                            title: "บันทึกข้อมูลเรียบร้อยแล้ว.",
                            icon: "success",
                            confirmButtonText: `ตกลง`,
                        }).then((result) => {

                        });
                    } else {
                        Swal.fire({
                            title: "ไม่สามารถบันทึกข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ.",
                            icon: "warning",
                            confirmButtonText: `ตกลง`,
                        }).then((result) => {
                        });
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                    Swal.fire({
                        title: "ไม่สามารถบันทึกข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ.",
                        icon: "warning",
                        confirmButtonText: `ตกลง`,
                    }).then((result) => {
                    });
                });

            setState((prev) => ({ ...prev, loading: false }));
        } else {
            await axios
                .post(
                    `/production/dl_cost`, [saveObj]
                )
                .then((resp) => {
                    console.log("getDLData", resp);
                    if (resp?.data[0]?.success) {
                        Swal.fire({
                            title: "บันทึกข้อมูลเรียบร้อยแล้ว.",
                            icon: "success",
                            confirmButtonText: `ตกลง`,
                        }).then((result) => {
                            setDLData('set_dl_data', resp?.data[0])
                        });
                    } else {
                        Swal.fire({
                            title: "ไม่สามารถบันทึกข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ.",
                            icon: "warning",
                            confirmButtonText: `ตกลง`,
                        }).then((result) => {
                        });
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                    Swal.fire({
                        title: "ไม่สามารถบันทึกข้อมูลได้ กรุณาติดต่อผู้ดูแลระบบ.",
                        icon: "warning",
                        confirmButtonText: `ตกลง`,
                    }).then((result) => {
                    });
                });

            setState((prev) => ({ ...prev, loading: false }));
        }

    }

    const getDLData = async (dl_cost_id = false) => { //0000221
        setState((prev) => ({ ...prev, loading: true }));
        await axios
            .get(
                `/production/dl_cost/${dl_cost_id}`
            )
            .then((resp) => {
                console.log("getDLData", resp);
                if (resp?.data?.length > 0) {
                    setState((prev) => ({
                        ...prev,
                        loading: false,
                        data: resp?.data[0].dl_cost_detail || [defaultNewRow],
                    }));
                }
            })
            .catch((error) => {
                console.log("error", error);
                setState((prev) => ({ ...prev, loading: false }));
            });
    }

    useEffect(() => {
        if (dl?.dl_cost_id) {
            getDLData(dl?.dl_cost_id)
        } else {
            setState(prev => ({ ...prev, data: [defaultNewRow] }))
        }
    }, [dl?.so_detail_id, dl?.dl_cost_id])

    console.log("Form ! dl", dl)
    console.log("state", state)
    return (
        <div id="form" className="w-100">
            <div className="w-100 mb-2 d-flex flex-row">
                <div className="text-left mr-3">
                    <h3>บันทึกข้อมูล DL</h3>
                </div>
                <div>
                    <Button type="primary" onClick={() => onSave()} disabled={dl?.so_detail_id ? false : true}>บันทึกข้อมูล</Button>
                </div>
            </div>
            <CustomTable
                rowKey="dl_cost_detail_id"
                rowClassName="row-table-detail"
                pageSize={20}
                focusLastPage={true}
                columns={columns2(setVal, deleteRow)}
                dataSource={dl?.so_detail_id ? state?.data : []}
                readOnly={false}
                onAdd={dl?.so_detail_id ? addRow : false}
                pagination={false}
            />
        </div>
    )
}

export default React.memo(DLForm)


const columns2 = (setVal, deleteRow) => [
    {
        className: "tb-col-sm",
        dataIndex: "dl_cost_detail_id",
        key: "dl_cost_detail_id",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>No.</b>
            </div>
        ),
        width: "5%",
        render: (val, _, index) => index + 1,
    },
    {
        className: "tb-col-sm",
        dataIndex: "dl_cost_detail_date",
        key: "dl_cost_detail_date",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>Date</b>
            </div>
        ),
        width: "23%",
        render: (val, _, index) => {

            return <DatePicker className='w-100 text-center' placeholder='ระบุวันที่' format={"DD/MM/YYYY"} value={val ? moment(val, "DD/MM/YYYY") : null}
                onChange={(data) => {
                    data
                        ? setVal(index, {
                            dl_cost_detail_date: data.format("DD/MM/YYYY"),
                        })
                        : setVal(index, {
                            dl_cost_detail_date: null,
                        });
                }} />
        },
    },
    {
        className: "tb-col-sm",
        dataIndex: "dl_cost_detail_worker",
        key: "dl_cost_detail_worker",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>Worker</b>
            </div>
        ),
        width: "23%",
        render: (val, _, index) => {

            return <InputNumber className='w-100' min={0} placeholder="ระบุจำนวนคน" value={val} onChange={val => setVal(index, { dl_cost_detail_worker: val })} />
        },
    },
    {
        className: "tb-col-sm",
        dataIndex: "dl_cost_detail_time",
        key: "dl_cost_detail_time",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>Man Hour.(ชั่วโมง | นาที)</b>
            </div>
        ),
        width: "23%",
        render: (val, _, index) => {
            return <TimePicker
                className='full-width'
                format={"HH:mm"}
                showNow={false}
                minuteStep={15}
                name={"dl_cost_detail_time"}
                style={{ width: "150px" }}
                placeholder='00:00'
                required
                value={
                    val ? moment(val, "HH:mm:ss") : ""
                }
                onChange={(data) => {
                    const time = moment(data, "HH:mm").format("HH:mm:ss");
                    console.log(time);
                    setVal(index, { dl_cost_detail_time: time })
                }}
            />
            // return <InputNumber className='w-100' min={0} placeholder="ระบุเวลา ( นาที )" value={val} onChange={val => setVal(index, { dl_cost_detail_worker: val })} />
        },
    },
    {
        className: "tb-col-sm",
        dataIndex: "dl_cost_detail_wage",
        key: "dl_cost_detail_wage",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>DL</b>
            </div>
        ),
        width: "23%",
        render: (val, _, index) => {

            return <InputNumber {...getNumberFormat(2)} className='w-100' min={0} placeholder="DL" value={val} onChange={val => setVal(index, { dl_cost_detail_wage: val })} />
        },
    },
    {
        className: "tb-col-sm",
        dataIndex: "index",
        key: "index",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>ลบ</b>
            </div>
        ),
        width: "6%",
        render: (val, _, index) => {

            return <DeleteOutlined className='warning pointer' onClick={() => deleteRow(index)} />
        },
    },
];