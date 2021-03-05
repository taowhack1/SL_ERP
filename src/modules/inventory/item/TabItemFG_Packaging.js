import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import Packaging from "./Item_Packaging";
import { ItemContext } from "../../../include/js/context";
import ItemFGPacking from "./ItemFGPacking";
const TabPackaging = ({
  uom_name,
  data_packaging_detail,
  packagingDetailDispatch,
}) => {
  const { readOnly } = useContext(ItemContext);
  return (
    <>
      <ItemFGPacking />

      <Row className="col-2 mt-2 detail-tab-row">
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Packaging
          </Text>
        </Col>
      </Row>
      <Row className="col-2 row-tab-margin">
        {/* Packaging */}
        <Col span={24}>
          <Packaging
            readOnly={readOnly}
            uom_name={uom_name}
            data_packaging_detail={data_packaging_detail}
            packagingDetailDispatch={packagingDetailDispatch}
          />
        </Col>
      </Row>
    </>
  );
};

export default TabPackaging;
