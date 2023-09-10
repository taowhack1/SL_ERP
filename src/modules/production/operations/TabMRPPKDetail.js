import { Row, Col, Typography } from "antd";
import { DatePicker, Button } from "antd";
import { ProfileOutlined } from "@ant-design/icons";
import React, { useContext, useState, useEffect } from "react";
import { mrpDetailColumns } from "../config/mrp";
import CustomTable from "../../../components/CustomTable";
import { MRPContext } from "../../../include/js/context";
import moment from 'moment'
const { Text } = Typography;

const TabMRPPKDetail = () => {
  const { mainState, mainStateDispatch, readOnly } = useContext(MRPContext);
  const [main_pr_due_date, setDate] = useState(null);
  const [is_disabled, setDisabled] = useState(true);

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

  const applyAllPRDueDate = () => {
    console.log("mainState.pk_detail", mainState.pk_detail)
    mainState.pk_detail.forEach((rec, index) => {
      if (rec.mrp_detail_qty_pr > 0) {
        return onChange(rec.id, {
          mrp_detail_suggestion_date: main_pr_due_date || ''
        })
      }
    })
  }

  useEffect(() => {
    if (mainState.pk_detail.length > 0) {
      setDisabled(false)
    } else {
      setDisabled(true)
      setDate(null)
    }
  }, [mainState.pk_detail])

  console.log("readOnly", readOnly);
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={13} className="text-left">
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Package List
          </Text>
        </Col>
        <Col span={11} className="text-right">
          <DatePicker
            disabled={is_disabled}
            name={"mrp_detail_suggestion_date"}
            format={"DD/MM/YYYY"}
            // size="small"
            className={"full-width,text-center"}
            placeholder="PR Due Date"
            value={
              main_pr_due_date
                ? moment(main_pr_due_date, "DD/MM/YYYY")
                : ""
            }
            onChange={(data) => {
              console.log("change all", data.format("DD/MM/YYYY"))
              data
                ? setDate(data.format("DD/MM/YYYY"))
                : setDate(null)
            }}
          />
          <Button disabled={is_disabled} style={{ marginLeft: '5px' }} size="small" onClick={applyAllPRDueDate}>Apply</Button>
        </Col>
      </Row>
      <CustomTable
        rowKey="id"
        rowClassName={(record) => {
          return readOnly
            ? "row-table-detail "
            : record.auto_genarate_item
              ? "row-table-detail "
              : "row-table-detail require";
        }}
        pageSize={999}
        focusLastPage={true}
        columns={mrpDetailColumns({ readOnly, onChange })}
        dataSource={mainState.pk_detail}
        readOnly={readOnly}
      />
    </>
  );
};

export default React.memo(TabMRPPKDetail);
