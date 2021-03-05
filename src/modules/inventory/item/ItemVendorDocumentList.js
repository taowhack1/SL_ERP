import {
  BorderOutlined,
  CheckSquareOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Row, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../../components/CustomLabel";
import CustomSelect from "../../../components/CustomSelect";
import CustomUpload from "../../../components/CustomUpload";
import ItemVendorDocument from "./ItemVendorDocument";

const ItemVendorDocuments = ({
  visible,
  vendorData,
  readOnly,
  setModalState,
}) => {
  const { country } = useSelector((state) => state.hrm);
  const itemVendorFileDetail = {
    file_specification: {
      checked: false,
      file_path: null,
      file_name: null,
      file_type: null,
    },
    file_msds: {
      checked: false,
      file_path: null,
      file_name: null,
      file_type: null,
    },
    file_quotation: {
      checked: false,
      file_path: null,
      file_name: null,
      file_type: null,
    },
    file_halal_cert: {
      checked: false,
      file_path: null,
      file_name: null,
      file_type: null,
    },
    file_non_haram: {
      checked: false,
      file_path: null,
      file_name: null,
      file_type: null,
    },
    file_non_halal: {
      checked: false,
      file_path: null,
      file_name: null,
      file_type: null,
    },
  };
  return (
    <>
      <Modal
        title={
          <>
            <ProfileOutlined style={{ marginRight: 10 }} />
            <Text strong>{"Detail"}</Text>
          </>
        }
        visible={visible}
        width={1000}
        destroyOnClose
        onCancel={() => setModalState({ visible: false, vendorData: null })}
        footer={
          <>
            <Button
              className="primary"
              onClick={() =>
                setModalState({ visible: false, vendorData: null })
              }
            >
              Close
            </Button>
          </>
        }
      >
        <Row>
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label={"Country"} readOnly={readOnly} />
              </Col>
              <Col span={17}>
                <CustomSelect
                  placeholder={"Country"}
                  data={country ?? []}
                  field_id={"country_id"}
                  field_name={"country_name"}
                />
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label={"Manufacturer"} readOnly={readOnly} />
              </Col>
              <Col span={17}>
                <TextArea placeholder={"Manufacturer"} rows={4} />
              </Col>
            </Row>
          </Col>
          <Col span={12}></Col>
        </Row>
        <Row className="col-2 row-margin-vertical detail-tab-row">
          <Space>
            <Text strong style={{ fontSize: 16, marginRight: 10 }}>
              <ProfileOutlined style={{ marginRight: 10 }} />
              {"Documents."}
            </Text>
          </Space>
        </Row>
        <Row>
          <Col span={12} className="col-border-right">
            <ItemVendorDocument
              readOnly={readOnly}
              fileDetail={itemVendorFileDetail.file_specification}
              label={"Specification."}
              checked={itemVendorFileDetail.file_specification.checked}
              upload={true}
            />
            <ItemVendorDocument
              readOnly={readOnly}
              fileDetail={itemVendorFileDetail.file_msds}
              label={"MSDS."}
              checked={itemVendorFileDetail.file_msds.checked}
              upload={true}
            />
            <ItemVendorDocument
              readOnly={readOnly}
              fileDetail={itemVendorFileDetail.file_quotation}
              checked={itemVendorFileDetail.file_quotation.checked}
              label={"Quotation."}
              upload={true}
            />
          </Col>
          <Col span={12}>
            <ItemVendorDocument
              readOnly={readOnly}
              fileDetail={itemVendorFileDetail.file_halal_cert}
              checked={itemVendorFileDetail.file_halal_cert.checked}
              label={"Halal Cert."}
              upload={true}
            />
            <ItemVendorDocument
              readOnly={readOnly}
              fileDetail={itemVendorFileDetail.file_non_haram}
              checked={itemVendorFileDetail.file_non_haram.checked}
              label={"Non-Haram Statement."}
              upload={true}
            />
            <ItemVendorDocument
              readOnly={readOnly}
              fileDetail={itemVendorFileDetail.file_non_halal}
              checked={itemVendorFileDetail.file_non_halal.checked}
              label={"Non-Halal."}
              upload={false}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default React.memo(ItemVendorDocuments);
