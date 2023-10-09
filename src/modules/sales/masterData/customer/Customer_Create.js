import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Typography, message } from "antd";
import MainLayout from "../../../../components/MainLayout";
import moment from "moment";
import {
  CustomerDetailFileds,
  customer_fields,
  customer_require_fields,
} from "../../configs/customer";
import {
  create_customer,
  update_customer,
} from "../../../../actions/sales/customerActions";
import Authorize from "../../../system/Authorize";
import {
  validateFormDetail,
  validateFormHead,
} from "../../../../include/js/function_main";
import { useHistory } from "react-router-dom";
import { reducer } from "../../../qualityAssurance/reducers";
import {
  get_vendor_category,
  get_vendor_group,
  VatID,
} from "../../../../actions/purchase/vendorActions";
import CustomerTabs from "./CustomerTabs";
import { useCallback } from "react";

const { Title, Text } = Typography;

const CustomerCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);

  const data =
    props.location && props.location.state ? props.location.state : 0;
  const initialStateDetail = [
    { ...CustomerDetailFileds, user_name: auth.user_name },
  ];
  const customer_file = {
    companycer: [],
    memorandum: [],
    user_name: auth.user_name,
  };
  const [data_file, setFile] = useState(customer_file);
  const [dataDetail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [data_head, set_data_head] = useState(
    data
      ? { ...data.data_head, commit: 1, user_name: auth.user_name }
      : {
          ...customer_fields,
          commit: 1,
          user_name: auth.user_name,
          customer_created: moment().format("DD/MM/YYYY"),
        }
  );

  const upDateFormValue = useCallback(
    (data) => {
      set_data_head({ ...data_head, ...data });
    },
    [data_head]
  );

  useEffect(() => {
    dispatch(get_vendor_group());
    dispatch(get_vendor_category());
    dispatch(VatID());
    detailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.dataDetail.length ? data.dataDetail : initialStateDetail,
    });
    console.log("data", data);
    set_data_head(
      data
        ? { ...data.data_head, commit: 1, user_name: auth.user_name }
        : {
            ...customer_fields,
            commit: 1,
            user_name: auth.user_name,
            customer_created: moment().format("DD/MM/YYYY"),
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
      "Customer",
      data_head.customer_no ? "Edit" : "Create",
      data_head.customer_no &&
        "[ " + data_head.customer_no + " ] " + data_head.customer_name,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/sales/config/customers",
    onSave: (e) => {
      //e.preventDefault();
      const key = "validate";
      const validate = validateFormHead(data_head, customer_require_fields);
      const validateAddress = validateFormDetail(dataDetail, [
        "address_type_id",
        "customer_detail_address",
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
          content: "Please fill customer address completely.",
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
          content: "Please specify customer invoice address.",
          key: "detail-warning",
          duration: 4,
        });
        return false;
      }

      const data = [
        {
          ...data_head,
          customer_detail: dataDetail.filter(
            (detail) => detail.address_type_id != null
          ),
        },
      ];
      console.log("pass", data);
      data_head.customer_id
        ? dispatch(
            update_customer(
              data_head.customer_id,
              data,
              data_file,
              redirect_to_view
            )
          )
        : dispatch(create_customer(data, data_file, redirect_to_view));
      console.log("customer_id", data_head.customer_id);
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
    history.push("/sales/config/customers/view/" + (id ? id : "new"));
  };
  const tabsConfig = React.useMemo(
    () => ({
      upDateFormValue,
      data_head,
      data_file,
      setFile,
      auth,
      dataDetail,
      detailDispatch,
      readOnly: false,
    }),
    [
      upDateFormValue,
      data_head,
      data_file,
      setFile,
      auth,
      dataDetail,
      detailDispatch,
    ]
  );
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.customer_no ? "Edit" : "Create"} Customer{" "}
                {data_head.customer_no && "#" + data_head.customer_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">{data_head.customer_created}</Text>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>
              <span className="require">* </span>Name{" "}
            </Title>
            <Col span={24}>
              <Input
                name="customer_name"
                onChange={(e) =>
                  upDateFormValue({ customer_name: e.target.value })
                }
                value={data_head.customer_name}
                placeholder="Name"
              />
            </Col>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <CustomerTabs {...tabsConfig} />
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default CustomerCreate;
