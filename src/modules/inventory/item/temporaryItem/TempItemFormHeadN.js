import { Col, Input, Row } from "antd";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import { InputField } from "../../../../components/AntDesignComponent";
import CustomLabel from "../../../../components/CustomLabel";
import { TempItemContext } from "./TempItemForm";

const TempItemFormHead = () => {
  const { state, onChange, readOnly } = useContext(TempItemContext);
  return (
    <>
      <div className="form-control mb-3">
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomLabel label="Trade Name :" require readOnly={readOnly} />
          </Col>
          <Col span={16}>
            <Input
              className={readOnly ? "full-wdith disabled-input" : "full-wdith"}
              disabled={readOnly}
              onChange={(e) =>
                onChange({ item_sample_name_trade: e.target.value })
              }
              value={state.item_sample_name_trade}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(TempItemFormHead);
