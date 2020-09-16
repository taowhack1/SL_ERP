import React, { useState } from 'react';
import { Drawer, Row, Col, Avatar, Dropdown, Button } from 'antd'
import { UserOutlined, MenuOutlined, CaretDownOutlined } from '@ant-design/icons'
import { menu } from '../data'

function MainHead(){
    const [visible, setVisible] = useState(false)
    const onCloseDrawer = ()=>{
      setVisible(false)
    }
    const onOpenDrawer = ()=>{
        setVisible(true)
    }
    return (
        <>
        <Row>
            <Col span={12}>
                <Row>
                    <Col span={6}><MenuOutlined onClick={onOpenDrawer}/> <span>INVERTORY</span></Col>
                    <Col span={18}>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="text" className="ant-dropdown-link">Reports <CaretDownOutlined /></Button>
                        </Dropdown>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="text" className="ant-dropdown-link">Configuration <CaretDownOutlined /></Button>
                        </Dropdown>
                    </Col>
                </Row>
            </Col>
            <Col span={12} id="column-right">
                <Avatar icon={<UserOutlined />} />
                <Dropdown overlay={menu} trigger={['click']}>
                    <Button type="text" className="ant-dropdown-link">Administrator <CaretDownOutlined /></Button>
                </Dropdown>
            </Col>
        </Row>
        
        <Drawer
            title="PROJECTS"
            placement="left"
            closable={false}
            onClose={onCloseDrawer}
            visible={visible}
            >
            <p>INVERTORY</p>
            <p>PURCHASING</p>
            <p>SALES</p>
            </Drawer>
        </>
    )

}

export default MainHead;