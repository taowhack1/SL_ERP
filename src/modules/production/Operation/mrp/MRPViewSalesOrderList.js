import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import SalesOrderList from "./SalesOrderList";

const MRPViewSalesOrderList = () => {
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  return (
    <>
      <Button className="primary" onClick={openModal}>
        S/O List
      </Button>
      <Modal
        visible={visible}
        onCancel={closeModal}
        width={"80%"}
        destroyOnClose
        footer={[
          <Button key="close-modal" className="primary" onClick={closeModal}>
            Close
          </Button>,
        ]}
      >
        <h3>Sales Order List</h3>
        <SalesOrderList />
      </Modal>
    </>
  );
};

export default React.memo(MRPViewSalesOrderList);
