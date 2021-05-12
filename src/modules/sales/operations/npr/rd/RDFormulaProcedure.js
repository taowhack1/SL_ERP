import { Col, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../../components/CustomLabel";

const RDFormulaProcedure = ({ useFormValue, readOnly }) => {
  const { state, onChange } = useFormValue;
  return (
    <div className="form-section">
      <div className="mb-3">
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <CustomLabel label="Procedure :" require readOnly={readOnly} />
          </Col>
          <Col span={24}>
            {readOnly ? (
              <div className="pd-left-2 text-value">
                <Text>{state.npr_formula_procedure}</Text>
              </div>
            ) : (
              <TextArea
                className="full-width"
                value={state.npr_formula_procedure}
                onChange={(e) =>
                  onChange({ npr_formula_procedure: e.target.value })
                }
              />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.memo(RDFormulaProcedure);
