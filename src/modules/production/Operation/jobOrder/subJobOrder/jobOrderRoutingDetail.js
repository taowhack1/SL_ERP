import {
  DeleteOutlined,
  DeleteTwoTone,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Spin, Switch, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { apiGetShift } from "../../../../../actions/hrm";
import {
  DatePickerField,
  InputNumberField,
  SelectField,
  TimePickerField,
} from "../../../../../components/AntDesignComponent";
import CustomSelect from "../../../../../components/CustomSelect";
import CustomTable from "../../../../../components/CustomTable";
import { api_machine } from "../../../../../include/js/api";
import { useFetch } from "../../../../../include/js/customHooks";
import { getStatusByName } from "../../../../../include/js/function_main";
// import { TimePickerField } from "../../../../../components/AntDesignComponent";

const JobRouting = (props) => {
  const {
    readOnly,
    control,
    register,
    loading,
    watch,
    formState: { errors },
    temp_job_order_id,
  } = props;
  const { data: machine, loading: getMachineLoading } = useFetch(api_machine);
  const { data: shift, loading: getShiftLoading } = useFetch(apiGetShift);
  console.log("detail errors", errors);
  const { fields, append, remove } = useFieldArray({
    name: "plan_job",
    control,
  });
  console.log("job order plan : ", fields);
  console.log("temp_job_order_id", temp_job_order_id);
  return (
    <div className="mt-3">
      <Tabs>
        <Tabs.TabPane tab="Routing" key="1">
          {!temp_job_order_id ? (
            <h3>
              <span className="require">* </span>ระบบจะโหลดข้อมูล Routing
              ให้หลังจากแบ่ง Job แล้ว
            </h3>
          ) : (
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
                shift,
                getShiftLoading,
                watch,
              })}
              pageSize={999}
              dataSource={fields}
              // onAdd={!readOnly ? () => append(initialState) : null}
            />
          )}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default JobRouting;
