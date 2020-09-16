import React, { Component } from 'react';
import {Row, Col, Table, Button } from 'antd'
import MainLayout from '../../components/MainLayout'
import { columns, data } from '../../data'

class Inventory extends Component {
  componentDidMount(){
    
  }
  componentDidUpdate(){
    
  }
  onChange = (pagination, filters, sorter, extra)=>{
    console.log('params', pagination, filters, sorter, extra);
  }
  config = {
    title: "INVENTORY",
    show:true,
    breadcrumb:['Home'],
    search:true,
    create:"/inventory/create",
    buttonAction: ['Create'],
    discard: "/inventory",
    onCancel:()=>{
      console.log('Cancel')
    }
  }
  render(){
    return (
      <div>
        <MainLayout {...this.config}>
          
           <Row>
               <Col span={24}>
                 <Table columns={columns} dataSource={data} onChange={this.onChange} size='small'/>
               </Col>
           </Row>
         </MainLayout>
      </div>
    )
  }
}

export default Inventory;
