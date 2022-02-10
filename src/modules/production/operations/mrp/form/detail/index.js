import { InputNumber, Popover, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { InputNumberField } from "../../../../../../components/AntDesignComponent";
import { warningTextValue } from "../../../../../../include/js/function_main";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../../../include/js/main_config";
import ComponentsForm from "./ComponentsForm";
import NotesForm from "./NotesForm";

const MRPDetail = () => {
  const { control } = useFormContext();
  const [type_id, item_ref_id] = useWatch({
    control,
    name: ["type_id", "item_ref_id"],
    defaultValue: [null, null],
  });
  return (
    <div className="mt-2">
      <Tabs>
        {[null, 5].includes(type_id) && (
          <Tabs.TabPane tab="Set Components" key="1" forceRender={true}>
            <h1>Set Components</h1>
            <ComponentsForm
              {...{ fieldName: "item_set_spec", columns: mrpDetailColumns }}
            />
          </Tabs.TabPane>
        )}
        {(([null, 4].includes(type_id) && item_ref_id) ||
          [null, 3].includes(type_id)) && (
          <Tabs.TabPane tab="Bulk Spec." key="2" forceRender={true}>
            <h1>Bulk Spec.</h1>
            <ComponentsForm
              {...{ fieldName: "item_bulk_spec", columns: mrpDetailColumns }}
            />
          </Tabs.TabPane>
        )}
        {[null, 4].includes(type_id) && (
          <Tabs.TabPane tab="FG Spec." key="3" forceRender={true}>
            <h1>FG Spec.</h1>
            <ComponentsForm
              {...{ fieldName: "item_fg_spec", columns: mrpDetailColumns }}
            />
          </Tabs.TabPane>
        )}
        <Tabs.TabPane tab="Routing" key="4" forceRender={true}>
          <h1>Routing</h1>
          <ComponentsForm
            {...{ fieldName: "item_routing_spec", columns: routingColumns }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Notes" key="5" forceRender={true}>
          <h1>Notes</h1>
          <NotesForm />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default React.memo(MRPDetail);

const mrpDetailColumns = ({
  readOnly = true,
  fieldName,
  register,
  control,
}) => [
  {
    title: (
      <div className="text-center" title="Item code">
        {!readOnly && <span className="require">* </span>} Item Code
      </div>
    ),
    dataIndex: "item_mat_id",
    key: "item_mat_id",
    align: "center",
    width: "13%",
    ellipsis: true,
    render: (item_mat_id, { item_mat_no }, index) => {
      return (
        <>
          <input
            className="d-none"
            {...register(`${fieldName}.${index}.item_vendor_pack_size`)}
          />
          <Controller
            {...{
              name: `${fieldName}.${index}.item_mat_id`,
              control,
              defaultValue: item_mat_id,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    placeholder: "Item id.",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
          <Text className="text-value text-left">{item_mat_no ?? "-"}</Text>
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
    dataIndex: "item_mat_name",
    key: "item_mat_name",
    align: "left",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <>
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
    render: (
      item_qty_available,

      {
        item_qty_to_issue,
        item_qty_on_gr,
        item_qty_on_hand,
        item_qty_on_issue,
        item_qty_on_po,
        item_qty_on_pr,
        item_qty_on_qc,
      },
      index
    ) => {
      return (
        <>
          <Controller
            {...{
              name: `${fieldName}.${index}.item_qty_available`,
              control,
              defaultValue: item_qty_available,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
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
              item_qty_available || 0,
              6,
              item_qty_available < item_qty_to_issue ? true : false
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
    render: (item_qty_to_issue, record, index) => {
      return (
        <>
          <Controller
            {...{
              name: `${fieldName}.${index}.item_qty_to_issue`,
              control,
              defaultValue: item_qty_to_issue,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
          <Text className="text-value text-right">
            {convertDigit(item_qty_to_issue, 6) ?? "-"}
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
    dataIndex: "uom_id",
    key: "uom_id",
    align: "center",
    require: true,
    width: "6%",
    ellipsis: true,
    render: (uom_id, { uom_no }, index) => {
      return (
        <>
          <Controller
            {...{
              name: `${fieldName}.${index}.uom_id`,
              control,
              defaultValue: uom_id,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
          <Text className="text-value">{uom_no ?? "-"}</Text>
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
    render: (item_qty_to_pr, { type_id }, index) => {
      if (readOnly || [3, 4].includes(type_id)) {
        return (
          <>
            <Controller
              {...{
                name: `${fieldName}.${index}.item_qty_to_pr`,
                control,
                defaultValue: item_qty_to_pr,
                render: ({ field }) => {
                  return InputNumberField({
                    fieldProps: {
                      className: "w-100 d-none",
                      size: "small",
                      ...field,
                    },
                  });
                },
              }}
            />
            <Text className="text-value text-right">
              {convertDigit(item_qty_to_pr, 6) ?? "-"}
            </Text>
          </>
        );
      } else {
        return (
          <>
            <Controller
              {...{
                name: `${fieldName}.${index}.item_qty_to_pr`,
                control,
                defaultValue: item_qty_to_pr,
                render: ({ field }) => {
                  return InputNumberField({
                    fieldProps: {
                      className: "w-100",
                      placeholder: "Qty. to PR",
                      min: 0,
                      size: "small",
                      ...getNumberFormat(6),
                      ...field,
                    },
                  });
                },
              }}
            />
          </>
        );
      }
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
    width: "6%",
    render: (item_vendor_moq, record, index) => {
      return (
        <>
          <Controller
            {...{
              name: `${fieldName}.${index}.item_vendor_moq`,
              control,
              defaultValue: item_vendor_moq,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
          <Text className="text-value ">
            {convertDigit(item_vendor_moq, 6)}
          </Text>
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Purchase unit of measure">
        PUR. UOM.
      </div>
    ),
    dataIndex: "pr_uom_id",
    key: "pr_uom_id",
    align: "center",
    require: true,
    width: "5%",
    render: (pr_uom_id, { pr_uom_no }, index) => {
      return (
        <>
          <Controller
            {...{
              name: `${fieldName}.${index}.pr_uom_id`,
              control,
              defaultValue: pr_uom_id,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
          <Text className="text-value ">{pr_uom_no ?? "-"}</Text>
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Lead time">
        L/T (days)
      </div>
    ),
    dataIndex: "item_vendor_lead_time_day",
    align: "center",
    width: "5%",
    render: (item_vendor_lead_time_day, record, index) => {
      return (
        <>
          <Controller
            {...{
              name: `${fieldName}.${index}.item_vendor_lead_time_day`,
              control,
              defaultValue: item_vendor_lead_time_day,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
          <Text className="text-value">{item_vendor_lead_time_day || "-"}</Text>
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Suggestion Date">
        Sugg. Date
      </div>
    ),
    dataIndex: "mrp_item_sugg_incoming_date",
    align: "center",
    width: "9%",
    render: (mrp_item_sugg_incoming_date, record, index) => {
      return (
        <>
          <Controller
            {...{
              name: `${fieldName}.${index}.mrp_item_sugg_incoming_date`,
              control,
              defaultValue: mrp_item_sugg_incoming_date,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
          <Text className="text-value">
            {mrp_item_sugg_incoming_date || "-"}
          </Text>
        </>
      );
    },
  },
  {
    title: (
      <div className="text-center" title="Incoming Date">
        Inc. Date
      </div>
    ),
    dataIndex: "mrp_item_actual_incoming_date",
    align: "center",
    width: "9%",
    render: (mrp_item_actual_incoming_date, record, index) => {
      return (
        <>
          <Controller
            {...{
              name: `${fieldName}.${index}.mrp_item_actual_incoming_date`,
              control,
              defaultValue: mrp_item_actual_incoming_date,
              render: ({ field }) => {
                return InputNumberField({
                  fieldProps: {
                    className: "w-100 d-none",
                    size: "small",
                    ...field,
                  },
                });
              },
            }}
          />
          <Text className="text-value">
            {mrp_item_actual_incoming_date || "-"}
          </Text>
        </>
      );
    },
  },
];

const routingColumns = ({ control, register, readOnly = false }) => [
  {
    title: (
      <div className="text-center">
        <b>No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "5%",
    dataIndex: "ids",
  },
  {
    title: (
      <div className="text-center">
        <b>Cost Center</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    // width: "10%",
    dataIndex: "machine_id",
    render: (val, { machine_cost_center_description }) =>
      machine_cost_center_description,
  },

  {
    title: (
      <div className="text-center">
        <b>Man</b>
      </div>
    ),
    align: "right",
    className: "tb-col-sm",
    width: "12%",
    dataIndex: "mrp_routing_worker",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Period</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "12%",
    dataIndex: "mrp_routing_plan_time",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Plan Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "12%",
    dataIndex: "mrp_routing_plan_date",
    render: (val) => val || "-",
  },
];
