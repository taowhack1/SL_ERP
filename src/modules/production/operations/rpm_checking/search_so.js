import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import CustomSelect from '../../../../components/CustomSelect';
import moment from 'moment';
const { RangePicker } = DatePicker;

const SOSearchTool = ({ onSearch }) => {
    const [state, setState] = useState({
        keyword: '',
        keyword2: '',
        status: 0,
        date_start: '',
        date_end: ''
    })

    const onChange = (obj) => {
        setState(prev => ({
            ...prev,
            ...obj
        }))
    }

    return (
        <div className="search-table mb-2">
            <Row className="search-header">
                <Text className="search-title" strong>
                    <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
                    ค้นหาข้อมูล
                </Text>
            </Row>
            <Row className="col-2 row-margin-vertical">
                <Col span={2}></Col>
                <Col span={2}>
                    <Text strong>SO No. :</Text>
                </Col>
                <Col span={8}>
                    <CustomSelect
                        allowClear
                        showSearch
                        placeholder={"SO No. / Description"}
                        field_id="so_id"
                        field_name="so_no_name"
                        value={state?.keyword || ''}
                        data={mockupSO}
                        onChange={(data, option) => {
                            console.log("option", option)
                            data !== undefined
                                ? onChange({
                                    keyword: data,
                                })
                                : onChange({
                                    keyword: '',
                                })
                        }}
                    />
                </Col>
                <Col span={1}></Col>

                <Col span={2}>
                    <Text strong>วันที่ส่งงาน :</Text>
                </Col>
                <Col span={8}>
                    <RangePicker
                        format={"DD/MM/YYYY"}
                        name="so_due_date"
                        className="full-width"
                        value={[
                            state?.date_start && moment(state?.date_start, 'DD/MM/YYYY'),
                            state?.date_end && moment(state?.date_end, 'DD/MM/YYYY')
                        ]}
                        defaultPickerValue={[moment(), moment()]}
                        onChange={(data) => {
                            console.log("data", data)
                            data
                                ? onChange({
                                    date_start: data[0].format("DD/MM/YYYY"),
                                    date_end: data[1].format("DD/MM/YYYY"),
                                })
                                : onChange({
                                    date_start: '',
                                    date_end: '',
                                });
                        }}
                    />
                </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
                <Col span={2}></Col>
                <Col span={2}>
                    <Text strong>สถานะ SO :</Text>
                </Col>
                <Col span={8}>
                    <CustomSelect
                        placeholder={"สถานะ SO"}
                        field_id="so_status_id"
                        field_name="so_status_name"
                        defaultValue={0}
                        value={state?.status || 0}
                        data={[
                            {
                                so_status_id: 0,
                                so_status_name: 'ทั้งหมด'
                            },
                            {
                                so_status_id: 1,
                                so_status_name: 'ยังไม่ได้ผลิต'
                            },
                            {
                                so_status_id: 2,
                                so_status_name: 'อยู่ระหว่างผลิต'
                            },
                            {
                                so_status_id: 3,
                                so_status_name: 'ผลิตเสร็จสิ้น'
                            },
                        ]}
                        onChange={(data, option) => {
                            onChange({
                                status: data,
                            })
                        }}
                    />
                </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
                <Col span={2}></Col>
                <Col span={2}>
                    <Text strong>RM / PK :</Text>
                </Col>
                <Col span={8}>
                    <CustomSelect
                        allowClear
                        showSearch
                        placeholder={"Item Code / Trade Name"}
                        field_id="item_no"
                        field_name="item_no_name"
                        value={state?.keyword2 || ''}
                        data={mockupItems}
                        onChange={(data, option) => {
                            console.log("option", option)
                            data !== undefined
                                ? onChange({
                                    keyword2: data,
                                })
                                : onChange({
                                    keyword2: '',
                                })
                        }}
                    />
                </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
                <Col span={24} className="text-center">
                    <Button
                        className="search-button mt-2"
                        type="primary"
                        icon={<SearchOutlined />}
                        style={{ width: 150 }}
                        onClick={() => onSearch(state)}
                    >
                        ค้นหาข้อมูล
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default SOSearchTool

const mockupSO = [
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
    },
]

const mockupItems = [
    {
        id: 1,
        item_no: 'C212JASA000200',
        item_name: 'Shipper CC double O Bloom Eau De Perfume Pack 12',
        item_no_name: '[C212JASA000200] Shipper CC double O Bloom Eau De Perfume Pack 12',
    },
    {
        id: 2,
        item_no: 'C102SRLA008000',
        item_name: 'Alcoh-AA',
        item_no_name: '[C102SRLA008000] Alcoh-AA',
    },
    {
        id: 3,
        item_no: 'C104SRLA003100',
        item_name: 'TS31643CO ADORE CONC',
        item_no_name: '[C104SRLA003100] TS31643CO ADORE CONC',
    },
    {
        id: 4,
        item_no: 'C102SRLA006000',
        item_name: 'Eumulgin HRE 40',
        item_no_name: '[C102SRLA006000] Eumulgin HRE 40',
    },
]