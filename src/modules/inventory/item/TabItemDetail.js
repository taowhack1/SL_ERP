import { UploadOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Input,
  InputNumber,
  Row,
  Tabs,
  Upload,
  Button,
  Space,
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import Line from "../../../components/VendorLine";
import { numberFormat } from "../../../include/js/main_config";
const { TextArea } = Input;

const TabItemDetail = ({ key, master_data, data_head, upDateFormValue }) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>
            <span className="require">* </span>SRL
          </Text>
        </Col>
        <Col span={8}>
          <Input
            name="item_customer_run_no"
            disabled={data_head.item_id ? 1 : 0}
            placeholder="Customer or vendor short name"
            onChange={(e) =>
              upDateFormValue({
                item_customer_run_no: e.target.value,
              })
            }
            value={data_head.item_customer_run_no}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={3}>
          <Text strong>
            <span className="require">* </span>Item type{" "}
          </Text>
        </Col>
        <Col span={8}>
          <CustomSelect
            allowClear
            disabled={data_head.item_id ? 1 : 0}
            showSearch
            placeholder={"Item type"}
            name="type_id"
            field_id="type_id"
            field_name="type_name"
            value={data_head.type_name}
            data={master_data.item_type}
            onChange={(data, option) => {
              data && data
                ? upDateFormValue({
                    type_id: data,
                    type_name: option.title,
                    category_id: null,
                    category_name: null,
                  })
                : upDateFormValue({
                    category_id: null,
                    category_name: null,
                  });
            }}
          />
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>
            <span className="require">* </span>Unit of measure
          </Text>
        </Col>
        <Col span={8}>
          <CustomSelect
            allowClear
            showSearch
            placeholder={"Unit of measure"}
            name="uom_id"
            field_id="uom_id"
            field_name="uom_no"
            value={data_head.uom_no}
            data={master_data.item_uom}
            onChange={(data, option) => {
              data && data
                ? upDateFormValue({
                    uom_id: option.data.uom_id,
                    uom_no: option.data.uom_no,
                  })
                : upDateFormValue({
                    uom_id: null,
                    uom_no: null,
                  });
            }}
          />
        </Col>
        <Col span={2}></Col>
        <Col span={3}>
          <Text strong>
            <span className="require">* </span>Category{" "}
          </Text>
        </Col>
        <Col span={8}>
          <CustomSelect
            allowClear
            showSearch
            disabled={data_head.item_id ? 1 : 0}
            placeholder={"Category"}
            name="category_id"
            field_id="category_id"
            field_name="category_name"
            value={data_head.category_name}
            data={
              data_head.type_id
                ? master_data.item_category.filter(
                    (categ) => categ.type_id === data_head.type_id
                  )
                : master_data.item_category
            }
            onChange={(data, option) => {
              data && data
                ? upDateFormValue({
                    category_id: option.data.category_id,
                    category_name: option.data.category_name,
                  })
                : upDateFormValue({
                    category_id: null,
                    category_name: null,
                  });
            }}
          />
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>
            <span className="require">* </span>Shelf life (day){" "}
          </Text>
        </Col>
        <Col span={8}>
          <InputNumber
            name="item_shelf_life"
            placeholder={"Shelf life (day)"}
            min={0}
            step={1}
            precision={0}
            style={{ width: "100%" }}
            disabled={0}
            value={data_head.item_shelf_life}
            onChange={(data) =>
              upDateFormValue({
                item_shelf_life: data,
              })
            }
          />
        </Col>

        <Col span={2}></Col>
        <Col span={3}>
          <Text strong>
            <span className="require">* </span>Storage Condition{" "}
          </Text>
        </Col>
        <Col span={8}>
          <CustomSelect
            allowClear
            // disabled={data_head.item_id ? 1 : 0}
            showSearch
            placeholder={"Storage Condition"}
            name="item_control_id"
            field_id="item_control_id"
            field_name="item_control_name"
            // value={data_head.type_name}
            // data={master_data.item_type}
            // onChange={(data, option) => {
            //   data && data
            //     ? upDateFormValue({
            //         type_id: data,
            //         type_name: option.title,
            //         category_id: null,
            //         category_name: null,
            //       })
            //     : upDateFormValue({
            //         category_id: null,
            //         category_name: null,
            //       });
            // }}
          />
        </Col>
      </Row>
      <Row className="col-2 row-margin-vertical">
        <Col span={3}>
          <Text strong>Item barcode</Text>
        </Col>
        <Col span={8}>
          <Input
            disabled
            placeholder={"Barcode"}
            onChange={(e) => upDateFormValue({ item_barcode: e.target.value })}
            value={data_head.item_barcode}
          />
        </Col>
      </Row>
      <Row className="col-2">
        <Col span={24}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Text strong>Notes </Text>
            <TextArea
              name="item_remark"
              placeholder="Notes"
              onChange={(e) => upDateFormValue({ item_remark: e.target.value })}
              value={data_head.item_remark}
            />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default TabItemDetail;
