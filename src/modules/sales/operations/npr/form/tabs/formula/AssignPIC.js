import { Col, Divider, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import CustomLabel from "../../../../../../../components/CustomLabel";
import CustomSelect from "../../../../../../../components/CustomSelect";

const AssignPIC = () => {
  const [loading, setLoading] = useState(false);
  const onChange = (val) => {
    console.log(val);
  };
  return (
    <div>
      <h3>Person In Charge ( มอบหมายงาน )</h3>
      <Divider className="divider-sm" />
      <Row
        className="col-2 mt-1 mb-1"
        gutter={16}
        style={{ padding: "0px 20px" }}
      >
        <Col span={12}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <CustomLabel readOnly={true} label="Person In Charge :" require />
            </Col>
            <Col span={18}>
              <CustomSelect
                allowClear
                showSearch
                placeholder={"เลือกผู้ปฏิบัติงาน"}
                // size={"small"}
                data={[]}
                field_id="id"
                field_name="name"
                // value={val}
                onChange={(val, props) => {
                  // const { trans_id, trans_field_id, item_cost, item_no_name } =
                  //   props.data;
                  val !== undefined
                    ? onChange({
                        //   trans_id,
                        //   trans_field_id,
                      })
                    : onChange({
                        //   trans_id: null,
                        //   trans_field_id: null,
                      });
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
};

export default React.memo(AssignPIC);
