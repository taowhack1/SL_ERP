import React, { useContext, useEffect, useState } from "react";
import { getNPRFeedback } from "../../../../../actions/sales/nprActions";
import CustomTable from "../../../../../components/CustomTable";
import { sortData } from "../../../../../include/js/function_main";
import { NPRFormContext } from "../RDForm";
const columns = [
  {
    title: "No.",
    dataIndex: "id",
    width: "5%",
    align: "center",
    ellipsis: false,
    render: (val) => val + 1,
  },
  {
    title: "Spec",
    dataIndex: "npr_satisfaction_spec_name_th",
    width: "30%",
    align: "left",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: "Score",
    dataIndex: "npr_satisfaction_detail_score",
    width: "10%",
    align: "right",
    ellipsis: true,
    render: (val) => val || "-",
  },
  {
    title: "Remark",
    dataIndex: "npr_satisfaction_detail_remark",
    align: "left",
    ellipsis: true,
    render: (val) => val || "-",
  },
];
const RDFormulaFeedback = () => {
  const { id } = useContext(NPRFormContext);
  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    // DO. FETCH FEEDBACK
    const getNPRFeedbackList = async (id) => {
      const resp = await getNPRFeedback(id);
      if (resp.success) {
        setFeedback(sortData(resp.data.npr_satisfaction_detail || []));
      }
    };
    getNPRFeedbackList(id);
  }, []);
  return (
    <>
      <div className="form-section">
        <h2>Feedback</h2>
        <CustomTable
          columns={columns}
          dataSource={feedback}
          className="row-table-detail"
          rowKey="id"
          size="small"
          bordered
          pagination={{ pageSize: 30 }}
        />
      </div>
    </>
  );
};

export default RDFormulaFeedback;
