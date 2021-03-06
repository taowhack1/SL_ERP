import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout";
import { withRouter } from "react-router-dom";
import Authorize from "../system/Authorize";
const QualityAssurance = (props) => {

  const authorize = Authorize();
  authorize.check_authorize();
 
  console.log(props.location.state);
  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  // useEffect(() => {
  //   dispatch(reset_comments());
  //   return () => {
  //     dispatch({ type: RESET_ALL_SALES });
  //   };
  // }, [dispatch]);

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

  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };
  // const config = {
  //   projectId: 3,
  //   title: "SALES",
  //   home: "/sales",
  //   show: true,
  //   breadcrumb: ["Home"],
  //   search: true,
  //   create: "",
  //   buttonAction: [""],
  //   discard: "/sales",
  //   onCancel: () => {
  //     console.log("Cancel");
  //   },
  // };

  return (
    <div>
      <MainLayout {...config}>
        <h1>Home Quality Assurance</h1>
        {/* <Row>
               <Col span={24}>
                 <Table columns={columns} dataSource={data} onChange={this.onChange} size='small'/>
               </Col>
           </Row> */}
      </MainLayout>
    </div>
  );
};

export default withRouter(QualityAssurance);
