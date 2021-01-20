import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Input, Typography } from "antd";
import CustomSelect from "../../../components/CustomSelect";
import { useSelector } from "react-redux";
import { WOContext } from "../../../include/js/context";
const { Text } = Typography;
const WorkOrderHead = () => {
  const SOList = useSelector(
    (state) => state.production.operations.workOrder.workOrder.data_so_ref
  );
  const { headReducer, readOnly } = useContext(WOContext);
  const {
    wo_description,
    wo_due_date,
    so_id,
    so_no_description,
    item_id,
    item_no_name,
    so_detail_id,
  } = headReducer.data;
  const [state, setState] = useState({
    wo_description: wo_description,
    wo_due_date: wo_due_date,
    so_id: so_id,
    so_no_description: so_no_description,
    item_id: item_id,
    item_no_name: item_no_name,
    so_detail_id: so_detail_id,
  });
  const onChange = (data) => {
    setState({ ...state, ...data });
    headReducer.onChangeHeadValue({ ...state, ...data });
  };
  const Reset = () => {
    headReducer.resetDataObject();
    setState({
      wo_description: null,
      wo_due_date: null,
      so_id: null,
      so_no_description: null,
      item_id: null,
      item_no_name: null,
      so_detail_id: null,
    });
  };
  console.log("headReducer.data", headReducer.data);
  return (
    <>
      <Row className="col-2">
        <Col span={24}>
          <h3>
            <strong>
              {!readOnly && <span className="require">* </span>}
              Description / Job Name.
            </strong>
          </h3>
          <Col span={24}>
            {readOnly ? (
              <Text className="text-value text-left">
                {state.wo_description}
              </Text>
            ) : (
              <Input
                name="wo_description"
                required
                placeholder={"Description / Job Name."}
                onChange={(e) =>
                  onChange({
                    wo_description: e.target.value,
                  })
                }
                value={state.wo_description}
              />
            )}
          </Col>
          <Row className="col-2 mt-2" gutter={[32, 0]}>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <Text strong>
                    {!readOnly && <span className="require">* </span>}
                    SO Document :
                  </Text>
                </Col>
                <Col span={18}>
                  {/* data_so_ref */}
                  {readOnly ? (
                    <Text className="text-value text-left">
                      {state.so_no_description}
                    </Text>
                  ) : (
                    <CustomSelect
                      allowClear
                      showSearch
                      // size={"small"}
                      placeholder={"SO Document"}
                      name="so_id"
                      field_id="so_id"
                      field_name="so_no_description"
                      value={state.so_no_description}
                      data={SOList}
                      onChange={async (data, option) => {
                        data && data
                          ? onChange({
                              so_id: option.data.so_id,
                              so_no_description: option.data.so_no_description,
                              so_detail: option.data.so_detail,
                              item_id: null,
                              item_no_name: null,
                              wo_due_date: null,
                              wo_qty_produce: 0,
                              uom_id: null,
                              uom_no: null,
                            })
                          : Reset();
                      }}
                    />
                  )}
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <Text strong>Due Date :</Text>
                </Col>
                <Col span={18}>
                  <Text className="text-view">
                    {state.wo_due_date ?? "DD/MM/YYYY"}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <Text strong>
                    {!readOnly && <span className="require">* </span>}
                    FG Item :
                  </Text>
                </Col>
                <Col span={18}>
                  {readOnly ? (
                    <Text className="text-value text-left">
                      {state.item_no_name}
                    </Text>
                  ) : (
                    <CustomSelect
                      allowClear
                      showSearch
                      // size={"small"}
                      placeholder={"FG Item"}
                      name="item_id"
                      field_id="so_detail_id"
                      field_name="item_no_name"
                      value={state.item_no_name}
                      data={state.so_detail ?? []}
                      onChange={(data, option) => {
                        data && data
                          ? onChange({
                              so_detail_id: option.data.so_detail_id,
                              item_id: option.data.item_id,
                              item_no_name: option.data.item_no_name,
                              wo_due_date: option.data.so_detail_delivery_date,
                              wo_qty_produce:
                                option.data.tg_so_detail_qty_balance,
                              uom_id: option.data.uom_id,
                              uom_no: option.data.uom_no,
                            })
                          : onChange({
                              so_detail_id: null,
                              item_id: null,
                              item_no_name: null,
                              wo_due_date: null,
                              wo_qty_produce: 0,
                              uom_id: null,
                              uom_no: null,
                            });
                      }}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(WorkOrderHead);
