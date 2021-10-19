import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  message,
  Popconfirm,
  Space,
  Table,
  Tabs,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  apiListPRForPO,
  cancelPR,
  rejectPR,
} from "../../../../actions/purchase/PO_Actions";
import { AppContext } from "../../../../include/js/context";
import { useFetch } from "../../../../include/js/customHooks";
import { sortData } from "../../../../include/js/function_main";

const PRList = () => {
  const {
    auth: { employee_no_name_eng },
  } = useContext(AppContext);

  const { data, loading, error, fetchData } = useFetch(apiListPRForPO);

  error && message.error(`Error ! ${error}`);

  const [pr, setPR] = useState([]);
  const [prAuto, setPRAuto] = useState([]);
  const [rejectLoading, setRejectLoading] = useState(false);

  const selectData = ({ pr_id, checked }, pr_type = 1) => {
    pr_type === 1
      ? setPR((prev) =>
          prev.map((obj) => (obj.pr_id === pr_id ? { ...obj, checked } : obj))
        )
      : setPRAuto((prev) =>
          prev.map((obj) => (obj.pr_id === pr_id ? { ...obj, checked } : obj))
        );
  };

  const clearSelected = (pr_type = 1) => {
    pr_type === 1
      ? setPR((prev) => prev.map((obj) => ({ ...obj, checked: false })))
      : setPRAuto((prev) => prev.map((obj) => ({ ...obj, checked: false })));
  };

  const onReject = async () => {
    setRejectLoading(true);

    const rejectData = pr
      .filter((obj) => obj.checked)
      .map(({ process_id, pr_created_by }) => ({
        process_id,
        user_name: pr_created_by,
        commit: 1,
        process_status_id: 7,
        process_member_remark: `จัดซื้อ Reject โดย  ${employee_no_name_eng}`,
      }));

    const resp = await rejectPR(rejectData);
    if (resp.success) {
      message.success("Rejected.");
      fetchData();
    } else {
      message.error("Reject Fail. Please Contact Programmer.", 4);
    }

    setRejectLoading(false);
  };

  const onCancelPR = async (pr_type = 1) => {
    setRejectLoading(true);

    const cancelData =
      pr_type === 1
        ? pr
            .filter((obj) => obj.checked)
            .map(({ pr_id, pr_created_by }) => ({
              pr_id,
              user_name: pr_created_by,
              tg_trans_status_id: 3,
              pr_remark: `จัดซื้อ Cancel โดย  ${employee_no_name_eng}`,
              commit: 1,
            }))
        : prAuto
            .filter((obj) => obj.checked)
            .map(({ pr_id, pr_created_by }) => ({
              pr_id,
              user_name: pr_created_by,
              tg_trans_status_id: 3,
              pr_remark: `จัดซื้อ Cancel โดย  ${employee_no_name_eng}`,
              commit: 1,
            }));

    const resp = await cancelPR(cancelData);
    if (resp.success) {
      message.success("Canceled.");
      fetchData();
    } else {
      message.error("Cancel Fail. Please Contact Programmer.", 4);
    }

    setRejectLoading(false);
  };

  useEffect(() => {
    setPR(
      sortData((data && data[0].filter((obj) => !obj.mrp_id)) || [], "id", 1)
    );
    setPRAuto(
      sortData((data && data[0].filter((obj) => obj.mrp_id)) || [], "id", 1)
    );
  }, [data]);

  const onPrintPR = (pr_no) => {
    window.open(
      `${process.env.REACT_APP_REPORT_SERVER}/report_pr.aspx?pr_no=${pr_no}`
    );
  };

  const countSelectPROthers = pr?.filter((obj) => obj.checked).length;
  const countSelectPRAuto = prAuto?.filter((obj) => obj.checked).length;
  return (
    <>
      <Tabs>
        <Tabs.TabPane
          tab={
            <Badge count={pr.length}>
              <Text strong className="pd-right-2">
                PR ทั่วไป
              </Text>
            </Badge>
          }
          key="1"
        >
          <Table
            bordered
            rowKey="id"
            size="small"
            rowClassName="row-table-detail"
            loading={loading}
            columns={columns({
              selectData,
              pr_type: 1,
              title: "ใบขอซื้อ (PR)",
              onPrintPR,
            })}
            dataSource={pr}
            footer={() => (
              <>
                <div className="mb-1">
                  <Text strong>
                    Selected : <span>{countSelectPROthers}</span> Item
                  </Text>
                </div>
                <Space level={24}>
                  <Button
                    size="small"
                    onClick={() => clearSelected(1)}
                    disabled={!countSelectPROthers}
                    loading={rejectLoading}
                  >
                    Clear Select
                  </Button>
                  <Popconfirm
                    onConfirm={() => onReject(1)}
                    title="Are you sure？"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button
                      size="small"
                      type="ghost"
                      danger
                      disabled={!countSelectPROthers}
                      loading={rejectLoading}
                    >
                      Reject PR
                    </Button>
                  </Popconfirm>
                  <Popconfirm
                    onConfirm={() => onCancelPR(1)}
                    title="Are you sure？"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button
                      size="small"
                      type="ghost"
                      danger
                      disabled={!countSelectPROthers}
                      loading={rejectLoading}
                    >
                      Cancel PR
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <Badge count={prAuto.length}>
              <Text strong className="pd-right-2">
                PR Auto
              </Text>
            </Badge>
          }
          key="2"
        >
          <Table
            bordered
            rowKey="id"
            size="small"
            rowClassName="row-table-detail"
            loading={loading}
            columns={columns({
              selectData,
              pr_type: 2,
              title: "ใบขอซื้อ (PR) Auto MRP",
              onPrintPR,
            })}
            dataSource={prAuto}
            footer={() => (
              <>
                <div className="mb-1">
                  <Text strong>
                    Selected : <span>{countSelectPRAuto}</span> Item
                  </Text>
                </div>
                <Space level={24}>
                  <Button
                    size="small"
                    onClick={() => clearSelected(2)}
                    disabled={!countSelectPRAuto}
                    loading={rejectLoading}
                  >
                    Clear Select
                  </Button>
                  <Popconfirm
                    onConfirm={() => onCancelPR(2)}
                    title="Are you sure？"
                    icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                  >
                    <Button
                      size="small"
                      type="ghost"
                      danger
                      disabled={!countSelectPRAuto}
                      loading={rejectLoading}
                    >
                      Cancel PR
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            )}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default React.memo(PRList);

const columns = ({
  selectData,
  pr_type,
  title = "ใบขอซื้อ (PR)",
  onPrintPR,
}) => [
  {
    title: (
      <div>
        <Text strong>{title}</Text>
      </div>
    ),
    className: "tb-col-sm bg-tb-secondary",
    children: [
      {
        title: (
          <div className="text-center">
            <b>No.</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        width: "5%",
        dataIndex: "id",
        render: (val) => val,
      },
      {
        title: (
          <div className="text-center">
            <b>Check</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        width: "7%",
        dataIndex: "pr_id",
        render: (val, row) => (
          <Checkbox
            checked={row?.checked}
            onChange={(e) =>
              selectData({ pr_id: val, checked: e.target.checked }, pr_type)
            }
          />
        ),
      },
      {
        title: (
          <div className="text-center">
            <b>PR No.</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        // width: "10%",
        dataIndex: "pr_no",
        render: (val) => (
          <Text onClick={() => onPrintPR(val)} className="button-icon" strong>
            {val || "-"}
          </Text>
        ),
      },
      {
        title: (
          <div className="text-center">
            <b>Due Date</b>
          </div>
        ),
        align: "center",
        className: "tb-col-sm",
        // width: "10%",
        dataIndex: "tg_po_due_date",
        render: (val) => val || "-",
      },
    ],
  },
];
