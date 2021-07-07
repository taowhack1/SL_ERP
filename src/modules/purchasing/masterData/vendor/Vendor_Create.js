import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message, InputNumber } from "antd";
import moment from "moment";
import {
  VendorDetailFileds,
  vendor_fields,
  vendor_require_fields,
} from "../../config/vendor";
import { useHistory } from "react-router-dom";
import {
  create_vendor,
  get_vendor_category,
  get_vendor_group,
  update_vendor,
  Language,
  Country,
  Province,
  District,
  Tambon,
  Zip,
  VatID,
} from "../../../../actions/purchase/vendorActions";
import { numberFormat } from "../../../../include/js/main_config";
import Authorize from "../../../system/Authorize";
import {
  validateFormDetail,
  validateFormHead,
} from "../../../../include/js/function_main";
import MainLayout from "../../../../components/MainLayout";
import { reducer } from "../../../qualityAssurance/reducers";
import VendorTabs from "./VendorTabs";

const { TextArea } = Input;
const { Title, Text } = Typography;

const VendorCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);

  const data =
    props.location && props.location.state ? props.location.state : 0;
  const initialStateDetail = [VendorDetailFileds];
  const [dataDetail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [data_head, set_data_head] = useState(
    data
      ? { ...data.data_head, commit: 1, user_name: auth.user_name }
      : {
          ...vendor_fields,
          commit: 1,
          user_name: auth.user_name,
          vendor_created: moment().format("DD/MM/YYYY"),
        }
  );

  const upDateFormValue = (data) => {
    set_data_head({ ...data_head, ...data });
  };
  useEffect(() => {
    dispatch(get_vendor_group());
    dispatch(get_vendor_category());
    dispatch(VatID());
    detailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.dataDetail.length ? data.dataDetail : initialStateDetail,
    });
    set_data_head(
      data
        ? { ...data.data_head, commit: 1, user_name: auth.user_name }
        : {
            ...vendor_fields,
            commit: 1,
            user_name: auth.user_name,
            vendor_created: moment().format("DD/MM/YYYY"),
          }
    );
  }, []);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Vendor",
      data_head.vendor_no ? "Edit" : "Create",
      data_head.vendor_no &&
        "[ " + data_head.vendor_no + " ] " + data_head.vendor_name,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/purchase/vendor",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      const key = "validate";
      const validate = validateFormHead(data_head, vendor_require_fields);
      const validateAddress = validateFormDetail(dataDetail, [
        "address_type_id",
        "vendor_detail_address",
      ]);
      if (!validate.validate) {
        message.warning({
          content: "Please fill your form completely.",
          key,
          duration: 4,
        });
        return false;
      }
      if (!validateAddress.validate) {
        message.warning({
          content: "Please fill vendor address completely.",
          key: "detail",
          duration: 4,
        });
        return false;
      }

      if (
        !dataDetail.length ||
        !dataDetail.some((obj) => obj.address_type_id === 2)
      ) {
        message.warning({
          content: "Please specify vendor invoice address.",
          key: "detail-warning",
          duration: 4,
        });
        return false;
      }

      const data = [
        {
          ...data_head,
          vendor_detail: dataDetail.filter(
            (obj) =>
              obj.commit &&
              obj.address_type_id !== null &&
              obj.vendor_detail_address !== null
          ),
        },
      ];
      console.log("pass", data);
      data_head.vendor_id
        ? dispatch(update_vendor(data_head.vendor_id, data, redirect_to_view))
        : dispatch(create_vendor(data, redirect_to_view));
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const redirect_to_view = (id) => {
    history.push("/purchase/vendor/view/" + (id ? id : "new"));
  };

  const TabsConfig = React.useMemo(
    () => ({
      upDateFormValue,
      data_head,
      dataDetail,
      detailDispatch,
      auth,
      readOnly: false,
    }),
    [upDateFormValue, data_head, dataDetail, detailDispatch, auth]
  );
  console.log("data_head", data_head);
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.vendor_no ? "Edit" : "Create"} Vendor{" "}
                {data_head.vendor_no && "#" + data_head.vendor_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.vendor_created}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>
              <span className="require">* </span>Name{" "}
            </Title>
            <Col span={24}>
              <Input
                name="vendor_name"
                onChange={(e) =>
                  upDateFormValue({ vendor_name: e.target.value })
                }
                value={data_head.vendor_name}
                placeholder="Name"
              />
            </Col>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <VendorTabs {...TabsConfig} />
          </Col>
        </Row>
      </div>
      {/* <Comments data={dataComments} /> */}
    </MainLayout>
  );
};

export default VendorCreate;
