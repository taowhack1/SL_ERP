/*
import React from "react";
import { withRouter } from "react-router-dom";
import { Col, Row, Button, Breadcrumb } from "antd";
import Search from "./Search";

function TopContent(props) {
  const onCreate = () => {
    props.create === "modal"
      ? props.openModal()
      : props.history.push(props.create);
  };
  const onDiscard = () => {
    props.history.push(props.discard);
  };
  return (
    <>
      <div id="top-content">
        <Row>
          <Col span={12}>
            <div className="mt-1 mb-1">
              <Breadcrumb>
                {props.breadcrumb &&
                  props.breadcrumb.map((item, index) => {
                    return (
                      <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    );
                  })}
              </Breadcrumb>
*/
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Row, Button, Breadcrumb, Steps, Dropdown, Menu } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import Search from './Search'
//import { menuAction } from '../data'

function TopContent(props){
    const onCreate = ()=>{
        props.history.push(props.create)
    }
    const onDiscard = ()=>{
        props.history.push(props.discard)
    }
    const menuAction = ()=>{
       //console.log(props.action)
       const a = <Menu>
            {  props.action.map((item, index)=>{
                    return (
                    <Menu.Item key={index}>
                        <a target="_blank" href={item.link}>
                           {item.name}
                        </a>
                    </Menu.Item>
                    )
                })
            }
        </Menu>

        return a
    }
    return (
        <>
            <div id="top-content">
                <Row className="mt-1 mb-1">
                    <Col span={12}>
                        <div>
                            <Breadcrumb>
                                {
                                   props.breadcrumb && props.breadcrumb.map((item, index)=>{
                                        return (
                                            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                        )
                                    })
                                }
                            </Breadcrumb>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            {
                                props.search && <Search/>
                            }
                        </div>
                    </Col>
                 </Row>
                 <Row>
                    <Col span={8}>
                        <div>
                            {
                                props.buttonAction.includes('Create') && <Button className="primary" onClick={onCreate}>Create</Button>
                            }
                            {
                                props.buttonAction.includes('Save') && <Button className="primary" onClick={props.onSave}>Save</Button>
                            }
                            {
                                props.buttonAction.includes('SaveConfirm') && <Button onClick={props.onConfirm}>Save & Confirm</Button>
                            }
                            {
                                props.buttonAction.includes('Discard') && <Button onClick={onDiscard}>Discard</Button>
                            }
                            {
                                props.buttonAction.includes('Cancel') && <Button type="primary" danger onClick={props.onCancel}>Cancel</Button>
                            }
                        </div>
                    </Col>
                    <Col span={4}>
                        {
                            props.action && 
                            <Dropdown overlay={menuAction()} trigger={['click']}>
                                <Button type="text">Action <CaretDownOutlined /></Button>
                            </Dropdown>
                        }
                    </Col>
                    <Col span={12}>
                        <div>
                            {  props.step &&
                                <Steps size="small" current={props.step.current}>
                                {
                                props.step.step  && props.step.step.map((item, index)=>{
                                    return <Steps.Step key={index} title={item} />
                                })
                                }
                                </Steps>   
                            }
                        </div>
                    </Col>
                </Row>
        </div>
    </>
  );
}

export default withRouter(TopContent);
