import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomTable from "../../../../components/CustomTable";
const columns = ({ readOnly }) => [
  {
    title: (
      <div className="text-center">
        <Text>No.</Text>
      </div>
    ),
    dataIndex: "id",
    align: "center",
    width: "5%",
    render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <Text>Description</Text>
      </div>
    ),
    dataIndex: "npr_procedure_description",
    align: "left",
    render: (val) => (readOnly ? val : <TextArea />),
  },
];
const RDProcedure = () => {
  return (
    <>
      <CustomTable
        columns={columns({ readOnly: false })}
        rowKey={"id"}
        rowClassName={"row-table-detail"}
        dataSource={[]}
      />
    </>
  );
};

export default React.memo(RDProcedure);
