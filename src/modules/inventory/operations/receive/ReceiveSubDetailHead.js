import { Row, Col, Typography } from "antd";
import React from "react";
import { convertDigit } from "../../../../include/js/main_config";
const { Text } = Typography;
const ReceiveSubDetailHead = ({ selectData, qtyRef = false }) => {
  return (
    <>
      <Row className="row-margin-vertical">
        <Col span={3}>
          <Text strong>Item :</Text>
        </Col>
        <Col span={21}>
          <Text className="text-value">
            {selectData && selectData.item_no_name}
          </Text>
        </Col>
      </Row>
      <Row className="row-margin-vertical">
        <Col span={3}>
          <Text strong>Shelf life (day) :</Text>
        </Col>
        <Col span={21}>
          <Text className="text-value">
            {selectData && selectData.item_shelf_life}
          </Text>
        </Col>
      </Row>
      {qtyRef && (
        <>
          <Row className="row-margin-vertical">
            <Col span={3}>
              <Text strong>Quantity Balance :</Text>
            </Col>
            <Col span={21}>
              <Text className="text-value">
                {selectData &&
                  convertDigit(selectData.tg_receive_detail_qty_balance, 4)}
              </Text>
              <Text className="text-value">
                {selectData && selectData.uom_no}
              </Text>
            </Col>
          </Row>
          <Row style={{ height: 10 }}>
            <Col
              span={7}
              className="text-number"
              style={{ borderBottom: "0.2vh solid #E7E7E7" }}
            ></Col>
            <Col span={17}></Col>
          </Row>
        </>
      )}

      <Row className="row-margin-vertical">
        <Col span={3}>
          <Text strong>Quantity Done :</Text>
        </Col>
        <Col span={21}>
          {selectData && (
            <Text className="text-value">
              {convertDigit(selectData.tg_receive_detail_qty, 4)}
            </Text>
          )}
          {qtyRef && (
            <>
              {"  /  "}
              <Text strong>
                {selectData &&
                  convertDigit(
                    selectData.tg_receive_detail_qty_balance_temp,
                    4
                  )}
              </Text>
            </>
          )}
          <Text strong className={"pd-left-1"}>
            {selectData && selectData.uom_no}
          </Text>
        </Col>
      </Row>
    </>
  );
};
export default React.memo(ReceiveSubDetailHead);
