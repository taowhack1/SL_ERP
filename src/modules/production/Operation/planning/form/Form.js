import { Col, Row, Divider } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React from "react";
import { Controller } from "react-hook-form";
import { apiGetShift } from "../../../../../actions/hrm";
import {
  DatePickerField,
  InputNumberField,
  SelectField,
  TimePickerField,
} from "../../../../../components/AntDesignComponent";
import CustomLabel from "../../../../../components/CustomLabel";
import { api_machine } from "../../../../../include/js/api";
import { useFetch } from "../../../../../include/js/customHooks";
import { getStatusByName } from "../../../../../include/js/function_main";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../include/js/main_config";

const PlanForm = (props) => {
  const { data: costCenter, loading: costCenterLoading } =
    useFetch(api_machine);
  const { data: shift, loading: shiftLoading } = useFetch(apiGetShift);
  const {
    formState: { errors },
    control,
    register,
    readOnly,
    persistData: {
      //   plan_job_no,
      //   plan_job_description,
      tg_plan_job_actual_time,
      tg_plan_job_actual_worker,
      tg_plan_job_actual_qty,
      job_order_no,
      job_order_description,
      item_no_name,
      job_order_qty,
      mrp_no,
      so_no,
      trans_status_name,
      machine_cost_center_description,
      plan_job_date,
      plan_job_plan_time,
      plan_job_plan_worker,
      shift_job_name,
    },
    loading,
  } = props;
  return (
    <>
      <input {...register("tg_trans_status_id")} className="d-none" />
      <input {...register("tg_trans_close_id")} className="d-none" />
      <input {...register("plan_job_actived")} className="d-none" />
      <input {...register("plan_job_id")} className="d-none" />
      <input {...register("job_order_id")} className="d-none" />
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} label={"Job No. :"} />
        </Col>
        <Col span={18}>
          <Text className="pre-wrap">{job_order_no || "-"}</Text>
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} label={"Description : "} />
        </Col>
        <Col span={18}>
          <Text className="pre-wrap">{job_order_description || "-"}</Text>
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} label={"Item :"} />
        </Col>
        <Col span={18}>
          <Text className="pre-wrap">{item_no_name || "-"}</Text>
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} label={"Quantity :"} />
        </Col>
        <Col span={18}>
          <Text className="pre-wrap">
            {convertDigit(job_order_qty || 0, 6)}
          </Text>
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} label={"S/O No."} />
        </Col>
        <Col span={18}>
          <Text className="pre-wrap">{so_no || "-"}</Text>
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} label={"Status :"} />
        </Col>
        <Col span={18}>
          <div style={{ width: 150, textAlign: "center" }}>
            {getStatusByName(trans_status_name)}
          </div>
        </Col>
      </Row>
      <Divider className="divider-sm" />
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} require label={"Work Center :"} />
        </Col>
        <Col span={18}>
          {readOnly ? (
            <Text className="pre-wrap">{`${
              machine_cost_center_description || "-"
            }`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `machine_id`,
                  control,
                  rules: { required: true },
                  defaultValue: null,
                  render: ({ field }) => {
                    const { onChange } = field;
                    return SelectField({
                      fieldId: "machine_id",
                      fieldName: "machine_cost_center_description",
                      dataSource: costCenter || [],
                      disabled: costCenterLoading || loading,
                      fieldProps: {
                        className: "w-100",
                        placeholder: "Select Work Center",
                        showSearch: true,
                        allowClear: true,
                        onChange: (id, obj, index) => onChange(id || null),
                        ...field,
                      },
                    });
                  },
                }}
              />
              <br />
              {errors?.machine_id && (
                <Text strong className="require">
                  This field is required.
                </Text>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} require label={"Plan Date :"} />
        </Col>
        <Col span={10}>
          {readOnly ? (
            <Text className="pre-wrap">{`${plan_job_date || "-"}`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `plan_job_date`,
                  control,
                  rules: { required: true },
                  defaultValue: null,
                  render: ({ field }) => {
                    const { onChange, value } = field;
                    return DatePickerField({
                      fieldProps: {
                        className: "w-100",
                        placeholder: "Select Plan Date",
                        format: "DD/MM/YYYY",
                        disabled: loading,
                        value: value ? moment(value, "DD/MM/YYYY") : null,
                        onChange: (date) =>
                          onChange(
                            date ? moment(date).format("DD/MM/YYYY") : null
                          ),
                      },
                    });
                  },
                }}
              />
              <br />
              {errors?.plan_job_date && (
                <Text strong className="require">
                  This field is required.
                </Text>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} require label={"Period :"} />
        </Col>
        <Col span={10}>
          {readOnly ? (
            <Text className="pre-wrap">{`${plan_job_plan_time || "-"}`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `plan_job_plan_time`,
                  control,
                  rules: { required: true },
                  defaultValue: null,
                  render: ({ field }) => {
                    const { onChange, value } = field;
                    return TimePickerField({
                      fieldProps: {
                        className: "w-100",
                        placeholder: "Time Picker",
                        format: "HH:mm:ss",
                        disabled: loading,
                        value: value ? moment(value, "HH:mm:ss") : null,
                        onChange: (date) =>
                          onChange(
                            date ? moment(date).format("HH:mm:ss") : null
                          ),
                      },
                    });
                  },
                }}
              />
              <br />
              {errors?.plan_job_plan_time && (
                <Text strong className="require">
                  This field is required.
                </Text>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} require label={"Worker :"} />
        </Col>
        <Col span={10}>
          {readOnly ? (
            <Text className="pre-wrap">{`${plan_job_plan_worker || "-"}`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `plan_job_plan_worker`,
                  control,
                  rules: { required: true },
                  defaultValue: null,
                  render: ({ field }) => {
                    return InputNumberField({
                      fieldProps: {
                        className: "w-100",
                        placeholder: "Enter Number Of Worker",
                        min: 0,
                        disabled: loading,
                        ...getNumberFormat(6),
                        ...field,
                      },
                    });
                  },
                }}
              />
              <br />
              {errors?.plan_job_plan_worker && (
                <Text strong className="require">
                  This field is required.
                </Text>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row className="col-2 mt-1 mb-1" gutter={8}>
        <Col span={6}>
          <CustomLabel readOnly={readOnly} require label={"Shift :"} />
        </Col>
        <Col span={10}>
          {readOnly ? (
            <Text className="pre-wrap">{`${shift_job_name || "-"}`}</Text>
          ) : (
            <>
              <Controller
                {...{
                  name: `shift_job_id`,
                  control,
                  rules: { required: true },
                  defaultValue: null,
                  render: ({ field }) => {
                    const { onChange } = field;
                    return SelectField({
                      fieldId: "shift_job_id",
                      fieldName: "shift_job_name",
                      dataSource: shift || [],
                      disabled: shiftLoading,
                      fieldProps: {
                        className: "w-100",
                        placeholder: "Select Shift",
                        showSearch: true,
                        allowClear: true,
                        disabled: loading,
                        onChange: (id, obj, index) => onChange(id || null),
                        ...field,
                      },
                    });
                  },
                }}
              />
              <br />
              {errors?.shift_job_id && (
                <Text strong className="require">
                  This field is required.
                </Text>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default React.memo(PlanForm);
