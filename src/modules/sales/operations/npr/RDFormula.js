import { DeleteTwoTone, EllipsisOutlined } from "@ant-design/icons";
import { Col, Input, InputNumber, Popconfirm, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import AntdTableDragable from "../../../../components/AntdTableDragable";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTable from "../../../../components/CustomTable";
import DetailLoading from "../../../../components/DetailLoading";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../include/js/main_config";
const columns = ({ readOnly, itemList = [], deleteRow, onChange }) => [
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Part"} require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "npr_formula_detail_part",
    width: "7%",
    align: "center",
    render: (val, record) =>
      readOnly ? (
        <Text>{val}</Text>
      ) : (
        <Input
          placeholder={"eg. A , B , C"}
          size={"small"}
          className="text-center"
          value={val}
          onChange={(e) =>
            onChange(record.id, { npr_formula_detail_part: e.target.value })
          }
        />
      ),
  },
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
    dataIndex: "item_no_name",
    width: "38%",
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
          data={itemList}
          field_id="id"
          field_name="item_no_name"
          value={val}
          onChange={(val, props) => {
            const {
              trans_id,
              trans_field_id,
              item_cost,
              item_no_name,
            } = props.data;
            console.log("select item", props.data);
            val !== null || val !== undefined
              ? onChange(record.id, {
                  trans_id,
                  trans_field_id,
                  item_no_name,
                  npr_formula_detail_item_cost: item_cost,
                })
              : onChange(record.id, {
                  trans_id: null,
                  trans_field_id: null,
                  item_no_name: null,
                  npr_formula_detail_item_cost: 0,
                });
          }}
        />
      ),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"%"} require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "npr_formula_detail_percent_qty",
    width: "15%",

    align: "right",
    render: (val, record) =>
      readOnly ? (
        convertDigit(val || 0, 4)
      ) : (
        <InputNumber
          name="npr_formula_detail_percent_qty"
          placeholder="Percentage"
          value={val}
          defaultValue={0.0}
          min={0.0}
          max={100}
          {...getNumberFormat(4)}
          step={0.0001}
          val={val}
          onChange={(data) => {
            onChange(record.id, {
              npr_formula_detail_percent_qty: data,
            });
          }}
          size="small"
          className="full-width"
        />
      ),
  },
  {
    title: <div className="text-center">Cost RM/Kg</div>,
    dataIndex: "npr_formula_detail_item_cost",
    width: "15%",
    align: "right",
    render: (val) => convertDigit(val || 0, 4),
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
const RDFormula = ({
  data,
  onChangeFormula,
  onAddRowFormula,
  onDeleteRowFormula,
  readOnly,
  setFormula,
}) => {
  const { itemList } = useSelector((state) => state.sales.operations.npr);
  const { loading } = useSelector((state) => state.sales);
  console.log("RDFormula data", data);
  return (
    <>
      <div className="form-section ">
        {loading ? (
          <DetailLoading />
        ) : (
          <>
            {/* <CustomTable
              rowClassName="row-table-detail"
              columns={columns({
                readOnly,
                itemList,
                deleteRow: onDeleteRowFormula,
                onChange: onChangeFormula,
              })}
              dataSource={data}
              rowKey={"id"}
              onAdd={!readOnly && onAddRowFormula}
              pagination={{ pageSize: 999 }}
            /> */}
            <AntdTableDragable
              pagination={{ pageSize: 999 }}
              rowClassName="row-table-detail"
              columns={columns({
                readOnly,
                itemList,
                deleteRow: onDeleteRowFormula,
                onChange: onChangeFormula,
              })}
              dataSource={data}
              rowKey={"id"}
              setState={setFormula}
              onAdd={onAddRowFormula}
            />
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(RDFormula);
