import { ProfileOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useReducer } from "react";
import CustomTable from "../../../components/CustomTable";
import { ItemContext } from "../../../include/js/context";
import { getFieldNameById, sortData } from "../../../include/js/function_main";
import { itemPartMixColumns, item_part_mix_fields } from "../config/item";
import { reducer } from "../reducers";

const ItemPartMix = ({ partId }) => {
  const { PartReducer, PMReducer, readOnly } = useContext(ItemContext);
  const [state, stateDispatch] = useReducer(
    reducer,
    sortData(PMReducer.data[partId])
  );
  const addNewRow = () => {
    stateDispatch({
      type: "ADD_ROW",
      payload: item_part_mix_fields,
    });
    PMReducer.addNewRow(item_part_mix_fields, partId);
  };
  const onDelete = (id) => {
    stateDispatch({
      type: "DEL_ROW",
      payload: {
        id: id,
      },
    });
    PMReducer.deleteRow2D(partId, id);
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
  const Save = (id2) => {
    PMReducer.onChangeDetailValue2D(partId, id2, state[id2]);
  };

  useEffect(() => {
    stateDispatch({
      type: "SET_DETAIL",
      payload: PMReducer.data[partId],
    });
  }, [PMReducer.data[partId].length]);

  const getPartName = (item_part_sort) => {
    return getFieldNameById(
      PartReducer.data,
      item_part_sort,
      "item_part_sort",
      "item_part_description"
    );
  };
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
            data_part: PartReducer.data,
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
