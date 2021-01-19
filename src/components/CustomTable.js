import React, { useState } from "react";
import { Button, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
        className="table-detail"
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
            : null
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
