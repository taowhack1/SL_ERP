import { Col, DatePicker, InputNumber, Row, Spin } from "antd";
import moment from "moment";
import React, { useMemo, useState } from "react";
import { apiGetBulkFG } from "../../../../actions/inventory";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import MainLayout from "../../../../components/MainLayout";
import { useFetch } from "../../../../include/js/customHooks";
import { getNumberFormat } from "../../../../include/js/main_config";
import MRPTestDetail from "./MRPTestDetail";

const MRPTest = () => {
  const { data: itemList, loading, error } = useFetch(apiGetBulkFG);
  const [state, setState] = useState({
    item_id: null,
    due_date: null,
    qty_batch: 0,
  });
  const { item_id, due_date, qty_batch } = state;
  const onChange = (data) => setState((prev) => ({ ...prev, ...data }));
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
                <Spin spinning={loading}>
                  <CustomSelect
                    allowClear
                    showSearch
                    placeholder={"Select Item"}
                    data={itemList}
                    field_id="item_id"
                    field_name="item_no_name"
                    value={item_id}
                    onChange={(val) => {
                      val
                        ? onChange({ item_id: val, qty_batch: 0 })
                        : onChange({ item_id: null, qty_batch: 0 });
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
                <InputNumber
                  {...getNumberFormat(4)}
                  min={0}
                  className="w-50"
                  placeholder={"FG Qty. / Bulk Batch Size"}
                  value={qty_batch}
                  onChange={(val) => onChange({ qty_batch: val })}
                />
              </Col>
            </Row>
            <Row className="col-2 mt-1 mb-1" gutter={8}>
              <Col span={6}>
                <CustomLabel require readOnly={false} label={"Due Date :"} />
              </Col>
              <Col span={18}>
                <DatePicker
                  className="w-50"
                  placeholder="Due Date"
                  format="DD/MM/YYYY"
                  value={due_date ? moment(due_date, "DD-MM-YYYY") : null}
                  onChange={(val) =>
                    onChange({
                      due_date: val ? moment(val).format("DD-MM-YYYY") : null,
                    })
                  }
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row className="col-2 mt-1 mb-1">
              <Col span={6}></Col>
              <Col span={18}></Col>
            </Row>
          </Col>
        </Row>
        <Row className="col-2 mt-1 mb-1">
          <Col span={24}>
            <MRPTestDetail {...state} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default MRPTest;
