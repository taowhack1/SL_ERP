import { ProfileOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import CustomTable from "../../../components/CustomTable";
import { itemPartMixColumns } from "../config/item";
import { PartContext } from "../ItemCreate";

const ItemPartMix = () => {
  const { PMReducer, readOnly, data_part } = useContext(PartContext);
  PMReducer.setReducer(2);
  //   const [state, setState] = useState();
  console.log(data_part);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={13} className="text-left">
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Part Mix
          </Text>
        </Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      <CustomTable
        rowKey="id"
        rowClassName="row-table-detail"
        pageSize={5}
        focusLastPage={true}
        columns={itemPartMixColumns(
          readOnly,
          PMReducer.onChangeDetailValue,
          PMReducer.deleteRow,
          null,
          {
            data_part: data_part,
          }
        )}
        dataSource={PMReducer.data}
        readOnly={readOnly}
        onAdd={PMReducer.addNewRow}
      />
    </>
  );
};

export default ItemPartMix;
