import { Button, Col, Row, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useReducer, useState } from "react";
import numeral from "numeral";
import CustomSelect from "../../components/CustomSelect";
import { reducer } from "./reducers";
import { issue_detail_fields, select_item_columns } from "./config";
import { useSelector } from "react-redux";
import Search from "../../components/Search";
import { ConsoleSqlOutlined } from "@ant-design/icons";

const initialState = [issue_detail_fields];
const Modal_Select_Item = (props) => {
  const { data_detail, filter, headDispatch } = props;
  console.log("Render : Modal_Select_Item");
  const master_data = useSelector((state) => state.inventory.master_data);
  const [temp_detail, tempDetailDispatch] = useReducer(reducer, initialState);
  const { detailDispatch, visible, setVisible, readOnly } = props;
  const [disable_category, setDisableCategory] = useState(true);
  const [selected_item, set_selected_item] = useState(
    data_detail.length && data_detail[0]["item_id"] ? data_detail : []
  );
  const [selected_key, set_selected_key] = useState(
    data_detail.length && data_detail[0]["item_id"]
      ? data_detail[0].item_id && data_detail.map((detail) => detail.item_id)
      : []
  );

  const [item_list, setItemList] = useState(master_data.item_list);
  const [state, setState] = useState(
    filter && filter
      ? filter
      : {
          type_id: null,
          type_no_name: null,
          category_id: null,
          category_no_name: null,
        }
  );

  console.log("filter", filter);
  console.log("state", state);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (state.type_id) {
      setDisableCategory(false);
    } else {
      setDisableCategory(true);
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    const getItemList = (list) => {
      let temp_list = [];
      if (state.type_id) {
        if (state.category_id) {
          temp_list = list.filter(
            (item) =>
              item.type_id === state.type_id &&
              item.category_id === state.category_id
          );
        } else {
          temp_list = list.filter((item) => item.type_id === state.type_id);
        }
      } else {
        temp_list = master_data.item_list;
      }
      setLoading(false);
      return temp_list;
    };
    setItemList(getItemList(master_data.item_list));
  }, [state]);

  const changeState = (stateKeyValue, stateKey) => {
    setState({
      ...state,
      ...stateKeyValue,
    });
  };

  // useEffect(() => {
  //   console.log("change first select");
  //   if (selected_item[0]) {
  //     setState({
  //       type_id: selected_item[0].type_id,
  //       type_no_name: selected_item[0].type_no_name,
  //       category_id: selected_item[0].category_id,
  //       category_no_name: selected_item[0].category_no_name,
  //     });
  //     headDispatch({
  //       type_id: selected_item[0].type_id,
  //       type_no_name: selected_item[0].type_no_name,
  //       category_id: selected_item[0].category_id,
  //       category_no_name: selected_item[0].category_no_name,
  //     });
  //   }

  //   // : reset_state();
  // }, [selected_item[0]]);

  const rowSelection = {
    selectedRowKeys: selected_key,
    hideSelectAll: true,
    onSelect: (record, selected, selectedRows, e) => {
      if (selected) {
        set_selected_item([...selected_item, record]);
        set_selected_key([...selected_key, record.item_id]);
      } else {
        set_selected_item(
          selected_item.filter((item) => item.item_id !== record.item_id)
        );
        set_selected_key(selected_key.filter((key) => key !== record.item_id));
      }
    },
    //disabled checkbox empty stock
    // getCheckboxProps: (record) => ({
    //   disabled: record.tg_item_qty === 0, // Column configuration not to be checked
    // }),
  };

  const reset_state = () => {
    setState({
      type_id: null,
      type_no_name: null,
      category_id: null,
      category_no_name: null,
    });
    set_selected_key([]);
    set_selected_item([]);
  };

  const onSearch = (word) => {
    setLoading(true);
    if (state.type_id) {
      if (state.category_id) {
        setItemList(
          master_data.item_list.filter(
            (item) =>
              item.item_no_name &&
              item.item_no_name.indexOf(word) >= 0 &&
              item.type_id === state.type_id &&
              item.category_id === state.category_id
          )
        );
      } else {
        setItemList(
          master_data.item_list.filter(
            (item) =>
              item.item_no_name &&
              item.item_no_name.indexOf(word) >= 0 &&
              item.type_id === state.type_id
          )
        );
      }
    } else {
      setItemList(
        master_data.item_list.filter(
          (item) => item.item_no_name && item.item_no_name.indexOf(word) >= 0
        )
      );
    }

    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };
  return (
    <Modal
      style={{ top: 50 }}
      width={1000}
      height={700}
      title={props.title && props.title}
      visible={visible}
      onOk={props.modalSave && props.modalSave}
      onCancel={props.modalCancel && props.modalCancel}
      footer={null}
      destroyOnClose
      // footer={[
      //   <Text style={{ color: "blue", marginRight: 40 }}>
      //     Your Select [ {selected_item.length} ] Item.
      //   </Text>,
      //   <Button
      //     key="back"
      //     className={readOnly ? "primary" : ""}
      //     onClick={props.modalCancel}
      //   >
      //     {props.cancelTitle}
      //   </Button>,
      //   !readOnly && (
      //     <Button
      //       key="submit"
      //       className="primary"
      //       onClick={() => props.modalSave(selected_item)}
      //     >
      //       {props.okTitle}
      //     </Button>
      //   ),
      // ]}
    >
      <Row className="row-margin-vertical">
        <Col span={3}>
          <Text strong>Item Type:</Text>
        </Col>
        <Col span={8}>
          <CustomSelect
            // size="small"
            allowClear
            showSearch
            placeholder={"Item Type"}
            field_id="type_id"
            field_name="type_no_name"
            value={state.type_no_name}
            data={master_data.item_type}
            onChange={(data, option) => {
              data && data
                ? changeState(
                    {
                      type_id: data,
                      type_no_name: option.title,
                      category_id: null,
                      category_no_name: null,
                    },
                    "type"
                  )
                : reset_state();
            }}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={12}>
          <Search onSearch={onSearch} loading={loading} />
        </Col>
      </Row>
      <Row className="row-margin-vertical">
        <Col span={3}>
          <Text strong>Item Category:</Text>
        </Col>
        <Col span={8}>
          <CustomSelect
            // size="small"
            allowClear
            showSearch
            disabled={disable_category}
            placeholder={"Category"}
            field_id="category_id"
            field_name="category_no_name"
            value={state.category_no_name}
            data={
              state.type_id
                ? master_data.item_category.filter(
                    (categ) => categ.type_id === state.type_id
                  )
                : master_data.item_category
            }
            onChange={(data, option) => {
              data && data
                ? changeState(
                    {
                      category_id: data,
                      category_no_name: option.title,
                    },
                    "category"
                  )
                : changeState(
                    {
                      category_id: null,
                      category_no_name: null,
                    },
                    "category"
                  );
            }}
          />
        </Col>
      </Row>

      <Row className="row-tab-margin-lg section-top" style={{ paddingTop: 15 }}>
        <Col span={4}>
          {!readOnly && (
            <Button
              key="submit"
              className="primary"
              onClick={() => props.modalSave(selected_item)}
            >
              {props.okTitle}
            </Button>
          )}
          <Button
            key="back"
            className={readOnly ? "primary" : ""}
            onClick={props.modalCancel}
            style={{ marginLeft: 5 }}
          >
            {props.cancelTitle}
          </Button>
        </Col>
        <Col span={17}>
          <Text strong>
            Selected [{" "}
            {
              <Text strong style={{ color: "blue" }}>
                {selected_item.length}
              </Text>
            }{" "}
            ] Items.
          </Text>
        </Col>
        <Col span={3}>
          <Button
            key="back"
            // className={readOnly ? "primary" : ""}
            onClick={() => reset_state()}
            style={{ float: "right" }}
          >
            Clear Filter
          </Button>
        </Col>
      </Row>
      <Row className="row-tab-margin">
        <Col span={24}>
          <Table
            bordered
            loading={loading}
            columns={select_item_columns}
            dataSource={item_list}
            // onChange={onChange}
            rowSelection={rowSelection}
            rowKey={"item_id"}
            size="small"
            scroll={{ y: 400 }}
            pagination={{ pageSize: 20 }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default React.memo(Modal_Select_Item);
