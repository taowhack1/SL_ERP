import { Row, Col, Typography } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { mrpPKColumns } from "../config/mrp";
import CustomTable from "../../../components/CustomTable";
import { MRPContext } from "../../../include/js/context";

const { Text } = Typography;

const TabMRPPKDetail = () => {
  const { mainState, mainStateDispatch, readOnly } = useContext(MRPContext);
  // console.log("TabMRPPKDetail mainState", mainState);

  const onChange = (rowId, data) => {
    mainStateDispatch({
      type: "CHANGE_OBJ_DETAIL_VALUE",
      payload: {
        key: "pk_detail",
        rowId,
        data,
      },
    });
  };

  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={13} className="text-left">
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Package List
          </Text>
        </Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      {/* Column Header */}
      <CustomTable
        rowKey="id"
        rowClassName={(record) => {
          return record.auto_genarate_item
            ? "row-table-detail "
            : "row-table-detail require";
        }}
        pageSize={10}
        focusLastPage={true}
        columns={mrpPKColumns({ readOnly, onChange })}
        dataSource={mainState.pk_detail}
        readOnly={readOnly}
        // onAdd={RMReducer.addNewRow}
      />
    </>
  );
};

export default React.memo(TabMRPPKDetail);
