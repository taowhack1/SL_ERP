import React, { Component } from 'react';
import MainLayout from '../components/MainLayout'
import { connect } from 'react-redux'
import { Button, Modal } from 'antd'

class Dashboard extends Component {

  state = {
    visible: false
  }
  OpenModal = ()=>{
    console.log('11')
    this.setState({visible: true})
  }
  handleOk = ()=>{
    console.log('Handle OK Button')
    this.setState({visible: false})
  }
  handleCancel = ()=>{
    console.log('Handle Cancel Button')
    this.setState({visible: false})
  }

  componentDidMount(){
    console.log(this.props.emp.salary)
  }
  componentDidUpdate(){
    console.log(this.props.emp.salary)
  }
  onChange = (pagination, filters, sorter, extra)=>{
    console.log('params', pagination, filters, sorter, extra);
  }
  config = {
    title: "DASHBOARD",
    show:true,
    breadcrumb:['Home'],
    search:false,
    create:"",
    buttonAction: ['Cancel'],
    discard: "",
    onCancel:()=>{
      console.log('Cancel')
    }
  }
  render(){
    return (
      <div>
        <MainLayout {...this.config}>
          <Button onClick={this.OpenModal}>Popup</Button>
          <Button onClick={()=>this.props.add_salary(1000)}>ADD SALARY + 1000</Button>
          <Button onClick={()=>this.props.del_salary(500)}>DEL SALARY - 500</Button> 
          Salary: {this.props.emp.salary}
          <h1>This is Dashboard</h1>
         </MainLayout>

         <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            <p>Some contents...1</p>
            <p>Some contents...2</p>
            <p>Some contents...3</p>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
