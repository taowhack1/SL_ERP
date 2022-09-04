import { DeleteOutlined } from '@ant-design/icons'
import { InputNumber } from 'antd'
import DatePicker from 'antd/es/date-picker'
import numeral from 'numeral'
import React, { useState } from 'react'
import CustomTable from '../../../../components/CustomTable'
import moment from 'moment'

const defaultNewRow = {
    index: 0,
    date: null,
    dl: 0,
    manHrs: 0
}
const DLForm = () => {
    const [state, setState] = useState([defaultNewRow])

    const addRow = () => {
        setState(prev => [...prev, { ...defaultNewRow, index: state?.length }])
    }

    const setVal = (index, data) => {
        setState(state.map(obj => obj.index === index ? ({ ...obj, ...data }) : obj))
    }
    return (
        <div id="form" className="w-100">
            <div className="text-left w-100 mb-2">
                <h3>บันทึกข้อมูล DL</h3>
            </div>
            <CustomTable

                rowKey="id"
                rowClassName="row-table-detail"
                pageSize={20}
                focusLastPage={true}
                columns={columns2(setVal)}
                dataSource={state}
                readOnly={false}
                onAdd={addRow}
                pagination={false}
            />
        </div>
    )
}

export default React.memo(DLForm)


const columns2 = (setVal) => [
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
        width: "3%",
        render: (val, _, index) => index + 1,
    },
    {
        className: "tb-col-sm",
        dataIndex: "date",
        key: "date",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>Date</b>
            </div>
        ),
        width: "27%",
        render: (val, _, index) => {

            return <DatePicker className='w-100 text-center' placeholder='ระบุวันที่' format={"DD/MM/YYYY"} value={val ? moment(val, "DD/MM/YYYY") : null}
                onChange={(data) => {
                    data
                        ? setVal(index, {
                            date: data.format("DD/MM/YYYY"),
                        })
                        : setVal(index, {
                            date: null,
                        });
                }} />
        },
    },
    {
        className: "tb-col-sm",
        dataIndex: "manHrs",
        key: "manHrs",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>Man Hour.(นาที)</b>
            </div>
        ),
        width: "32.5%",
        render: (val, _, index) => {

            return <InputNumber className='w-100' min={0} placeholder="ระบุเวลา ( นาที )" value={val} onChange={val => setVal(index, { manHrs: val })} />
        },
    },
    {
        className: "tb-col-sm",
        dataIndex: "dl",
        key: "dl",
        ellipsis: false,
        align: "center",
        title: (
            <div className="text-center">
                <b>DL</b>
            </div>
        ),
        width: "32.5%",
        render: (val, _, index) => {

            return <InputNumber className='w-100' min={0} placeholder="DL" value={val} onChange={val => setVal(index, { dl: val })} />
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
        width: "5%",
        render: (val, _, index) => {

            return <DeleteOutlined className='warning pointer' />
        },
    },
];