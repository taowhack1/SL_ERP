import React, { useContext } from "react";
import { Divider } from "antd";
import TotalFooter from "../../../components/TotalFooter";
import { useFormContext } from "react-hook-form";
import { POContext } from "./POFormDisplay";

const POFooterSummary = () => {
  const { poState } = useContext(POContext);
  const {
    po_detail,
    tg_po_sum_amount,
    tg_po_total_amount,
    tg_po_vat_amount,
    currency_no,
  } = poState;
  return (
    <div>
      <Divider className="divider-sm" />
      {/* <Row className="col-2 row-margin-vertical">
              <Col span={15}></Col>

              <Col span={5} className="text-number">
                <Text strong>Extended Discount :</Text>
              </Col>
              <Col span={3} className="text-number">
                {readOnly ? (
                  <Text className="text-value">
                    {convertDigit(po_discount ?? 0, 4)}
                  </Text>
                ) : (
                  <InputNumber
                    name="item_discount"
                    placeholder="Discount"
                    value={po_discount}
                    min={0.0}
                    step={5}
                    precision={3}
                    defaultValue={0}
                    {...numberFormat}
                    onChange={(data) => {
                      upDateFormValue({ po_discount: data });
                    }}
                    onBlur={(data) => {
                      updateAmount(
                        data_detail,
                        "po_detail_total_price",
                        vat_rate
                      );
                    }}
                    className="full-width"
                    size="small"
                  />
                )}
              </Col>
              <Col span={1} className="text-string">
                <Text strong> {currency_no ?? "THB"}</Text>
              </Col>
            </Row> */}
      <TotalFooter
        excludeVat={tg_po_sum_amount}
        vat={tg_po_vat_amount}
        includeVat={tg_po_total_amount}
        currency={currency_no}
      />
    </div>
  );
};

export default React.memo(POFooterSummary);
