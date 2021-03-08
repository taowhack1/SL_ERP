import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Checkbox, Col, Row, Space } from "antd";
import React, { useContext } from "react";
import CustomLabel from "../../../components/CustomLabel";
import CustomUpload from "../../../components/CustomUpload";
import { ItemContext } from "../../../include/js/context";
import ItemFileUpload from "./ItemFileUpload";

const ItemVendorDocument = ({
  label,
  checked,
  enableUpload,
  onChange,
  field,
  fileTypeId,
  onChangeFile,
  file,
}) => {
  const { readOnly } = useContext(ItemContext);
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={2} className="text-center">
          {readOnly ? (
            <Space align="baseline">
              {checked ? <CheckSquareOutlined /> : <BorderOutlined />}
            </Space>
          ) : (
            <Checkbox
              checked={checked}
              name={field}
              onChange={(e) =>
                onChange({
                  [field]: e.target.checked ? 1 : 0,
                })
              }
            />
          )}
        </Col>
        <Col span={9}>
          <CustomLabel readOnly={readOnly} label={label} />
        </Col>
        <Col span={12}>
          {enableUpload && (
            // <CustomUpload
            //   readOnly={readOnly}
            //   type={"Button"}
            //   checkbox={checked}
            // />
            <ItemFileUpload
              data_file={file}
              updateFile={onChangeFile}
              chkbox_upload_fields={checked}
              maxFile={1}
              file_type_id={fileTypeId}
              upload_type={"Button"}
              readOnly={readOnly}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ItemVendorDocument;
