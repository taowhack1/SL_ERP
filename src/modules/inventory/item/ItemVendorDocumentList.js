import { ProfileOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useCallback, useContext, useState } from "react";
import { ItemContext } from "../../../include/js/context";
import ItemVendorDocument from "./ItemVendorDocument";
import { itemVendorDocumentFields } from "../config/item";
const ItemVendorDocumentList = ({
  vendorDetail,
  onChange,
  file,
  onChangeFile,
}) => {
  console.log("file", file);
  return (
    <>
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
            fileTypeId={2}
            file={file}
            onChange={onChange}
            onChangeFile={onChangeFile}
            label={"Specification."}
            field={"item_vendor_detail_specification"}
            checked={vendorDetail.item_vendor_detail_specification}
            enableUpload={true}
          />
          <ItemVendorDocument
            fileTypeId={3}
            file={file}
            onChange={onChange}
            onChangeFile={onChangeFile}
            label={"MSDS."}
            field={"item_vendor_detail_msds"}
            checked={vendorDetail.item_vendor_detail_msds}
            enableUpload={true}
          />
          <ItemVendorDocument
            fileTypeId={4}
            file={file}
            onChange={onChange}
            onChangeFile={onChangeFile}
            field={"item_vendor_detail_quotation"}
            checked={vendorDetail.item_vendor_detail_quotation}
            label={"Quotation."}
            enableUpload={true}
          />
        </Col>
        <Col span={12}>
          <ItemVendorDocument
            fileTypeId={5}
            file={file}
            onChange={onChange}
            onChangeFile={onChangeFile}
            field={"item_vendor_detail_halal_cert"}
            checked={vendorDetail.item_vendor_detail_halal_cert}
            label={"Halal Cert."}
            enableUpload={true}
          />
          <ItemVendorDocument
            fileTypeId={6}
            file={file}
            onChange={onChange}
            onChangeFile={onChangeFile}
            field={"item_vendor_detail_non_haram"}
            checked={vendorDetail.item_vendor_detail_non_haram}
            label={"Non-Haram Statement."}
            enableUpload={true}
          />
          <ItemVendorDocument
            file={file}
            onChange={onChange}
            onChangeFile={onChangeFile}
            field={"item_vendor_detail_non_halal"}
            checked={vendorDetail.item_vendor_detail_non_halal}
            label={"Non-Halal."}
            enableUpload={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ItemVendorDocumentList);
