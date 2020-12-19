import { Input } from "antd";
import React, { useState } from "react";

const ItemPartName = ({ data_part, partDispatch }) => {
  const [state, setState] = useState({
    onEdit: false,
    item_part_id: data_part.item_part_id,
    item_part_name: data_part.item_part_name,
  });
  const [focus, setFocus] = useState(false);
  const Save = () => {
    partDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: data_part.id,
        data: { item_part_name: state.item_part_name },
      },
    });
  };
  return (
    <>
      {/* {state.onEdit ? ( */}
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
        value={state.item_part_name}
        onChange={(e) => setState({ ...state, item_part_name: e.target.value })}
        bordered={focus}
        onClick={() => setFocus(true)}
        className="hover-border ml-1 full-width"
      />
      {/* // ) : (
      //   <Title level={4}>
      //     {state.item_part_name}{" "}
      //     <EditTwoTone
      //       className="font-size-l"
      //       onClick={() => setState({ ...state, onEdit: true })}
      //     />
      //   </Title>
      // )} */}
    </>
  );
};

export default ItemPartName;
