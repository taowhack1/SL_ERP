import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout";
import { withRouter } from "react-router-dom";
import { reset_comments } from "../../actions/comment&log";
import { RESET_ALL_SALES } from "../../actions/types";
import { get_customer_payment_term_list } from "../../actions/accounting";
import Authorize from "../system/Authorize";

const Sales = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  console.log(props.location.state);
  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  useEffect(() => {
    dispatch(reset_comments());
    dispatch(get_customer_payment_term_list());
    return () => {
      dispatch({ type: RESET_ALL_SALES });
    };
  }, [dispatch]);

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home"],
    search: true,
    create: "",
    buttonAction: [""],
    discard: current_project.project_url,
    onCancel: () => {
      console.log("Cancel");
    },
  };

  return (
    <div>
      <MainLayout {...config}>
        <h1>Home Sales</h1>
        {/* <Row>
               <Col span={24}>
                 <Table columns={columns} dataSource={data} onChange={this.onChange} size='small'/>
               </Col>
           </Row> */}
      </MainLayout>
    </div>
  );
};

export default withRouter(Sales);
