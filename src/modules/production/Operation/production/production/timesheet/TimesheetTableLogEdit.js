/** @format */

import { Button, InputNumber, Popconfirm } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useRef } from "react";
import { useSelector } from "react-redux";
import CustomTable from "../../../../../../components/CustomTable";
import { ProductionContext } from "../../../../../../include/js/context";
import { getNumberFormat } from "../../../../../../include/js/main_config";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { updateTimesheetLog } from "../../../../../../actions/production/timesheetActions";

const TimesheetTableLogEdit = ({ setStatus }) => {
  const btnSubmit = useRef(null);
  const { form } = useContext(ProductionContext);
  const { start: timesheet } = useSelector(
    (state) => state.production.timesheet
  );
  const { time_sheet_log_detail } = timesheet;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: timesheet,
  });
  const { fields } = useFieldArray({
    control,
    name: "time_sheet_log_detail",
    defaultValues: time_sheet_log_detail,
  });
  const onSubmit = async (data) => {
    console.log("formData", data, "fields", fields);
    const resp = await updateTimesheetLog({ ...data, fields });
    console.log("resp_faa", resp);
    if (resp.success) {
      setStatus(0);
      // do when success
    } else {
      // อยู่หน้าเดิม ขึ้นเออเร่อเตือน
    }
    setConfirmLoading(false);
  };
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    console.log("Clicked OK button");
    btnSubmit.current.click();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
  };
  console.log("errors", errors);
  return (
    <>
      <div className='full-width mt-2 pd-left-1 pd-right-1'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomTable
            columns={[
              {
                title: "No.",
                dataIndex: "ids",
                width: "5%",
                key: "ids",
                align: "center",
                ellipsis: true,
                render: (value) => {
                  return <Text className={"text-value"}>{value + 1}</Text>;
                },
              },
              {
                title: "Start",
                dataIndex: "time_sheet_log_date_from",
                width: "20%",
                align: "center",
                ellipsis: true,
                render: (value) => {
                  return <Text className='text-value'>{value || "-"}</Text>;
                },
              },
              {
                title: "Stop",
                dataIndex: "time_sheet_log_date_to",
                width: "20%",
                align: "center",
                ellipsis: true,
                render: (value) => {
                  return (
                    <Text className='text-value'>{value || "-"}</Text>
                    // <Text className="text-value">{value ? value.split(" ")[1] : "-"}</Text>
                  );
                },
              },
              {
                title: "Total time",
                dataIndex: "time_sheet_log_time",
                width: "12%",
                align: "center",
                ellipsis: true,
                render: (value, record) => {
                  return (
                    <Text className='text-value'>
                      {record.time_sheet_log_date_to ? value : "-"}
                    </Text>
                  );
                },
              },
              {
                title: (
                  <div className='text-center'>
                    <Text>Total Qty.</Text>
                  </div>
                ),
                dataIndex: "time_sheet_log_qty",
                width: "12%",
                align: "right",
                ellipsis: true,
                render: (value, record) => {
                  return (
                    <Controller
                      render={({ field: { value, onChange, onBlur } }) => {
                        console.log("value", value);
                        return (
                          <InputNumber
                            {...getNumberFormat(3)}
                            min={0}
                            step={1}
                            size={"small"}
                            className='full-width'
                            value={value || 0}
                            onChange={onChange}
                          />
                        );
                      }}
                      name={`time_sheet_log_detail[${record.ids}].time_sheet_log_qty`}
                      control={control}
                      rules={{ required: true }}
                    />
                  );
                },
              },
              {
                title: (
                  <div className='text-center'>
                    <Text>Remark</Text>
                  </div>
                ),
                dataIndex: "time_sheet_log_remark",

                align: "left",
                ellipsis: true,
                render: (value) => {
                  return <Text className='text-value'>{value || "-"}</Text>;
                },
              },
            ]}
            dataSource={fields}
            rowKey='ids'
            rowClassName={(row, index) =>
              index % 2 === 0 ? "row-hl row-table-detail" : "row-table-detail"
            }
            pagination={false}
            scroll={{ y: (window.innerHeight * 0.75) / 2 }}
            size={"small"}
          />
          <div
            className='full-width mt-2 flex-space'
            style={{ padding: "0px 20%" }}>
            <Popconfirm
              title='Are you sure to save change?'
              // visible={visible}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}>
              <Button
                block
                className={"timesheet-btn primary"}
                //   onClick={() => setStatus(0)}
                htmlType='submit'
                id='submit-ts-log'>
                Save Change
              </Button>
            </Popconfirm>
            <Popconfirm
              title='Are you sure to discard change?'
              onConfirm={() => setStatus(0)}
              onCancel={() => console.log("cancel")}>
              <Button block className={"timesheet-btn"}>
                Discard
              </Button>
            </Popconfirm>
            <input
              type='hidden'
              ref={btnSubmit}
              onClick={handleSubmit(onSubmit)}></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default React.memo(TimesheetTableLogEdit);
