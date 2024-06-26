import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Input, Typography, DatePicker } from "antd";
import { useSelector } from "react-redux";
import CustomSelect from "../../../../components/CustomSelect";
import CustomLabel from "../../../../components/CustomLabel";
import { ReceiveContext } from "../../../../include/js/context";
import moment from "moment";
import { getMRPRefForReceive } from "../../../../actions/production/mrpActions";
const { Text } = Typography;
const ReceiveHead = () => {
  const { readOnly, mainState, initialStateHead, saveForm, mrpRefList } =
    useContext(ReceiveContext);
  const vendors = useSelector((state) => state.purchase.vendor.vendor_list);
  const po_list = useSelector((state) => state.inventory.receive.po_ref);
  const [state, setState] = useState(mainState);


  const save = (data, po_id) => {
    saveForm({ ...state, ...data }, po_id ?? null);
  };
  const changeState = (data) => {
    setState({ ...state, ...data });
  };
  const resetForm = () => {
    setState(initialStateHead);
    save(initialStateHead);
  };

  useEffect(() => {
    setState(mainState);
  }, [mainState]);


  console.log("mainState", mainState, state)
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        {/* 1 */}
        <Col span={3}>
          <CustomLabel label={"Description :"} require readOnly={readOnly} />
        </Col>
        <Col span={8}>
          {readOnly ? (
            <Text className="text-value">{state.receive_description}</Text>
          ) : (
            <Input
              name="receive_description"
              onChange={(e) =>
                changeState({
                  receive_description: e.target.value,
                })
              }
              onBlur={() => save()}
              value={state.receive_description}
              placeholder="Description"
            />
          )}
        </Col>
        <Col span={2}></Col>
        <Col span={3}>
          <CustomLabel label={"Vendor :"} readOnly={readOnly} />
        </Col>
        <Col span={8}>
          {readOnly || state.po_id ? (
            <Text className="text-value">{state.vendor_no_name ?? "-"}</Text>
          ) : (
            <CustomSelect
              placeholder={"Vendor"}
              allowClear
              showSearch
              name="vendor_id"
              field_id="vendor_id"
              field_name="vendor_no_name"
              value={state.vendor_no_name}
              data={vendors}
              onBlur={() => save()}
              onChange={(data, option) =>
                data
                  ? changeState({
                    vendor_id: option.data.vendor_id,
                    vendor_no_name: option.data.vendor_no_name,
                    payment_term_id: option.data.payment_term_id,
                    payment_term_no_name: option.data.payment_term_no_name,
                    currency_id: option.data.currency_id,
                    currency_no: option.data.currency_no,
                    vat_rate: option.data.vat_rate,
                  })
                  : changeState({
                    vendor_id: null,
                    vendor_no_name: null,
                    payment_term_id: null,
                    payment_term_no_name: null,
                    currency_id: 1,
                    currency_no: "THB",
                    vat_rate: 0,
                  })
              }
            />
          )}
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical ">
        <Col span={3}>
          <CustomLabel label={"PO Ref. :"} readOnly={readOnly} />
        </Col>
        <Col span={8}>
          {/* PO Ref */}
          {readOnly ? (
            <Text className="text-value">{state.po_no_description ?? "-"}</Text>
          ) : (
            <CustomSelect
              allowClear
              showSearch
              placeholder={"PO No. ex.PO2009000x"}
              name="po_id"
              field_id="po_id"
              field_name="po_no_description"
              value={state.po_no_description}
              data={po_list}
              onChange={(data, option) => {
                if (data) {
                  save(option.data, option.data.po_id);
                } else {
                  resetForm();
                }
              }}
            />
          )}
        </Col>

        <Col span={2}></Col>
        <Col span={3}>
          <CustomLabel label={"Order Date :"} readOnly={readOnly} />
        </Col>
        <Col span={8}>
          {readOnly || state.po_id ? (
            <Text className="text-value">{state.receive_order_date}</Text>
          ) : (
            <DatePicker
              format={"DD/MM/YYYY"}
              className={"full-width"}
              name={`receive_order_date`}
              placeholder="Order Date"
              value={
                state.receive_order_date
                  ? moment(state.receive_order_date, "DD/MM/YYYY")
                  : null
              }
              onChange={(data) => {
                data
                  ? changeState({
                    receive_order_date: data.format("DD/MM/YYYY"),
                  })
                  : changeState({
                    receive_order_date: null,
                  });
              }}
              onBlur={() => save()}
            />
          )}
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <CustomLabel label={"Invoice No :"} readOnly={readOnly} />
        </Col>
        <Col span={8}>
          {readOnly ? (
            <Text className="text-value">{state.receive_invoice_no}</Text>
          ) : (
            <Input
              name="receive_invoice_no"
              className="full-width"
              placeholder={"Invoice No"}
              value={state.receive_invoice_no}
              onChange={(e) =>
                changeState({
                  receive_invoice_no: e.target.value,
                })
              }
              onBlur={() => save()}
            />
          )}
        </Col>
        <Col span={2}></Col>

        <Col span={3}>
          <CustomLabel label={"Currency :"} readOnly={readOnly} />
        </Col>
        <Col span={8}>
          <Text className="text-view">{state.currency_no ?? "THB"}</Text>
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <CustomLabel label={"Invoice Date :"} readOnly={readOnly} />
        </Col>
        <Col span={8}>
          {readOnly ? (
            <Text className="text-value">{state.receive_invoice_date}</Text>
          ) : (
            <DatePicker
              format={"DD/MM/YYYY"}
              className={"full-width"}
              name={`receive_invoice_date`}
              placeholder="Invoice Date"
              value={
                state.receive_invoice_date
                  ? moment(state.receive_invoice_date, "DD/MM/YYYY")
                  : null
              }
              onChange={(data) => {
                data
                  ? changeState({
                    receive_invoice_date: data.format("DD/MM/YYYY"),
                  })
                  : changeState({
                    receive_invoice_date: null,
                  });
              }}
              onBlur={() => save()}
            />
          )}
        </Col>

        <Col span={2}></Col>
        <Col span={3}>
          <CustomLabel label={"Job Ref. :"} readOnly={readOnly} />
        </Col>
        <Col span={8}>
          {
            readOnly ? (
              <Text className="text-value">{state?.mrp_no_description || "-"}</Text>
            ) : (
              <CustomSelect
                allowClear
                showSearch
                disabled={mrpRefList?.data?.length > 1 ? false : true}
                placeholder={"MRP No."}
                name="mrp_id"
                field_id="mrp_id"
                field_name="mrp_no_description"
                value={state?.mrp_id}
                data={mrpRefList?.data || []}
                onBlur={() => save()}
                onChange={(data, option) => {
                  console.log("option", option)
                  data !== undefined
                    ? changeState({
                      mrp_id: option?.data?.mrp_id,
                      mrp_no_description: option?.data?.mrp_no_description,
                    })
                    : changeState({
                      mrp_id: null,
                      mrp_no_description: null,
                    });
                }} />
            )
          }
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ReceiveHead);
