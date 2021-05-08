import { Button, Col, DatePicker, message, Row, Spin } from "antd";
import React, { useContext, useEffect } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getRDEmp } from "../../../../actions/hrm";
import { Controller, useForm } from "react-hook-form";
import {
  DatePickerField,
  SelectField,
} from "../../../../components/AntDesignComponent";
import { NPRFormContext } from "./RDForm";
import { SET_LOADING } from "../../../../actions/types";
import { saveNPRAssignment } from "../../../../actions/sales/nprActions";
const initialState = {
  npr_responsed_required_by: null,
  npr_responsed_delivery_date: null,
  user_name: null,
  npr_responsed_remark: null,
  tg_trans_status_id: 1,
};
const RDPIC = () => {
  const { id, state, setState } = useContext(NPRFormContext);
  const { npr_responsed_delivery_date, npr_responsed_required_by } = state;
  console.log("state", state);
  const dispatch = useDispatch();
  const { user_name } = useSelector((state) => state.auth.authData);
  const { loading } = useSelector((state) => state.hrm);
  const { rd: rdEmp } = useSelector((state) => state.hrm.employee);
  const {
    control,
    formState: { error },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      npr_responsed_delivery_date: npr_responsed_delivery_date
        ? moment(npr_responsed_delivery_date, "DD/MM/YYYY")
        : null,
      npr_responsed_required_by,
    },
  });

  const onSubmit = async (data) => {
    dispatch({ type: SET_LOADING, payload: true });
    const saveData = {
      ...data,
      user_name,
      commit: 1,
      tg_trans_status_id: 2,
      npr_responsed_remark: null,
      npr_responsed_delivery_date: moment(
        data.npr_responsed_delivery_date
      ).format("DD/MM/YYYY"),
    };
    console.log("Submit", saveData);
    const resp = await saveNPRAssignment(id, [saveData]);

    console.log("RESPONSE ", resp);
    setTimeout(() => {
      dispatch({ type: SET_LOADING, payload: false });
      if (resp.success) {
        message.success("Assign PIC Success.");
        setState(resp.data);
      }
    }, 1000);
  };
  console.log(error);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section-head flex-space">
          <h3>Assignment</h3>
          <Button
            htmlType="submit"
            className="primary"
            size="small"
            loading={loading}
          >
            Save Change
          </Button>
        </div>

        <div className="form-section">
          <Spin spinning={loading}>
            <Row className="col-2">
              <Col span={12} className="pd-right-2">
                <Row className="col-2">
                  <Col span={8}>
                    <CustomLabel label="Person In Charge :" />
                  </Col>
                  <Col span={16}>
                    <Controller
                      render={({ field }) =>
                        SelectField({
                          fieldProps: {
                            className: "full-width",
                            placeholder: "Select person in charge",
                            showSearch: true,
                            onChange: (val) => field.onChange(val || null),
                            ...field,
                          },
                          dataSource: rdEmp,
                          fieldName: "employee_no_name",
                          fieldId: "employee_no",
                        })
                      }
                      control={control}
                      name="npr_responsed_required_by"
                      rules={{ required: true }}
                      defaultValue={npr_responsed_required_by}
                    />
                    {error && error?.npr_responsed_required_by && (
                      <span className="require">This field is required.</span>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={12} className="pd-left-2">
                <Row className="col-2">
                  <Col span={8}>
                    <CustomLabel label="Due Date :" />
                  </Col>
                  <Col span={16}>
                    <Controller
                      render={({ field }) =>
                        DatePickerField({
                          fieldProps: {
                            className: "full-width",
                            placeholder: "Due date",
                            format: "DD/MM/YYYY",
                            onChange: (val) =>
                              field.onChange(
                                val
                                  ? console.log(
                                      moment(val).format("DD/MM/YYYY")
                                    )
                                  : null
                              ),
                            ...field,
                          },
                        })
                      }
                      control={control}
                      name="npr_responsed_delivery_date"
                      rules={{ required: true }}
                    />
                    {error && error?.npr_responsed_delivery_date && (
                      <span className="require">This field is required.</span>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Spin>
        </div>
      </form>
    </>
  );
};

export default RDPIC;
