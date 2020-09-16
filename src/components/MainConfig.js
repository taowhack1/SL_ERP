import React from 'react'
import { Dropdown, Button } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { menuReport, menuConfig } from '../data'

export default function MainConfig (){
    return (
        <>
            <Dropdown overlay={menuReport} trigger={['click']}>
                <Button type="text" className="ant-dropdown-link">Reports <CaretDownOutlined /></Button>
            </Dropdown>
            <Dropdown overlay={menuConfig} trigger={['click']}>
                <Button type="text" className="ant-dropdown-link">Configuration <CaretDownOutlined /></Button>
            </Dropdown>
        </>
    )
}