/** @format */

import { ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomSelect from "../../../../components/CustomSelect";
import moment from "moment";
const SearchTableCheckPo = (props) => {
  const { listData, listDataMrp, onChangeMRP, state } = props;
  let tempDate = [];
  listData && listData.map((date) => tempDate.push(date.po_detail_due_date));
  const count_duplicate = (date) => {
    let counts = {};
    let date_min = [];
    let date_max = [];
    let qty_max = [];
    for (let i = 0; i < date.length; i++) {
      if (counts[date[i]]) {
        counts[date[i]] += 1;
      } else {
        counts[date[i]] = 1;
      }
    }
    const find = Object.keys(counts).map((date) => {
      return moment(date, "DD/MM/YYYY");
    });
    const count_max_list = Math.max(...Object.values(counts));
    const max = moment(moment.max(find)).format("DD/MM/YYYY");
    const min = moment(moment.min(find)).format("DD/MM/YYYY");
    Object.entries(counts).map((data, index) => {
      if (data[0] == max) {
        date_max.push({ po_due_date_last_date: data[0], value: data[1] });
      }
      if (data[0] == min) {
        date_min.push({ po_due_date_frist_date: data[0], value: data[1] });
      }
      if (data[1] == count_max_list) {
        //ถ้าจำนวนมากที่สุดมีหลายวัน ให้เอาวันที่น้อยที่สุดมาใส่
        if (data[0] == min) {
          qty_max.push({
            po_due_qty_max: data[0],
            value: data[1],
          });
        }
      }
    });
    return { date_max, date_min, qty_max };
  };
  const {
    date_max: po_due_date_last_date,
    date_min: po_due_date_frist_date,
    qty_max: po_due_qty_max,
  } = count_duplicate(tempDate);

  //console.log("count_duplicate(tempDate) :>> ", count_duplicate(tempDate));
  const reset_state = () => {
    onChangeMRP({
      mrp_id: null,
      mrp_description: null,
      so_no_description: null,
      item_no_name: null,
      mrp_delivery_date: null,
    });
  };
  const inputName = "MRP ";
  return (
    <>
      <div className='search-table'>
        {" "}
        <Row className='search-header'>
          <Text className='search-title' strong>
            <SearchOutlined style={{ marginRight: 10, size: "20px" }} />
            Search Tool.
          </Text>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col span={2}>
            <Text strong>{`${inputName}`}:</Text>
          </Col>
          <Col span={8}>
            <CustomSelect
              allowClear
              showSearch
              data={listDataMrp && listDataMrp[0]}
              placeholder={"Select MRP"}
              field_id={"mrp_id"}
              field_name={"mrp_no_description"}
              value={state?.mrp_id}
              onChange={(data, option) => {
                data !== undefined
                  ? onChangeMRP({
                      mrp_id: data,
                      mrp_description: option.data.mrp_description,
                      so_no_description: option.data.so_no_description,
                      item_no_name: option.data.item_no_name,
                      mrp_delivery_date: option.data.mrp_delivery_date,
                    })
                  : onChangeMRP({
                      mrp_id: null,
                      mrp_description: null,
                      so_no_description: null,
                      item_no_name: null,
                      mrp_delivery_date: null,
                    });
              }}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            {" "}
            <Button
              className='search-button'
              danger
              icon={<ClearOutlined />}
              onClick={reset_state}>
              Clear Search
            </Button>
          </Col>
        </Row>
        <div style={{ marginTop: 20 }}>
          <Row className='row-margin-vertical col-4'>
            <Col span={2}></Col>
            <Col span={4}>
              <Text strong>Description / Job Name :</Text>
            </Col>
            <Col span={8}>{`${state.mrp_description || "-"}`}</Col>
            <Col span={2}>วันที่ของเข้าเร็วสุด :</Col>
            <Col span={2} style={{ color: "green" }}>
              {` ${
                (po_due_date_frist_date &&
                  po_due_date_frist_date[0]?.po_due_date_frist_date) ||
                "-"
              }`}
            </Col>
            <Col span={2}>จำนวน : </Col>
            <Col span={2}>{` ${po_due_date_frist_date[0]?.value || "-"}`}</Col>
            <Col span={2}>รายการ</Col>
          </Row>
          <Row className='row-margin-vertical col-4'>
            <Col span={2}></Col>
            <Col span={4}>
              <Text strong>SO Document :</Text>
            </Col>
            <Col span={8}>{`${state.so_no_description || "-"}`}</Col>
            <Col span={2}>วันที่ของเข้าช้าสุด :</Col>
            <Col span={2} span={2} style={{ color: "red" }}>
              {` ${
                (po_due_date_last_date &&
                  po_due_date_last_date[0]?.po_due_date_last_date) ||
                "-"
              }`}
            </Col>
            <Col span={2}>จำนวน : </Col>
            <Col span={2}>{` ${po_due_date_last_date[0]?.value || "-"}`}</Col>
            <Col span={2}>รายการ</Col>
          </Row>
          <Row className='row-margin-vertical col-4'>
            <Col span={2}></Col>
            <Col span={4}>
              <Text strong>Item :</Text>
            </Col>
            <Col span={8}>{`${state.item_no_name || "-"}`}</Col>
            <Col span={2}>วันที่ของเข้าเยอะสุด :</Col>
            <Col span={2}>{` ${
              (po_due_qty_max && po_due_qty_max[0]?.po_due_qty_max) || "-"
            }`}</Col>
            <Col span={2}>จำนวน : </Col>
            <Col span={2}>{` ${po_due_qty_max[0]?.value || "-"}`}</Col>
            <Col span={2}>รายการ</Col>
          </Row>
          <Row className='row-margin-vertical col-4'>
            <Col span={2}></Col>
            <Col span={4}>
              <Text strong>Delivery Date :</Text>
            </Col>
            <Col span={8}>{`${state.mrp_delivery_date || "-"}`}</Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SearchTableCheckPo;
