import { Col, message, Row, Spin, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
import { getAllMachine } from "../../../../actions/production/machineActions";
import {
  getFgItem,
  saveRouting,
} from "../../../../actions/production/routingAction";
import CustomLabel from "../../../../components/CustomLabel";
import RoutingDetail from "./RoutingDetail";
import {
  getNumberFormat,
  header_config,
} from "../../../../include/js/main_config";
import { useFetch } from "../../../../include/js/customHooks";
import { Controller, useForm } from "react-hook-form";
import {
  InputField,
  InputNumberField,
  SelectField,
} from "../../../../components/AntDesignComponent";
import { useParams } from "react-router";
import { AppContext } from "../../../../include/js/context";
import moment from "moment";
import axios from "axios";
const { Text } = Typography;
const apiGetRoutingType = `/list/routing_type`;
const apiGetRouting = `/production/routing`;
const apiGetFGBulkItem = `/list/routing/item`;
let persistData = {};
const RoutingForm = (props) => {
  const readOnly = false;
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const [loading, setLoading] = useState(false);
  const [type_id, setTypeId] = useState(null);
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const { data: routingTypes, loading: getRoutingTypeLoading } =
    useFetch(apiGetRoutingType);
  const { data: items, loading: getItemsLoading } = useFetch(apiGetFGBulkItem);

  const formMethods = useForm({
    defaultValues: {
      ...initialState,
      routing_created: moment().format("DD/MM/YYYY"),
    },
  });
  const {
    reset,
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = formMethods;

  const getData = async (id) => {
    persistData = initialState;
    if (!id) {
      reset(initialState);
      return false;
    }
    setLoading(true);
    const resp = await axios
      .get(`${apiGetRouting}/${id}`, header_config)
      .then((resp) => {
        if (resp.status === 200) {
          persistData = resp.data[0];
          setTypeId(persistData?.type_id || null);
          return { success: true, data: resp.data[0], message: "Success" };
        } else {
          return { success: false, data: {}, message: "Fail." };
        }
      })
      .catch((error) => {
        console.log(error);
        message.error("Error!. Can't get any data from the server.");
        return { success: false, data: {}, message: "Fail." };
      });
    console.log("resp", resp);
    if (resp.success) {
      reset(resp.data);
    } else {
      reset(initialState);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  const config = {
    projectId: 10,
    title: "PRODUCTION",
    home: "/production",
    show: true,
    breadcrumb: ["Home", "Routing", "Create"],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/production/routing",
    onSave: (e) => {
      document.getElementById("submit-btn").click();
    },
    onEdit: (e) => {
      console.log("Edit");
    },
    onApprove: (e) => {
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const saveData = [
      {
        ...data,
        user_name,
        commit: 1,
        routing_detail: data.routing_detail.map((obj) => ({
          ...obj,
          routing_detail_type_id: data.type_id === 3 ? 1 : 2,
        })),
      },
    ];
    console.log("submit saveData : ", saveData);
    const resp = await saveRouting(saveData);
    if (resp.success) {
      message.success("Save Successfully.", 4);
    } else {
      message.error("Save Fail. Please contact administator", 6);
    }
    setLoading(false);
  };
  const onError = async (error) => {
    console.log(error);
  };
  const { routing_created, routing_description, item_no_name } = persistData;
  console.log("main errors ", errors);
  console.log("type_id", type_id);
  return (
    <>
      <MainLayout {...config}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div id="form">
            <input {...register(`routing_id`)} className="d-none" />
            <input {...register(`uom_id`)} className="d-none" />
            <input {...register(`routing_remark`)} className="d-none" />
            <input {...register(`routing_created`)} className="d-none" />
            <Row className="col-2">
              <Col span={8}>
                <h2>
                  <strong>Create Routing</strong>
                </h2>
              </Col>
              <Col span={12}></Col>
              <Col span={2}>
                <Text strong>Create Date :</Text>
              </Col>
              <Col span={2} style={{ textAlign: "right" }}>
                <Text className="text-view">{routing_created}</Text>
              </Col>
            </Row>
            {loading && (
              <Row className="mt-2 mb-2">
                <Col span={24}>
                  <h2 className="ml-3">
                    <Spin spinning={true}></Spin>
                    <Text className="pd-left-3">Loading data...</Text>
                  </h2>
                </Col>
              </Row>
            )}
            <Row className="col-2 row-tab-margin">
              <Col span={24}>
                <CustomLabel
                  label="Description :"
                  require
                  readOnly={readOnly}
                />
              </Col>
            </Row>
            <Row className="col-2 mt-2">
              <Col span={24} style={{ marginBottom: 8 }}>
                <Controller
                  name={`routing_description`}
                  control={control}
                  render={({ field }) =>
                    InputField({
                      fieldProps: {
                        placeholder: "คำอธิบาย / ตั้งชื่อ Routing",
                        className: "w-100",
                        ...field,
                      },
                    })
                  }
                  rules={{ required: true }}
                  defaultValue={routing_description}
                />
                {errors && errors.routing_description && (
                  <Text className="error">This field is required.</Text>
                )}
              </Col>
            </Row>
            <Row className="col-2 mt-2" gutter={[32, 0]}>
              {/* left */}
              <Col span={12} className="col-border-right">
                <Row className="col-2 row-margin-vertical">
                  <Col span={6}>
                    <CustomLabel label="Item :" require readOnly={readOnly} />
                  </Col>
                  <Col span={17}>
                    {id ? (
                      <>
                        <input {...register(`item_id`)} className="d-none" />
                        <Text>{item_no_name || "-"}</Text>
                      </>
                    ) : (
                      <>
                        <Spin spinning={getItemsLoading}>
                          <Controller
                            name={`item_id`}
                            control={control}
                            render={({ field }) =>
                              SelectField({
                                fieldProps: {
                                  placeholder: "เลือก Item",
                                  className: "w-100",
                                  allowClear: true,
                                  showSearch: true,
                                  disabled: loading,
                                  ...field,
                                  onChange: (val, row) => {
                                    console.log("select", row);
                                    if (val !== undefined) {
                                      field.onChange(val);
                                      setValue("type_id", row?.obj?.type_id);
                                      setValue("routing_type_id", null);
                                      setValue("uom_id", row?.obj?.uom_id);
                                      setTypeId(row?.obj?.type_id);
                                    } else {
                                      field.onChange(null);
                                      setValue("type_id", null);
                                      setValue("routing_type_id", null);
                                      setValue("uom_id", null);
                                      setTypeId(null);
                                    }
                                  },
                                },
                                dataSource: items || [],
                                fieldId: "item_id",
                                fieldName: "item_no_name",
                              })
                            }
                            rules={{ required: true }}
                          />
                        </Spin>

                        {errors && errors.item_id && (
                          <Text className="error">This field is required.</Text>
                        )}
                      </>
                    )}
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={6}>
                    <CustomLabel
                      label="Routing Type :"
                      require
                      readOnly={readOnly}
                    />
                  </Col>
                  <Col span={17}>
                    <>
                      <Spin spinning={getRoutingTypeLoading}>
                        <Controller
                          name={`routing_type_id`}
                          control={control}
                          render={({ field }) =>
                            SelectField({
                              fieldProps: {
                                placeholder: "ระบุประเภทของ Routing",
                                className: "w-100",
                                allowClear: true,
                                showSearch: true,
                                disabled: loading || !type_id,
                                ...field,
                              },
                              dataSource: routingTypes
                                ? routingTypes?.filter(
                                    (obj) => obj.type_id === type_id
                                  )
                                : [],
                              fieldId: "routing_type_id",
                              fieldName: "routing_type_no_name",
                            })
                          }
                          rules={{ required: true }}
                        />
                      </Spin>
                      {errors && errors.routing_type_id && (
                        <Text className="error">This field is required.</Text>
                      )}
                    </>
                  </Col>
                </Row>
              </Col>
              {/* right */}
              <Col span={12}>
                <Row className="col-2 row-margin-vertical">
                  <Col span={6}>
                    <CustomLabel
                      label={"Quantity :"}
                      require
                      readOnly={readOnly}
                    />
                  </Col>
                  <Col span={18}>
                    <>
                      <Controller
                        name={`routing_qty`}
                        control={control}
                        render={({ field }) =>
                          InputNumberField({
                            fieldProps: {
                              ...getNumberFormat(4),
                              placeholder:
                                "ระบุจำนวน FG : Qty / Bulk : Batch Size",
                              className: "w-80",
                              disabled: loading,
                              min: 0,
                              ...field,
                            },
                          })
                        }
                        rules={{ required: true }}
                      />
                      <br />
                      {errors && errors?.routing_qty && (
                        <Text className="error">This field is required.</Text>
                      )}
                    </>
                  </Col>
                </Row>
              </Col>
            </Row>
            <RoutingDetail
              {...formMethods}
              readOnly={readOnly}
              loading={loading}
            />
          </div>
          <button type="submit" id="submit-btn" className="d-none">
            Submit Btn
          </button>
        </form>
      </MainLayout>
    </>
  );
};

export default RoutingForm;

const initialState = {
  routing_description: null,
  routing_created: moment().format("DD/MM/YYYY"),
  item_id: null,
  type_id: null,
  routing_qty: 0,
  routing_type_id: null,
  user_name: null,
  routing_remark: null,
  uom_id: null,
  commit: 1,
  routing_detail: [
    {
      routing_detail_type_id: null,
      machine_id: null,
      routing_detail_remark: null,
      routing_detail_lead_time: null,
      routing_detail_worker: null,
    },
  ],
};
