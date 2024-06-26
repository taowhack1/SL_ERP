import { Row, Col, InputNumber, Typography, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import PartSpecificationDetail from "./PartSpecification_Detail";
import BulkFormula from "./BulkFormula";
import { getWorkCenterDetailByID } from "../../../actions/production/workCenterActions";
import ItemPartName from "./ItemPartName";
import { ItemContext } from "../../../include/js/context";
import ItemPartMix from "./ItemPartMix";
import {
  convertNumberToTime,
  convertTimeToNumber,
} from "../../../include/js/function_main";

const { Text } = Typography;

const PartSpecification = ({ id, part }) => {
  const { statePartDispatch, readOnly } = useContext(ItemContext);
  const { workCenterList } = useSelector(
    (state) => state.production.workCenter
  );
  const [workCenterMachine, setWorkCenterMachine] = useState([]);
  const [state, setState] = useState({
    item_part_specification_lead_time_start:
      part.item_part_specification_lead_time_start,
    item_part_specification_lead_time_end:
      part.item_part_specification_lead_time_end,
    item_part_specification_remark: part.item_part_specification_remark,
    item_part_specification_worker: part.item_part_specification_worker,
    machine_id_main: part.machine_id_main,
    machine_cost_center_description_main:
      part.machine_cost_center_description_main,
    machine_id_sub: part.machine_id_sub,
    machine_cost_center_description_sub:
      part.machine_cost_center_description_sub,
    work_center_id: part.work_center_id,
    work_center_no_description: part.work_center_no_description,
  });

  const onChangeValue = (data) => {
    setState({ ...state, ...data });
  };
  const Save = () => {
    statePartDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: id,
        data: state,
      },
    });
  };

  useEffect(() => {
    setState({
      item_part_specification_lead_time_start:
        part.item_part_specification_lead_time_start,
      item_part_specification_lead_time_end:
        part.item_part_specification_lead_time_end,
      item_part_specification_remark: part.item_part_specification_remark,
      item_part_specification_worker: part.item_part_specification_worker,
      machine_id_main: part.machine_id_main,
      machine_cost_center_description_main:
        part.machine_cost_center_description_main,
      machine_id_sub: part.machine_id_sub,
      machine_cost_center_description_sub:
        part.machine_cost_center_description_sub,
      work_center_id: part.work_center_id,
      work_center_no_description: part.work_center_no_description,
    });
  }, [part.data_id]);

  useEffect(() => {
    const getWorkCenter = async (id) =>
      await getWorkCenterDetailByID(id).then((res) =>
        setWorkCenterMachine(res.data[0])
      );
    state.work_center_id && getWorkCenter(state.work_center_id);
  }, [state.work_center_id]);
  return (
    <>
      <div className="group-row">
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <Row className="col-2 row-margin-vertical">
              <Col span={12}>
                <Row className="row-head">
                  <Col span={24}>
                    <ItemPartName id={id} part={part} />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={1}></Col>
                  <Col span={6}>
                    <Text strong>
                      {!readOnly && <span className="require">* </span>}
                      Work Center :
                    </Text>
                  </Col>
                  <Col span={16}>
                    {readOnly ? (
                      <div className="text-left">
                        <Text className="text-view">
                          {state.work_center_no_description
                            ? state.work_center_no_description
                            : "-"}
                        </Text>
                      </div>
                    ) : (
                      <CustomSelect
                        allowClear
                        showSearch
                        size={"small"}
                        placeholder={"Select Work Center"}
                        name="work_center_id"
                        field_id="work_center_id"
                        field_name="work_center_no_description"
                        value={state.work_center_no_description}
                        data={workCenterList}
                        onChange={async (data, option) => {
                          data !== undefined
                            ? onChangeValue({
                                work_center_id: option.data.work_center_id,
                                work_center_no_description:
                                  option.data.work_center_no_description,
                                machine_id_main: null,
                                machine_cost_center_description_main: null,
                                machine_id_sub: null,
                                machine_cost_center_description_sub: null,
                              })
                            : onChangeValue({
                                machine_id_main: null,
                                machine_cost_center_description_main: null,
                                machine_id_sub: null,
                                machine_cost_center_description_sub: null,
                                work_center_id: null,
                                work_center_no_description: null,
                              });
                          // const workCenterDetail = await getWorkCenterDetailByID(
                          //   option.data.work_center_id
                          // );
                        }}
                        onBlur={Save}
                      />
                    )}
                  </Col>
                </Row>

                <Row className="row-margin-vertical">
                  <Col span={1}></Col>
                  <Col span={6}>
                    <Text strong>
                      {!readOnly && <span className="require">* </span>}Part
                      Worker :
                    </Text>
                  </Col>
                  <Col span={16}>
                    {readOnly ? (
                      <div className="text-left">
                        <Text className="text-view">
                          {state.item_part_specification_worker
                            ? state.item_part_specification_worker
                            : "-"}
                        </Text>
                      </div>
                    ) : (
                      <InputNumber
                        className="full-width"
                        name="item_part_specification_worker"
                        placeholder="Amount of Worker"
                        min={0}
                        step={1}
                        defaultValue={0}
                        precision={0}
                        value={state.item_part_specification_worker}
                        onChange={(data) => {
                          onChangeValue({
                            item_part_specification_worker: data ?? 0,
                          });
                        }}
                        onBlur={Save}
                        size="small"
                      />
                    )}
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className="row-head"></Row>
                <Row className="row-margin-vertical">
                  <Col span={1}></Col>
                  <Col span={6}>
                    <Text strong>Main - Machine :</Text>
                  </Col>
                  <Col span={16}>
                    {readOnly ? (
                      <div className="text-left">
                        <Text className="text-view">
                          {state.machine_cost_center_description_main
                            ? state.machine_cost_center_description_main
                            : "-"}
                        </Text>
                      </div>
                    ) : (
                      <CustomSelect
                        allowClear
                        showSearch
                        disabled={state.work_center_id ? 0 : 1}
                        size="small"
                        placeholder={"Select Machine"}
                        name="machine_cost_center_description_main"
                        field_id="machine_id"
                        field_name="machine_cost_center_description"
                        value={state.machine_cost_center_description_main}
                        data={workCenterMachine}
                        onChange={(data, option) => {
                          data !== undefined
                            ? onChangeValue({
                                machine_id_main: option.data.machine_id,
                                machine_cost_center_description_main:
                                  option.data.machine_cost_center_description,
                              })
                            : onChangeValue({
                                machine_id_main: null,
                                machine_cost_center_description_main: null,
                              });
                        }}
                        onBlur={Save}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="row-margin-vertical">
                  <Col span={1}></Col>
                  <Col span={6}>
                    <Text strong>Sub - Machine :</Text>
                  </Col>
                  <Col span={16}>
                    {readOnly ? (
                      <div className="text-left">
                        <Text className="text-view">
                          {state.machine_cost_center_description_sub
                            ? state.machine_cost_center_description_sub
                            : "-"}
                        </Text>
                      </div>
                    ) : (
                      <CustomSelect
                        allowClear
                        showSearch
                        disabled={state.work_center_id ? 0 : 1}
                        size="small"
                        placeholder={"Select Machine"}
                        name="machine_cost_center_description_sub"
                        field_id="machine_id"
                        field_name="machine_cost_center_description"
                        value={state.machine_cost_center_description_sub}
                        data={workCenterMachine}
                        onChange={(data, option) => {
                          data !== undefined
                            ? onChangeValue({
                                machine_id_sub: option.data.machine_id,
                                machine_cost_center_description_sub:
                                  option.data.machine_cost_center_description,
                              })
                            : onChangeValue({
                                machine_id_sub: null,
                                machine_cost_center_description_sub: null,
                              });
                        }}
                        onBlur={Save}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="detail-container">
              <PartSpecificationDetail
                id={id}
                partDetail={part.item_part_specification_detail}
              />
            </div>
            <Row className="col-2 row-margin-vertical">
              <Col span={12}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={6}>
                    <Text strong>
                      <span className="require">* </span>Schedule Time :
                    </Text>
                  </Col>
                  <Col span={12} className="text-center">
                    {readOnly ? (
                      <Space size={16}>
                        <Text className="text-value text-center">
                          {convertTimeToNumber(
                            state.item_part_specification_lead_time_start
                          )}
                        </Text>
                        <Text strong>-</Text>
                        <Text className="text-value text-center">
                          {convertTimeToNumber(
                            state.item_part_specification_lead_time_end
                          )}
                        </Text>
                      </Space>
                    ) : (
                      <Space size={16}>
                        <InputNumber
                          name="item_part_specification_lead_time_start"
                          placeholder="Time"
                          min={0}
                          step={1}
                          defaultValue={0}
                          precision={0}
                          value={convertTimeToNumber(
                            state.item_part_specification_lead_time_start
                          )}
                          onChange={(data) => {
                            onChangeValue({
                              item_part_specification_lead_time_start: convertNumberToTime(
                                data
                              ),
                            });
                          }}
                          onBlur={Save}
                          size="small"
                        />
                        <Text strong>To</Text>
                        <InputNumber
                          name="item_part_specification_lead_time_end"
                          placeholder="Time"
                          min={0}
                          step={1}
                          defaultValue={0}
                          precision={0}
                          value={convertTimeToNumber(
                            state.item_part_specification_lead_time_end
                          )}
                          onChange={(data) => {
                            onChangeValue({
                              item_part_specification_lead_time_end: convertNumberToTime(
                                data
                              ),
                            });
                          }}
                          onBlur={Save}
                          size="small"
                        />
                      </Space>
                    )}
                  </Col>
                  <Col span={5}>
                    <Text strong className="pd-left-1">
                      Minutes
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}></Col>
            </Row>
            <div className="detail-container mt-2">
              <BulkFormula id={id} formula={part.item_formula} />
            </div>
            <div className="detail-container mt-2">
              <ItemPartMix id={id} partMix={part.item_part_mix} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(PartSpecification);
