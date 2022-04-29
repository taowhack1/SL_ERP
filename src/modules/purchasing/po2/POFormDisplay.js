import React, { useContext, useEffect, useMemo, useState } from "react";
import MainLayout from "../../../components/MainLayout";
import { Button, Divider, message } from "antd";
import POForm from "./POForm";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  api_currency,
  api_payment_term_vendor,
  api_vat_id,
  api_vendor_list,
} from "../../../include/js/api";
import { useFetch } from "../../../include/js/customHooks";
import { AppContext } from "../../../include/js/context";
import { useHistory, useParams } from "react-router";
import {
  sortData,
  sumArrObj,
  validateFormDetail,
  validateFormHead,
} from "../../../include/js/function_main";
import { persistFormPO, savePO } from "../../../actions/purchase/PO_Actions";
import { useDispatch, useSelector } from "react-redux";
import { approveFunction } from "../../../actions";
import Swal from "sweetalert2";
import Authorize from "../../system/Authorize";
import { get_log_by_id, reset_comments } from "../../../actions/comment&log";
import Comments from "../../../components/Comments";
import moment from "moment";
import Text from "antd/lib/typography/Text";
export const POContext = React.createContext();
const apiGetPOByID = `/purchase/po`;
const POFormDisplay = () => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const dataComments = useSelector((state) => state.log.comment_log);
  const { form } = useSelector((state) => state?.purchase?.operations?.po);
  const { id } = useParams();
  const [config, setConfig] = useState({
    loading: false,
    readOnly: true,
    data: null,
  });
  const getPO = useFetch(
    `${apiGetPOByID}/${user_name}&${id}`,
    [null, undefined, "new"].includes(id) || !user_name
  );
  const {
    data: po = [],
    error: getPOError,
    loading: getPOLoading = false,
  } = getPO || {};

  const getVendor = useFetch(`${api_vendor_list}`, config?.readOnly);
  const getVat = useFetch(`${api_vat_id}`, config?.readOnly);
  const getCurrency = useFetch(`${api_currency}`, config?.readOnly);
  const getPaymentTerms = useFetch(
    `${api_payment_term_vendor}`,
    config?.readOnly
  );

  const [poState, setPOState] = useState(initialState);

  const onSelect = ({ checked = false, data = {} }) => {
    console.log("poState", poState);
    console.log("onSelect", checked, data);
    setPOState((state) => {
      const { pr_selected = [], po_detail = [] } = state || {};
      {
        /*
        1. เอาตัวที่เลือกมา ถ้า checked = true > เช็คว่ามี item ใน po_detail แล้วรึยัง
        2. ถ้ามีใน po_detail ให้เพิ่มไปใน po_detail_sub และคำนวณ Qty. และราคารวมใหม่
        3. ถ้าไม่มีให้เพิ่ม po_detail ขึ้น พร้อมไส้เป็น item เดียวกัน
      */
      }

      let tempPO = {};
      const {
        pr_detail_id,
        item_id,
        item_no_name,
        vendor_id,
        vendor_no_name,
        payment_term_id,
        payment_term_name,
      } = data || {};

      // const findItem = po_detail?.find((obj) => obj?.item_id === item_id
      //  );
      const findItem = po_detail?.find(
        (obj) => obj?.item_id === item_id && obj?.item_no_name === item_no_name
      );
      let tempPODetail = po_detail;
      if (checked) {
        if (!po_detail.length) {
          tempPO = {
            vendor_id,
            vendor_no_name,
            payment_term_id,
            payment_term_name,
          };

          // Start. Find and use vendor master data
          const { data: vendors, loading: getVendorLoading } = getVendor;
          if (!getVendorLoading) {
            const findVendor = vendors[0]?.find(
              (obj) => obj?.vendor_id === vendor_id
            );
            if (findVendor) {
              const {
                vat_id,
                vat_rate,
                payment_term_id,
                payment_term_name,
                currency_id,
                currency_no,
              } = findVendor;
              tempPO = {
                ...tempPO,
                vat_id,
                vat_rate,
                payment_term_id,
                payment_term_name,
                currency_id,
                currency_no,
              };
            }
          }
          // End. Find and use vendor master data
        }
        if (findItem) {
          tempPODetail = tempPODetail.map((obj) => {
            const po_detail_qty = [...obj?.po_detail_sub, data].reduce(
              (prev, obj) => (prev += obj?.po_detail_qty),
              0
            );
            return obj?.item_id === item_id &&
              obj?.item_no_name === item_no_name
              ? {
                  ...obj,
                  po_detail_qty,
                  po_detail_total_price: obj?.po_detail_price * po_detail_qty,
                  po_detail_sub: [...obj?.po_detail_sub, data],
                }
              : obj;
          });
        } else {
          tempPODetail = [...tempPODetail, { ...data, po_detail_sub: [data] }];
        }
      } else {
        // Checked = false && find & filter it out

        tempPODetail = tempPODetail?.filter((obj) => {
          // if (obj?.item_id === item_id ) {
          if (obj?.item_id === item_id && obj?.item_no_name === item_no_name) {
            if (obj?.po_detail_sub?.length === 1) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        });

        tempPODetail = tempPODetail?.map((obj) => {
          if (obj?.item_id === item_id && obj?.item_no_name === item_no_name) {
            // if (obj?.item_id === item_id) {
            const po_detail_sub = obj?.po_detail_sub?.filter(
              (obj) => obj?.pr_detail_id !== pr_detail_id
            );
            const po_detail_qty = po_detail_sub.reduce(
              (prev, obj) => (prev += obj?.po_detail_qty),
              0
            );
            return {
              ...obj,
              po_detail_qty,
              po_detail_total_price: obj?.po_detail_price * po_detail_qty,
              po_detail_sub,
            };
          } else {
            return obj;
          }
        });
      }

      const temp_po_detail = sortData(tempPODetail);
      tempPO = { ...tempPO, po_detail: temp_po_detail };
      tempPO = { ...tempPO, ...onCalculateTotal(tempPO) };
      return {
        ...state,
        ...tempPO,
        pr_selected: tempPODetail.reduce(
          (prevArr, obj) => [...prevArr, ...obj?.po_detail_sub],
          []
        ),
      };
    });
  };

  const [step, setStep] = useState(1);

  const onNext = () => {
    setStep((prev) => prev + 1);
    if (step === 2) {
      dispatch(persistFormPO(poState));
    }
  };
  const onPrev = () => setStep((prev) => prev - 1);

  const setReadOnly = (bool = false) =>
    setConfig((prev) => ({ ...prev, readOnly: bool }));

  const setLoading = (bool = false) =>
    setConfig((prev) => ({ ...prev, loading: bool }));

  const onDoAction = async (data, msg = "Update Status") => {
    setLoading(true);
    const resp = await approveFunction(data);
    if (resp.success) {
      message.success(`${msg} Successfully.`);
      getPO.fetchData();
    }
    setLoading(false);
  };
  // const layoutConfig = useMemo(() => {

  const layoutConfig = () => {
    const { readOnly, data } = config || {};
    const {
      po_no,
      process_id,
      node_stay,
      process_complete,
      data_flow_process,
      button_approve,
      button_cancel,
      button_confirm,
      button_create,
      button_edit,
      button_recall,
      button_reject,
    } = getPO?.data?.length ? getPO.data[0] : {};
    const flow =
      data_flow_process &&
      data_flow_process?.map((step) => {
        return step?.all_group_in_node;
      });
    return {
      projectId: 5, // project ID from DB
      title: "PURCHASE", // project name
      home: "/purchase", // path
      show: true, // bool show sub - tool bar
      breadcrumb: ["Purchase", "Operations", "PO", "Create"], // [1,2,3] = 1 / 2 / 3
      search: false, // bool show search
      searchValue: null, //search string
      buttonAction: readOnly
        ? [
            button_approve && "Approve",
            button_confirm && "Confirm",
            button_edit && "Edit",
            // "Edit",
            button_reject && "Reject",
            "Back",
          ]
        : ["Save", "Discard"], // button
      action: readOnly
        ? [
            {
              name: "Print",
              link: `${process.env.REACT_APP_REPORT_SERVER}/report_po.aspx?po_no=${po_no}`,
            },
            button_cancel && {
              name: "Cancel",
              cancel: true,
              link: ``,
            },
          ]
        : null,
      badgeCont: 0, //number
      step: {
        current: node_stay - 1,
        step: flow,
        process_complete: process_complete,
      },
      create: "", // path or "modal" and use openModal() instead
      edit: () => {
        setStep(2);
        setReadOnly(false);
      },
      discard: "/purchase/po", //path
      back: "/purchase/po", //path
      save: "function", //path if not path use "function" and use onSave instead.
      disabledSaveBtn: [1, 2].includes(step) ? true : false,
      onSave: async () => {
        const { validate } = validateFormHead(form, [
          "po_description",
          "vat_id",
          "vendor_id",
          "payment_term_id",
          "currency_id",
        ]);
        const { validate: validateDetail } = validateFormDetail(
          form?.po_detail,
          ["po_detail_due_date", "po_detail_qty", "item_id", "uom_id"]
        );
        if (validate && validateDetail) {
          setLoading(true);
          const resp = await savePO({
            ...form,
            po_detail: form?.po_detail?.map((obj) => ({ ...obj, commit: 1 })),
            commit: 1,
            user_name,
          });
          if (resp.success) {
            message.success("Save Success.");
            const { po_id } = resp?.data || {};
            if (po_id) {
              setLoading(false);
              history.push(`/purchase/po/${po_id}`);
              setReadOnly(true);
            } else {
              message.error(
                "Internal Server Error. Can't get any data from the server."
              );
            }
          } else {
            message.warning("Error!. Can't Save.");
          }
          console.log("resp Save", resp);
          setLoading(false);
        } else {
          message.warning("Please fill your form completely.");
        }
      },
      onConfirm: () =>
        onDoAction({
          status: 2,
          process_id,
          user_name,
          remark: "Confirm Document.",
        }),
      onApprove: () =>
        onDoAction({
          status: 5,
          process_id,
          user_name,
          remark: "Approve Document.",
        }),
      onReject: () =>
        Swal.fire({
          title: "",
          text: "",
          confirmButtonText: "Save",
          cancelButtonText: "Discard",
          showCancelButton: true,
          inputLabel: "Remark :",
          input: "textarea",
          inputAttributes: {
            placeholder: "Remark.....",
          },
          inputValidator: (val) => {
            if (!val) {
              return "กรุณาระบุเหตุผลที่ Reject";
            } else {
              return false;
            }
          },
        }).then(({ isConfirmed, value }) => {
          if (isConfirmed) {
            onDoAction({
              status: 6,
              process_id,
              user_name,
              remark: `Reject Document / Remark : ${value}`,
            });
          }
        }),
      onCancel: () =>
        onDoAction({
          status: 3,
          process_id,
          user_name,
          remark: "Cancel Document.",
        }),
    };
    // }, [step, setStep, config, getPO, form, setLoading, setReadOnly, user_name]);
  };

  const onAddItem = (item) => {
    console.log("onAddItem", item);
    setPOState((prev) => ({
      ...prev,
      po_detail: sortData([...prev.po_detail, item || initialStateNewDetail]),
    }));
  };

  const onChangePOState = (data) => {
    setPOState((prev) => ({ ...prev, ...data }));
  };

  const onCalculateTotal = ({ po_detail, vat_rate, po_discount }) => {
    const {
      exclude_vat: tg_po_sum_amount,
      vat: tg_po_vat_amount,
      include_vat: tg_po_total_amount,
    } = sumArrObj(po_detail, "po_detail_total_price", vat_rate, po_discount);
    return {
      tg_po_sum_amount,
      tg_po_vat_amount,
      tg_po_total_amount,
    };
  };

  const formConfig = useMemo(
    () => ({
      ...config,
      getPO,
      getVendor,
      getVat,
      getPaymentTerms,
      getCurrency,
      onChangePOState,
      po_id: id,
    }),
    [
      config,
      getPO,
      getVendor,
      getVat,
      getPaymentTerms,
      getCurrency,
      onChangePOState,
      id,
    ]
  );

  useEffect(() => {
    console.log("useEffect id po getPOloading dispatch");
    if (!id || id === "new") {
      // New
      setPOState(initialState);
      setReadOnly(false);
    } else {
      // Get Data
      if (!getPOLoading && po) {
        setPOState(po?.length ? po[0] : []);
        setStep(3);
        dispatch(get_log_by_id(po[0]?.process_id));
      }
    }
    return () => dispatch(reset_comments());
  }, [id, po, getPOLoading, dispatch]);

  console.log(` Step : ${step} , readOnly : ${config?.readOnly}`);
  return (
    <MainLayout {...layoutConfig()}>
      <POContext.Provider
        value={{
          poState,
          onAddItem,
          onSelect,
          onCalculateTotal,
          step,
          ...formConfig,
        }}
      >
        <div id="form">
          <div className="d-flex flex-space ">
            <h2>
              Purchase Order{" "}
              {getPO?.data && getPO?.data[0]?.trans_status_id === 3 && (
                <span className="require"># เอกสารนี้ถูกยกเลิกแล้ว</span>
              )}
            </h2>
            <div>
              <Text strong>Create Date :</Text>
              {`${poState?.po_created}`}
            </div>

            {!config?.readOnly && (
              <div>
                {step === 1 ? (
                  <Button type="link" size="large" onClick={onNext}>
                    <b>
                      ถัดไป <RightOutlined />
                    </b>
                  </Button>
                ) : (
                  <>
                    <Button type="link" size="large" onClick={() => onPrev()}>
                      <b>
                        <LeftOutlined /> ก่อนหน้า
                      </b>
                    </Button>
                    {step !== 3 && (
                      <Button type="link" size="large" onClick={() => onNext()}>
                        <b>
                          ถัดไป <RightOutlined />
                        </b>
                      </Button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
          <Divider className="divider-sm" />
          <POForm />
        </div>
      </POContext.Provider>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default POFormDisplay;
const initialState = {
  po_created: moment().format("DD/MM/YYYY"),
  po_description: null,
  user_name: null,
  payment_term_id: null,
  vendor_id: null,
  currency_id: 1,
  currency_no: "THB",
  vat_id: 1,
  vat_rate: 0.07,
  uom_convert_id: null,
  po_agreement: null,
  po_discount: 0,
  po_remark: null,
  commit: 1,
  po_detail: [],
};

const initialStateNewDetail = {
  id: null,
  po_id: null,
  po_detail_id: null,
  item_id: null,
  item_no_name: null,
  uom_id: null,
  uom_no: null,
  tg_po_detail_qty: 0,
  item_vendor_moq: 0,
  po_detail_price: 0,
  tg_po_detail_total_price: 0,
  po_detail_discount: 0,
  po_detail_due_date: null,
  po_detail_remark: null,
  po_detail_sub: [],
};
