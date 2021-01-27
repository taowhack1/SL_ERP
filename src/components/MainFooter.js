import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;
function MainFooter() {
  return (
    <>
      <Footer>
        System v{process.env.REACT_APP_ERP_VERSION} Sirilaboratories co.,ltd.
      </Footer>
    </>
  );
}
export default React.memo(MainFooter);
