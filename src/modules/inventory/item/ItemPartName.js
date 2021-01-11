import { Input } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useContext, useEffect, useState } from "react";
import { ItemContext } from "../../../include/js/context";
const ItemPartName = ({ partId }) => {
  const { PartReducer, readOnly } = useContext(ItemContext);
  const [state, setState] = useState({
    onEdit: false,
    item_part_sort: PartReducer.data[partId].item_part_sort,
    item_part_description: PartReducer.data[partId].item_part_description,
  });
  const [focus, setFocus] = useState(false);
  const Save = () => {
    PartReducer.onChangeDetailValue(partId, {
      item_part_description: state.item_part_description,
    });
  };
  useEffect(() => {
    setState({
      onEdit: false,
      item_part_sort: PartReducer.data[partId].item_part_sort,
      item_part_description: PartReducer.data[partId].item_part_description,
    });
  }, [PartReducer.data[partId].data_id]);

  return (
    <>
      {readOnly ? (
        <Title level={4} className="pd-left-2">
          {state.item_part_description}
        </Title>
      ) : (
        <Input
          onPressEnter={() => {
            setState({ ...state, onEdit: false });
            Save();
          }}
          onBlur={() => {
            Save();
            setFocus(false);
          }}
          placeholder="Part Name"
          value={state.item_part_description}
          onChange={(e) =>
            setState({ ...state, item_part_description: e.target.value })
          }
          bordered={focus}
          onClick={() => setFocus(true)}
          className="hover-border ml-1 full-width part-name"
        />
      )}
    </>
  );
};

export default React.memo(ItemPartName);
