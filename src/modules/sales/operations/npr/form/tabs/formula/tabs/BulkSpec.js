import {
  DeleteOutlined,
  DeleteTwoTone,
  EllipsisOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Col, message, Popconfirm, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  InputField,
  TextAreaField,
} from "../../../../../../../../components/AntDesignComponent";
import AntdTableDragable from "../../../../../../../../components/AntdTableDragable";
import CustomLabel from "../../../../../../../../components/CustomLabel";
import CustomTable from "../../../../../../../../components/CustomTable";
import { NPRFormContext } from "../../../NPRRDForm";

const FormulaDevelopment = () => {
  const { readOnly, data } = useContext(NPRFormContext);
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "formula_detail",
  });

  const onSubmit = async (data) => {
    console.log("onSubmit", data);
  };

  const onError = async (data) => {
    console.log("onError", data);
  };
  console.log("fields", fields);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} id="formula-form">
        <Row className="col-2 mt-1 mb-3" gutter={16}>
          <Col span={24}>
            <CustomLabel require readOnly={readOnly} label="Detail :" />
          </Col>
          <Col span={24} className="mb-1">
            <div>
              {readOnly ? (
                <Text className="pd-left-3">
                  {`
                   #############
                `}
                </Text>
              ) : (
                <>
                  <Controller
                    {...{
                      name: `fields_name`,
                      control,
                      rules: { required: true },
                      defaultValue: null,
                      render: ({ field }) => {
                        return TextAreaField({
                          fieldProps: {
                            className: "w-100",
                            placeholder: "คำอธิบายเกี่ยวกับตัวอย่าง / สูตร",
                            ...field,
                          },
                        });
                      },
                    }}
                  />
                  <br />
                  {errors?.fields_name && (
                    <Text strong className="require">
                      This field is required.
                    </Text>
                  )}
                </>
              )}
            </div>
          </Col>
          <Col span={24}>
            <CustomLabel require readOnly={readOnly} label="Procedure :" />
          </Col>
          <Col span={24}>
            <div>
              {readOnly ? (
                <Text className="pd-left-3">
                  {`
            1.############# 
            2.#################
            3.#############
            4.#################
            `}
                </Text>
              ) : (
                <>
                  <Controller
                    {...{
                      name: `fields_name`,
                      control,
                      rules: { required: true },
                      defaultValue: null,
                      render: ({ field }) => {
                        return TextAreaField({
                          fieldProps: {
                            className: "w-100",
                            placeholder: "ขั้นตอนการผสม",
                            ...field,
                          },
                        });
                      },
                    }}
                  />
                  <br />
                  {errors?.fields_name && (
                    <Text strong className="require">
                      This field is required.
                    </Text>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>

        {/* BTN อัปเดตราคา */}
        <div className="d-flex mb-1 flex-end">
          {/* {npr_formula_id && ( */}
          <Button
            icon={
              <SyncOutlined
                style={{
                  color: "#27ED00",
                  // fontSize: "22px",
                  fontWeight: "900",
                }}
                title="อัปเดตราคาวัตถุดิบปัจจุบัน"
              />
            }
            onClick={() =>
              // !loading
              //   ? updateFormulaCost(npr_formula_id)
              //   :
              message.warning("Please wait until last update complete.")
            }
          >
            อัปเดตราคา
          </Button>
          {/* )} */}
        </div>
        {/* Table สูตร */}
        <AntdTableDragable
          {...{
            pagination: false,
            rowclassName: "row-table-detail",
            columns: columns({ readOnly }),
            dataSource: fields,
            rowKey: "id",
            setState: () => console.log("SET STATE"),
            onAdd: () => append(initialStateRow),
            editable: !readOnly,
          }}
        />
      </form>
    </>
  );
};

export default React.memo(FormulaDevelopment);

const initialStateRow = {
  npr_formula_detail_id: null,
  npr_formula_part_no: null,
  item_id: null,
  item_no_name: null,
  npr_formula_detail_percent_qty: 0,
  npr_formula_detail_rm_cost: null,
};

const columns = ({ readOnly }) => [
  {
    title: (
      <div className="text-center">
        <b>Part</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "npr_formula_part_no",
  },
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "npr_formula_detail_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Item</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    dataIndex: "item_no_name",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>%</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "npr_formula_detail_percent_qty",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Cost RM/Kg.</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "npr_formula_detail_rm_cost",
    render: (val) => val || "-",
  },
  !readOnly && {
    title: (
      <div className="text-center">
        <EllipsisOutlined />
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "npr_formula_detail_id",
    render: (val) => (
      <Popconfirm
        onConfirm={() => {
          //   deleteRow(record.id);
        }}
        title="Are you sure you want to delete this row？"
        okText="Yes"
        cancelText="No"
      >
        <DeleteTwoTone />
      </Popconfirm>
    ),
  },
];