const initialState = {
  job_order_id: null,
  user_name: null,
  plan_job_id: null,
  plan_job_date: null,
  plan_job_plan_worker: null,
  plan_job_plan_time: null,
  machine_id: null,
  shift_job_id: 1,
  plan_job_description: null,
  plan_job_remark: null,
  plan_job_actived: 1,
  tg_trans_status_id: 2,
  tg_trans_close_id: 1,
  commit: 1,
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
  shift,
  getShiftLoading,
  watch,
}) => [
  {
    title: (
      <div className="text-center">
        <b>Work Center</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "machine_id",
    ellipsis: true,
    render: (val, row, index) =>
      readOnly ? (
        <Text>{row?.machine_cost_center_description_name}</Text>
      ) : (
        <>
          <input
            {...register(`plan_job.${index}.plan_job_id`)}
            className="d-none"
          />
          <input
            {...register(`plan_job.${index}.tg_trans_status_id`)}
            className="d-none"
          />
          <input
            {...register(`plan_job.${index}.tg_trans_close_id`)}
            className="d-none"
          />
          <Spin spinning={getMachineLoading}>
            <Controller
              name={`plan_job.${index}.machine_id`}
              control={control}
              render={({ field }) => {
                const inActive = ![1, 2, 4].includes(
                  watch(`plan_job.${index}.tg_trans_status_id`)
                );
                return SelectField({
                  fieldProps: {
                    placeholder: "Work Center",
                    className: "text-left w-100",
                    allowClear: true,
                    showSearch: true,
                    disabled: loading || inActive,
                    size: "small",
                    ...field,
                  },
                  dataSource: machine || [],
                  fieldId: "machine_id",
                  fieldName: "machine_cost_center_description",
                });
              }}
              rules={{ required: true }}
            />
          </Spin>

          {errors.plan_job && errors?.plan_job[index]?.machine_id && (
            <Text className="error" strong>
              This field is required.
            </Text>
          )}
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>Shift</b>
      </div>
    ),
    align: "center",
    width: "10%",
    className: "tb-col-sm",
    dataIndex: "shift_job_id",
    ellipsis: true,
    render: (val, row, index) =>
      readOnly ? (
        <Text>{row?.shift_job_name}</Text>
      ) : (
        <>
          <Spin spinning={getShiftLoading}>
            <Controller
              name={`plan_job.${index}.shift_job_id`}
              control={control}
              render={({ field }) => {
                const inActive = ![1, 2, 4].includes(
                  watch(`plan_job.${index}.tg_trans_status_id`)
                );
                return SelectField({
                  fieldProps: {
                    placeholder: "เลือกกะการทำงาน",
                    className: "text-left w-100",
                    allowClear: true,
                    showSearch: true,
                    disabled: loading || inActive,
                    size: "small",
                    ...field,
                  },
                  dataSource: shift || [],
                  fieldId: "shift_job_id",
                  fieldName: "shift_job_name",
                });
              }}
              defaultValue={1}
              rules={{ required: true }}
            />
          </Spin>

          {errors.plan_job && errors?.plan_job[index]?.shift_job_id && (
            <Text className="error" strong>
              Required.
            </Text>
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
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "plan_job_plan_worker",
    render: (val, row, index) =>
      readOnly ? (
        <Text>{row?.plan_job_plan_worker}</Text>
      ) : (
        <>
          <Controller
            name={`plan_job.${index}.plan_job_plan_worker`}
            control={control}
            render={({ field }) => {
              const inActive = ![1, 2, 4].includes(
                watch(`plan_job.${index}.tg_trans_status_id`)
              );
              return InputNumberField({
                fieldProps: {
                  placeholder: "จำนวนคน",
                  className: "w-100 text-right",
                  min: 0,
                  disabled: loading || inActive,
                  size: "small",
                  ...field,
                },
              });
            }}
            rules={{ required: true }}
          />

          {errors.plan_job && errors?.plan_job[index]?.plan_job_plan_worker && (
            <Text className="error" strong>
              Required.
            </Text>
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
    width: "13%",
    dataIndex: "plan_job_plan_time",
    render: (val, row, index) =>
      readOnly ? (
        <Text>{row?.plan_job_plan_time}</Text>
      ) : (
        <>
          <Controller
            name={`plan_job.${index}.plan_job_plan_time`}
            control={control}
            render={({ field: { value, onChange } }) => {
              const inActive = ![1, 2, 4].includes(
                watch(`plan_job.${index}.tg_trans_status_id`)
              );
              return TimePickerField({
                fieldProps: {
                  placeholder: "ชั่วโมง : นาที",
                  className: "w-100 text-right",
                  format: "HH:mm",
                  disabled: loading || inActive,
                  size: "small",
                  value: value ? moment(value, "HH:mm:ss") : null,
                  onChange: (val) =>
                    val ? onChange(moment(val).format("HH:mm:ss")) : null,
                },
              });
            }}
            rules={{ required: true }}
          />
          {errors.plan_job && errors?.plan_job[index]?.plan_job_plan_time && (
            <Text className="error" strong>
              Required.
            </Text>
          )}
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <b>Plan Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "13%",
    dataIndex: "plan_job_date",
    render: (val, { tg_trans_status_id }, index) =>
      readOnly ? (
        val
      ) : (
        <>
          <Controller
            name={`plan_job.${index}.plan_job_date`}
            control={control}
            render={({ field: { value, onChange } }) => {
              const inActive = ![1, 2, 4].includes(
                watch(`plan_job.${index}.tg_trans_status_id`)
              );
              return DatePickerField({
                fieldProps: {
                  placeholder: "วันที่จะทำ",
                  className: "w-100 text-center",
                  format: "DD/MM/YYYY",
                  disabled: loading || inActive,
                  size: "small",
                  value: value ? moment(value, "DD/MM/YYYY") : null,
                  onChange: (val) =>
                    val ? onChange(moment(val).format("DD/MM/YYYY")) : null,
                },
              });
            }}
            rules={{ required: true }}
          />
          {errors.plan_job && errors?.plan_job[index]?.plan_job_date && (
            <Text className="error" strong>
              Required.
            </Text>
          )}
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <Text strong>Status</Text>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "trans_status_name",
    render: (value, row, index) => getStatusByName(value),
  },
  // : {
  //     title: (
  //       <div className="text-center">
  //         <EllipsisOutlined />
  //       </div>
  //     ),
  //     align: "center",
  //     className: "tb-col-sm",
  //     width: "5%",
  //     dataIndex: "job_order_id",
  //     render: (id, row, index) => {
  //       // const inActive = ![1, 2, 4].includes(
  //       //   watch(`plan_job.${index}.tg_trans_status_id`)
  //       // );
  //       return (
  //         !loading &&
  //         (row?.job_order_id ? (
  //           <Controller
  //             name={`plan_job.${index}.tg_trans_status_id`}
  //             control={control}
  //             render={({ field: { value, onChange } }) => (
  //               <Switch
  //                 size="small"
  //                 checked={[1, 2, 4].includes(value)}
  //                 rules={{ required: false }}
  //                 onChange={(checked) => onChange(checked ? 2 : 3)}
  //               />
  //             )}
  //           />
  //         ) : (
  //           <DeleteTwoTone
  //             className="button-icon"
  //             onClick={() => remove(index)}
  //           />
  //         ))
  //       );
  //     },
  //   },
];
