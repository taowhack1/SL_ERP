/** @format */

import { ReloadOutlined, SyncOutlined } from "@ant-design/icons";
import { Col, Divider, InputNumber, message, Row, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useCallback, useContext } from "react";
import Swal from "sweetalert2";
import TotalFooter from "../../../components/TotalFooter";
import { api_get_uom_list } from "../../../include/js/api";
import { useFetch } from "../../../include/js/customHooks";
import { sumArrObj } from "../../../include/js/function_main";
import { convertDigit, getNumberFormat } from "../../../include/js/main_config";
import POFooterSummary from "./POFooterSummary";
import { POContext } from "./POFormDisplay";
import TablePODetail from "./TablePODetail";
import TablePOExtendedDetail from "./TablePOExtendedDetail";

const POFormDetail = () => {
  const { data: uomList, loading: getUOMLoading } = useFetch(api_get_uom_list);
  const { readOnly, poState, onAddItem, onChangePOState, onCalculateTotal } =
    useContext(POContext);

  console.log("POFormDetail poState", poState);
  const {
    po_detail,
    tg_po_sum_amount,
    tg_po_vat_amount,
    tg_po_total_amount,
    currency_no,
    po_discount,
  } = poState;
  //   const [state, setState] = useState([]);

  const onUseMOQ = useCallback(
    (id, moq = 0) => {
      onChangePOState({
        po_detail: po_detail.map((obj) => {
          const updateQty = moq < obj?.po_detail_qty ? obj?.po_detail_qty : moq;
          return obj?.id === id
            ? {
              ...obj,
              po_detail_qty: updateQty,
              old_po_detail_qty: obj?.po_detail_qty,
              po_detail_total_price: updateQty * obj?.po_detail_price,
            }
            : obj;
        }),
      });
    },
    [po_detail]
  );

  const onUseDefault = useCallback(
    (id) => {
      onChangePOState({
        po_detail: po_detail.map((obj) =>
          obj?.id === id
            ? {
              ...obj,
              po_detail_qty: obj?.old_po_detail_qty || 0,
              po_detail_total_price:
                obj?.old_po_detail_qty * obj?.po_detail_price,
            }
            : obj
        ),
      });
    },
    [po_detail]
  );

  const onChangeRemark = (id, value) => {
    Swal.fire({
      title: "",
      text: "",
      confirmButtonText: "Save",
      cancelButtonText: "Discard",
      showCancelButton: true,
      inputLabel: "Remark :",
      input: "textarea",
      inputValue: value,
      inputAttributes: {
        placeholder: "Remark.....",
      },
    }).then(({ isConfirmed, value }) => {
      if (isConfirmed) {
        onChangePOState({
          po_detail: po_detail.map((obj, idx) =>
            obj?.id === id ? { ...obj, po_detail_remark: value } : obj
          ),
        });
      }
    });
  };

  const onChangeValue = (id, data) => {
    console.log("onChange", id, data);
    if ([null, undefined].includes(id))
      return message.error(
        "Error!!. Can't update value. Missing record index."
      );

    onChangePOState({
      po_detail: po_detail.map((obj) =>
        obj?.id === id ? { ...obj, ...data } : obj
      ),
    });

    onChangePOState({ ...onCalculateTotal(poState) })
  };

  const onRemoveRow = (id) => {
    onChangePOState({
      po_detail: po_detail?.filter((obj) => obj?.id !== id),
    });
  };

  const itemFromPR = po_detail?.filter((obj) => {
    return obj?.po_detail_sub?.some((sub) => sub?.pr_detail_id);
  });

  const itemExtended = po_detail?.filter((obj) => {
    return !obj?.po_detail_sub?.some((sub) => sub?.pr_detail_id);
  });
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab='Edit Detail' key='1'>
          <TablePODetail
            {...{
              //   po_detail,
              po_detail: itemFromPR,
              onUseMOQ,
              onUseDefault,
              onChangeRemark,
              onChangeValue,
              uomList,
              getUOMLoading,
              readOnly,
              onAddItem,
            }}
          />
        </Tabs.TabPane>
      </Tabs>
      <Tabs>
        <Tabs.TabPane tab='Extended' key='2'>
          <TablePOExtendedDetail
            {...{
              //   po_detail,
              po_detail: itemExtended,
              onUseMOQ,
              onUseDefault,
              onChangeRemark,
              onChangeValue,
              uomList,
              getUOMLoading,
              readOnly,
              onAddItem,
              onRemoveRow,
            }}
          />
          {/* <POFooterSummary /> */}
        </Tabs.TabPane>
      </Tabs>
      <Divider className='divider-sm' />
      <Row className='col-2 row-margin-vertical'>
        <Col span={14}></Col>

        <Col span={6} className='text-number'>
          {/* <SyncOutlined
            className='button-icon mr-2'
            style={{ fontWieght: "bold" }}
            onClick={() => onChangePOState({ ...onCalculateTotal(poState) })}
          /> */}
          <Text strong>Extended Discount :</Text>
        </Col>
        <Col span={3} className='text-number'>
          <InputNumber
            {...getNumberFormat(4)}
            min={0}
            className='w-100'
            size='small'
            value={po_discount}
            onChange={(val) => {
              onChangePOState({
                po_discount: val,
              })

              onChangePOState({ ...onCalculateTotal(poState) })
            }
            }
          />
        </Col>
        <Col span={1} className='text-string'>
          <Text strong> {`${currency_no || "-"}`}</Text>
        </Col>
      </Row>
      {/* tg_po_sum_amount,
      tg_po_vat_amount,
      tg_po_total_amount */}
      <TotalFooter
        excludeVat={tg_po_sum_amount}
        vat={tg_po_vat_amount}
        includeVat={tg_po_total_amount}
        currency={currency_no}
      />
    </>
  );
};

export default React.memo(POFormDetail);
