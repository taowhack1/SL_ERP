import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Input, Popconfirm } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTable from "../../../../components/CustomTable";

const columns = ({ readOnly, deleteRow, onChange, subject, spec }) => [
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"No."} require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "id",
    width: "5%",
    align: "center",
    render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Item"} require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "qa_subject_name",
    width: "20%",
    align: "left",
    ellipsis: true,
    render: (val, record) =>
      readOnly ? (
        <div className="text-value">
          <Text>{val || "-"}</Text>
        </div>
      ) : (
        <CustomSelect
          allowClear
          showSearch
          placeholder={"Select Item"}
          size={"small"}
          data={subject}
          field_id="qa_subject_id"
          field_name="qa_subject_name"
          value={val}
          onChange={(val, props) => {
            const { qa_subject_id, qa_subject_name } = props.data;
            val !== null || val !== undefined
              ? onChange(record.id, {
                  qa_subject_id,
                  qa_subject_name,
                })
              : onChange(record.id, {
                  qa_subject_id: null,
                  qa_subject_name: null,
                });
          }}
        />
      ),
  },

  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Spec"} require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "qa_specification_name",
    align: "left",
    width: "20%",
    ellipsis: true,
    render: (val, record) =>
      readOnly ? (
        <div className="text-value">
          <Text>{val || "-"}</Text>
        </div>
      ) : (
        <CustomSelect
          allowClear
          showSearch
          placeholder={"Specification"}
          size={"small"}
          data={spec}
          field_id="qa_specification_id"
          field_name="qa_specification_name"
          value={val}
          onChange={(val, props) => {
            const { qa_specification_id, qa_specification_name } = props.data;
            val !== null || val !== undefined
              ? onChange(record.id, {
                  qa_specification_id,
                  qa_specification_name,
                })
              : onChange(record.id, {
                  qa_specification_id: null,
                  qa_specification_name: null,
                });
          }}
        />
      ),
  },
  {
    title: <div className="text-center">Result</div>,

    dataIndex: "npr_formula_qa_result",
    width: "25%",
    align: "left",
    ellipsis: true,
    render: (val, record) =>
      readOnly ? (
        <div className="text-value">
          <Text>{val || "-"}</Text>
        </div>
      ) : (
        <Input
          placeholder={"Result"}
          size={"small"}
          className="text-left"
          value={val}
          onChange={(e) =>
            onChange(record.id, { npr_formula_qa_result: e.target.value })
          }
        />
      ),
  },
  {
    title: <div className="text-center">Remark</div>,
    dataIndex: "npr_formula_qa_remark",
    width: "25%",
    align: "left",
    ellipsis: true,
    render: (val, record) =>
      readOnly ? (
        <div className="text-value">
          <Text>{val || "-"}</Text>
        </div>
      ) : (
        <Input
          placeholder={"Remark"}
          size={"small"}
          className="text-left"
          value={val}
          onChange={(e) =>
            onChange(record.id, { npr_formula_qa_remark: e.target.value })
          }
        />
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
              deleteRow(record.id);
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
const RDTestItem = ({
  data,
  onChangeQA,
  onAddRowQA,
  onDeleteRowQA,
  readOnly,
}) => {
  const {
    conditions_subject: subject,
    conditions_specification: spec,
  } = useSelector((state) => state.qa.qa_master_data);

  console.log("RDTestItem data", data);
  return (
    <>
      <div className="form-section">
        <>
          <CustomTable
            rowClassName="row-table-detail"
            columns={columns({
              readOnly,
              deleteRow: onDeleteRowQA,
              onChange: onChangeQA,
              subject,
              spec,
            })}
            dataSource={data}
            rowKey={"id"}
            onAdd={!readOnly && onAddRowQA}
          />
        </>
      </div>
    </>
  );
};

export default React.memo(RDTestItem);
