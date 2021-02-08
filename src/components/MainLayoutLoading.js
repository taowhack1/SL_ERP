import React from "react";
import { Col, Layout, Row, Skeleton, Space } from "antd";

const { Header, Content, Footer } = Layout;

function MainLayoutLoading(props) {
  return (
    <>
      <Layout style={{ opacity: 0.6 }}>
        <Header>
          <Row style={{ paddingTop: 8, marginLeft: -10 }}>
            <Col span={12} className={"text-left"}>
              <Skeleton.Button active size={"small"} style={{ opacity: 0.3 }} />
              <Skeleton.Button
                active
                size={"small"}
                style={{ width: 100, marginLeft: 10, opacity: 0.3 }}
              />
              <Skeleton.Button
                active
                size={"small"}
                style={{ width: 100, marginLeft: 150, opacity: 0.3 }}
              />
            </Col>
            <Col span={12} className={"text-right"}>
              <Skeleton.Button
                active
                size={"small"}
                style={{ width: 150, marginRight: 10, opacity: 0.3 }}
              />
              <Skeleton.Button
                active
                size={"small"}
                style={{ width: 150, marginRight: 10, opacity: 0.3 }}
              />
              <Skeleton.Avatar
                active
                // size={"small"}
                style={{ marginRight: 10, marginTop: -5, opacity: 0.3 }}
              />
              <Skeleton.Button
                active
                size={"small"}
                style={{ width: 150, marginRight: 10, opacity: 0.3 }}
              />
            </Col>
          </Row>
        </Header>
        <div id="top-content">
          <Row className="mt-1 mb-1">
            <Col span={12}>
              <Space size={16}>
                <Skeleton.Button active size={"small"} />
                <Skeleton.Button active size={"small"} />
                <Skeleton.Button active size={"small"} />
              </Space>
              <div className="mt-1">
                <Skeleton.Button active size={"small"} />
              </div>
            </Col>
            <Col span={12}>
              <div>
                <Skeleton.Input active className="full-width" />
              </div>
            </Col>
          </Row>
        </div>
        <Content id="content">{props.children}</Content>
        <Footer>
          System v{process.env.REACT_APP_ERP_VERSION} Sirilaboratories co.,ltd.
        </Footer>
      </Layout>
    </>
  );
}

export default React.memo(MainLayoutLoading);
