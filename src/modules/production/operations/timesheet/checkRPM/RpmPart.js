import { CheckOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomTable from "../../../../../components/CustomTable";
import { useFetch } from "../../../../../include/js/customHooks";
import { convertDigit } from "../../../../../include/js/main_config";
import { TimesheetContext } from "../TimeSheet";
const apiGetPartScanner = `/production/time_sheet/machine_process_scan`;

const RpmPart = () => {
  const { plan_job_id } = useContext(TimesheetContext);
  const {
    data: formulaPart,
    error,
    loading: getPartLoading,
  } = useFetch(
    `${apiGetPartScanner}/${plan_job_id}`,
    plan_job_id ? false : true
  );
  return (
    <>
      <CustomTable
        loading={getPartLoading}
        columns={RPMCheckColumns()}
        dataSource={formulaPart}
        rowKey="weight_machine_id"
        pageSize={1000}
      />
    </>
  );
};

export default React.memo(RpmPart);

const RPMCheckColumns = () => [
  {
    title: "No.",
    width: "7%",
    align: "center",
    render: (value, record, index) => index + 1,
  },
  {
    title: "Part No.",
    align: "center",
    dataIndex: "item_part_no",
  },
  {
    title: "RM Code",
    align: "center",
    dataIndex: "item_no",
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Batch No." />
      </div>
    ),
    width: "15%",
    align: "center",
    dataIndex: "stock_batch",
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Require. Weight." />
      </div>
    ),
    width: "15%",
    align: "right",
    dataIndex: "weight_machine_net",
    render: (val) => convertDigit(val, 6),
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label="Net Weight" />
      </div>
    ),
    width: "15%",
    align: "right",
    dataIndex: "weight_machine_net_scan",
    render: (val) => convertDigit(val || 0, 6),
  },
  {
    title: "UOM",
    width: "7%",
    align: "center",
    dataIndex: "uom_no",
  },
  {
    title: "Status",
    width: "15%",
    align: "center",
    render: (_, record) =>
      record.weight_machine_net_scan === record.weight_machine_net ? (
        <CheckOutlined style={{ color: "#2CDB00" }} />
      ) : record.weight_machine_net_scan < record.weight_machine_net ? (
        <Text className="require">จำนวนยังไม่ครบ !</Text>
      ) : (
        <Text className="require">จำนวนเกิน !</Text>
      ),
  },
];
