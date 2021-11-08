import React, { useContext } from "react";
import { Popconfirm } from "antd";
import { NPRFormContext } from "../../../NPRRDForm";
import CustomLabel from "../../../../../../../../components/CustomLabel";
import Text from "antd/lib/typography/Text";
import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import AntdTableDragable from "../../../../../../../../components/AntdTableDragable";
import {
  InputField,
  SelectField,
} from "../../../../../../../../components/AntDesignComponent";
import { useFetch } from "../../../../../../../../include/js/customHooks";
import {
  api_qa_specification_list,
  api_qa_subject_list,
} from "../../../../../../../../include/js/api";
let countRow = 0;
const QA = (props) => {
  const { readOnly } = useContext(NPRFormContext);
  const { data: subject, loading: getSubjectLoading } = useFetch(
    `${api_qa_subject_list}/3`
  );
  const { data: spec, loading: getSpecLoading } = useFetch(
    `${api_qa_specification_list}/3`
  );

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = props?.formMethods || {};

  const { fields, append, remove, swap } = props?.qaFields || {};

  // const { fields, append, remove, swap } = useFieldArray({
  //   control,
  //   name: "npr_formula_qa",
  // });

  console.log("propsQA", fields);
  return (
    <>
      {/* <form key="form-qa" onSubmit={handleSubmit(onSubmit, onError)}> */}
      <AntdTableDragable
        {...{
          pagination: false,
          rowclassName: "row-table-detail",
          columns: columns({
            readOnly,
            control,
            remove,
            errors,
            subject,
            getSubjectLoading,
            spec,
            getSpecLoading,
          }),
          dataSource: fields,
          rowKey: "id",
          onSwap: ({ dragIndex, hoverIndex }) => swap(dragIndex, hoverIndex),
          onAdd: () => {
            append({ ...initialStateRow });
          },
          editable: !readOnly,
        }}
      />
      {/* <button type="submit">SUBMIT</button> */}
      {/* </form> */}
    </>
  );
};

export default React.memo(QA);

const initialStateRow = {
  qa_subject_id: null,
  qa_subject_name: null,
  qa_specification_name: null,
  npr_formula_qa_result: null,
  npr_formula_qa_remark: null,
};

const columns = ({
  readOnly,
  remove,
  control,
  errors,
  subject,
  getSubjectLoading,
  spec,
  getSpecLoading,
}) => [
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Item"} require readOnly={readOnly} />
      </div>
    ),
    // dataIndex: "qa_subject_name",
    dataIndex: "qa_subject_id",
    width: "20%",
    align: "left",
    ellipsis: true,
    render: (val, record, index) =>
      readOnly ? (
        <div className="text-value">
          <Text>{val || "-"}</Text>
        </div>
      ) : (
        <>
          <Controller
            {...{
              name: `npr_formula_qa[${index}].qa_subject_id`,
              control,
              rules: { required: true },
              defaultValue: val,
              render: ({ field }) => {
                console.log("field", field);
                const { onChange } = field;
                return SelectField({
                  fieldId: "qa_subject_id",
                  fieldName: "qa_subject_name",
                  dataSource: subject ? subject[0] : [],
                  fieldProps: {
                    disabled: getSubjectLoading,
                    size: "small",
                    className: "w-100",
                    placeholder: "Subject",
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
          {errors &&
            errors?.npr_formula_qa?.length &&
            errors?.npr_formula_qa[index]?.qa_subject_id && (
              <Text strong className="require">
                This field is required.
              </Text>
            )}
        </>
      ),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Spec"} require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "qa_specification_id",
    align: "left",
    width: "20%",
    ellipsis: true,
    render: (val, record, index) =>
      readOnly ? (
        <div className="text-value">
          <Text>{val || "-"}</Text>
        </div>
      ) : (
        <>
          <Controller
            {...{
              name: `npr_formula_qa[${index}].qa_specification_id`,
              control,
              rules: { required: true },
              defaultValue: val,
              render: ({ field }) => {
                const { onChange } = field;
                return SelectField({
                  fieldId: "qa_specification_id",
                  fieldName: "qa_specification_name",
                  dataSource: spec ? spec[0] : [],
                  fieldProps: {
                    disabled: getSpecLoading,
                    size: "small",
                    className: "w-100",
                    placeholder: "Specification",
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
          {errors &&
            errors?.npr_formula_qa?.length &&
            errors?.npr_formula_qa[index]?.qa_specification_id && (
              <Text strong className="require">
                This field is required.
              </Text>
            )}
        </>
      ),
  },
  {
    title: <div className="text-center">Result</div>,

    dataIndex: "npr_formula_qa_result",
    width: "25%",
    align: "left",
    ellipsis: true,
    render: (val, record, index) =>
      readOnly ? (
        <div className="text-value">
          <Text>{val || "-"}</Text>
        </div>
      ) : (
        <>
          <Controller
            {...{
              name: `npr_formula_qa[${index}].npr_formula_qa_result`,
              control,
              rules: { required: true },
              defaultValue: val,
              render: ({ field }) => {
                return InputField({
                  fieldProps: {
                    size: "small",
                    className: "w-100",
                    placeholder: "Result",
                    ...field,
                  },
                });
              },
            }}
          />
        </>
      ),
  },
  {
    title: <div className="text-center">Remark</div>,
    dataIndex: "npr_formula_qa_remark",
    width: "25%",
    align: "left",
    ellipsis: true,
    render: (val, record, index) =>
      readOnly ? (
        <div className="text-value">
          <Text>{val || "-"}</Text>
        </div>
      ) : (
        <>
          <Controller
            {...{
              name: `npr_formula_qa[${index}].npr_formula_qa_remark`,
              control,
              rules: { required: true },
              defaultValue: val,
              render: ({ field }) => {
                return InputField({
                  fieldProps: {
                    size: "small",
                    className: "w-100",
                    placeholder: "Remark",
                    ...field,
                  },
                });
              },
            }}
          />
        </>
      ),
  },
  {
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return (
          <Popconfirm
            onConfirm={() => {
              remove(index);
            }}
            title="Are you sure you want to delete this row？"
            okText="Yes"
            cancelText="No"
          >
            <DeleteTwoTone />
          </Popconfirm>
        );
      }
    },
  },
];
