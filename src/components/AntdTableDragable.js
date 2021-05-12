import { Button, Table } from "antd";
import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragableBodyRow from "./DragableBodyRow";
import update from "immutability-helper";
import { PlusOutlined } from "@ant-design/icons";
const AntdTableDragable = (props) => {
  const {
    columns,
    dataSource,
    onClick,
    rowClassName,
    rowKey = "key",
    pagination,
    setState,
    onAdd,
    scroll,
    title,
    className,
    footer,
    readOnly,
    editable,
  } = props;
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = dataSource[dragIndex];
      setState(
        update(dataSource, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [dataSource]
  );
  const components = {
    body: {
      row: DragableBodyRow,
    },
  };
  return (
    <>
      {editable ? (
        <DndProvider backend={HTML5Backend}>
          <Table
            size="small"
            bordered
            title={title}
            className={className ?? "table-detail"}
            rowClassName={rowClassName}
            rowKey={rowKey}
            components={components}
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            scroll={scroll ?? null}
            onRow={(record, index) => ({
              index,
              moveRow,
              onClick,
            })}
            footer={() => (
              <>
                {footer}
                {!readOnly && (
                  <div className="mt-1">
                    <Button type="dashed" onClick={onAdd} block>
                      <PlusOutlined /> Add a line
                    </Button>
                  </div>
                )}
              </>
            )}
          />
        </DndProvider>
      ) : (
        <Table
          size="small"
          bordered
          title={title}
          className={className ?? "table-detail"}
          rowClassName={rowClassName}
          rowKey={rowKey}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          scroll={scroll ?? null}
          onRow={(record, index) => ({
            onClick,
          })}
        />
      )}
    </>
  );
};

export default React.memo(AntdTableDragable);
