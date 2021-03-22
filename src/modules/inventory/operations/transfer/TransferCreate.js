/** @format */

import React, { useEffect, useReducer, useRef, useState } from "react";
import MainLayout from "../../../../components/MainLayout";
import { Row, Col, Input, Tabs, Typography, message, Form, Select } from "antd";
import TransferDetail from "./TransferDetail";
import { reducer } from "../../../production/reducers";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import {
  TransferDetailFileds,
  TransferDetailRequireFileds,
  TransferHeadfileds,
  TransferLotBatchfileds,
  TransferRequireFileds,
} from "./TransferConfig";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Authorize from "../../../system/Authorize";
import { getMasterDataItem } from "../../../../actions/inventory";
import { getConfigurationUOM } from "../../../../actions/inventory/configurations/uom/uomAction";
import {
  validateFormDetail,
  validateFormHead,
} from "../../../../include/js/function_main";
import CustomSelect from "../../../../components/CustomSelect";
import { options } from "numeral";
const defaultValues = {
  description: "",
  ReactSelect: { value: "vanilla", title: "Vanilla" },
};
const TransferCreate = (props) => {
  const data2 = [
    { value1: "chocolate_value", title: "Chocolate" },
    { value1: "strawberry_value", title: "Strawberry" },
    { value1: "vanilla_value", title: "Vanilla" },
  ];
  const { register, handleSubmit, watch, errors, control, setValue } = useForm(
    defaultValues
  );
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  const submitForm = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const authorize = Authorize();
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const current_project = useSelector((state) => state.auth.currentProject);
  const auth = useSelector((state) => state.auth.authData);
  const formState = useSelector((state) => state.form.transfercreate);
  const initialStateDetail = [TransferDetailFileds];
  const initialStateHead = [TransferHeadfileds];
  const initialStateLotBatch = [TransferLotBatchfileds];
  const [formValue, setFormValue] = useState(null);
  const [dataHead, headDispatch] = useReducer(reducer, initialStateHead);
  const [dataDetail, detailDispatch] = useReducer(reducer, initialStateDetail);
  const [tepmStockInline, settepmStockInline] = useReducer(
    reducer,
    initialStateLotBatch
  );

  const item = null;
  const flow =
    dataHead &&
    dataHead.data_flow_process &&
    dataHead.data_flow_process.map((step) => {
      return step.all_group_in_node;
    });
  useEffect(() => {
    dispatch(getMasterDataItem(auth.user_name));
    dispatch(getConfigurationUOM());
    //dispatch(get_lot_batch_by_item_id_shelf());
    headDispatch({
      type: "SET_HEAD",
      payload: data.data_head
        ? {
            ...data.data_head,
            commit: 1,
            user_name: auth.user_name,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
          }
        : {
            ...TransferHeadfileds,
            commit: 1,
            transfer_no: "Tran-001",
            user_name: auth.user_name,
            trans_created_by_no_name: auth.employee_no_name_eng,
            branch_id: auth.branch_id,
            branch_name: auth.branch_name,
            trans_created: moment().format("DD/MM/YYYY"),
          },
    });
    detailDispatch({
      type: "SET_DETAIL",
      payload:
        data && data.dataDetail.length ? data.dataDetail : initialStateDetail,
    });
  }, []);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Transfer",
      dataHead.trans_no ? "Edit" : "Create",
      dataHead.trans_no && dataHead.trans_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/inventory/transfer/",
    onSave: (e) => {
      submitForm.current.click();
      const key = "validate";
      const validate = validateFormHead(dataHead, TransferRequireFileds);
      const validate_detail = validateFormDetail(
        dataDetail,
        TransferDetailRequireFileds
      );
      if (validate_detail.validate && validate.validate) {
        console.log("pass", dataDetail);
        console.log("passdataHead", dataHead);

        // dataCategoryCreate.category_id
        //   ? dispatch(
        //       upDateConfigurationCategory(
        //         dataCategoryCreate.category_id,
        //         dataCategoryCreate,
        //         redirectToView
        //       )
        //     )
        //   : dispatch(
        //       createConfigurationCategory(dataCategoryCreate, redirectToView)
        //     );
      } else {
        message.warning({
          content: "Please fill your form completely.",
          key,
          duration: 2,
        });
      }
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
  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };

  console.log("formValue", formValue);
  return (
    <MainLayout {...config}>
      <form onSubmit={handleSubmit((formValue) => setFormValue(formValue))}>
        <div id='form'>
          {/* Head */}
          <Row className='col-2'>
            <Col span={8}>
              <h2>
                <strong>Create Transfer </strong>
              </h2>
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
              <Text strong>Create Date :</Text>
            </Col>
            <Col span={2} style={{ textAlign: "right" }}>
              <Text className='text-view'>{dataHead.trans_created}</Text>
            </Col>
          </Row>
          {/* tab detail */}
          <Row className='col-2 row-margin-vertical'>
            <Col span={3}>
              <Text strong>
                <span className='require'>*</span> Transfer No :
              </Text>
            </Col>
            <Col span={8}>
              <Text className='text-view'>{dataHead.transfer_no}</Text>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={3}>
              <Text strong>
                <span className='require'>*</span> Create By :
              </Text>
            </Col>
            <Col span={8}>
              <Text className='text-view'>
                {dataHead.trans_created_by_no_name}
              </Text>
            </Col>
            <Col span={2}></Col>
          </Row>
          <Row className='col-2 row-margin-vertical'>
            <Col span={3}>
              <Text strong>Description :</Text>
            </Col>
            <Col span={8}>
              <Controller
                as={Input}
                control={control}
                name='description'
                placeholder='Description'
                value={dataHead.description}
                ref={register}
                onChange={(e) =>
                  upDateFormValue({ description: e.target.value })
                }
              />
              <section>
                <label>React Select</label>
                <Controller
                  as={<CustomSelect ref={register()} />}
                  field_id='value1'
                  field_name='title'
                  title='title'
                  name='ReactSelect'
                  data={data2}
                  placeholder='select'
                  isClearable
                  control={control}
                />
              </section>
            </Col>
          </Row>
          {/* tab */}
          <Row className='col-2 row-tab-margin-l'>
            <Col span={24}>
              <div className='mt-3'>
                <TransferDetail
                  dataDetail={dataDetail}
                  detailDispatch={detailDispatch}
                  readOnly={false}
                />
              </div>
            </Col>
          </Row>
        </div>
        <button
          type='submit'
          ref={submitForm}
          style={{ display: "none" }}></button>
      </form>
    </MainLayout>
  );
};

export default TransferCreate;
