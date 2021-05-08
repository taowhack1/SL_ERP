import { Col, Input, Row } from "antd";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import { InputField } from "../../../../components/AntDesignComponent";
import CustomLabel from "../../../../components/CustomLabel";
import { TempItemContext } from "./TempItemCreate";

const TempItemFormHead = () => {
  const {
    control,
    errors,
    defaultValue,
    state,
    onChange,
    isNotCreate,
  } = useContext(TempItemContext);
  console.log("errors", errors);
  console.log("defaultValue", defaultValue);
  return (
    <>
      <div className="form-control mb-3">
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomLabel label="Trade Name :" require />
          </Col>
          <Col span={16}>
            {isNotCreate ? (
              <Input
                className="full-wdith"
                onChange={(e) => onChange(e.target.value)}
                value={state.item_sample_name_trade}
              />
            ) : (
              <>
                <Controller
                  render={({ field }) =>
                    InputField({
                      fieldProps: {
                        placeholder: "Trade name",
                        onChange: (e) => field.onChange(e.target.value),
                      },
                    })
                  }
                  name="item_sample_name_trade"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={defaultValue?.item_sample_name_trade}
                />
                {errors && errors.item_sample_name_trade && (
                  <span className="error">* This field is required.</span>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(TempItemFormHead);
