import { CheckOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomTable from "../../../../../components/CustomTable";
import { convertDigit } from "../../../../../include/js/main_config";
import { TimesheetContext } from "../TimeSheet";

const RpmPart = (props) => {
  const {
    rpmChecking: { bulkSpec = [] },
    getLoadingFormula,
  } = useContext(TimesheetContext);

  const compareQty = ({
    weight_machine_net,
    weight_machine_net_scan,
    isFullfill,
  }) => {
    if (!bulkSpec.length) {
      return <span className="require">-- ไม่พบข้อมูล --</span>;
    } else {
      const weight1 = convertDigit(weight_machine_net, 6);
      const weight2 = convertDigit(weight_machine_net_scan, 6);

      if (isFullfill) return <CheckOutlined style={{ color: "green" }} />;
      if (weight1 > weight2)
        return <span className="require">น้ำหนักยังไม่พอ</span>;
      if (weight1 < weight2)
        return <span className="require">น้ำหนักเกิน!</span>;
    }
  };
  return (
    <>
      <CustomTable
        loading={getLoadingFormula}
        columns={RPMCheckColumns({ bulkSpec, compareQty })}
        dataSource={bulkSpec}
        rowKey="weight_machine_id"
        pageSize={1000}
      />
    </>
  );
};

export default React.memo(RpmPart);

const RPMCheckColumns = ({ bulkSpec, compareQty }) => [
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
        <CustomLabel label="Barcode" />
      </div>
    ),
    width: "15%",
    align: "center",
    dataIndex: "weight_machine_no",
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
    render: (val, record, index) =>
      bulkSpec.length
        ? convertDigit(bulkSpec[index]?.weight_machine_net_scan || 0, 6)
        : convertDigit(0, 6),
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
    render: (_, record, index) =>
      compareQty(record, bulkSpec.length ? [bulkSpec[index]] : []),
  },
];
