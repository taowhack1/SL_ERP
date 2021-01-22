import {
  Button,
  Row,
  Col,
  Typography,
  Input,
  Space,
  message,
  TimePicker,
  InputNumber,
} from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  EyeOutlined,
  EditOutlined,
  FormOutlined,
  InfoCircleTwoTone,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useEffect, useReducer, useState } from "react";
import {
  item_production_process_columns,
  item_production_process_fields,
} from "../config/item";
import CustomSelect from "../../../components/CustomSelect";
import {
  getAllWorkCenter,
  getWorkCenterDetailByID,
} from "../../../actions/production/workCenterActions";
import { useDispatch, useSelector } from "react-redux";
import { reducer } from "../reducers";
import { validateFormDetail } from "../../../include/js/function_main";
import ItemProcessModal from "./ItemProcessModal";
import moment from "moment";
import { work_center_detail_fields } from "../../production/config/master_data";

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
      payload: [work_center_detail_fields],
    });
  };
  console.log(visible);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={24}>
          <Space>
            <Text strong style={{ fontSize: 16, marginRight: 10 }}>
              <ProfileOutlined style={{ marginRight: 10 }} />
              Production Process
            </Text>
          </Space>
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
              <Col span={7} className="text-string">
                <CustomSelect
                  allowClear
                  showSearch
                  size={"small"}
                  placeholder={"Select Work Center"}
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
                          work_center_worker:
                            option.data.work_center_worker ?? 0,
                          work_center_time:
                            option.data.work_center_time ?? null,
                        })
                      : onChangeValue(line.id, {
                          work_center_id: null,
                          work_center_no_description: null,
                          work_center_worker: 0,
                          work_center_time: null,
                        });
                  }}
                />
              </Col>
              <Col span={3} className="text-right">
                <InputNumber
                  disabled={line.work_center_id ? 0 : 1}
                  className="full-width"
                  name="work_center_worker"
                  placeholder="Amount of Worker"
                  value={line.work_center_worker}
                  min={0}
                  step={1}
                  defaultValue={0}
                  precision={0}
                  onChange={(data) => {
                    onChangeValue(line.id, {
                      work_center_worker: data,
                    });
                  }}
                  size="small"
                />
              </Col>
              <Col span={3} className="text-center">
                <TimePicker
                  disabled={line.work_center_id ? 0 : 1}
                  className="full-width"
                  format={"HH:mm"}
                  showNow={false}
                  name={"work_center_time"}
                  style={{ width: "100%" }}
                  placeholder="Hour : Minute"
                  required
                  size="small"
                  value={
                    line.work_center_time
                      ? moment(line.work_center_time, "HH:mm:ss")
                      : ""
                  }
                  onChange={(data) => {
                    const time = moment(data, "HH:mm").format("HH:mm:ss");
                    console.log(time);
                    onChangeValue(line.id, {
                      work_center_time: data ? time : null,
                    });
                  }}
                />
              </Col>
              <Col span={8} className="text-string">
                <Input
                  disabled={line.work_center_id ? 0 : 1}
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
                      onClick={async () => {
                        const detail = await getWorkCenterDetailByID(
                          line.work_center_id
                        );

                        tempSubDetailDispatch({
                          type: "SET_DETAIL",
                          payload: detail.length
                            ? detail
                            : [work_center_detail_fields],
                        });
                        console.log("SET");
                        setVisible(true);
                        setTempDetail(line);
                      }}
                      className="button-icon"
                    />
                  )}
                  {data_production_process_detail.length > 1 && (
                    <DeleteTwoTone onClick={() => delLine(line.id)} />
                  )}
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
              <Col span={7} className="text-left">
                <Text className="text-left">
                  {line.work_center_no_description}
                </Text>
              </Col>
              <Col span={3} className="text-right">
                <Text className="text-right">{line.work_center_worker}</Text>
              </Col>
              <Col span={3} className="text-center">
                <Text className="text-center">{line.work_center_time}</Text>
              </Col>
              <Col span={8} className="text-left">
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
