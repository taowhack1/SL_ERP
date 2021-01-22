import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Row, Col, DatePicker } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import moment from "moment";
const { RangePicker } = DatePicker;
const WorkOrderSearchTool = ({ onChangeSeach }) => {
  const { item_list } = useSelector((state) => state.inventory.master_data);
  const { workOrderList } = useSelector(
    (state) => state.production.operations.workOrder
  );
  const [state, setState] = useState({
    wo_id: null,
    wo_no_description: null,
    item_id: null,
    item_no_name: null,
    wo_plan_start_date: null,
    wo_plan_end_date: null,
    wo_due_date_start: null,
    wo_due_date_end: null,
  });
  const changeState = (stateKeyValue) => {
    setState({
      ...state,
      ...stateKeyValue,
    });
  };
  const reset_state = () => {
    setState({
      wo_id: null,
      wo_no_description: null,
      item_id: null,
      item_no_name: null,
      wo_plan_start_date: null,
      wo_plan_end_date: null,
      wo_due_date_start: null,
      wo_due_date_end: null,
    });
  };
  useEffect(() => {
    console.log("Search", state);
    onChangeSeach(state);
  }, [state]);
  return (
    <>
      <div className="search-table">
        <Row className="search-header">
          <Text className="search-title" strong>
            <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
            Search Tool.
          </Text>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>WO Code :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              placeholder={"WO Code"}
              field_id="wo_id"
              field_name="wo_no_description"
              value={state.wo_no_description}
              data={workOrderList}
              onChange={(data, option) => {
                data && data
                  ? changeState({
                      wo_id: data,
                      wo_no_description: option.title,
                      item_id: option.data.item_id,
                      item_no_name: option.data.item_no_name,
                    })
                  : reset_state();
              }}
            />
          </Col>
          <Col span={1}></Col>

          <Col span={2}>
            <Text strong>Planned Date :</Text>
          </Col>
          <Col span={8}>
            <RangePicker
              format={"DD/MM/YYYY"}
              name="wo_plan_start_date"
              className="full-width"
              value={[
                state.wo_plan_start_date
                  ? moment(state.wo_plan_start_date, "DD/MM/YYYY")
                  : "",
                state.wo_plan_end_date
                  ? moment(state.wo_plan_end_date, "DD/MM/YYYY")
                  : "",
              ]}
              onChange={(data) => {
                data
                  ? changeState({
                      wo_plan_start_date: data[0].format("DD/MM/YYYY"),
                      wo_plan_end_date: data[1].format("DD/MM/YYYY"),
                    })
                  : changeState({
                      wo_plan_start_date: null,
                      wo_plan_end_date: null,
                    });
              }}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>Item Name :</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              // size="small"
              allowClear
              showSearch
              // disabled={disable_category}
              placeholder={"Item name"}
              field_id="item_id"
              field_name="item_no_name"
              value={state.item_no_name}
              data={item_list.filter(
                (item) => item.type_id === 4 || item.type_id === 5
              )}
              onChange={(data, option) => {
                data && data
                  ? changeState({
                      item_id: option.data.item_id,
                      item_no_name: option.data.item_no_name,
                    })
                  : changeState({
                      item_id: null,
                      item_no_name: null,
                    });
              }}
            />
          </Col>

          <Col span={1}></Col>
          <Col span={2}>
            <Text strong>Due Date :</Text>
          </Col>
          <Col span={8}>
            <RangePicker
              format={"DD/MM/YYYY"}
              name="wo_due_date"
              className="full-width"
              value={[
                state.wo_due_date_start
                  ? moment(state.wo_due_date_start, "DD/MM/YYYY")
                  : "",
                state.wo_due_date_end
                  ? moment(state.wo_due_date_end, "DD/MM/YYYY")
                  : "",
              ]}
              onChange={(data) => {
                data
                  ? changeState({
                      wo_due_date_start: data[0].format("DD/MM/YYYY"),
                      wo_due_date_end: data[1].format("DD/MM/YYYY"),
                    })
                  : changeState({
                      wo_due_date_start: null,
                      wo_due_date_end: null,
                    });
              }}
            />
          </Col>
        </Row>
        <Row className="col-2 row-margin-vertical">
          <Col span={4}></Col>
          <Col span={8}>
            {/* <Search
              onSearch={changeSearchBox}
              search={state.search_text}
            /> */}
          </Col>

          <Col span={1}></Col>
          <Col span={10}>
            <Button
              className="search-button"
              danger
              icon={<ClearOutlined />}
              style={{ width: 150 }}
              onClick={reset_state}
            >
              Clear Search
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default React.memo(WorkOrderSearchTool);
