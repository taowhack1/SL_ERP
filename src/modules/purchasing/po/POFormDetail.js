import { message, Tabs } from "antd";
import React, { useCallback, useContext } from "react";
import Swal from "sweetalert2";
import { api_get_uom_list } from "../../../include/js/api";
import { useFetch } from "../../../include/js/customHooks";
import POFooterSummary from "./POFooterSummary";
import { POContext } from "./POFormDisplay";
import TablePODetail from "./TablePODetail";
import TablePOExtendedDetail from "./TablePOExtendedDetail";

const POFormDetail = () => {
  const { data: uomList, loading: getUOMLoading } = useFetch(api_get_uom_list);
  const { readOnly, poState, onAddItem, onChangePOState } =
    useContext(POContext);

  console.log("POFormDetail poState", poState);
  const { po_detail } = poState;
  //   const [state, setState] = useState([]);

  const onUseMOQ = useCallback(
    // onClick use MOQ set data to all PR
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
    // onClick use default qty set data to all PR
    (id) => {
      console.log("onUseDefault", id);

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
    // onChange Remark set to detail header remark
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
  };

  const onRemoveRow = (id) => {
    onChangePOState({
      po_detail: po_detail?.filter((obj) => obj?.id !== id),
    });
  };

  console.log("po_detail", po_detail);
  const itemFromPR = po_detail?.filter((obj) => {
    console.log(
      "check Form PR",
      obj?.po_detail_sub?.some((sub) => sub?.pr_detail_id)
    );
    return obj?.po_detail_sub?.some((sub) => sub?.pr_detail_id);
  });
  const itemExtended = po_detail?.filter((obj) => {
    console.log(
      "check Entended PR",
      !obj?.po_detail_sub?.some((sub) => sub?.pr_detail_id)
    );
    return !obj?.po_detail_sub?.some((sub) => sub?.pr_detail_id);
  });

  console.log("itemFromPR", itemFromPR);
  console.log("itemExtended", itemExtended);
  return (
    <>
      <Tabs>
        <Tabs.TabPane tab="Edit Detail" key="1">
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
        <Tabs.TabPane tab="Extended" key="2">
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
    </>
  );
};

export default React.memo(POFormDetail);
