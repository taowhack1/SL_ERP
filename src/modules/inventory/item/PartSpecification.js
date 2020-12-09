import { Row, Col, InputNumber, Typography, TimePicker } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import PartSpecificationDetail from "./PartSpecification_Detail";
import BulkFormula from "./BulkFormula";
import {
  convertNumberToTime,
  convertTimeToNumber,
} from "../../../include/js/function_main";
import { getWorkCenterDetailByID } from "../../../actions/production/workCenterActions";
import moment from "moment";

const { Text, Title } = Typography;

const PartSpecification = ({
  item_part_id,
  readOnly,
  data_part,
  partDispatch,
  data_part_detail,
  partDetailDispatch,
  data_formula_detail,
  formulaDetailDispatch,
  addLine,
  delLine,
}) => {
  const [workCenterMachine, setWorkCenterMachine] = useState([]);
  const { workCenterList } = useSelector(
    (state) => state.production.workCenter
  );
  const { machineList } = useSelector((state) => state.production.machine);
  const item_list = useSelector((state) =>
    state.inventory.master_data.item_list.filter(
      (item) => item.type_id === 1 || item.type_id === 3
    )
  );

  const onChangeValue = (rowId, data) => {
    partDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };

  return (
    <>
      <div className="group-row">
        <Row className="col-2 row-margin-vertical">
          <Col span={24}>
            {/* Column Header */}
            <Row className="col-2 row-margin-vertical">
              <Col span={12}>
                <Row className="row-head">
                  <Col span={1}></Col>
                  <Col span={10}>
                    <Title level={4}>{data_part.item_part_name}</Title>
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
                          {data_part.work_center_no_description
                            ? data_part.work_center_no_description
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
                        value={data_part.work_center_no_description}
                        data={workCenterList}
                        onChange={async (data, option) => {
                          data && data
                            ? onChangeValue(data_part.id, {
                                work_center_id: option.data.work_center_id,
                                work_center_no_description:
                                  option.data.work_center_no_description,
                                machine_id: null,
                                machine_no_name: null,
                              })
                            : onChangeValue(data_part.id, {
                                work_center_id: null,
                                work_center_no_description: null,
                              });
                          const workCenterDetail = await getWorkCenterDetailByID(
                            option.data.work_center_id
                          );
                          setWorkCenterMachine(workCenterDetail);
                        }}
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
                          {data_part.item_part_specification_worker
                            ? data_part.item_part_specification_worker
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
                        value={data_part.item_part_specification_worker}
                        onChange={(data) => {
                          onChangeValue(data_part.id, {
                            item_part_specification_worker: data ?? 0,
                          });
                        }}
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
                    <Text strong>
                      {!readOnly && <span className="require">* </span>}
                      Part Machine :
                    </Text>
                  </Col>
                  <Col span={16}>
                    {readOnly ? (
                      <div className="text-left">
                        <Text className="text-view">
                          {data_part.machine_no_name
                            ? data_part.machine_no_name
                            : "-"}
                        </Text>
                      </div>
                    ) : (
                      <CustomSelect
                        allowClear
                        showSearch
                        disabled={data_part.work_center_id ? 0 : 1}
                        size="small"
                        placeholder={"Select Machine"}
                        name="machine_no_name"
                        field_id="machine_id"
                        field_name="machine_no_name"
                        value={data_part.machine_no_name}
                        data={workCenterMachine}
                        onChange={(data, option) => {
                          data && data
                            ? onChangeValue(data_part.id, {
                                machine_id: option.data.machine_id,
                                machine_no_name: option.data.machine_no_name,
                              })
                            : onChangeValue(data_part.id, {
                                machine_id: null,
                                machine_no_name: null,
                              });
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="detail-container">
              <PartSpecificationDetail
                item_part_id={item_part_id}
                readOnly={readOnly}
                data_part_detail={data_part_detail}
                partDetailDispatch={partDetailDispatch}
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
                  {/* <Col span={12}>
                    {readOnly ? (
                      <div className="text-right">
                        <Text className="text-value">
                          {convertTimeToNumber(
                            data_part.item_part_specification_time
                          )}
                        </Text>
                      </div>
                    ) : (
                      <InputNumber
                        placeholder={"Minutes"}
                        min={0}
                        step={1}
                        precision={0}
                        style={{ width: "100%" }}
                        disabled={0}
                        defaultValue={0}
                        name="item_part_specification_time"
                        value={convertTimeToNumber(
                          data_part.item_part_specification_time
                        )}
                        onChange={(data) => {
                          onChangeValue(data_part.id, {
                            item_part_specification_time: convertNumberToTime(
                              data
                            ),
                          });
                        }}
                        size="small"
                      />
                    )}
                  </Col>
                  <Col span={5}>
                    <Text strong className="pd-left-2">
                      Minutes
                    </Text>
                  </Col> */}
                  <Col span={12}>
                    {readOnly ? (
                      <Text className="text-view">
                        {data_part.item_part_specification_time
                          ? data_part.item_part_specification_time
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
                          data_part.item_part_specification_time
                            ? moment(
                                data_part.item_part_specification_time,
                                "HH:mm:ss"
                              )
                            : ""
                        }
                        onChange={(data) => {
                          const time = moment(data, "HH:mm").format("HH:mm:ss");
                          console.log(time);
                          onChangeValue(data_part.id, {
                            item_part_specification_time: data ? time : null,
                          });
                        }}
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
            <div className="detail-container mt-4">
              <BulkFormula
                readOnly={readOnly}
                item_part_id={item_part_id}
                data_formula_detail={data_formula_detail}
                formulaDetailDispatch={formulaDetailDispatch}
                item_list={item_list}
                machineList={machineList}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PartSpecification;
