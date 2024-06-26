/** @format */

import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { Controller } from "react-hook-form";
import {
  DatePickerField,
  InputField,
  InputNumberField,
} from "../../../../../components/AntDesignComponent";
import { AppContext } from "../../../../../include/js/context";
import moment from "moment";
import { getNumberFormat } from "../../../../../include/js/main_config";
const Form = ({
  formArray: { fields },
  form: {
    control,
    register,
    setValue,
    formState: { errors },
    watch,
  },
  readOnly,
  itemData,
  type = "+ Qty.",
}) => {
  const {
    auth: { user_name, employee_no_name_eng },
  } = useContext(AppContext);
  return (
    <div>
      <div className='d-none'>
        {/* <input {...register(`stock_lot_no`)} />
        <input {...register(`stock_batch`)} />
        <input {...register(`stock_mfg_date`)} />
        <input {...register(`stock_exp_date`)} />
        <input {...register(`stock_unit_price`)} />
        <input {...register(`tg_stock_qty_balance`)} />
        <input {...register(`uom_no`)} /> */}
      </div>
      <Row gutter={[24, 8]} className='col-2 row-margin-vertical'>
        <Col span={24}>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={8}>
              <Text strong>Lot No :</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>{"Lot No"}</Text>
              ) : (
                <>
                  <Controller
                    control={control}
                    render={({ field }) =>
                      InputField({
                        fieldProps: {
                          placeholder: "Lot No.",
                          className: "w-100",
                          disabled: false,
                          ...field,
                        },
                      })
                    }
                    name='stock_lot_no'
                    id='stock_lot_no'
                    rules={{ required: false }}
                  />
                  {errors.stock_lot_no && (
                    <Text className='error'>This field is required.</Text>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={8}>
              <Text strong>Batch No :</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>{"Batch No"}</Text>
              ) : (
                <>
                  <Controller
                    name='stock_batch'
                    id='stock_batch'
                    control={control}
                    render={({ field }) =>
                      InputField({
                        fieldProps: {
                          placeholder: "Batch No.",
                          className: "w-100",
                          disabled: false,
                          ...field,
                        },
                      })
                    }
                    rules={{ required: false }}
                  />
                  {errors.stock_batch && (
                    <Text className='error'>This field is required.</Text>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={8}>
              <Text strong>MFG :</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>{"MFG"}</Text>
              ) : (
                <>
                  <Controller
                    name='stock_mfg_date'
                    id='stock_mfg_date'
                    control={control}
                    render={({ field: { value, onChange } }) =>
                      DatePickerField({
                        fieldProps: {
                          placeholder: "วัน / เดือน / ปี",
                          format: "DD/MM/YYYY",
                          className: "w-100",

                          value: value ? moment(value, "DD/MM/YYYY") : null,
                          onChange: (val) =>
                            val
                              ? onChange(moment(val).format("DD/MM/YYYY"))
                              : null,
                        },
                      })
                    }
                    rules={{ required: false }}
                  />
                  {errors.stock_mfg_date && (
                    <Text className='error'>This field is required.</Text>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={8}>
              <Text strong>EXP :</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>{"EXP"}</Text>
              ) : (
                <>
                  <Controller
                    name='stock_exp_date'
                    id='stock_exp_date'
                    control={control}
                    render={({ field: { value, onChange } }) =>
                      DatePickerField({
                        fieldProps: {
                          placeholder: "วัน / เดือน / ปี",
                          format: "DD/MM/YYYY",
                          className: "w-100",

                          value: value ? moment(value, "DD/MM/YYYY") : null,
                          onChange: (val) =>
                            val
                              ? onChange(moment(val).format("DD/MM/YYYY"))
                              : null,
                        },
                      })
                    }
                    rules={{ required: false }}
                  />
                  {errors.stock_exp_date && (
                    <Text className='error'>This field is required.</Text>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={8}>
              <Text strong>Price :</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>{"Price"}</Text>
              ) : (
                <>
                  <Controller
                    name='stock_unit_price'
                    id='stock_unit_price'
                    control={control}
                    render={({ field }) =>
                      InputNumberField({
                        fieldProps: {
                          placeholder: "Price",
                          className: "w-100",
                          min: 0,
                          ...getNumberFormat(3),
                          ...field,
                        },
                      })
                    }
                    rules={{ required: false }}
                  />
                  {errors.stock_unit_price && (
                    <Text className='error'>This field is required.</Text>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={8}>
              <Text strong>{type} : </Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>{"Qty"}</Text>
              ) : (
                <>
                  <Controller
                    name={
                      type == "+ Qty."
                        ? "stock_detail_qty_inbound"
                        : "stock_detail_qty_outbound"
                    }
                    id={
                      type == "+ Qty."
                        ? "stock_detail_qty_inbound"
                        : "stock_detail_qty_outbound"
                    }
                    control={control}
                    render={({ field }) =>
                      InputNumberField({
                        fieldProps: {
                          placeholder: type,
                          className: "w-100",
                          min: 0,
                          ...getNumberFormat(3),
                          ...field,
                        },
                      })
                    }
                    rules={{ required: false }}
                  />
                  {type == "+ Qty." ? (
                    <>
                      {errors.stock_detail_qty_inbound && (
                        <Text className='error'>This field is required.</Text>
                      )}
                    </>
                  ) : (
                    <>
                      {errors.stock_detail_qty_outbound && (
                        <Text className='error'>This field is required.</Text>
                      )}
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>
          <Row className='col-2 mt-1 mb-1'>
            <Col span={8}>
              <Text strong>UOM :</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text>{"UOM"}</Text>
              ) : (
                <>
                  <Controller
                    name='uom_no'
                    id='uom_no'
                    control={control}
                    render={({ field }) =>
                      InputField({
                        fieldProps: {
                          placeholder: "UOM",
                          className: "w-100",
                          disabled: true,
                          ...field,
                        },
                      })
                    }
                    rules={{ required: false }}
                  />
                  {errors.uom_no && (
                    <Text className='error'>This field is required.</Text>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(Form);
