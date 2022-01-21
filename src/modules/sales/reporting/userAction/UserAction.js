/** @format */

import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Row, DatePicker, Button } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MainLayout from "../../../../components/MainLayout";
import Authorize from "../../../system/Authorize";
import moment from "moment";
const UserAction = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const authorize = Authorize();
  const history = useHistory();
  authorize.check_authorize();
  const { user_name } = useSelector((state) => state.auth.authData);
  const { project_id, project_name, project_url } = useSelector(
    (state) => state.auth.currentProject
  );
  const config = {
    projectId: project_id && project_id,
    title: project_name && project_name,
    home: project_url && project_url,
    show: true,
    breadcrumb: ["Home", "Reporting", "User Action"],
    search: false,
    create: "",
    buttonAction: "",
    edit: {},
    discard: "",
  };
  const [state, setState] = useState({
    start_date: null,
    end_date: null,
  });
  const changeState = (stateKeyValue) => {
    setState({
      ...state,
      ...stateKeyValue,
    });
  };
  const reset_state = () => {
    setState({
      start_date: null,
      end_date: null,
    });
  };
  const dateFormat = "DD/MM/YYYY";
  console.log(`user_name`, user_name);
  const showReport = (formButton) => {
    const report_user_action = `${process.env.REACT_APP_REPORT_SERVER}/report_user_action.aspx?`;
    const value = `&start_date=${state.start_date}&end_date=${state.end_date}`;
    if (state.start_date == null && state.end_date == null) {
      window.open(report_user_action);
    } else {
      window.open(report_user_action + value);
    }
  };
  return (
    <>
      <MainLayout {...config}>
        <div id='form'>
          <Row className='col-2'>
            <Row></Row>
            <Col span={8}>
              <h2>
                <SearchOutlined style={{ marginRight: 10, size: "20px" }} />{" "}
                User Action
              </h2>
              <br />
            </Col>
            <Col span={12}></Col>
            <Col span={2}></Col>
            <Col span={2} className='text-right'>
              <Text className='text-view'></Text>
            </Col>
          </Row>
          <Row className='row-margin'>
            <Col span={3}>
              <Text strong>Date : </Text>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={12}>
                  <RangePicker
                    name='stock_card_date_start'
                    required={true}
                    className='full-width'
                    format={dateFormat}
                    value={[
                      state.start_date
                        ? moment(state.start_date, "DD/MM/YYYY")
                        : "",
                      state.end_date
                        ? moment(state.end_date, "DD/MM/YYYY")
                        : "",
                    ]}
                    onChange={(data) => {
                      data
                        ? changeState({
                            start_date: data[0].format("DD/MM/YYYY"),
                            end_date: data[1].format("DD/MM/YYYY"),
                          })
                        : changeState({
                            start_date: null,
                            end_date: null,
                          });
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className='row-margin'>
            <Col span={3}>
              <Text strong></Text>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={4}>
                  <Button
                    type='primary'
                    name='showReport'
                    className='full-width'
                    icon={<SearchOutlined />}
                    onClick={(e) => showReport(e.target.textContent)}
                    value='showReport'>
                    Search
                  </Button>
                </Col>
                <Col span={4}></Col>
                <Col span={4}>
                  <Button
                    className='search-button'
                    danger
                    icon={<ClearOutlined />}
                    className='full-width'
                    onClick={reset_state}>
                    Clear Search
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className='row-margin'>
            <Col span={3}>
              <Text strong></Text>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={12}>
                  <br />
                  <h5 style={{ color: "red" }}>
                    *หากไม่เลือกช่วงเวลาที่ต้องการ ระบบจะค้นหาข้อมูลย้อนหลัง 3
                    เดือนให้เป็นค่าเริ่มต้น
                  </h5>
                </Col>
              </Row>
            </Col>
            <Col span={1}></Col>
          </Row>
        </div>
      </MainLayout>
    </>
  );
};

export default UserAction;
