import { DeleteOutlined } from '@ant-design/icons'
import { InputNumber, TimePicker } from 'antd'
import DatePicker from 'antd/es/date-picker'
import numeral from 'numeral'
import React, { useState } from 'react'
import CustomTable from '../../../../components/CustomTable'
import moment from 'moment'
import { useEffect } from 'react'

const defaultNewRow = {
    index: 0,
    date: null,
    dl: 0,
    manHrs: 0
}
const DLForm = ({ dl, setDLData }) => {
    const [state, setState] = useState([defaultNewRow])

    const addRow = () => {
        setState(prev => [...prev, defaultNewRow])
    }
    const deleteRow = (index) => {
        console.log("deleteRow", index)
        setState(state?.splice(index, 1))
    }



    const setVal = (index, data) => {
        setState(state.map((obj, index1) => index1 === index ? ({ ...obj, ...data }) : obj))
    }

    const onSave = () => {
        setDLData("set_dl_detail", state)
    }

    useEffect(() => {
        if (dl?.data?.length) {
            setState(dl?.data)
        } else {
            if (dl?.so_detail_id) {
                setState([defaultNewRow])
            } else {
                setState([])
            }
        }
    }, [dl?.data])
    console.log("Form ! dl", dl)
    console.log("state", state)
    return (
        <div id="form" className="w-100">
            <div className="text-left w-100 mb-2">
                <h3>บันทึกข้อมูล DL</h3>
            </div>
            <CustomTable
                // rowKey=""
                rowClassName="row-table-detail"
                pageSize={20}
                focusLastPage={true}
                columns={columns2(setVal, deleteRow)}
                dataSource={dl?.so_detail_id ? state : []}
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
        dataIndex: "index",
        key: "no",
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

            return <InputNumber className='w-100' min={0} placeholder="DL" value={val} onChange={val => setVal(index, { dl_cost_detail_wage: val })} />
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