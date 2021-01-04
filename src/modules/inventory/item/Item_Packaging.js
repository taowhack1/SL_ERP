import { Button, Row, Col, InputNumber, Typography, Input } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import {
  item_packaging_detail_fields,
  item_packaging_process_columns,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, numberFormat } from "../../../include/js/main_config";
import { ItemContext } from "../../../include/js/context";

const { Text } = Typography;

const Packaging = ({
  data_packaging_detail,
  readOnly,
  packagingDetailDispatch,
}) => {
  const { PKList } = useContext(ItemContext);
  const test_case_method = useSelector(
    (state) => state.qa.qa_master_data.test_case_method
  );
  const addLine = () => {
    packagingDetailDispatch({
      type: "ADD_ROW",
      payload: item_packaging_detail_fields,
    });
  };

  const delLine = (id) => {
    packagingDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    packagingDetailDispatch({
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
          {data_packaging_detail.map((line, key) => (
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
                  className={"packaging-process-input"}
                  placeholder={"Item Name"}
                  name="item_no_name"
                  field_id="item_id"
                  field_name="item_no_name"
                  value={line.item_no_name}
                  data={PKList}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          item_id_packaging: option.data.item_id,
                          item_no_name: option.data.item_no_name,
                          uom_name: option.data.uom_name,
                          item_image: option.data.item_image,
                        })
                      : onChangeValue(line.id, {
                          item_id_packaging: null,
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
                  className={"packaging-process-input"}
                  name="item_packaging_qty"
                  placeholder="Qty. / pcs"
                  value={line.item_packaging_qty}
                  defaultValue={0.0}
                  min={0.0}
                  step={1.0}
                  onChange={(data) => {
                    onChangeValue(line.id, {
                      item_packaging_qty: data,
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
                  className={"packaging-process-input"}
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
                  name="item_packaging_remark"
                  size="small"
                  className={"packaging-process-input"}
                  placeholder={"Remark"}
                  onChange={(e) =>
                    onChangeValue(line.id, {
                      item_packaging_remark: e.target.value,
                    })
                  }
                  value={line.item_packaging_remark}
                />
              </Col>
              {data_packaging_detail.length > 1 && (
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
          {data_packaging_detail.map((line, key) => (
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
                <Text className="text-left">{line.item_no_name ?? "-"}</Text>
              </Col>
              <Col span={3} className="text-number">
                <Text className="text-right">
                  {convertDigit(line.item_packaging_qty) ?? "-"}
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
                  {line.item_packaging_remark ?? "-"}
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

export default Packaging;
