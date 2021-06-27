import { Button, Checkbox, Col, Row, Spin } from "antd";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomLabel from "../../../../../components/CustomLabel";
import moment from "moment";
import { DatePickerField } from "../../../../../components/AntDesignComponent";
import { SET_LOADING } from "../../../../../actions/types";
import { NPRFormContext } from "./RDForm";
const RDPICResponse = () => {
  const dispatch = useDispatch();
  const { id, state } = useContext(NPRFormContext);
  const { user_name } = useSelector((state) => state.auth.authData);
  const { loading } = useSelector((state) => state.sales);
  const { tg_trans_status_id, npr_formula_delivery_date } = state;
  const {
    control,
    formState: { error },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      npr_formula_delivery_date: npr_formula_delivery_date
        ? moment(npr_formula_delivery_date, "DD/MM/YYYY")
        : null,
      tg_trans_status_id,
    },
  });

  const onSubmit = async (data) => {
    dispatch({ type: SET_LOADING, payload: true });
    console.log("submit", data);
    const saveData = {
      ...data,
      user_name,
      commit: 1,
      tg_trans_status_id: 4,
      npr_responsed_remark: null,
      npr_formula_delivery_date: moment(data.npr_formula_delivery_date).format(
        "DD/MM/YYYY"
      ),
    };
    console.log("Submit", saveData);
    // const resp = await updateNPRRDStatus(id, [saveData]);
    // console.log("RESPONSE ", resp);
    setTimeout(() => dispatch({ type: SET_LOADING, payload: false }), 1000);
  };
  const watchFields = watch(["tg_trans_status_id"]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          htmlType="submit"
          className="primary d-none"
          size="small"
          loading={loading}
        >
          Save Change
        </Button>

        <div className="form-section">
          <Spin spinning={loading}>
            <Row className="col-2">
              <Col span={12}>
                <Row className="col-2">
                  <Col span={8}>
                    <CustomLabel label="Finished :" />
                  </Col>
                  <Col span={16}>
                    <Controller
                      render={({ field: { value, onChange } }) => (
                        <Checkbox
                          control={control}
                          rules={{ required: true }}
                          checked={value === 4 ? true : false}
                          onChange={(e) => onChange(e.target.checked ? 4 : 2)}
                        />
                      )}
                      control={control}
                      name="tg_trans_status_id"
                      rules={{ required: true }}
                      defaultChecked={tg_trans_status_id}
                    />
                    {error && error?.tg_trans_status_id && (
                      <span className="require">This field is required.</span>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={12} className="pd-left-2">
                <Row className="col-2">
                  <Col span={8}>
                    <CustomLabel label="Deliver Date :" />
                  </Col>
                  <Col span={16}>
                    <Controller
                      render={({ field }) =>
                        DatePickerField({
                          fieldProps: {
                            className: "full-width",
                            placeholder: "Deliver date",
                            format: "DD/MM/YYYY",
                            disabled:
                              watchFields.tg_trans_status_id === 4
                                ? false
                                : true,
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
                      name="npr_formula_delivery_date"
                      rules={{ required: true }}
                    />
                    {error && error?.npr_formula_delivery_date && (
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

export default React.memo(RDPICResponse);
