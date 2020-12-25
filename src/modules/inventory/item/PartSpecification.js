import { Row, Col, InputNumber, Typography, TimePicker } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import PartSpecificationDetail from "./PartSpecification_Detail";
import BulkFormula from "./BulkFormula";
import { getWorkCenterDetailByID } from "../../../actions/production/workCenterActions";
import moment from "moment";
import ItemPartMix from "./ItemPartMix";
import ItemPartName from "./ItemPartName";
import { ItemContext } from "../../../include/js/context";

const { Text } = Typography;

const PartSpecification = ({ partId }) => {
  const { PartReducer, readOnly } = useContext(ItemContext);
  const { workCenterList } = useSelector(
    (state) => state.production.workCenter
  );
  const [workCenterMachine, setWorkCenterMachine] = useState([]);

  const [state, setState] = useState({
    item_part_specification_time:
      PartReducer.data[partId].item_part_specification_time,
    item_part_specification_remark:
      PartReducer.data[partId].item_part_specification_remark,
    item_part_specification_worker:
      PartReducer.data[partId].item_part_specification_worker,
    machine_id_main: PartReducer.data[partId].machine_id_main,
    machine_no_name_main: PartReducer.data[partId].machine_no_name_main,
    machine_id_sub: PartReducer.data[partId].machine_id_sub,
    machine_no_name_sub: PartReducer.data[partId].machine_no_name_sub,
    work_center_id: PartReducer.data[partId].work_center_id,
    work_center_no_description:
      PartReducer.data[partId].work_center_no_description,
  });

  const onChangeValue = (data) => {
    setState({ ...state, ...data });
  };
  const Save = () => {
    PartReducer.onChangeDetailValue(partId, state);
  };

  useEffect(() => {
    setState({
      item_part_specification_time:
        PartReducer.data[partId].item_part_specification_time,
      item_part_specification_remark:
        PartReducer.data[partId].item_part_specification_remark,
      item_part_specification_worker:
        PartReducer.data[partId].item_part_specification_worker,
      machine_id_main: PartReducer.data[partId].machine_id_main,
      machine_no_name_main: PartReducer.data[partId].machine_no_name_main,
      machine_id_sub: PartReducer.data[partId].machine_id_sub,
      machine_no_name_sub: PartReducer.data[partId].machine_no_name_sub,
      work_center_id: PartReducer.data[partId].work_center_id,
      work_center_no_description:
        PartReducer.data[partId].work_center_no_description,
    });
  }, [PartReducer.data[partId].data_id]);
  return (
    <>
      <div className="group-row">
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            <Row className="col-2 row-margin-vertical">
              <Col span={12}>
                <Row className="row-head">
                  <Col span={24}>
                    <ItemPartName partId={partId} />
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
                          data && data
                            ? onChangeValue({
                                work_center_id: option.data.work_center_id,
                                work_center_no_description:
                                  option.data.work_center_no_description,
                                machine_id_main: null,
                                machine_no_name_main: null,
                                machine_id_sub: null,
                                machine_no_name_sub: null,
                              })
                            : onChangeValue({
                                machine_id_main: null,
                                machine_no_name_main: null,
                                machine_id_sub: null,
                                machine_no_name_sub: null,
                                work_center_id: null,
                                work_center_no_description: null,
                              });
                          const workCenterDetail = await getWorkCenterDetailByID(
                            option.data.work_center_id
                          );
                          setWorkCenterMachine(workCenterDetail);
                        }}
                        onBlur={() => Save()}
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
                        onBlur={() => Save()}
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
                          {state.machine_no_name_main
                            ? state.machine_no_name_main
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
                        name="machine_no_name_main"
                        field_id="machine_id"
                        field_name="machine_no_name"
                        value={state.machine_no_name_main}
                        data={workCenterMachine}
                        onChange={(data, option) => {
                          data && data
                            ? onChangeValue({
                                machine_id_main: option.data.machine_id,
                                machine_no_name_main:
                                  option.data.machine_no_name,
                              })
                            : onChangeValue({
                                machine_id_main: null,
                                machine_no_name_main: null,
                              });
                        }}
                        onBlur={() => Save()}
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
                          {state.machine_no_name_sub
                            ? state.machine_no_name_sub
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
                        name="machine_no_name_sub"
                        field_id="machine_id"
                        field_name="machine_no_name"
                        value={state.machine_no_name_sub}
                        data={workCenterMachine}
                        onChange={(data, option) => {
                          data && data
                            ? onChangeValue({
                                machine_id_sub: option.data.machine_id,
                                machine_no_name_sub:
                                  option.data.machine_no_name,
                              })
                            : onChangeValue({
                                machine_id_sub: null,
                                machine_no_name_sub: null,
                              });
                        }}
                        onBlur={() => Save()}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="detail-container">
              <PartSpecificationDetail partId={partId} />
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
                  <Col span={12}>
                    {readOnly ? (
                      <Text className="text-view">
                        {state.item_part_specification_time
                          ? state.item_part_specification_time
                          : "-"}
                      </Text>
                    ) : (
                      <TimePicker
                        className="full-width"
                        format={"HH:mm"}
                        showNow={false}
                        name={"item_part_specification_time"}
                        placeholder="00:00:00 (HH : mm : ss)"
                        size="small"
                        required
                        value={
                          state.item_part_specification_time
                            ? moment(
                                state.item_part_specification_time,
                                "HH:mm:ss"
                              )
                            : ""
                        }
                        onChange={(data) => {
                          const time = moment(data, "HH:mm").format("HH:mm:ss");
                          onChangeValue({
                            item_part_specification_time: data ? time : null,
                          });
                        }}
                        onBlur={() => Save()}
                      />
                    )}
                  </Col>
                  <Col span={5}>
                    <Text strong className="pd-left-1">
                      Hour
                    </Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}></Col>
            </Row>
            <div className="detail-container mt-2">
              <BulkFormula partId={partId} />
            </div>
            <div className="detail-container mt-2">
              <ItemPartMix partId={partId} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(PartSpecification);
