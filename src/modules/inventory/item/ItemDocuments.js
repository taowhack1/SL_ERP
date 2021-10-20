import {
  BorderOutlined,
  CheckSquareOutlined,
  LockOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Col, Collapse, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../../components/CustomLabel";
import { AppContext, ItemContext } from "../../../include/js/context";
import { sortData } from "../../../include/js/function_main";
import ItemCertificate from "./ItemCertificate";
import ItemFileUpload from "./ItemFileUpload";
const { Panel } = Collapse;
const ItemDocuments = () => {
  const { department_id } = useSelector((state) => state.auth.authData);
  const { data_head } = useContext(ItemContext);
  const { pu_vendor } = data_head;
  console.log("pu_vendor", pu_vendor);
  let getDefaultDocs = data_head?.pu_vendor.filter(
    (obj) => obj?.item_vendor_default
  );
  let getOtherDocs = data_head?.pu_vendor.filter(
    (obj) => !obj?.item_vendor_default
  );
  getDefaultDocs.push(...getOtherDocs);
  const vendorDocs = sortData(getDefaultDocs);
  console.log("vendorDocs", vendorDocs);
  return (
    <>
      <Collapse defaultActiveKey={[0]}>
        {vendorDocs.map((obj) => {
          return (
            <Panel
              header={
                <Space>
                  <Text strong style={{ fontSize: 16 }} className="mr-1">
                    {obj?.vendor_no_name}
                    {obj?.item_vendor_default ? (
                      <CheckSquareOutlined
                        className="ml-2"
                        style={{ color: "#11C800", fontSize: 18 }}
                      />
                    ) : null}
                  </Text>
                </Space>
              }
              key={obj?.id}
            >
              <Row className="col-2">
                <Col span={12}>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={2} offset={1}>
                      {obj.item_vendor_detail.length &&
                      obj.item_vendor_detail[0]
                        .item_vendor_detail_specification ? (
                        <CheckSquareOutlined />
                      ) : (
                        <BorderOutlined />
                      )}
                    </Col>
                    <Col span={8}>
                      <CustomLabel
                        label={
                          obj?.item_vendor_detail_document.certificate["2"]
                            .file_type_name
                        }
                      />
                    </Col>
                    <Col span={13}>
                      {
                        // 1 = ADMIN , 10 = MIS , 11 = RD , 13 = PU ,17 = QC , 18 = SA , 20 = PD , 24 = WH , 90 = EXECUTIVE
                        // [1, 10, 11, 17, 20].includes(department_id) ? (
                        [1, 11, 13, 20].includes(department_id) ? (
                          <ItemFileUpload
                            data_file={obj?.item_vendor_detail_document}
                            updateFile={null}
                            chkbox_upload_fields={
                              obj.item_vendor_detail.length &&
                              obj.item_vendor_detail[0]
                                .item_vendor_detail_specification
                            }
                            maxFile={1}
                            file_type_id={2}
                            upload_type={"Button"}
                            readOnly={true}
                          />
                        ) : obj.item_vendor_detail.length &&
                          obj.item_vendor_detail[0]
                            .item_vendor_detail_specification ? (
                          <div className="blur-bg">
                            <LockOutlined className="button-icon mr-1 font-18" />
                            This file need permission to access.
                          </div>
                        ) : null
                      }
                    </Col>
                  </Row>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={2} offset={1}>
                      {obj?.item_vendor_detail.length &&
                      obj.item_vendor_detail[0].item_vendor_detail_msds ? (
                        <CheckSquareOutlined />
                      ) : (
                        <BorderOutlined />
                      )}
                    </Col>
                    <Col span={8}>
                      <CustomLabel
                        label={
                          obj?.item_vendor_detail_document.certificate["3"]
                            .file_type_name
                        }
                      />
                    </Col>
                    <Col span={13}>
                      {
                        // 1 = ADMIN , 10 = MIS , 11 = RD , 13 = PU ,17 = QC , 18 = SA , 20 = PD , 24 = WH , 90 = EXECUTIVE
                        [1, 10, 11, 13, 17, 24, 20].includes(department_id) ? (
                          <ItemFileUpload
                            data_file={obj?.item_vendor_detail_document}
                            updateFile={null}
                            chkbox_upload_fields={
                              obj?.item_vendor_detail.length &&
                              obj.item_vendor_detail[0].item_vendor_detail_msds
                            }
                            maxFile={1}
                            file_type_id={3}
                            upload_type={"Button"}
                            readOnly={true}
                          />
                        ) : (
                          <div className="blur-bg">
                            <LockOutlined className="button-icon mr-1 font-18" />
                            This file need permission to access.
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={2} offset={1}>
                      {obj?.item_vendor_detail.length &&
                      obj.item_vendor_detail[0].item_vendor_detail_quotation ? (
                        <CheckSquareOutlined />
                      ) : (
                        <BorderOutlined />
                      )}
                    </Col>
                    <Col span={8}>
                      <CustomLabel
                        label={
                          obj?.item_vendor_detail_document.certificate["4"]
                            .file_type_name
                        }
                      />
                    </Col>
                    <Col span={13}>
                      {
                        // 1 = ADMIN , 10 = MIS , 11 = RD , 13 = PU ,17 = QC , 18 = SA , 20 = PD , 24 = WH , 90 = EXECUTIVE
                        [1, 10, 11, 13, 20].includes(department_id) ? (
                          <ItemFileUpload
                            data_file={obj?.item_vendor_detail_document}
                            updateFile={null}
                            chkbox_upload_fields={
                              obj?.item_vendor_detail.length &&
                              obj.item_vendor_detail[0]
                                .item_vendor_detail_quotation
                            }
                            maxFile={1}
                            file_type_id={4}
                            upload_type={"Button"}
                            readOnly={true}
                          />
                        ) : (
                          <div className="blur-bg">
                            <LockOutlined className="button-icon mr-1 font-18" />
                            This file need permission to access.
                          </div>
                        )
                      }
                    </Col>
                  </Row>
                </Col>

                <Col span={12}>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={2} offset={1}>
                      {obj?.item_vendor_detail.length &&
                      obj.item_vendor_detail[0]
                        .item_vendor_detail_halal_cert ? (
                        <CheckSquareOutlined />
                      ) : (
                        <BorderOutlined />
                      )}
                    </Col>
                    <Col span={8}>
                      <CustomLabel
                        label={
                          obj?.item_vendor_detail_document.certificate["5"]
                            .file_type_name
                        }
                      />
                    </Col>
                    <Col span={13}>
                      <ItemFileUpload
                        data_file={obj?.item_vendor_detail_document}
                        updateFile={null}
                        chkbox_upload_fields={
                          obj?.item_vendor_detail.length &&
                          obj.item_vendor_detail[0]
                            .item_vendor_detail_halal_cert
                        }
                        maxFile={1}
                        file_type_id={5}
                        upload_type={"Button"}
                        readOnly={true}
                      />
                    </Col>
                  </Row>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={2} offset={1}>
                      {obj?.item_vendor_detail.length &&
                      obj.item_vendor_detail[0].item_vendor_detail_non_haram ? (
                        <CheckSquareOutlined />
                      ) : (
                        <BorderOutlined />
                      )}
                    </Col>
                    <Col span={8}>
                      <CustomLabel
                        label={
                          obj?.item_vendor_detail_document.certificate["6"]
                            .file_type_name
                        }
                      />
                    </Col>
                    <Col span={13}>
                      <ItemFileUpload
                        data_file={obj?.item_vendor_detail_document}
                        updateFile={null}
                        chkbox_upload_fields={
                          obj?.item_vendor_detail.length &&
                          obj.item_vendor_detail[0].item_vendor_detail_non_haram
                        }
                        maxFile={1}
                        file_type_id={6}
                        upload_type={"Button"}
                        readOnly={true}
                      />
                    </Col>
                  </Row>
                  <Row className="col-2 row-margin-vertical">
                    <Col span={2} offset={1}>
                      {obj?.item_vendor_detail.length &&
                      obj.item_vendor_detail[0].item_vendor_detail_non_halal ? (
                        <CheckSquareOutlined />
                      ) : (
                        <BorderOutlined />
                      )}
                    </Col>
                    <Col span={6}>
                      <CustomLabel label={"Non-Halal"} />
                    </Col>
                    <Col span={13}></Col>
                  </Row>
                </Col>
              </Row>
            </Panel>
          );
        })}
      </Collapse>
    </>
  );
};

export default ItemDocuments;
