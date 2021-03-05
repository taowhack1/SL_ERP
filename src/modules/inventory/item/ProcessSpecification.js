import { ProfileOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../components/CustomLabel";
import { ItemContext } from "../../../include/js/context";
import ItemFileUpload from "./ItemFileUpload";

const ProcessSpecification = () => {
  const { updateFile, data_file, readOnly } = useContext(ItemContext);
  return (
    <>
      <Row className="col-2 row-margin-vertical detail-tab-row ">
        <Col span={24}>
          <Space>
            <Text strong style={{ fontSize: 16, marginRight: 10 }}>
              <ProfileOutlined style={{ marginRight: 10 }} />
              Process Specification Documents
            </Text>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row className="col-2 mt-1 align-bt">
            <Col span={6}>
              <CustomLabel label={"Document"} readOnly={readOnly} />
            </Col>
            <Col span={16}>
              <ItemFileUpload
                data_file={data_file}
                updateFile={updateFile}
                chkbox_upload_fields={true}
                maxFile={1}
                file_type_id={9}
                upload_type={"Button"}
                readOnly={readOnly}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}></Col>
      </Row>
    </>
  );
};

export default React.memo(ProcessSpecification);
