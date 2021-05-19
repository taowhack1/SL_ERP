/** @format */
import { Checkbox, Col, Input, Radio, Typography } from "antd";
import React, { useEffect, useReducer } from "react";
import { useRef } from "react";
import { Row } from "react-flexbox-grid";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomLabel from "../../../components/CustomLabel";
import MainLayout from "../../../components/MainLayout";
import { mainReducer } from "../../../include/reducer";
import { CheckboxField, DatePickerField, InputField } from "./hookContorler";
import { NprComponentsDetail } from "./nprconfig";
import NprDetail from "./NprDetail";
import moment from "moment";
import { useState } from "react";
// import * as yup from "yup";
// const request = yup.object().shape({
//   userName: yup.string().required(),
//   password: yup.string().required(),
// });

const NprCreate = (props) => {
  const readOnly = false;
  const defaultValues = {
    tests: [
      {
        name: "useFieldArray1",
        nestedArray: [{ field1: "field1", field2: "field2" }],
      },
      {
        name: "useFieldArray2",
        nestedArray: [{ field1: "field1", field2: "field2" }],
      },
    ],
  };
  const {
    register,
    handleSubmit,
    control,
    errors,
    getValues,
    setValue,
  } = useForm(NprComponentsDetail);
  const { Title, Text } = Typography;
  const submitForm = useRef(null);
  const initialStateHead = NprComponentsDetail;
  const [nprstate, stateDispatch] = useState(initialStateHead);
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "NPR", "Create"],
    search: false,
    create: "",
    buttonAction: ["Save", "Discard"],
    save: "function",
    discard: "/sales/npr",
    onSave: (e) => {
      submitForm.current.click();
      //e.preventDefault();
      //onSubmit(e);
    },
  };
  // useEffect(() => {
  //   stateDispatch({
  //     type: "SET_HEAD",
  //     payload: data
  //       ? {
  //           ...data,
  //           commit: 1,
  //           user_name: auth.user_name,
  //         }
  //       : {
  //           ...NprComponentsDetail,
  //           commit: 1,
  //           user_name: auth.user_name,
  //           npr_created: moment().format("DD/MM/YYYY"),
  //         },
  //   });
  // }, []);

  const onSubmit = (data) => {
    console.log("data", data);
  };
  console.log("nprstate", nprstate);
  return (
    <MainLayout {...config}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div id='form'>
          {/* head */}
          <Row className='col-2'>
            <Col span={8}>
              <h2>
                <strong>NEW PRODUCT REQUISITION FORM</strong>
              </h2>
            </Col>
            <Col span={12}></Col>
            <Col span={2}>
              <Text strong>Create Date :</Text>
            </Col>
            <Col span={2} style={{ textAlign: "right" }}>
              <Text className='text-view'></Text>
            </Col>
          </Row>
          {/* <Row className='col-2 row-tab-margin'>
            <Col span={24} style={{ marginBottom: 8 }}>
              <CustomLabel label='NPR/NPD Name :' require readOnly={readOnly} />
              <Controller
                as={InputField({
                  fieldProps: {
                    className: "form-control",
                    placeholder: "NPR/NPD Name",
                  },
                })}
                name='Description'
                control={control}
                rules={{ required: false }}
              />
            </Col>
          </Row> */}
          <Row className='col-2 mt-2' gutter={[32, 0]}>
            {/* Left */}
            <Col span={12} className='col-border-right'>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Product Code :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter product code",
                      },
                    })}
                    name='productcode'
                    value
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <Text strong></Text>
                </Col>

                <Col span={6}>
                  <Checkbox name='SampleRequest'>Sample Request</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox name='Revision'>Revision</Checkbox>
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Runing code :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter Runing code",
                      },
                    })}
                    name='Runing'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Product Name :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter product name",
                      },
                    })}
                    name='productname'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Customer Code :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter Customer code",
                      },
                    })}
                    name='customercode'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Customer Name :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter customer name",
                      },
                    })}
                    name='customername'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Filling Size for Selling :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter Filling Size for Selling",
                      },
                    })}
                    name='Filling'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Contact No/Email :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter contact/email",
                      },
                    })}
                    name='Contact'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Production Line :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter production line",
                      },
                    })}
                    name='ProductionLine'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel label='Sell to :' require readOnly={readOnly} />
                </Col>
                <Col span={12}>
                  <Radio.Group name='sellto'>
                    <Radio value={1}>Export</Radio>
                    <Radio value={2}>Local</Radio>
                  </Radio.Group>
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={6}>
                  <CustomLabel
                    label='Reference Formulation :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Enter Reference Formulation",
                      },
                    })}
                    name='Reference'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
                <Col span={2}></Col>
              </Row>
            </Col>
            {/* Right */}
            <Col span={12} className='col-border'>
              <Row className='col-2 row-margin-vertical'>
                <Col span={1}></Col>
                <Col span={6}>
                  <CustomLabel
                    label='Cost Request :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={2}>
                  <Checkbox></Checkbox>
                </Col>
                <Col span={2}></Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={1}></Col>
                <Col span={6}>
                  <CustomLabel label='Other :' require readOnly={readOnly} />
                </Col>
                <Col span={2}>
                  <Checkbox></Checkbox>
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={1}></Col>
                <Col span={6}></Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Other",
                      },
                    })}
                    name='Other'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={1}></Col>
                <Col span={6}>
                  <CustomLabel
                    label='Request date :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={DatePickerField({
                      fieldProps: {
                        className: "form-control",
                        format: "DD/MM/YYYY",
                        placeholder: "Select date & time",
                        style: { width: "100%" },
                      },
                    })}
                    name='date_start'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={1}></Col>
                <Col span={6}>
                  <CustomLabel
                    label='Sample Reauest Qty :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Sample Reauest Qty",
                      },
                    })}
                    name='Reauest_Qty'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={1}></Col>
                <Col span={6}>
                  <CustomLabel
                    label='Plan Launch :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Plan Launch",
                      },
                    })}
                    name='Plan_Launch'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={1}></Col>
                <Col span={6}>
                  <CustomLabel
                    label='Volume/Order :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Volume/Order",
                      },
                    })}
                    name='Volume_order'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
              </Row>
              <Row className='col-2 row-margin-vertical'>
                <Col span={1}></Col>
                <Col span={6}>
                  <CustomLabel
                    label='Export to (specify county) :'
                    require
                    readOnly={readOnly}
                  />
                </Col>
                <Col span={12}>
                  <Controller
                    as={InputField({
                      fieldProps: {
                        className: "form-control",
                        placeholder: "Export to (specify county)",
                      },
                    })}
                    name='Export'
                    control={control}
                    rules={{ required: false }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={24} className='col-2 mt-2' gutter={[32, 0]}>
              <NprDetail
                nprstate={nprstate}
                readOnly={readOnly}
                stateDispatch={stateDispatch}
                {...{
                  control,
                  register,
                  defaultValues,
                  getValues,
                  setValue,
                  errors,
                }}
                detailField={"nprcomponenst_detail"}></NprDetail>
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

export default NprCreate;
