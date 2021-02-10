import { ProfileOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useReducer } from "react";
import CustomTable from "../../../components/CustomTable";
import { ItemContext } from "../../../include/js/context";
import { getFieldNameById, sortData } from "../../../include/js/function_main";
import { itemPartMixColumns, item_part_mix_fields } from "../config/item";
import { reducer } from "../reducers";

const ItemPartMix = ({ id, partMix }) => {
  const { statePart, statePartDispatch, readOnly } = useContext(ItemContext);
  const [state, stateDispatch] = useReducer(reducer, sortData(partMix));
  const addNewRow = () => {
    statePartDispatch({
      type: "ADD_ROW_ARRAY_OBJ_DETAIL",
      payload: {
        headId: id,
        key: "item_part_mix",
        data: item_part_mix_fields,
      },
    });
  };
  const onDelete = (rowId) => {
    statePartDispatch({
      type: "DEL_ROW_ARRAY_OBJ_DETAIL",
      payload: {
        headId: id,
        key: "item_part_mix",
        rowId,
      },
    });
  };
  const onChange = (id, data) => {
    stateDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: id,
        data: data,
      },
    });
  };
  const Save = (rowId) => {
    statePartDispatch({
      type: "CHANGE_OBJ_ARRAY_DETAIL_VALUE",
      payload: {
        headId: id,
        rowId,
        key: "item_part_mix",
        data: state[rowId],
      },
    });
  };

  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: partMix,
    });
  }, [partMix.length]);

  const getPartName = (item_part_sort) => {
    return getFieldNameById(
      statePart,
      item_part_sort,
      "item_part_sort",
      "item_part_description"
    );
  };
  console.log("PartMix", partMix, state);
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
          onChange,
          onDelete,
          getPartName,
          Save,
          {
            data_part: statePart,
          }
        )}
        dataSource={state}
        readOnly={readOnly}
        onAdd={addNewRow}
      />
    </>
  );
};

export default React.memo(ItemPartMix);
