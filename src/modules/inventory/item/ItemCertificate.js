import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Checkbox, Row, Col, Upload, Button } from "antd";
import Text from "antd/lib/typography/Text";
import ItemFileUpload from "./ItemFileUpload";
const ItemCertificate = ({ data_head, upDateFormValue, readOnly }) => {
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
              <Checkbox
                checked={data_head.item_specification}
                onChange={(e) =>
                  upDateFormValue({
                    item_specification: e.target.checked ? 1 : 0,
                  })
                }
              />
            </Col>
            <Col span={9}>
              <Text strong> Specification.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                chkbox_upload_fields={data_head.item_specification}
                file_Type_id={2}
                upload_type={"Button"}
              />
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={2}>
              <Checkbox
                checked={data_head.item_msds}
                onChange={(e) =>
                  upDateFormValue({
                    item_msds: e.target.checked ? 1 : 0,
                  })
                }
              />
            </Col>
            <Col span={9}>
              <Text strong> MSDS.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                chkbox_upload_fields={data_head.item_msds}
                file_Type_id={3}
                upload_type={"Button"}
              />
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={2}>
              <Checkbox
                checked={data_head.item_quotation}
                onChange={(e) =>
                  upDateFormValue({
                    item_quotation: e.target.checked ? 1 : 0,
                  })
                }
              />
            </Col>
            <Col span={9}>
              <Text strong> Quotation.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                chkbox_upload_fields={data_head.item_quotation}
                file_Type_id={4}
                upload_type={"Button"}
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
              <Checkbox
                checked={data_head.item_halal_cert}
                onChange={(e) =>
                  upDateFormValue({
                    item_halal_cert: e.target.checked ? 1 : 0,
                  })
                }
              />
            </Col>
            <Col span={9}>
              <Text strong> Halal Cert.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                chkbox_upload_fields={data_head.item_halal_cert}
                file_Type_id={5}
                upload_type={"Button"}
              />
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={1}></Col>
            <Col span={2}>
              <Checkbox
                checked={data_head.item_non_haram}
                onChange={(e) =>
                  upDateFormValue({
                    item_non_haram: e.target.checked ? 1 : 0,
                  })
                }
              />
            </Col>
            <Col span={9}>
              <Text strong> Non-Haram Statement.</Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                chkbox_upload_fields={data_head.item_non_haram}
                file_Type_id={5}
                upload_type={"Button"}
              />
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={1}></Col>
            <Col span={1}></Col>
            <Col span={2}>
              <Checkbox
                checked={data_head.item_non_halal}
                onChange={(e) =>
                  upDateFormValue({
                    item_non_halal: e.target.checked ? 1 : 0,
                  })
                }
              />
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
