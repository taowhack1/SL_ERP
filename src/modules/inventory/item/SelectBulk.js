import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomSelect from "../../../components/CustomSelect";
import { ItemContext } from "../../../include/js/context";
const SelectBulk = ({ data_head, upDateFormValue }) => {
  const { readOnly, BULKList } = useContext(ItemContext);
  console.log("Select Bulk ", data_head);
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={12} className="col-left">
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <Text strong className="pd-left-1">
                {!readOnly && <span className="require">* </span>}
                Bulk Code
              </Text>
            </Col>
            <Col span={14}>
              {readOnly ? (
                <Text className="text-left">
                  {data_head.item_ref_no_name ?? "-"}
                </Text>
              ) : (
                <CustomSelect
                  className="full-width"
                  allowClear
                  showSearch
                  placeholder={"Bulk Code"}
                  name="item_id_ref"
                  field_id="item_id"
                  field_name="item_no_name"
                  value={data_head.item_ref_no_name}
                  data={BULKList}
                  onChange={(data, option) => {
                    data !== undefined
                      ? upDateFormValue({
                          item_id_ref: option.data.item_id,
                          item_ref_no_name: option.data.item_no_name,
                        })
                      : upDateFormValue({
                          item_id_ref: null,
                          item_ref_no_name: null,
                        });
                  }}
                />
              )}
            </Col>
            <Col span={3}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(SelectBulk);
