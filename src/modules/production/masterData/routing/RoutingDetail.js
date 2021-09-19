import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Spin, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  DatePickerField,
  InputNumberField,
  SelectField,
  TimePickerField,
} from "../../../../components/AntDesignComponent";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTable from "../../../../components/CustomTable";
import { api_machine } from "../../../../include/js/api";
import { useFetch } from "../../../../include/js/customHooks";

const RoutingDetail = (props) => {
  const {
    readOnly,
    control,
    register,
    loading,
    formState: { errors },
  } = props;
  const { data: machine, loading: getMachineLoading } = useFetch(api_machine);
  console.log("detail errors", errors);
  const { fields, append, remove } = useFieldArray({
    name: "routing_detail",
    control,
  });
  return (
    <div className="mt-3">
      <Tabs>
        <Tabs.TabPane tab="Routing Detail" key="1">
          <CustomTable
            rowKey="id"
            rowClassName="row-table-detail"
            size="small"
            columns={columns({
              readOnly,
              control,
              register,
              remove,
              errors,
              loading,
              machine,
              getMachineLoading,
            })}
            pageSize={999}
            dataSource={fields}
            onAdd={!readOnly ? () => append(initialState) : null}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default RoutingDetail;
const initialState = {
  routing_detail_id: null,
  routing_detail_type_id: null,
  machine_id: null,
  routing_detail_remark: null,
  routing_detail_lead_time: null,
  routing_detail_worker: null,
};
const columns = ({
  readOnly,
  control,
  register,
  remove,
  errors,
  loading,
  machine,
  getMachineLoading,
}) => [
  {
    title: (
      <div className="text-center">
        <b>Work Center</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    dataIndex: "left",
    render: (val, row, index) =>
      readOnly ? (
        val
      ) : (
        <>
          <input
            {...register(`routing_detail.${index}.routing_detail_id`)}
            className="d-none"
          />
          <input
            {...register(`routing_detail.${index}.routing_detail_type_id`)}
            className="d-none"
          />
          <Spin spinning={getMachineLoading}>
            <Controller
              name={`routing_detail.${index}.machine_id`}
              control={control}
              render={({ field }) =>
                SelectField({
                  fieldProps: {
                    placeholder: "Work Center",
                    className: "text-left",
                    allowClear: true,
                    showSearch: true,
                    disabled: loading,
                    size: "small",
                    ...field,
                  },
                  dataSource: machine || [],
                  fieldId: "machine_id",
                  fieldName: "machine_cost_center_description",
                })
              }
              rules={{ required: true }}
            />
          </Spin>

          {errors.routing_detail &&
            errors?.routing_detail[index]?.machine_id && (
              <Text className="error">This field is required.</Text>
            )}
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>Man</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "15%",
    dataIndex: "right",
    render: (val, row, index) =>
      readOnly ? (
        val
      ) : (
        <>
          <Controller
            name={`routing_detail.${index}.routing_detail_worker`}
            control={control}
            render={({ field }) =>
              InputNumberField({
                fieldProps: {
                  placeholder: "จำนวนคนทำงาน",
                  className: "w-100 text-right",
                  min: 0,
                  disabled: loading,
                  size: "small",
                  ...field,
                },
              })
            }
            rules={{ required: true }}
          />

          {errors.routing_detail &&
            errors?.routing_detail[index]?.routing_detail_worker && (
              <Text className="error">This field is required.</Text>
            )}
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>Period</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "15%",
    dataIndex: "ref_no",
    render: (val, row, index) =>
      readOnly ? (
        val
      ) : (
        <>
          <Controller
            name={`routing_detail.${index}.routing_detail_lead_time`}
            control={control}
            render={({ field: { value, onChange } }) =>
              TimePickerField({
                fieldProps: {
                  placeholder: "ชั่วโมง : นาที",
                  className: "w-100 text-right",
                  format: "HH:mm",
                  disabled: loading,
                  size: "small",
                  value: value ? moment(value, "HH:mm:ss") : null,
                  onChange: (val) =>
                    val ? onChange(moment(val).format("HH:mm:ss")) : null,
                },
              })
            }
            rules={{ required: true }}
          />
          {errors.routing_detail &&
            errors?.routing_detail[index]?.routing_detail_lead_time && (
              <Text className="error">This field is required.</Text>
            )}
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "id",
    render: (id, row, index) =>
      !loading &&
      !readOnly && (
        <DeleteTwoTone className="button-icon" onClick={() => remove(index)} />
      ),
  },
];
