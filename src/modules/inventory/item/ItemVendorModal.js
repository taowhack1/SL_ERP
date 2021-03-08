import {
  BorderOutlined,
  CheckSquareOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Row, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, {
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../../components/CustomLabel";
import CustomSelect from "../../../components/CustomSelect";
import CustomUpload from "../../../components/CustomUpload";
import { ItemContext } from "../../../include/js/context";
import { sortDataWithoutCommit } from "../../../include/js/function_main";
import { mainReducer } from "../../../include/reducer";
import {
  itemVendorDetailFields,
  itemVendorDocumentFields,
} from "../config/item";
import ItemVendorDocument from "./ItemVendorDocument";
import ItemVendorDocumentList from "./ItemVendorDocumentList";
import ItemVendorTradeName from "./ItemVendorTradeName";

const ItemVendorModal = ({
  visible,
  vendorData,
  setModalState,
  onChangeVendorState,
}) => {
  const { id: headId, item_vendor_detail: headDetail } = vendorData;

  const { vendorFile, updateFileVendor, readOnly } = useContext(ItemContext);
  console.log("vendorFile", vendorFile);
  const { country } = useSelector((stateDetail) => stateDetail.hrm);

  const [stateDetail, setStateDetail] = useState({
    ...(headDetail[0] || itemVendorDetailFields),
  });

  const [stateFile, setStateFile] = useState({
    certificate: vendorFile[headId].certificate,
  });
  const onChangeFile = useCallback(
    (data, type) => {
      setStateFile({
        ...stateFile,
        certificate: { ...stateFile.certificate, ...data },
      });
    },
    [stateFile]
  );

  const onChangeValue = (data) => {
    console.log("onChangeValue", data);
    setStateDetail({ ...stateDetail, ...data, commit: 1 });
  };
  const saveCloseModal = () => {
    if (!readOnly) {
      onChangeVendorState(headId, {
        item_vendor_detail: [stateDetail],
        item_vendor_detail_document: stateFile,
      });
      updateFileVendor(headId, stateFile.certificate);
    }

    setModalState({ visible: false, vendorData: null });
  };

  console.log("vendorData", vendorData);
  console.log("stateDetail", stateDetail);
  console.log("stateFile", stateFile);
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
        onCancel={saveCloseModal}
        footer={
          <>
            <Button className="primary" onClick={saveCloseModal}>
              Close
            </Button>
          </>
        }
      >
        <Row>
          <Col span={12}>
            <ItemVendorTradeName
              vendorData={vendorData}
              onBlur={onChangeVendorState}
            />
          </Col>
          <Col span={12}>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label={"Country"} readOnly={readOnly} />
              </Col>
              <Col span={17}>
                {readOnly ? (
                  <Text className="text-value">{stateDetail.country_name}</Text>
                ) : (
                  <CustomSelect
                    placeholder={"Country"}
                    data={country ?? []}
                    field_id={"country_id"}
                    field_name={"country_name"}
                    value={stateDetail.country_name}
                    onChange={(val, obj) => {
                      val
                        ? onChangeValue({
                            country_id: obj.data.country_id,
                            country_name: obj.data.country_name,
                          })
                        : onChangeValue({
                            country_id: null,
                            country_name: null,
                          });
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <CustomLabel label={"Manufacturer"} readOnly={readOnly} />
              </Col>
              <Col span={17}>
                {readOnly ? (
                  <Text className="text-value">
                    {stateDetail.item_vendor_detail_manufacturer}
                  </Text>
                ) : (
                  <TextArea
                    placeholder={"Manufacturer"}
                    rows={4}
                    name={"item_vendor_detail_manufacturer"}
                    value={stateDetail.item_vendor_detail_manufacturer}
                    onChange={(e) =>
                      onChangeValue({
                        item_vendor_detail_manufacturer: e.target.value,
                      })
                    }
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <ItemVendorDocumentList
          vendorData={vendorData}
          vendorDetail={stateDetail}
          onChange={onChangeValue}
          file={stateFile}
          onChangeFile={onChangeFile}
        />
      </Modal>
    </>
  );
};

export default React.memo(ItemVendorModal);
