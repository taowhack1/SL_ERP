import React, { useContext } from "react";
import { Layout } from "antd";
import TopContent from "./TopComponent";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { AppContext } from "../include/js/context";

const { Header, Content } = Layout;

function MainLayout(props) {
  // const context = useContext(AppContext);
  // console.log(context);
  return (
    <>
      <Layout>
        <Header>
          <MainHeader title={props.title} projectId={props.projectId} />
        </Header>
        {props.show && <TopContent {...props} />}
        <Content id="content">{props.children}</Content>
        <MainFooter />
      </Layout>
    </>
  );
}

export default React.memo(MainLayout);
