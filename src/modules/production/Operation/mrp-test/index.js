import { Checkbox, Col, InputNumber, message, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useMemo, useState } from "react";
import { apiGetBulkFG } from "../../../../actions/inventory";
import { getMRPTest } from "../../../../actions/production/mrpActions";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import MainLayout from "../../../../components/MainLayout";
import { useFetch } from "../../../../include/js/customHooks";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../include/js/main_config";
import MRPTestDetail from "./MRPTestDetail";
const initialState = {
  main: {
    item_id: null,
    qty_batch: 0,
    include_bulk_on_stock: 0,
  },
  detail: {
    data: {},
    loading: false,
  },
};
const MRPTest = () => {
  const { data: itemList, loading, error } = useFetch(apiGetBulkFG);
  const [state, setState] = useState(initialState.main);
  const { item_id, qty_batch, include_bulk_on_stock } = state;

  const [stateDetail, setStateDetail] = useState(initialState.detail);
  const {
    data: {
      item_id_ref,
      item_no_name_ref,
      mrp_qty_produce_ref,
      uom_no_ref,
      uom_no,
      mrp_qty_produce_ref_stock,
      mrp_qty_produce_ref_before,
    },
    loading: detailLoading,
  } = stateDetail || {};

  const onChange = (data) => setState((prev) => ({ ...prev, ...data }));
  const resetDetail = () => {
    setStateDetail(initialState.detail);
  };
  const onCalculate = async () => {
    setStateDetail((prev) => ({ ...prev, loading: true }));
    const resp = await getMRPTest({
      item_id,
      qty_batch,
      include_bulk_on_stock,
    });
    if (resp.success) {
      setStateDetail((prev) => ({
        ...prev,
        loading: false,
        data: resp.data[0],
      }));
    } else {
      message.error(resp.message);
      setStateDetail((prev) => ({ ...prev, loading: false }));
    }
  };

  const layoutConfig = useMemo(
    () => ({
      projectId: 10, // project ID from DB
      title: "PRODUCTION", // project name
      home: "/production", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Home", "Operations", "MRP - Material Checking"], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: [], // button
      badgeCont: 0, //number
      step: null, // object {current:0,step:[],process_complete:bool}
      create: "", // path or "modal" and use openModal() instead
      edit: "", // object {data: any , path : "string"} or function
      discard: "", //path
      back: "", //path
      save: "", //path if not path use "function" and use onSave instead.
      onConfirm: () => console.log("Confirm"),
      onApprove: () => console.log("Approve"),
      onReject: () => console.log("Reject"),
      onCancel: () => console.log("Cancel"),
      onSearch: (keyword) => console.log("Search Key", keyword),
      openModal: () => console.log("openModal"),
      searchBar: null, //html code this show below search input
    }),
    []
  );

  const detailValue = useMemo(
    () => ({
      ...state,
      stateDetail,
      onCalculate,
    }),
    [state, stateDetail]
  );

  return (
    <MainLayout {...layoutConfig}>
      <div id="form">
        <div className="mt-1 pm-3 under-line text-center">
          <h2>MRP Material Checking</h2>
        </div>
        <Row className="col-2 mt-1 mb-1" gutter={16}>
          <Col span={12}>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel require readOnly={false} label={"Item :"} />
              </Col>
              <Col span={18}>
                <Spin spinning={loading || detailLoading}>
                  <CustomSelect
                    allowClear
                    showSearch
                    placeholder={"Select Item"}
                    data={itemList}
                    field_id="item_id"
                    field_name="item_no_name"
                    value={item_id}
                    onChange={(val, row) => {
                      val
                        ? onChange({
                            item_id: val,
                            qty_batch: 0,
                            include_bulk_on_stock: 0,
                          })
                        : onChange({
                            item_id: null,
                            qty_batch: 0,
                            include_bulk_on_stock: 0,
                          });
                      resetDetail();
                    }}
                  />
                </Spin>
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel
                  require
                  readOnly={false}
                  label={"Qty. / Batch Size :"}
                />
              </Col>
              <Col span={18}>
                <Spin spinning={loading || detailLoading}>
                  <InputNumber
                    {...getNumberFormat(4)}
                    min={0}
                    className="w-50"
                    placeholder={"FG Qty. / Bulk Batch Size"}
                    value={qty_batch}
                    onChange={(val) => {
                      onChange({ qty_batch: val });
                      resetDetail();
                    }}
                  />
                </Spin>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={16} className={"text-value"} offset={6}>
                <>
                  <Spin spinning={loading || detailLoading}>
                    <Checkbox
                      onChange={(e) => {
                        onChange({
                          include_bulk_on_stock: e.target.checked ? 1 : 0,
                        });
                        resetDetail();
                      }}
                      checked={include_bulk_on_stock}
                    />
                    <Text strong className="ml-2">
                      Include bulk on stock
                    </Text>
                  </Spin>
                </>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={7}>
                <CustomLabel
                  label={`Bulk For FG. ( ${uom_no_ref || uom_no || " - "} ) :`}
                  require
                  readOnly={false}
                />
              </Col>
              <Col span={15} className={"text-right"}>
                <Text className="text-value pd-right-2">
                  {convertDigit(mrp_qty_produce_ref_before, 4)}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={7}>
                <CustomLabel
                  label={`Use Bulk On Stock. ( ${
                    uom_no_ref || uom_no || " - "
                  } ) :`}
                  require
                  readOnly={false}
                />
              </Col>
              <Col span={15} className={"text-right"}>
                <Text className="text-value pd-right-2">
                  {convertDigit(mrp_qty_produce_ref_stock, 4)}
                </Text>
              </Col>
            </Row>
            <Row className="col-2 row-margin-vertical">
              <Col span={7}>
                <CustomLabel
                  label={`Bulk Production. ( ${
                    uom_no_ref || uom_no || " - "
                  } ) :`}
                  require
                  readOnly={false}
                />
              </Col>
              <Col span={15} className={"text-right"}>
                <Text className="text-value pd-right-2">
                  {convertDigit(mrp_qty_produce_ref, 4)}
                </Text>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            {item_id_ref && (
              <>
                <Row className="col-2 mt-1 mb-1">
                  <Col span={6}>
                    <CustomLabel readOnly={false} label={"Bulk Item :"} />
                  </Col>
                  <Col span={18}>
                    <Text className="pre-wrap">{item_no_name_ref || "-"}</Text>
                  </Col>
                </Row>
                <Row className="col-2 mt-1 mb-1">
                  <Col span={6}>
                    <CustomLabel readOnly={false} label={"Bulk Qty. :"} />
                  </Col>
                  <Col span={18}>
                    <Text className="text-value pre-wrap">
                      {convertDigit(mrp_qty_produce_ref, 6) || "-"}
                    </Text>
                    <Text className="pd-left-3" strong>
                      {uom_no_ref || "-"}
                    </Text>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
        <Row className="col-2 mt-1 mb-1">
          <Col span={24}>
            <MRPTestDetail {...detailValue} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default MRPTest;
