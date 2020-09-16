import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Row, Button, Input, Breadcrumb, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

function TopContent(props){
    console.log(props.buttonAction)
    const [visible, setVisible] = useState(false)
    const OpenModal = ()=>{
        setVisible(true)
    }
    const handleOk = ()=>{
        console.log('OK')
        setVisible(false)
    }
    const handleCancel = ()=>{
        console.log('Cancel')
        setVisible(false)
    }
    const backToHome = ()=>{
        props.history.push('/create')
    }
    const onSave = ()=>{
        console.log('On Save')
    }
    const onDiscard = ()=>{
        props.history.push(props.discard)
    }
    const onSaveConfirm = ()=>{
        console.log('On SaveConfirm')
    }
    return (
        <>
            <div id="top-content">
                <Row>
                    <Col span={12}>
                        <div className="mt-1 mb-1">
                            <Breadcrumb>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>New</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            {
                                props.buttonAction.includes('Create') && <Button className="primary" onClick={backToHome}>Create</Button>
                            }
                            {
                                props.buttonAction.includes('Save') && <Button className="primary" onClick={onSave}>Save</Button>
                            }
                            {
                                props.buttonAction.includes('SaveConfirm') && <Button onClick={onSaveConfirm}>Save & Confirm</Button>
                            }
                            {
                                props.buttonAction.includes('Discard') && <Button onClick={onDiscard}>Discard</Button>
                            }
                            {
                                props.buttonAction.includes('Popup') && <Button onClick={OpenModal}>Popup</Button>
                            }
                            {
                                props.buttonAction.includes('Cancel') && <Button type="primary" danger>Cancel</Button>
                            }
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>&nbsp;</div>
                        <div>
                            <Input placeholder="search" prefix={<SearchOutlined />} />
                        </div>
                    </Col>
                </Row>
            </div>
            
            <Modal
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            </Modal>
        </>
    )
}

export default withRouter(TopContent);