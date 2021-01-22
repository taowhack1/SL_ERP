import React from "react";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Checkbox, Row, Col, Space } from "antd";
import Text from "antd/lib/typography/Text";
import ItemFileUpload from "./ItemFileUpload";
const ItemCertificate = ({
  data_head,
  upDateFormValue,
  readOnly,
  data_file,
  updateFile,
}) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical detail-tab-row">
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Documents
          </Text>
        </Col>
      </Row>
      <Row className="col-2 row-tab-margin">
        <Col
          span={12}
          style={{
            borderRight: "1px solid #c4c4c4",
          }}
        >
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={2}>
              {readOnly ? (
                <Space align="baseline">
                  {data_head.item_specification ? (
                    <CheckSquareOutlined />
                  ) : (
                    <BorderOutlined />
                  )}
                </Space>
              ) : (
                <Checkbox
                  checked={data_head.item_specification}
                  onChange={(e) =>
                    upDateFormValue({
                      item_specification: e.target.checked ? 1 : 0,
                    })
                  }
                />
              )}
            </Col>
            <Col span={9}>
              <Text strong> Specification.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                data_file={data_file}
                updateFile={updateFile}
                chkbox_upload_fields={data_head.item_specification}
                maxFile={1}
                file_type_id={2}
                upload_type={"Button"}
                readOnly={readOnly}
              />
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={2}>
              {readOnly ? (
                <Space align="baseline">
                  {data_head.item_msds ? (
                    <CheckSquareOutlined />
                  ) : (
                    <BorderOutlined />
                  )}
                </Space>
              ) : (
                <Checkbox
                  checked={data_head.item_msds}
                  onChange={(e) =>
                    upDateFormValue({
                      item_msds: e.target.checked ? 1 : 0,
                    })
                  }
                />
              )}
            </Col>
            <Col span={9}>
              <Text strong> MSDS.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                data_file={data_file}
                updateFile={updateFile}
                chkbox_upload_fields={data_head.item_msds}
                maxFile={1}
                file_type_id={3}
                upload_type={"Button"}
                readOnly={readOnly}
              />
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={2}>
              {readOnly ? (
                <Space align="baseline">
                  {data_head.item_quotation ? (
                    <CheckSquareOutlined />
                  ) : (
                    <BorderOutlined />
                  )}
                </Space>
              ) : (
                <Checkbox
                  checked={data_head.item_quotation}
                  onChange={(e) =>
                    upDateFormValue({
                      item_quotation: e.target.checked ? 1 : 0,
                    })
                  }
                />
              )}
            </Col>
            <Col span={9}>
              <Text strong> Quotation.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                data_file={data_file}
                updateFile={updateFile}
                chkbox_upload_fields={data_head.item_quotation}
                maxFile={1}
                file_type_id={4}
                upload_type={"Button"}
                readOnly={readOnly}
              />
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
        {/* Right Row */}
        <Col span={12}>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={1}></Col>
            <Col span={2}>
              {readOnly ? (
                <Space align="baseline">
                  {data_head.item_halal_cert ? (
                    <CheckSquareOutlined />
                  ) : (
                    <BorderOutlined />
                  )}
                </Space>
              ) : (
                <Checkbox
                  checked={data_head.item_halal_cert}
                  onChange={(e) =>
                    upDateFormValue({
                      item_halal_cert: e.target.checked ? 1 : 0,
                    })
                  }
                />
              )}
            </Col>
            <Col span={9}>
              <Text strong> Halal Cert.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                data_file={data_file}
                updateFile={updateFile}
                chkbox_upload_fields={data_head.item_halal_cert}
                maxFile={1}
                file_type_id={5}
                upload_type={"Button"}
                readOnly={readOnly}
              />
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={1}></Col>
            <Col span={2}>
              {readOnly ? (
                <Space align="baseline">
                  {data_head.item_non_haram ? (
                    <CheckSquareOutlined />
                  ) : (
                    <BorderOutlined />
                  )}
                </Space>
              ) : (
                <Checkbox
                  checked={data_head.item_non_haram}
                  onChange={(e) =>
                    upDateFormValue({
                      item_non_haram: e.target.checked ? 1 : 0,
                    })
                  }
                />
              )}
            </Col>
            <Col span={9}>
              <Text strong> Non-Haram Statement.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                data_file={data_file}
                updateFile={updateFile}
                chkbox_upload_fields={data_head.item_non_haram}
                maxFile={1}
                file_type_id={6}
                upload_type={"Button"}
                readOnly={readOnly}
              />
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={1}></Col>
            <Col span={2}>
              {readOnly ? (
                <Space align="baseline">
                  {data_head.item_non_halal ? (
                    <CheckSquareOutlined />
                  ) : (
                    <BorderOutlined />
                  )}
                </Space>
              ) : (
                <Checkbox
                  checked={data_head.item_non_halal}
                  onChange={(e) =>
                    upDateFormValue({
                      item_non_halal: e.target.checked ? 1 : 0,
                    })
                  }
                />
              )}
            </Col>
            <Col span={9}>
              <Text strong> Non-Halal.</Text>
            </Col>
            <Col span={10}></Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ItemCertificate);
