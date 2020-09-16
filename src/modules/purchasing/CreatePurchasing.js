import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Tabs } from 'antd'
import MainLayout from '../../components/MainLayout'

class CreatePurchasing extends Component {
    state = {
        data:{
            
        }
    }
    componentDidMount(){
        console.log(this.props.emp.salary)
    }
    callback(key){
        console.log('Tab: '+key)
    }
    config = {
        title: "PURCHASING",
        show:true,
        breadcrumb:['Home','New'],
        search: false,
        buttonAction: ['Save','SaveConfirm','Discard'],
        create:"",
        discard: "/purchasing",
        onSave:()=>{
            console.log('Save')
        },
        onConfirm:()=>{
            console.log('Confirm')
        }
    }
    render(){
        return (
            <MainLayout {...this.config}>
                <div id="form">
                    <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            size="small"
                            >
                    <Row className="col-2">
                        <Col span={11}>
                        
                            <Form.Item
                                label="Test 1"
                                name="test1"
                                rules={[{ required: true, message: 'Please input your Test 1!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Test 2"
                                name="test2"
                                rules={[{ required: true, message: 'Please input your Test 2!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Long text for Test 5"
                                name="test5"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Long and Long text for Test 6"
                                name="test6"
                            >
                                <Input />
                            </Form.Item>
    
                            </Col>
                            <Col span={2}></Col>
                            <Col span={11}>
                            <Form.Item
                                label="Test 3"
                                name="test3"
                                rules={[{ required: true, message: 'Please input your Test 3!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Test 4"
                                name="test4"
                            >
                                <Input />
                            </Form.Item>
                            
                            </Col>
                        </Row>
                        <Row className="col-2">
                            <Col span={24}>
                                <Tabs defaultActiveKey="1" onChange={this.callback}>
                                    <Tabs.TabPane tab="Tab 1" key="1">
                                        <Row>
                                            <Col span={11}>
                                                <Form.Item
                                                    label="Test 20"
                                                    name="test20"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Test 21"
                                                    name="test21"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Test 22"
                                                    name="test22"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                
                                            </Col>
                                            <Col span={2}></Col>
                                            <Col span={11}>
                                                
                                            </Col>
                                        </Row>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Tab 2" key="2">
                                        Content of Tab Pane 2
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Tab 3" key="3">
                                        Content of Tab Pane 3
                                    </Tabs.TabPane>
                                </Tabs>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </MainLayout>
        )
    }
}

function mapStateToProps(state){
    return { emp: state }
}

export default connect(mapStateToProps)(CreatePurchasing)
