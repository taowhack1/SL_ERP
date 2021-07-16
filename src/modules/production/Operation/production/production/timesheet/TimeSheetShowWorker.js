/** @format */

import React, { useState } from "react";
import { Modal, Button, Card } from "antd";
import Meta from "antd/lib/card/Meta";

const TimeSheetShowWorker = ({ listWorker, openModal, closeModal }) => {
  console.log("listWorker_pp", listWorker);
  console.log("openModal", openModal);
  return (
    <>
      <Modal
        title='Worker'
        centered
        footer={<Button onClick={() => closeModal(false)}>Close</Button>}
        visible={openModal}
        onOk={() => closeModal(false)}
        onCancel={() => closeModal(false)}
        width={1000}>
        <Card>
          {listWorker?.map((emp) => (
            <Card.Grid key={emp.employee_no}>
              <Card
                style={{ width: 240 }}
                cover={
                  <img
                    alt='example'
                    height={120}
                    src={
                      emp.employee_image ||
                      require("../../../../../../image/unnamed.png")
                    }
                  />
                }>
                <Meta title={`[ ${emp.employee_no} ]`} align='center'></Meta>
                <Meta title={emp.employee_name_eng} align='center'></Meta>
              </Card>
            </Card.Grid>
          ))}
        </Card>
      </Modal>
    </>
  );
};

export default TimeSheetShowWorker;
