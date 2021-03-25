import { SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import React from "react";

const ProductionJobList = ({ dataSource }) => {
  return (
    <>
      <Table
        size={"small"}
        scroll={{ y: 500 }}
        pagination={{ pageSize: 20 }}
        bordered
        columns={[
          {
            title: (
              <div className="text-left">
                <Input
                  prefix={<SearchOutlined className="button-icon" />}
                  // size={"small"}
                  placeholder={"Job List"}
                  bordered={false}
                  className={"pd-left-1"}
                />
              </div>
            ),
            dataIndex: "so_no",
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
                  <Text className="text-value">{record.so_no}</Text>
                </div>
              );
            },
          },
        ]}
        dataSource={dataSource}
        rowKey={"id"}
      />
    </>
  );
};

export default ProductionJobList;
