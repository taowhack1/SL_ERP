import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { convertDigit } from "../../../include/js/main_config";
import { POContext } from "./POFormDisplay";

const POFormResult = () => {
  const { poState } = useContext(POContext);
  const {
    po_description,
    vat_no,
    vendor_no_name,
    payment_term_name,
    currency_no,
    po_detail,
    po_no,
  } = poState || {};
  return (
    <>
      <Row className="col-2 mt-1 mb-1" gutter={16}>
        <Col span={12}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>PO No. :</Text>
            </Col>
            <Col span={18}>
              <Text>{po_no || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Description :</Text>
            </Col>
            <Col span={18}>
              <Text>{po_description || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Vendor :</Text>
            </Col>
            <Col span={18}>
              <Text>{vendor_no_name || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Currency :</Text>
            </Col>
            <Col span={18}>
              <Text>{currency_no || "-"}</Text>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Vat :</Text>
            </Col>
            <Col span={18}>
              <Text>{vat_no || "-"}</Text>
            </Col>
          </Row>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <Text strong>Payment Terms :</Text>
            </Col>
            <Col span={18}>
              <Text>{payment_term_name || "-"}</Text>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Columns */}
      <Row className="mt-2 detail-table-head">
        <Col span={1} className="text-center col-outline">
          <Text strong>No.</Text>
        </Col>
        <Col span={8} className="text-center col-outline">
          <Text strong className="pre-warp">
            Item Code / Description
          </Text>
        </Col>
        <Col span={3} className="text-center col-outline">
          <Text strong>Total Qty.</Text>
        </Col>
        <Col span={3} className="text-center col-outline">
          <Text strong>MOQ</Text>
        </Col>
        <Col span={1} className="text-center col-outline">
          <Text strong>UOM</Text>
        </Col>
        <Col span={2} className="text-center col-outline">
          <Text strong>Unit Price</Text>
        </Col>
        <Col span={2} className="text-center col-outline">
          <Text strong>Total Price</Text>
        </Col>
        <Col span={2} className="text-center col-outline">
          <Text strong>Discount</Text>
        </Col>
        <Col span={2} className="text-center col-outline">
          <Text strong>Due Date</Text>
        </Col>
      </Row>
      {/* Row Detail */}
      {po_detail?.map(
        (
          {
            item_no_name,
            po_detail_qty,
            po_detail_vendor_moq,
            uom_no,
            po_detail_price,
            po_detail_total_price,
            po_detail_discount,
            po_detail_due_date,
            po_detail_remark,
          },
          index
        ) => (
          <div className="row-detail" key={`row-${index}`}>
            <Row
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={2}
              className="col-2"
            >
              <Col span={1} className="text-center col-outline">
                {/* No. */}
                <Text strong>{`${index + 1}`}</Text>
              </Col>
              <Col span={8} className="text-left col-outline">
                {/* Item */}
                <Text>{`${item_no_name || "-"}`}</Text>
              </Col>
              <Col span={3} className="text-right col-outline">
                {/* Total Qty. */}
                <Text>{`${convertDigit(po_detail_qty || 0, 6)}`}</Text>
              </Col>
              <Col span={3} className="text-right col-outline">
                {/* MOQ */}
                <Text>{`${convertDigit(po_detail_vendor_moq || 0, 6)}`}</Text>
              </Col>
              <Col span={1} className="text-center col-outline">
                {/* UOM */}
                <Text>{`${uom_no || "-"}`}</Text>
              </Col>
              <Col span={2} className="text-right col-outline">
                {/* Unit Price */}
                <Text>{`${convertDigit(po_detail_price || 0, 2)}`}</Text>
              </Col>
              <Col span={2} className="text-right col-outline">
                {/* Total Price */}
                <Text>{`${convertDigit(po_detail_total_price || 0, 2)}`}</Text>
              </Col>
              <Col span={2} className="text-right col-outline">
                {/* Discount */}
                <Text>{`${convertDigit(po_detail_discount || 0, 2)}`}</Text>
              </Col>
              <Col span={2} className="text-center col-outline">
                {/* Due Date */}
                <Text>{`${po_detail_due_date || "-"}`}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {/* Remark */}
                <Text strong className="ml-2">{`Remark : `}</Text>
                <Text className="pre-warp">{`${`${
                  po_detail_remark || "-"
                }`}`}</Text>
              </Col>
            </Row>
          </div>
        )
      )}
    </>
  );
};

export default React.memo(POFormResult);
