import React, { useCallback, useContext, useState } from "react";
import { Button, Table, Tabs, Divider, Row, Col } from "antd";
import { NPRFormContext } from "../../NPRRDForm";
import CustomTable from "../../../../../../../components/CustomTable";
import {
  PlusCircleTwoTone,
  PlusOutlined,
  PlusSquareTwoTone,
  PrinterTwoTone,
  QrcodeOutlined,
} from "@ant-design/icons";
import CustomLabel from "../../../../../../../components/CustomLabel";
import Text from "antd/lib/typography/Text";
import GeneralDetail from "./tabs/GeneralDetail";
import Formula from "./tabs/Formula";

const initialStateTabs = {
  activeKey: 0,
  panes: [],
};
let readOnly = false;
let newTabIndex = 0;
const ColorAndOdorTable = () => {
  const { data, loading } = useContext(NPRFormContext);
  const [tabs, setTabs] = useState(initialStateTabs);

  const onChange = (activeKey) => {
    setTabs((prev) => ({ ...prev, activeKey }));
  };

  const onEdit = (targetKey, action) => {
    console.log("onEdit", targetKey, action);
    if (action === "add") {
      add();
    }
    if (action === "remove") {
      remove(targetKey);
    }
  };

  const add = useCallback(() => {
    const { panes } = tabs;
    const newPanes = [...panes];
    newTabIndex++;

    newPanes.push({
      title: `สูตร #${newTabIndex}`,
      content: <h1>{`Formula #${newTabIndex}`}</h1>,
      key: `${newTabIndex}`,
    });

    setTabs((prev) => ({
      ...prev,
      activeKey: `${newTabIndex}`,
      panes: newPanes,
    }));
  }, [tabs, setTabs]);

  const remove = useCallback(
    (targetKey) => {
      const { activeKey, panes } = tabs;
      let newActiveKey = activeKey;
      let lastIndex;
      panes.forEach((pane, index) => {
        if (pane?.key === targetKey) {
          lastIndex = index - 1;
        }
      });
      const newPanes = panes?.filter((pane) => {
        return pane?.key !== targetKey;
      });
      if (newPanes?.length && newActiveKey === targetKey) {
        newActiveKey =
          lastIndex >= 0 ? newPanes[lastIndex]?.key : newPanes[0]?.key;
      }
      console.log("newActiveKey", newActiveKey);
      setTabs((prev) => ({
        ...prev,
        activeKey: `${newActiveKey}`,
        panes: newPanes,
      }));
    },
    [tabs, setTabs]
  );

  const onExpand = (bool = false, row) => {
    if (bool) {
      setTabs((prev) => ({
        ...prev,
        panes: row?.formula,
      }));
    } else {
      setTabs(initialStateTabs);
    }
  };

  const expandedRowRender = useCallback(
    ({ onChange, onEdit }) => {
      const { panes, activeKey } = tabs;
      return (
        <div
          className="pd-left-1 detail-container"
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          <div className="under-line mb-2">
            <h3>Formula List</h3>
          </div>
          <div className="card-container">
            <Tabs
              {...{
                type: readOnly ? "card" : "editable-card",
                activeKey: `${activeKey}`,
                onChange,
                onEdit,
                addIcon: (
                  <>
                    <PlusOutlined className="button-icon" />{" "}
                    <b className="button-icon">Add Formula</b>
                  </>
                ),
                tabBarExtraContent: (
                  <div>
                    <Button
                      size="small"
                      loading={false}
                      icon={<PrinterTwoTone />}
                      // disabled={npr_formula_id ? false : true}
                      // onClick={() => onPrintFormula(batchSize)}
                    >
                      Print Formula
                    </Button>
                    <Button
                      size="small"
                      loading={false}
                      icon={<QrcodeOutlined className="button-icon" />}
                      // disabled={
                      //   npr_formula_id && tg_trans_status_id === 4 ? false : true
                      // }
                      // onClick={onPrintLabel}
                    >
                      Print QR Code
                    </Button>
                  </div>
                ),
              }}
            >
              {panes?.map(({ title, content, key }) => (
                <Tabs.TabPane tab={`${title}`} key={`${key}`}>
                  <div className="pd-2">
                    <Tabs>
                      <Tabs.TabPane key={`1`} tab={`Detail`}>
                        <GeneralDetail />
                      </Tabs.TabPane>
                      <Tabs.TabPane key={`2`} tab={`Formula`}>
                        <Formula />
                      </Tabs.TabPane>
                      <Tabs.TabPane key={`3`} tab={`QA`}>
                        <h1>QA</h1>
                      </Tabs.TabPane>
                      <Tabs.TabPane key={`4`} tab={`Remark`}>
                        <h1>Remark</h1>
                      </Tabs.TabPane>
                    </Tabs>
                  </div>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      );
    },
    [tabs, setTabs]
  );

  console.log("tabs", tabs);
  return (
    <>
      <Table
        bordered
        rowKey="id"
        rowClassName="row-table-detail"
        loading={loading}
        columns={columns()}
        dataSource={mockData}
        expandable={{
          onExpand: onExpand,
          expandRowByClick: true,
          expandedRowRender: () =>
            expandedRowRender({ add, remove, onChange, onEdit }),
        }}
        pagination={false}
        footer={null}
      />
    </>
  );
};

export default React.memo(ColorAndOdorTable);

const columns = () => [
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
    // render: (val) => val + 1,
  },
  {
    title: (
      <div className="text-center">
        <b>Color</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_color_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Odor</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_odor_description",
    render: (val) => val || "-",
  },
];

const revisionColumns = () => [
  {
    title: (
      <div className="text-center">
        <Button icon={<PlusOutlined />} className="primary" size="small">
          Formula
        </Button>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "npr_formula_created",
    render: (val) => null,
  },
  {
    title: (
      <div className="text-center">
        <b>Revision No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "npr_formula_revision_no",
  },
  {
    title: (
      <div className="text-center">
        <b>Formula No.</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "15%",
    dataIndex: "npr_formula_no",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Description</b>
      </div>
    ),
    align: "left",
    className: "tb-col-sm",
    //   width: "10%",
    dataIndex: "npr_formula_description",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <b>Create Date</b>
      </div>
    ),
    align: "center",
    className: "tb-col-sm",
    width: "10%",
    dataIndex: "npr_formula_created",
    render: (val) => val || "-",
  },
];

const mockData = [
  {
    id: 1,
    npr_color_description: "Red",
    npr_odor_description: "Strawberry",
    formula: [
      // {
      //   id: 1,
      //   npr_formula_revision_no: 0,
      //   npr_formula_no: "NPR018-2021-002-0",
      //   npr_formula_description: "สูตร 1 สีแดง กลิ่นสตรอเบอร์รี่",
      //   npr_formula_created: "20/10/2021",
      // },
    ],
  },
  {
    id: 2,
    npr_color_description: "Yellow",
    npr_odor_description: "Banana Ba Ba na na",
    formula: [
      // {
      //   id: 1,
      //   npr_formula_revision_no: 0,
      //   npr_formula_no: "NPR018-2021-002-0",
      //   npr_formula_description: "สูตร 1 สีแดง กลิ่นสตรอเบอร์รี่",
      //   npr_formula_created: "20/10/2021",
      // },
    ],
  },
];
