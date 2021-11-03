import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  InputField,
  InputNumberField,
  TextAreaField,
} from "../../../../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../../../../components/CustomLabel";
import { getNumberFormat } from "../../../../../../../../include/js/main_config";
import { NPRFormContext } from "../../../NPRRDForm";
let persistFields = {};
const Remark = (props) => {
  const { fields } = props || {};
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: initialState,
  });

  useEffect(() => {
    reset(fields);
    persistFields = fields;
    return () => {
      reset(initialState);
      persistFields = initialState;
    };
  }, [fields]);

  const onSubmit = (data) => console.log("submit", data);
  const onError = (data) => console.log("Error", data);

  const { readOnly } = useContext(NPRFormContext);

  const { npr_formula_remark } = persistFields || {};
  return (
    <>
      <form key="form-qa" onSubmit={handleSubmit(onSubmit, onError)}>
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={24}>
            {readOnly ? (
              <div className="text-value pd-left-3">
                <Text className="pre-wrap">{npr_formula_remark || "-"}</Text>
              </div>
            ) : (
              <>
                <Controller
                  {...{
                    name: `npr_formula_remark`,
                    control,
                    rules: { required: true },
                    defaultValue: null,
                    render: ({ field }) => {
                      return TextAreaField({
                        fieldProps: {
                          className: "w-100",
                          placeholder: "หมายเหตุ / จดบันทึก",
                          rows: 4,
                          ...field,
                        },
                      });
                    },
                  }}
                />
              </>
            )}
          </Col>
        </Row>
      </form>
    </>
  );
};

export default React.memo(Remark);

const initialState = {
  npr_formula_remark: null,
};
