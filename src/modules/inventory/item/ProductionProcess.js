import { Button, Row, Col, Typography, Input, Space, message } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  EyeOutlined,
  EditOutlined,
  FormOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import React, { useEffect, useReducer, useState } from "react";
import {
  item_production_process_columns,
  item_production_process_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import { getAllWorkCenter } from "../../../actions/production/workCenterActions";
import { useDispatch, useSelector } from "react-redux";
import { reducer } from "../reducers";
import { validateFormDetail } from "../../../include/js/function_main";
import ItemProcessModal from "./ItemProcessModal";

const { Text } = Typography;
const ProductionProcess = ({
  readOnly,
  data_production_process_detail,
  productionProcessDetailDispatch,
}) => {
  const { workCenterList } = useSelector(
    (state) => state.production.workCenter
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllWorkCenter());
  }, []);

  const [visible, setVisible] = useState(false);
  const [temp_detail, setTempDetail] = useState(null);
  const [temp_sub_detail, tempSubDetailDispatch] = useReducer(reducer, []);
  const addLine = () => {
    productionProcessDetailDispatch({
      type: "ADD_ROW",
      payload: item_production_process_fields,
    });
  };

  const delLine = (id) => {
    productionProcessDetailDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    productionProcessDetailDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };

  const modalSave = () => {
    console.log("Confirm Modal", "id", temp_detail.id, temp_sub_detail);
    const key = "validate";
    const validate_detail = validateFormDetail(temp_sub_detail, []);
    if (validate_detail.validate) {
      setVisible(false);

      productionProcessDetailDispatch({
        type: "CHANGE_DETAIL_VALUE",
        payload: {
          id: temp_detail.id,
          data: {
            work_center_detail: temp_sub_detail,
          },
        },
      });
      setTempDetail(null);
    } else {
      message.warning({
        content: "Please fill your form completely.",
        key,
        duration: 2,
      });
    }
  };

  const modalCancel = () => {
    setVisible(false);
    setTempDetail(null);
    console.log("Cancel Modal");
    tempSubDetailDispatch({
      type: "SET_DETAIL",
      payload: [],
    });
  };
  console.log(visible);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={24}>
          <Text strong className="detail-tab-header">
            Production Process
          </Text>
        </Col>
      </Row>
      {/* Column Header */}
      <Row gutter={2} className="detail-table-head">
        {item_production_process_columns &&
          item_production_process_columns.map((col, key) => {
            return (
              <Col key={col.id} span={col.size} className="col-outline">
                {col.require && !readOnly && (
                  <span className="require">* </span>
                )}
                <Text strong>{col.name}</Text>
              </Col>
            );
          })}

        <Col span={2} className="col-outline">
          <EllipsisOutlined />
        </Col>
      </Row>
      {!readOnly ? (
        <>
          {/* Edit Form */}
          {data_production_process_detail.map((line, key) => (
            <Row
              key={line.id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              name={`row-${key}`}
              gutter={6}
              className="col-2"
            >
              <Col span={1} className="text-center">
                {key + 1}
              </Col>
              <Col span={10} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Subject"}
                  name="work_center_id"
                  field_id="work_center_id"
                  field_name="work_center_no_description"
                  value={line.work_center_no_description}
                  data={workCenterList}
                  onChange={(data, option) => {
                    data && data
                      ? onChangeValue(line.id, {
                          work_center_id: option.data.work_center_id,
                          work_center_no_description:
                            option.data.work_center_no_description,
                        })
                      : onChangeValue(line.id, {
                          work_center_id: null,
                          work_center_no_description: null,
                        });
                  }}
                />
              </Col>
              <Col span={11} className="text-string">
                <Input
                  name="item_process_remark"
                  size="small"
                  placeholder={"Remark"}
                  onChange={(e) =>
                    onChangeValue(line.id, {
                      item_process_remark: e.target.value,
                    })
                  }
                  value={line.item_process_remark}
                />
              </Col>

              <Col span={2} className="text-center">
                <Space size={16}>
                  {line.work_center_id && (
                    <FormOutlined
                      onClick={() => {
                        setVisible(true);
                        tempSubDetailDispatch({
                          type: "SET_DETAIL",
                          payload: [],
                        });
                        setTempDetail(line);
                      }}
                      className="button-icon"
                    />
                  )}
                  <DeleteTwoTone onClick={() => delLine(line.id)} />
                </Space>
              </Col>
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
          {data_production_process_detail.map((line, key) => (
            <Row
              key={line.id}
              style={{
                marginBottom: 0,
                border: "1px solid white",
                backgroundColor: "#FCFCFC",
              }}
              gutter={6}
              className="col-2"
            >
              <Col span={1} className="text-center">
                <Text>{key + 1}</Text>
              </Col>
              <Col span={10} className="text-left">
                <Text className="text-left">
                  {line.work_center_no_description}
                </Text>
              </Col>
              <Col span={11} className="text-left">
                <Text className="text-left">{line.item_process_remark}</Text>
              </Col>
              <Col span={2} className="text-center">
                {line.work_center_id && (
                  <InfoCircleTwoTone
                    className="button-icon"
                    onClick={() => {
                      setVisible(true);
                      tempSubDetailDispatch({
                        type: "SET_DETAIL",
                        payload: line.work_center_detail,
                      });
                      setTempDetail(line);
                    }}
                  />
                )}
              </Col>
            </Row>
          ))}
        </> //close tag
      )}
      {/* end readonly */}
      <ItemProcessModal
        readOnly={readOnly}
        visible={visible}
        modalSave={modalSave}
        modalCancel={modalCancel}
        data_detail={temp_sub_detail}
        detailDispatch={tempSubDetailDispatch}
      />
    </>
  );
};

export default ProductionProcess;
