import { InputNumber, Popover, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { warningTextValue } from "../../../../../../include/js/function_main";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../../include/js/main_config";
import ComponentsForm from "./ComponentsForm";

const MRPDetail = () => {
  return (
    <div className="mt-2">
      <Tabs>
        {/* <Tabs.TabPane tab="Raw Material" key="1">
          <h1>Raw Material</h1>
          
        </Tabs.TabPane>
        <Tabs.TabPane tab="Packaging" key="2">
          <h1>Packaging</h1>
        </Tabs.TabPane> */}
        <Tabs.TabPane tab="Set Components" key="1">
          <h1>Set Components</h1>
          <ComponentsForm
            {...{ fieldName: "item_set_spec", columns: mrpDetailColumns }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Routing" key="2">
          <h1>Routing</h1>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Notes" key="3">
          <h1>Notes</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default React.memo(MRPDetail);

export const mrpDetailColumns = ({
  readOnly,
  onChange,
  fieldName,
  register,
}) => [
  {
    title: "No.",
    dataIndex: "id",
    width: "4%",
    align: "center",
    render: (value, record, index) => {
      return (
        <>
          <input
            className="d-none"
            {...register(`${fieldName}.${index}.item_id`, { required: true })}
          />
          {value}
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Item code">
        {!readOnly && <span className="require">* </span>} Item Code
      </div>
    ),
    dataIndex: "item_no",
    key: "item_no",
    align: "center",
    width: "15%",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <>
          <input
            className="d-none"
            {...register(`${fieldName}.${index}.item_no`, { required: true })}
          />
          <Text className="text-value text-left">{value ?? "-"}</Text>
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Item description">
        Description
      </div>
    ),
    dataIndex: "item_name",
    key: "item_name",
    align: "left",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <>
          <input
            className="d-none"
            {...register(`${fieldName}.${index}.item_name`, {
              required: true,
            })}
          />
          <Text className="text-value text-left">{value ?? "-"}</Text>
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Stock available quantity">
        Available Qty.
      </div>
    ),
    dataIndex: "item_qty_available",
    key: "item_qty_available",
    align: "right",
    require: true,
    width: "10%",
    ellipsis: true,
    render: (value, record, index) => {
      const {
        item_qty_available,
        item_qty_on_gr,
        item_qty_on_hand,
        item_qty_on_issue,
        item_qty_on_po,
        item_qty_on_pr,
        item_qty_on_qc,
      } = record;
      return (
        <>
          <Popover
            content={
              <>
                <div className="mb-1 border-bottom">
                  <Text strong>
                    วิธีคิด : (On hand + PR + PO + GR + QC) - Reserve
                  </Text>
                </div>

                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    On hand :
                  </Text>
                  <Text>{convertDigit(item_qty_on_hand, 6)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    PR :
                  </Text>
                  <Text>{convertDigit(item_qty_on_pr, 6)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    PO :
                  </Text>
                  <Text>{convertDigit(item_qty_on_po, 6)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    GR :
                  </Text>
                  <Text>{convertDigit(item_qty_on_gr, 6)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    QC :
                  </Text>
                  <Text>{convertDigit(item_qty_on_qc, 6)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    Reserve :
                  </Text>
                  <Text>{convertDigit(item_qty_on_issue, 6)}</Text>
                </div>
              </>
            }
            title="Available Quantity"
          >
            {warningTextValue(
              value,
              6,
              value < record.item_qty_to_issue ? true : false
            )}
          </Popover>
          {/* {record.item_id && (
            <FileSearchOutlined
              className='button-icon'
              title='View Detail'
              onClick={() => viewOnHandDetail(record)}
            />
          )} */}
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Qty to create Issue.">
        Issue Qty.
      </div>
    ),
    dataIndex: "item_qty_to_issue",
    key: "item_qty_to_issue",
    align: "right",
    require: true,
    width: "10%",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <>
          <input
            type="number"
            className="d-none"
            {...register(`${fieldName}.${index}.item_qty_to_issue`, {
              required: false,
            })}
          />
          <Text className="text-value text-right">
            {convertDigit(value, 6) ?? "-"}
          </Text>
        </>
      );
    },
  },

  {
    title: (
      <div className="text-center" title="Stock unit of measure">
        Stock
        <br /> UOM.
      </div>
    ),
    dataIndex: "uom_no",
    key: "uom_no",
    align: "center",
    require: true,
    width: "6%",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <>
          <input
            className="d-none"
            {...register(`${fieldName}.${index}.uom_id`, { required: false })}
          />
          <Text className="text-value">{value ?? "-"}</Text>
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Purchase request qauntity.">
        PR Qty.
      </div>
    ),
    dataIndex: "item_qty_to_pr",
    key: "item_qty_to_pr",
    require: true,
    align: "right",
    width: "12%",
    render: (value, record, index) => {
      // if (readOnly || record?.type_id === 3) {
      return (
        <Text className="text-value text-right">
          {convertDigit(value, 6) ?? "-"}
        </Text>
      );
      // } else {
      //   return (
      // <InputNumber
      //   disabled={record.item_id !== null ? 0 : 1}
      //   {...getNumberFormat(6)}
      //   placeholder={"Qty. to PR"}
      //   min={0}
      //   step={record.item_vendor_moq}
      //   className="full-width"
      //   name="mrp_detail_qty_pr"
      //   value={value}
      //   onChange={(data) => {
      //     if (
      //       record.mrp_detail_qty_available >=
      //         record.mrp_detail_qty_issue &&
      //       record.item_vendor_lead_time_day &&
      //       data > 0
      //     ) {
      //       onChange(record.id, {
      //         mrp_detail_qty_pr: data,
      //         mrp_detail_pr_lead_time_day: record.item_vendor_lead_time_day,
      //       });
      //     } else if (
      //       record.mrp_detail_qty_available >=
      //         record.mrp_detail_qty_issue &&
      //       record.item_vendor_lead_time_day &&
      //       data === 0
      //     ) {
      //       onChange(record.id, {
      //         mrp_detail_qty_pr: data,
      //         mrp_detail_pr_lead_time_day: 0,
      //       });
      //     } else {
      //       onChange(record.id, {
      //         mrp_detail_qty_pr: data,
      //       });
      //     }
      //   }}
      //   size="small"
      // />
      //   );
      // }
    },
  },
  {
    title: (
      <div className="text-center" title="Minimum order quantity">
        MOQ.
      </div>
    ),
    dataIndex: "item_vendor_moq",
    key: "item_vendor_moq",
    align: "right",
    require: true,
    width: "8%",
    render: (value, record, index) => {
      return <Text className="text-value ">{convertDigit(value, 6)}</Text>;
    },
  },
  {
    title: (
      <div className="text-center" title="Purchase unit of measure">
        PUR. UOM.
      </div>
    ),
    dataIndex: "pr_uom_no",
    key: "pr_uom_no",
    align: "center",
    require: true,
    width: "6%",
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  // {
  //   title: (
  //     <div className="text-center" title="Lead time">
  //       L/T (days)
  //     </div>
  //   ),
  //   dataIndex: "mrp_detail_pr_lead_time_day",
  //   align: "center",
  //   width: "5%",
  //   render: (value, record, index) => {
  //     return value;
  //   },
  // },
  // {
  //   title: (
  //     <div className="text-center" title="Suggestion Date">
  //       Sugg. Date
  //     </div>
  //   ),
  //   dataIndex: "mrp_detail_suggestion_date",
  //   align: "center",
  //   width: "9%",
  //   render: (value, record, index) => {
  //     return <Text className="text-value">{value}</Text>;
  //   },
  // },
  // {
  //   title: (
  //     <div className="text-center" title="Incomming Date">
  //       Inc. Date
  //     </div>
  //   ),
  //   dataIndex: "mrp_detail_incoming_date",
  //   align: "center",
  //   width: "9%",
  //   render: (value, record, index) => {
  //     return <Text className="text-value">{value}</Text>;
  //   },
  // },
];
