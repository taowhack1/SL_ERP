import React, { useState } from "react";
import { Button, Col, Row, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CustomLabel from "./CustomLabel";
import Text from "antd/lib/typography/Text";
const CustomTable = (props) => {
  const {
    loading,
    columns,
    rowKey,
    onClick,
    dataSource,
    readOnly,
    rowClassName,
    pageSize,
    focusLastPage,
    title,
    onAdd,
    disabledAddRow,
    footer,
  } = props;
  const [state, setState] = useState({
    pagination: {
      current: 1,
      pageSize: pageSize ?? 10,
    },
  });
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setState({
      ...state,
      pagination: { ...state.pagination, current: pagination.current },
    });
  };
  const focusOnLast = () => {
    const dataLength = dataSource.length + 1;
    const lastPage = Math.ceil(dataLength / (state.pagination.pageSize ?? 10));
    setState({
      ...state,
      pagination: { ...state.pagination, current: lastPage },
    });
  };
  return (
    <>
      <Table
        title={title}
        className={props.className ?? "table-detail"}
        rowClassName={rowClassName}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        bordered
        size="small"
        rowKey={rowKey}
        pagination={state.pagination}
        summary={props.summary ?? null}
        footer={
          onAdd
            ? () => (
                <>
                  {footer}
                  {!readOnly && (
                    <div className="mt-1">
                      <Button
                        disabled={disabledAddRow ?? false}
                        type="dashed"
                        onClick={() => {
                          onAdd();
                          focusLastPage && focusOnLast();
                        }}
                        block
                      >
                        <PlusOutlined /> Add a line
                      </Button>
                    </div>
                  )}
                </>
              )
            : footer ?? null
        }
        onRow={(record, rowIndex) => {
          return {
            onClick: () => onClick && onClick(record, rowIndex),
          };
        }}
      />
    </>
  );
};

export default React.memo(CustomTable);
