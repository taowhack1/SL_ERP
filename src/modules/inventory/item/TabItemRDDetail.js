import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { Checkbox, Col, Input, Row, Space, Radio } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomSelect from "../../../components/CustomSelect";
import { get_pre_run_no } from "../../../include/js/function_main";
import ItemCertificate from "./ItemCertificate";
const TabItemRD = ({
  data_file,
  updateFile,
  master_data,
  data_head,
  upDateFormValue,
  customers,
  readOnly,
}) => {
  return (
    <>
      <Row className="col-2 row-margin-vertical">
        <Col
          span={12}
          style={{
            borderRight: "1px solid #c4c4c4",
          }}
        >
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <Text strong>INCI name</Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.item_name_trade ? data_head.item_name_trade : "-"}
                </Text>
              ) : (
                <Input
                  name="item_name_trade"
                  placeholder="INCI name"
                  onChange={(e) =>
                    upDateFormValue({
                      item_name_trade: e.target.value,
                    })
                  }
                  value={data_head.item_name_trade}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <Text strong>Vendor item name </Text>
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-view">
                  {data_head.item_name_vendor
                    ? data_head.item_name_vendor
                    : "-"}
                </Text>
              ) : (
                <Input
                  placeholder="Vendor item name"
                  onChange={(e) =>
                    upDateFormValue({
                      item_name_vendor: e.target.value,
                    })
                  }
                  value={data_head.item_name_vendor}
                />
              )}
            </Col>
            <Col span={1}></Col>
          </Row>
        </Col>
      </Row>
      {/* <ItemCertificate
        data_file={data_file}
        updateFile={updateFile}
        data_head={data_head}
        upDateFormValue={upDateFormValue}
        readOnly={readOnly}
      /> */}
    </>
  );
};

export default TabItemRD;
