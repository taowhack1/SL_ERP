import { Button, Row, Col, InputNumber, Typography, Input } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import {
  item_filling_detail_fields,
  item_packaging_process_columns,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../include/js/main_config";

const { Text } = Typography;

const PackagingProcess = ({
  data_filling_detail,
  readOnly,
  fillingDetailDispatch,
}) => {
  const test_case_method = useSelector(
    (state) => state.qa.qa_master_data.test_case_method
  );
  const item_list = useSelector((state) =>
    state.inventory.master_data.item_list.filter(
      (item) => item.type_id === 1 || item.type_id === 3
    )
  );
  const addLine = () => {
    fillingDetailDispatch({
      type: "ADD_ROW",
      payload: item_filling_detail_fields,
    });
  };

  const delLine = (id) => {
    fillingDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    fillingDetailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };
  return (
    <>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {item_packaging_process_columns &&
          item_packaging_process_columns.map((col, key) => {
            return (
              <Col key={col.id} span={col.size} className="col-outline">
                {col.require && !readOnly && (
                  <span className="require">* </span>
                )}
                <Text strong>{col.name}</Text>
              </Col>
            );
          })}

        <Col span={1} className="col-outline">
          <Text strong>
            <EllipsisOutlined />
          </Text>
        </Col>
      </Row>
      {!readOnly ? (
        <>
          {/* Edit Form */}
          {data_filling_detail.map((line, key) => (
            <Row
              key={line.id}
              style={{
                margin: "0px 1px",
                backgroundColor: key % 2 ? "#F8F8F8" : "#FCFCFC",
              }}
              name={`row-${key}`}
              gutter={4}
              className="form-row"
            >
              <Col span={1} className="text-center">
                {key + 1}
              </Col>
              <Col span={8} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size="small"
                  className={"filling-process-input"}
                  placeholder={"Item Name"}
                  name="item_no_name"
                  field_id="item_id"
                  field_name="item_no_name"
                  value={line.item_no_name}
                  data={item_list}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          item_id_filling_process: option.data.item_id,
                          item_no_name: option.data.item_no_name,
                          uom_name: option.data.uom_name,
                          item_image: option.data.item_image,
                        })
                      : onChangeValue(line.id, {
                          item_id_filling_process: null,
                          item_no_name: null,
                          uom_name: null,
                          item_image: null,
                          packaging_item_qty: 0,
                          packaging_method: null,
                        });
                  }}
                />
              </Col>
              <Col span={3} className="text-string">
                <InputNumber
                  {...numberFormat}
                  size="small"
                  className={"filling-process-input"}
                  name="item_filling_process_qty"
                  placeholder="Qty. / pcs"
                  value={line.item_filling_process_qty}
                  defaultValue={0.0}
                  min={0.0}
                  step={1.0}
                  onChange={(data) => {
                    onChangeValue(line.id, {
                      item_filling_process_qty: data,
                    });
                  }}
                  style={{ width: "100%" }}
                  size="small"
                />
              </Col>
              <Col span={2} className="input-string-disabled">
                <Text className="text-left">{line.uom_name}</Text>
              </Col>
              <Col span={3} className="text-string">
                {/* Packaging Method */}
                <CustomSelect
                  allowClear
                  showSearch
                  size="small"
                  className={"filling-process-input"}
                  placeholder={"Method"}
                  name="qa_method_id"
                  field_id="qa_method_id"
                  field_name="qa_method_name"
                  value={line.qa_method_name}
                  data={test_case_method}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          qa_method_id: option.data.qa_method_id,
                          qa_method_name: option.data.qa_method_name,
                        })
                      : onChangeValue(line.id, {
                          qa_method_id: null,
                          qa_method_name: null,
                        });
                  }}
                />
              </Col>
              <Col span={6} className="text-string">
                <Input
                  name="item_filling_process_remark"
                  size="small"
                  className={"filling-process-input"}
                  placeholder={"Remark"}
                  onChange={(e) =>
                    onChangeValue(line.id, {
                      item_filling_process_remark: e.target.value,
                    })
                  }
                  value={line.item_filling_process_remark}
                />
              </Col>
              {data_filling_detail.length > 1 && (
                <Col span={1} style={{ textAlign: "center" }}>
                  <DeleteTwoTone onClick={() => delLine(line.id)} />
                </Col>
              )}
            </Row>
          ))}
          <div style={{ marginTop: 10 }}>
            <Button
              type="dashed"
              onClick={() => {
                addLine();
              }}
              block
            >
              <PlusOutlined /> Add a line
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* View Form */}
          {data_filling_detail.map((line, key) => (
            <Row
              key={line.id}
              style={{
                margin: "0px 1px",
                backgroundColor: key % 2 ? "#F8F8F8" : "#FCFCFC",
              }}
              name={`row-${key}`}
              gutter={4}
              className="form-row"
            >
              <Col span={1} className="text-center">
                <Text>{key + 1}</Text>
              </Col>
              <Col span={8} className="text-string">
                <Text className="text-left">{line.item_name ?? "-"}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-right">
                  {convertDigit(line.item_filling_process_qty) ?? "-"}
                </Text>
              </Col>
              <Col span={2} className="text-string">
                <Text className="text-left">{line.uom_name ?? "-"}</Text>
              </Col>
              <Col span={3} className="text-string">
                <Text className="text-left">{line.qa_method_name ?? "-"}</Text>
              </Col>
              <Col span={6} className="text-string">
                <Text className="text-left">
                  {line.item_filling_process_remark ?? "-"}
                </Text>
              </Col>
            </Row>
          ))}
        </> //close tag
      )}
      {/* end readonly */}
    </>
  );
};

export default PackagingProcess;
