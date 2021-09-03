import { RedoOutlined } from "@ant-design/icons";
import { Button, message, Popover, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import { getMRPTest } from "../../../../actions/production/mrpActions";
import CustomTable from "../../../../components/CustomTable";
import { warningTextValue } from "../../../../include/js/function_main";
import { convertDigit } from "../../../../include/js/main_config";

const MRPTestDetail = (props) => {
  const { item_id, qty_batch, due_date, onCalculate, stateDetail } = props;
  const checkDisabledBtn = () => {
    let disabled = true;
    disabled = item_id ? false : true;
    disabled = qty_batch ? false : true;
    disabled = due_date ? false : true;
    return disabled;
  };
  const disabledCalBtn = checkDisabledBtn();

  // const [state, setState] = useState({
  //   data: {},
  //   loading: false,
  // });
  // const onCalculate = async () => {
  //   setState((prev) => ({ ...prev, loading: true }));
  //   const resp = await getMRPTest(item_id, qty_batch, due_date);
  //   if (resp.success) {
  //     setState((prev) => ({ ...prev, loading: false, data: resp.data[0] }));
  //   } else {
  //     message.error(resp.message);
  //     setState((prev) => ({ ...prev, loading: false }));
  //   }
  // };
  const {
    data: { item_formula, item_packaging },
    loading,
  } = stateDetail;
  return (
    <>
      <Tabs
        tabBarExtraContent={
          <>
            <Button
              icon={<RedoOutlined />}
              className={disabledCalBtn ? "" : "primary"}
              disabled={disabledCalBtn}
              loading={loading}
              onClick={onCalculate}
            >
              Calculate
            </Button>
          </>
        }
      >
        <Tabs.TabPane tab="Bulk" key="1">
          <CustomTable
            bordered
            rowKey="id"
            rowClassName="row-table-detail"
            loading={loading}
            columns={columns({})}
            dataSource={item_formula}
            pageSize={999}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="FG Spec." key="2">
          <CustomTable
            bordered
            rowKey="id"
            rowClassName="row-table-detail"
            loading={loading}
            columns={columns({})}
            dataSource={item_packaging}
            pageSize={999}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default MRPTestDetail;

export const columns = ({ readOnly = false, onChange }) => [
  {
    title: "No.",
    dataIndex: "id",
    width: "4%",
    align: "center",
    render: (value, record, index) => {
      return value;
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
    width: "11%",
    ellipsis: true,
    render: (value, record, index) => {
      return <Text className="text-value text-left">{value ?? "-"}</Text>;
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
      return <Text className="text-value text-left">{value ?? "-"}</Text>;
    },
  },
  {
    title: (
      <div className="text-center" title="Stock available quantity">
        Available Qty.
      </div>
    ),
    dataIndex: "mrp_detail_qty_available",
    key: "mrp_detail_qty_available",
    align: "right",
    require: true,
    width: "8%",
    ellipsis: true,
    render: (value, record, index) => {
      const {
        wait_issue,
        tg_item_qty,
        wait_po,
        wait_pr,
        wait_qc,
        wait_receive,
      } = record;
      return (
        <>
          <Popover
            content={
              <>
                <div className="mb-1 border-bottom">
                  <Text strong>วิธีคิด : (On hand + QC) - Reserve</Text>
                </div>

                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    On hand :
                  </Text>
                  <Text>{convertDigit(tg_item_qty, 4)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    PR :
                  </Text>
                  <Text>{convertDigit(wait_pr, 4)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    PO :
                  </Text>
                  <Text>{convertDigit(wait_po, 4)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    GR :
                  </Text>
                  <Text>{convertDigit(wait_receive, 4)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    QC :
                  </Text>
                  <Text>{convertDigit(wait_qc, 4)}</Text>
                </div>
                <div className="d-flex flex-space">
                  <Text strong className="mr-1">
                    Reserve :
                  </Text>
                  <Text>{convertDigit(wait_issue, 4)}</Text>
                </div>
              </>
            }
            title="Available Quantity"
          >
            {warningTextValue(
              value,
              4,
              value < record.mrp_detail_qty_issue ? true : false
            )}
          </Popover>
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
    dataIndex: "mrp_detail_qty_issue",
    key: "mrp_detail_qty_issue",
    align: "right",
    require: true,
    width: "8%",
    ellipsis: true,
    render: (value, record, index) => {
      return (
        <Text className="text-value text-right">
          {convertDigit(value, 4) ?? "-"}
        </Text>
      );
    },
  },

  {
    title: (
      <div className="text-center" title="Stock unit of measure">
        Stock UOM.
      </div>
    ),
    dataIndex: "uom_no",
    key: "uom_no",
    align: "center",
    require: true,
    width: "8%",
    ellipsis: true,
    render: (value, record, index) => {
      return <Text className="text-value ">{value ?? "-"}</Text>;
    },
  },
  // {
  //   title: (
  //     <div className="text-center" title="Purchase request qauntity.">
  //       PR Qty.
  //     </div>
  //   ),
  //   dataIndex: "mrp_detail_qty_pr",
  //   key: "mrp_detail_qty_pr",
  //   require: true,
  //   align: "right",
  //   width: "10%",
  //   render: (value, record, index) => convertDigit(value, 4) ?? "-",
  // },
  // {
  //   title: (
  //     <div className="text-center" title="Minimum order quantity">
  //       MOQ.
  //     </div>
  //   ),
  //   dataIndex: "item_vendor_moq",
  //   key: "item_vendor_moq",
  //   align: "right",
  //   require: true,
  //   width: "8%",
  //   render: (value, record, index) => {
  //     return <Text className="text-value ">{convertDigit(value, 4)}</Text>;
  //   },
  // },
  // {
  //   title: (
  //     <div className="text-center" title="Purchase unit of measure">
  //       PUR. UOM.
  //     </div>
  //   ),
  //   dataIndex: "item_vendor_uom_no",
  //   key: "item_vendor_uom_no",
  //   align: "center",
  //   require: true,
  //   width: "8%",
  //   render: (value, record, index) => {
  //     return <Text className="text-value ">{value ?? "-"}</Text>;
  //   },
  // },
  // {
  //   title: (
  //     <div className="text-center" title="Lead time">
  //       L/T (days)
  //     </div>
  //   ),
  //   dataIndex: "mrp_detail_pr_lead_time_day",
  //   align: "center",
  //   width: "7%",
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
