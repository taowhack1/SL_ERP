import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Checkbox, Col, Row, Space } from "antd";
import React from "react";
import CustomLabel from "../../../components/CustomLabel";
import CustomUpload from "../../../components/CustomUpload";

const ItemVendorDocument = ({
  readOnly,
  fileDetail,
  label,
  checked,
  upload,
}) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={2} className="text-center">
          {readOnly ? (
            <Space align="baseline">
              {fileDetail?.isChecked ? (
                <CheckSquareOutlined />
              ) : (
                <BorderOutlined />
              )}
            </Space>
          ) : (
            <Checkbox
              checked={checked}
              //   onChange={(e) =>
              //     upDateFormValue({
              //       isChecked: e.target.checked ? 1 : 0,
              //     })
              //   }
            />
          )}
        </Col>
        <Col span={9}>
          <CustomLabel readOnly={readOnly} label={label} />
        </Col>
        <Col span={12}>
          {upload && <CustomUpload readOnly={readOnly} type={"Button"} />}
        </Col>
      </Row>
    </>
  );
};

export default ItemVendorDocument;
