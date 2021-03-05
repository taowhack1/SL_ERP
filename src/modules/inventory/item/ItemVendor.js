import { InputNumber, Typography, Checkbox, Popconfirm, message } from "antd";
import {
  DeleteTwoTone,
  EllipsisOutlined,
  CheckSquareOutlined,
  BorderOutlined,
  SnippetsOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { itemVendorFields, item_vendor_fields } from "../config/item";
import { useSelector } from "react-redux";
import CustomSelect from "../../../components/CustomSelect";
import { convertDigit, getNumberFormat } from "../../../include/js/main_config";
import CustomLabel from "../../../components/CustomLabel";
import CustomTable from "../../../components/CustomTable";
import ItemVendorDocumentList from "./ItemVendorDocumentList";
import { ItemContext } from "../../../include/js/context";
import { mainReducer } from "../../../include/reducer";

const { Text } = Typography;
const initialState = itemVendorFields;
const itemVendorColumns = ({
  readOnly,
  onChange,
  onDelete,
  vendors,
  units,
  data_detail,
  setModalState,
}) => [
  {
    id: 1,
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    render: (value, record, index) => {
      return value + 1;
    },
  },
  {
    id: 2,
    title: (
      <div className="text-center">
        <Text strong>Default</Text>
      </div>
    ),
    dataIndex: "item_vendor_default",
    width: "7%",
    align: "center",
    ellipsis: true,
    render: (value, record) => {
      return readOnly ? (
        value ? (
          <CheckSquareOutlined />
        ) : (
          <BorderOutlined />
        )
      ) : (
        <Checkbox
          name="item_vendor_default"
          checked={value}
          onChange={(e) => {
            if (
              (data_detail.some((obj) => obj.item_vendor_default === 1) &&
                e.target.checked) ||
              !record.vendor_id
            ) {
              message.warning("Can't set default in this record.");
              return false;
            } else {
              onChange(record.id, {
                item_vendor_default: e.target.checked ? 1 : 0,
              });
            }
          }}
        />
      );
    },
  },
  {
    id: 3,
    title: (
      <div className="text-center">
        <CustomLabel label="Vendor" require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "vendor_no_name",
    key: "vendor_no_name",
    align: "left",
    // width: "40%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <CustomSelect
            allowClear
            showSearch
            size={"small"}
            placeholder={"Vendor"}
            name="vendor_id"
            field_id="vendor_id"
            field_name="vendor_no_name"
            value={value}
            data={vendors}
            onChange={(data, option) => {
              data !== undefined
                ? onChange(record.id, {
                    vendor_id: option.data.vendor_id,
                    vendor_no_name: option.data.vendor_no_name,
                  })
                : onChange(record.id, {
                    vendor_id: null,
                    vendor_no_name: null,
                  });
            }}
          />
        );
      }
    },
  },
  {
    id: 4,
    title: (
      <div className="text-center">
        <CustomLabel label="L/T (days)" require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "item_vendor_lead_time_day",
    key: "item_vendor_lead_time_day",
    align: "center",
    width: "10%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <InputNumber
            placeholder={"Lead time"}
            min={0}
            step={1}
            precision={0}
            className={"full-width"}
            disabled={0}
            name="item_vendor_lead_time_day"
            value={value}
            onChange={(data) =>
              onChange(record.id, { item_vendor_lead_time_day: data })
            }
            size="small"
          />
        );
      }
    },
  },
  {
    id: 5,
    title: (
      <div className="text-center">
        <CustomLabel label="MOQ." require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "item_vendor_moq",
    key: "item_vendor_moq",
    align: "right",
    width: "12%",
    render: (value, record, index) => {
      if (readOnly) {
        return convertDigit(value, 3);
      } else {
        return (
          <InputNumber
            {...getNumberFormat(3)}
            placeholder={"Min Qty."}
            min={0}
            step={1}
            className={"full-width"}
            name="item_vendor_moq"
            value={value}
            onChange={(data) => onChange(record.id, { item_vendor_moq: data })}
            size="small"
          />
        );
      }
    },
  },
  {
    id: 6,
    title: (
      <div className="text-center">
        <CustomLabel label="Pack Size" require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "item_vendor_pack_size",
    key: "item_vendor_pack_size",
    align: "right",
    width: "12%",
    render: (value, record, index) => {
      if (readOnly) {
        return convertDigit(value, 3);
      } else {
        return (
          <InputNumber
            {...getNumberFormat(3)}
            placeholder={"Pack Size"}
            min={0}
            step={1}
            className={"full-width"}
            name="item_vendor_pack_size"
            value={value}
            onChange={(data) =>
              onChange(record.id, { item_vendor_pack_size: data })
            }
            size="small"
          />
        );
      }
    },
  },
  {
    id: 7,
    title: (
      <div className="text-center">
        <CustomLabel label="UOM" require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "uom_no",
    key: "uom_no",
    align: "left",
    width: "10%",
    render: (value, record, index) => {
      if (readOnly) {
        return value;
      } else {
        return (
          <CustomSelect
            allowClear
            showSearch
            size={"small"}
            placeholder={"UOM"}
            name="uom_id"
            field_id="uom_id"
            field_name="uom_no"
            value={value}
            data={units}
            onChange={(data, option) => {
              data !== undefined
                ? onChange(record.id, {
                    uom_id: option.data.uom_id,
                    uom_no: option.data.uom_no,
                    uom_no_name: option.data.uom_no_name,
                  })
                : onChange(record.id, {
                    uom_id: null,
                    uom_no: null,
                    uom_no_name: null,
                  });
            }}
          />
        );
      }
    },
  },
  {
    id: 8,
    title: (
      <div className="text-center">
        <CustomLabel label="Price / Unit" require readOnly={readOnly} />
      </div>
    ),
    dataIndex: "item_vendor_price",
    key: "item_vendor_price",
    align: "right",
    width: "10%",
    render: (value, record, index) => {
      if (readOnly) {
        return convertDigit(value, 3);
      } else {
        return (
          <InputNumber
            {...getNumberFormat(3)}
            placeholder={"Min Qty."}
            min={0}
            step={1}
            className={"full-width"}
            name="item_vendor_price"
            value={value}
            onChange={(data) =>
              onChange(record.id, { item_vendor_price: data })
            }
            size="small"
          />
        );
      }
    },
  },
  {
    id: 9,
    title: <Text strong>Docs.</Text>,
    align: "center",
    width: "5%",
    render: (_, record) => (
      <SnippetsOutlined
        className="button-icon"
        title={"View / Attach File"}
        onClick={() => setModalState({ visible: true, vendorData: record })}
      />
    ),
  },
  {
    id: 10,
    title: (
      <Text strong>
        <EllipsisOutlined />
      </Text>
    ),
    align: "center",
    width: "5%",
    render: (value, record, index) => {
      if (readOnly) {
        return null;
      } else {
        return (
          <Popconfirm
            onConfirm={() => {
              onDelete(record.id);
            }}
            title="Are you sure you want to delete this row？"
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined className="warning" />
          </Popconfirm>
        );
      }
    },
  },
];

const ItemVendor = () =>
  // { data_head, data_detail, readOnly, detailDispatch }
  {
    const { data_head, readOnly, vendorFormRef } = useContext(ItemContext);
    const [state, stateDispatch] = useReducer(mainReducer, data_head.pu_vendor);
    const units = useSelector((state) => state.inventory.master_data.item_uom);
    const vendors = useSelector((state) => state.purchase.vendor.vendor_list);

    const [modal, setModal] = useState({
      visible: false,
    });

    const addLine = () => {
      stateDispatch({
        type: "ADD_ROW",
        payload: {
          ...initialState,
          uom_id: data_head?.uom_id,
          uom_no: data_head?.uom_no,
        },
      });
    };

    const delLine = (id) => {
      stateDispatch({ type: "DEL_ROW", payload: { id: id } });
    };

    const onChangeValue = (rowId, data) => {
      console.log("onChangeValue", rowId, data);
      stateDispatch({
        type: "CHANGE_DETAIL_VALUE",
        payload: {
          id: rowId,
          data: data,
        },
      });
    };
    const setModalState = (data) => setModal({ ...modal, ...data });

    useEffect(() => {
      !readOnly &&
        stateDispatch({
          type: "SET_DETAIL",
          payload: state.map((detail) => {
            return {
              ...detail,
              uom_id: data_head.uom_id,
              uom_name: data_head.uom_name,
            };
          }),
        });
    }, [data_head.uom_id]);
    console.log("Vendor : ", state);
    return (
      <>
        <input
          ref={vendorFormRef}
          type="hidden"
          name="store_value"
          value={state}
        />
        <CustomTable
          dataSource={state}
          rowClassName="row-table-detail"
          pageSize={10}
          rowKey="id"
          columns={itemVendorColumns({
            readOnly,
            vendors,
            units,
            onDelete: delLine,
            onChange: onChangeValue,
            data_detail: state,
            setModalState,
          })}
          onAdd={!readOnly && addLine}
        />
        <ItemVendorDocumentList
          visible={modal.visible}
          readOnly={readOnly}
          vendorData={modal.vendorData}
          setModalState={setModalState}
        />
      </>
    );
  };

export default React.memo(ItemVendor);
