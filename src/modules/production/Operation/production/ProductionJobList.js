import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React, { useContext } from "react";
import { ProductionContext } from "../../../../include/js/context";
import $ from "jquery";
const ProductionJobList = ({ dataSource }) => {
  const { form, tsFunction } = useContext(ProductionContext);
  const { plan_job_detail } = form.machine;
  return (
    <>
      <Table
        size={"small"}
        // scroll={{ y: 500 }}
        // style={{ height: "100vh" }}
        rowClassName={"clickable"}
        pagination={{ pageSize: 15 }}
        bordered
        columns={[
          {
            title: (
              <div className="text-left">
                <Input
                  prefix={<SearchOutlined className="button-icon" />}
                  // size={"small"}
                  placeholder={"Job List"}
                  // bordered={false}
                  className={"pd-left-1"}
                />
              </div>
            ),
            dataIndex: "plan_job_no",
            align: "left",
            render: (value, record) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "5px",
                    marginLeft: 20,
                  }}
                >
                  <div
                    style={{
                      marginRight: 20,
                      backgroundColor: record.status ? "#2CDB00" : "red",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                    }}
                  ></div>
                  <Text className="text-value">
                    {record.plan_job_no + " - " + record.plan_job_date}
                  </Text>
                </div>
              );
            },
          },
        ]}
        dataSource={plan_job_detail}
        rowKey={"plan_job_id"}
        onRow={(record, index) => ({
          onClick: (e) => {
            tsFunction("SELECT_PLAN", record);
            $(e.target).closest("tbody").find("tr").removeClass("selected-row");
            $(e.target).closest("tr").addClass("selected-row");
          },
        })}
      />
    </>
  );
};

export default ProductionJobList;
