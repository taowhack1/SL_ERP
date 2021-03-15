import { Button, Col, Divider, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
import { convertDigit } from "../../../../include/js/main_config";

const IssueViewJobDetail = ({
  visible,
  data_head,
  setModalJobDetail,
  readOnly,
}) => {
  const closeModal = () => {
    setModalJobDetail({
      jobDetail: null,
      visible: false,
    });
  };
  return (
    <>
      <Modal
        title={"Job Detail"}
        visible={visible}
        width={700}
        onCancel={closeModal}
        footer={
          <Button className="primary" onClick={closeModal}>
            Close
          </Button>
        }
      >
        <Row>
          <Col span={24}>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"SO Code : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                <div className="text-value">
                  <Text>{data_head?.so_no}</Text>
                </div>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Description : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                <div className="text-value">
                  <Text>{data_head?.so_description}</Text>
                </div>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Delivery Date : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                <div className="text-value">
                  <Text>{data_head?.so_delivery_date}</Text>
                </div>
              </Col>
            </Row>
            <Divider orientation="left">Finish Good</Divider>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Item Code : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                <div className="text-value">
                  <Text>{data_head?.item_no}</Text>
                </div>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Description : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                {
                  <div className="text-value">
                    <Text>{data_head?.item_name}</Text>
                  </div>
                }
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Quantity : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                {
                  <div className="text-value">
                    <Text>{convertDigit(data_head?.mrp_qty_produce, 4)}</Text>
                    <Text strong className="pd-left-2">
                      {data_head?.uom_no}
                    </Text>
                  </div>
                }
              </Col>
            </Row>
            <Divider orientation="left">Bulk</Divider>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Item Code : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                <div className="text-value">
                  <Text>{data_head?.item_no_ref}</Text>
                </div>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Description : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                {
                  <div className="text-value">
                    <Text>{data_head?.item_name_ref}</Text>
                  </div>
                }
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6} offset={1}>
                <CustomLabel label={"Quantity : "} readOnly={readOnly} />
              </Col>
              <Col span={14}>
                {
                  <div className="text-value">
                    <Text>
                      {convertDigit(data_head?.mrp_qty_produce_ref, 4)}
                    </Text>
                    <Text strong className="pd-left-2">
                      {data_head?.uom_no_ref}
                    </Text>
                  </div>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default React.memo(IssueViewJobDetail);
