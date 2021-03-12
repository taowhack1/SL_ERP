import React, { useContext, useState } from "react";
import { Col, Input, Row } from "antd";
import CustomLabel from "../../../components/CustomLabel";
import { ItemContext } from "../../../include/js/context";
import Text from "antd/lib/typography/Text";

const ItemVendorTradeName = ({ vendorData, onBlur }) => {
  const { id, item_vendor_trade_name } = vendorData;
  const { readOnly } = useContext(ItemContext);
  const [stateHead, setStateHead] = useState({
    item_vendor_trade_name,
  });

  const onChangeHead = (data) => {
    console.log("onChangeHead", data);
    setStateHead({ ...stateHead, ...data });
  };
  const onChangeVendorData = () => {
    onBlur(id, stateHead);
  };
  console.log("item_vendor_trade_name", stateHead);
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={6}>
          <CustomLabel require label={"Trade Name"} readOnly={readOnly} />
        </Col>
        <Col span={15}>
          {readOnly ? (
            <Text className="text-value">
              {stateHead.item_vendor_trade_name ?? "-"}
            </Text>
          ) : (
            <Input
              placeholder={"Vendor Trade Name"}
              name={"item_vendor_trade_name"}
              value={stateHead.item_vendor_trade_name}
              onChange={(e) =>
                onChangeHead({ item_vendor_trade_name: e.target.value })
              }
              onBlur={onChangeVendorData}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ItemVendorTradeName);
