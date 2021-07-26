import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography, Space, message } from "antd";
import MainLayout from "../../components/MainLayout";
import Comments from "../../components/Comments";
import {
  getItemAction,
  item_actions,
} from "../../actions/inventory/itemActions";
import { getMasterDataItem } from "../../actions/inventory";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import Authorize from "../system/Authorize";
import ItemPreview from "./item/ItemFileUpload";
import ItemTabList from "./item/ItemTabList";
import { get_log_by_id } from "../../actions/comment&log";
import ModalRemark from "../../components/Modal_Remark";
import { FileContext, ItemContext } from "../../include/js/context";
import { sum2DArrOdjWithField } from "../../include/js/function_main";
import Barcode from "react-barcode";
import ItemRevisionDetail from "./item/ItemRevisionDetail";
import { itemVendorDocumentFields } from "./config/item";

const { Text } = Typography;
const ItemView = (props) => {
  const readOnly = true;
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const { department_id } = useSelector((state) => state.auth.authData);
  const {
    data_head,
    data_detail,
    data_part,
    data_part_detail,
    data_part_mix,
    data_formula,
    data_weight_detail,
    data_packaging_detail,
    data_file,
    data_filling,
  } = useSelector((state) => state.inventory.item);
  const [formulaPercent, setPercent] = useState(0);
  const sumPercent = () => {
    console.log("sumPercent", data_part);
    return setPercent(
      sum2DArrOdjWithField(
        data_part.map((obj) => obj.item_formula),
        "item_formula_percent_qty"
      )
    );
  };

  const dataComment = useSelector((state) => state.log.comment_log);
  const [remark, setRemark] = useState("");
  const [openRemarkModal, setOpenRemarkModal] = useState({
    visible: false,
    loading: false,
  });
  const flow =
    data_head.data_flow_process &&
    data_head.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  const changeProcessStatus = (process_status_id) => {
    if (remark.trim() === "") {
      alert("Plase write remark");
      return false;
    }
    setOpenRemarkModal({ visible: false, loading: false });
    const app_detail = {
      process_status_id: process_status_id,
      user_name: auth.user_name,
      process_id: data_head.process_id,
      process_member_remark: remark,
    };
    message.success({ content: "Reject", key: "validate", duration: 1 });
    dispatch(item_actions(app_detail, data_head.item_id));
    setRemark("");
  };

  useEffect(() => {
    dispatch(getMasterDataItem());
  }, []);
  useEffect(() => {
    data_head.process_id && dispatch(get_log_by_id(data_head.process_id));
  }, [data_head]);
  useEffect(
    () => sumPercent(),

    [data_part]
  );

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      "View",
      data_head.item_no &&
        "[ " + data_head.item_no + " ] " + data_head.item_name,
    ],
    search: false,
    buttonAction: [
      data_head.tg_trans_status_id !== 3 && "Edit",
      // data_head.button_edit && "Edit",
      data_head.button_confirm && "Confirm",
      data_head.button_approve && "Approve",
      data_head.button_reject && "Reject",
      "Back",
    ],
    create: "",
    edit: {
      data: {
        data_head: data_head,
        data_part: data_part,
        data_part_detail: data_part_detail,
        data_part_mix: data_part_mix,
        data_formula: data_formula,
        data_weight_detail: data_weight_detail,
        data_packaging_detail: data_packaging_detail,
        data_file: data_file,
        data_filling: data_filling,
      },
      path: data_head && "/inventory/items/edit/" + data_head.item_id,
    },
    step: {
      current: data_head.node_stay - 1,
      step: flow,
      process_complete: data_head.process_complete,
    },
    action: getItemAction(data_head, data_file),
    // save: "function",
    discard: "/inventory/items",
    back: "/inventory/items",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      if (
        department_id === 13 &&
        [1, 2].includes(data_head.type_id) &&
        !data_head.pu_vendor.length
      ) {
        console.log("Purchase Person");
        message.warning({
          content: 'Please fill "Purchase Vendor" form completely.',
          key: "validate",
          duration: 4,
        });
        return false;
      } else {
        console.log("Approve");
        const app_detail = {
          process_status_id: 5,
          user_name: auth.user_name,
          process_id: data_head.process_id,
          process_member_remark: remark,
        };
        dispatch(item_actions(app_detail, data_head.item_id));
      }
    },
    onConfirm: () => {
      const app_detail = {
        process_status_id: 2,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(item_actions(app_detail, data_head.item_id));
      console.log("Confirm");
    },
    onReject: () => {
      console.log("Reject");
      setOpenRemarkModal({
        visible: true,
        loading: false,
      });
    },
    onCancel: () => {
      console.log("Cancel");
      const app_detail = {
        process_status_id: 3,
        user_name: auth.user_name,
        process_id: data_head.process_id,
      };
      dispatch(item_actions(app_detail, data_head.item_id));
    },
  };

  const ContextValue = useMemo(() => {
    return {
      readOnly,
      data_file,
      statePart: data_part,
      formulaPercent,
      sumPercent,
      filling: data_filling,
      data_head,
      vendorFile: data_head.pu_vendor.map((obj, key) => {
        return {
          id: key,
          certificate: obj.item_vendor_detail_document.certificate,
        };
      }) ?? [itemVendorDocumentFields],
    };
  }, [readOnly, data_file, formulaPercent]);

  return (
    <ItemContext.Provider value={ContextValue}>
      <FileContext.Provider value={{ data_file }}>
        <MainLayout {...config}>
          <div id="form">
            <Row>
              <Col span={19}>
                <Row className="col-2 mt-1">
                  <Col span={12}>
                    <h3 style={{ marginBottom: 8 }}>
                      {data_head.item_no && (
                        <strong>
                          Item Code{" "}
                          {data_head.item_no ? "#" + data_head.item_no : "-"}
                        </strong>
                      )}
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <h3>
                    <strong>Description Name</strong>
                  </h3>
                </Row>
                <Row>
                  <Text className="item_name text-view">
                    {data_head.item_name ? data_head.item_name : "-"}
                  </Text>
                </Row>
                <Row>
                  <Col span={24} style={{ marginLeft: 5, marginTop: 10 }}>
                    <Space align="baseline">
                      {data_head.item_sale ? (
                        <CheckSquareOutlined />
                      ) : (
                        <BorderOutlined />
                      )}
                      <Text>Can be sold</Text>
                    </Space>
                    <br />
                    <Space align="baseline">
                      {data_head.item_purchase ? (
                        <CheckSquareOutlined />
                      ) : (
                        <BorderOutlined />
                      )}
                      <Text>Can be purchase</Text>
                    </Space>
                  </Col>
                </Row>
              </Col>
              <Col span={1}></Col>
              <Col span={4}>
                <Row>
                  <Col span={24} className="text-center">
                    {data_head.item_no && (
                      <Barcode
                        value={data_head.item_no}
                        width={1}
                        height={40}
                        fontSize={14}
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col span={24} className="text-left">
                    <ItemPreview
                      data_file={data_file}
                      // updateFile={updateFile}
                      readOnly={true}
                      maxFile={1}
                      file_type_id={1}
                      upload_type={"Card"}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {data_head.item_id ? (
              <ItemRevisionDetail data_head={data_head} readOnly={readOnly} />
            ) : null}
            <Row className="col-2 row-tab-margin">
              <Col span={24}>
                <ItemTabList
                  data_file={data_file}
                  data_head={data_head}
                  data_detail={data_detail}
                  // QA
                  data_packaging_detail={data_packaging_detail}
                  data_weight_detail={data_weight_detail}
                  readOnly={readOnly}
                />
              </Col>
            </Row>
          </div>
          <ModalRemark
            title={"Remark"}
            state={openRemarkModal}
            onChange={setRemark}
            onOk={() => {
              changeProcessStatus(6);
            }}
            onCancel={() => {
              setOpenRemarkModal({ visible: false, loading: false });
              setRemark("");
            }}
          />
          <Comments data={dataComment} />
        </MainLayout>
      </FileContext.Provider>
    </ItemContext.Provider>
  );
};

export default ItemView;
