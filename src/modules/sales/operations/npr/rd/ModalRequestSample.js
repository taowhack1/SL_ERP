import { Button, Col, DatePicker, InputNumber, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import { convertDigit } from "../../../../../include/js/main_config";

const ModalRequestSample = ({ visible = true, readOnly = true }) => {
  const modalConfig = {
    title: "Request Sample",
    visible,
    width: 800,
    onOk: () => console.log("OK"),
    onCancel: () => console.log("Cancel"),
    footer: [
      <Button key="discard">Discard</Button>,
      <Button key="back" className="primary">
        Save
      </Button>,
    ],
  };

  return (
    <>
      <Modal {...modalConfig}>
        <div className="form-section">
          <Row className="col-2 mb-1" gutter={[36, 0]}>
            <Col span={12}>
              <Row className="col-2 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel require readOnly={readOnly} label={"PIC :"} />
                </Col>
                <Col span={16}>
                  <CustomSelect
                    placeholder={"Person in charge"}
                    className="w-100"
                  />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Delivery Date :"}
                  />
                </Col>
                <Col span={16}>
                  <DatePicker placeholder={"Delivery Date"} className="w-100" />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Sample Qty :"}
                  />
                </Col>
                <Col span={16}>
                  <InputNumber placeholder="Sample Qty" className="w-100" />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Batch Size :"}
                  />
                </Col>
                <Col span={14}>
                  <InputNumber placeholder="Batch Size" className="w-100" />
                </Col>
                <Col span={2}>
                  <Text strong>Kg.</Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Request By :"}
                  />
                </Col>
                <Col span={16}>
                  <Text>TEST</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Request Date :"}
                  />
                </Col>
                <Col span={16}>
                  <Text>23/06/2021</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Request Qty."}
                  />
                </Col>
                <Col span={16}>
                  <Text>{convertDigit(10, 4)}</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel require readOnly={readOnly} label={"Remark :"} />
                </Col>
                <Col span={16}>
                  <Text>Remark</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default ModalRequestSample;
