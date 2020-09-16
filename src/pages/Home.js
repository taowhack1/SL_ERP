import React, { Component } from 'react';
import {Row, Col, Table, Button } from 'antd'
import MainLayout from '../components/MainLayout'
import { columns, data } from '../data'
import { connect } from 'react-redux'

class Home extends Component {
  componentDidMount(){
    console.log(this.props.emp.salary)
  }
  componentDidUpdate(){
    console.log(this.props.emp.salary)
  }
  onChange = (pagination, filters, sorter, extra)=>{
    console.log('params', pagination, filters, sorter, extra);
  }
  render(){
    return (
      <div>
        <MainLayout buttonAction={['Create','Popup','Cancel']}>
          
          <Button onClick={()=>this.props.add_salary(1000)}>ADD SALARY + 1000</Button>
           <Button onClick={()=>this.props.del_salary(500)}>DEL SALARY - 500</Button>
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

function mapStateToProps(state){
  return { emp: state}
}
function mapDispatchToProps(dispatch){
  return {
    add_salary: (money)=>{
      dispatch({type:'ADD', payload: money})
    },
    del_salary: (money)=>{
      dispatch({type:'DEL', payload: money})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
