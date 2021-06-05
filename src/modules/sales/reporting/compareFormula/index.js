import { Button, Col, DatePicker, Modal, Row, Table } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNPRList } from "../../../../actions/sales/nprActions";
import DetailLoading from "../../../../components/DetailLoading";
import MainLayout from "../../../../components/MainLayout";
import CustomSelect from "../../../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import {
  PrinterOutlined,
  PrinterTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { convertDigit } from "../../../../include/js/main_config";
import CustomLabel from "../../../../components/CustomLabel";
import moment from "moment";
import ModalSelectFormula from "./ModalSelectFormula";
const mockupData = [
  {
    npr_formula_detail_part1: "A",
    npr_formula_detail_part_no1: "01",
    item_no_name1: "TEST ITEM 1",
    npr_formula_detail_percent_qty1: 10.5321,
    npr_formula_detail_item_cost1: 120,
    item_no_name2: "TEST ITEM 1",
    npr_formula_detail_percent_qty2: 10.5321,
    npr_formula_detail_item_cost2: 120,
  },
  {
    npr_formula_detail_part1: "A",
    npr_formula_detail_part_no1: "02",
    item_no_name1: "TEST ITEM 2",
    npr_formula_detail_percent_qty1: 15,
    npr_formula_detail_item_cost1: 5.721,
    item_no_name2: "TEST ITEM 2",
    npr_formula_detail_percent_qty2: 25,
    npr_formula_detail_item_cost2: 5.721,
  },
  {
    npr_formula_detail_part1: "A",
    npr_formula_detail_part_no1: "03",
    item_no_name1: "TEST ITEM 3",
    npr_formula_detail_percent_qty1: 0.1234,
    npr_formula_detail_item_cost1: 120,
    item_no_name2: null,
    npr_formula_detail_percent_qty2: null,
    npr_formula_detail_item_cost2: null,
  },
  {
    npr_formula_detail_part1: "B",
    npr_formula_detail_part_no1: "04",
    item_no_name1: "TEST ITEM 4",
    npr_formula_detail_percent_qty1: 33.3333,
    npr_formula_detail_item_cost1: 10,
    item_no_name2: "TEST ITEM 4",
    npr_formula_detail_percent_qty2: 33.3333,
    npr_formula_detail_item_cost2: 10,
  },
  {
    npr_formula_detail_part1: "C",
    npr_formula_detail_part_no1: "05",
    item_no_name1: "TEST ITEM 5",
    npr_formula_detail_percent_qty1: 5.763,
    npr_formula_detail_item_cost1: 111.1,
    item_no_name2: null,
    npr_formula_detail_percent_qty2: null,
    npr_formula_detail_item_cost2: null,
  },
];
const columns = ({ onChangeSearch, formula_list_1, formula_list_2 }) => [
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Part"} />
      </div>
    ),
    dataIndex: "npr_formula_detail_part1",
    width: "15%",
    align: "center",
    className: "tb-col-sm",
    render: (val, record) => <Text>{val}</Text>,
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"No."} />
      </div>
    ),
    dataIndex: "npr_formula_detail_part_no1",
    width: "15%",
    align: "center",
    className: "tb-col-sm",
    render: (val) => val,
  },
  {
    title: (
      <>
        {/* <CustomSelect
          showSearch
          allowClear
          className="full-width"
          placeholder="Formula No.1"
          field_id="npr_formula_id"
          field_name="npr_formula_no"
          data={formula_list_1}
          onChange={(val) =>
            onChangeSearch({ npr_formula_id_1: val ? val : null })
          }
        /> */}
        <Text strong>KCC-AP-01C / NPRm001-2021-003</Text>
      </>
    ),
    width: "34%",
    align: "center",
    className: "tb-col-sm",
    children: [
      {
        title: (
          <div className="text-center">
            <CustomLabel label={"Item"} />
          </div>
        ),
        dataIndex: "item_no_name1",
        align: "left",
        width: "40%",
        ellipsis: true,
        className: "tb-col-sm",
        render: (val, record) => (
          <div className="text-value">
            <Text>{val || "-"}</Text>
          </div>
        ),
      },
      {
        title: (
          <div className="text-center">
            <CustomLabel label={"%"} />
          </div>
        ),
        dataIndex: "npr_formula_detail_percent_qty1",
        width: "20%",
        align: "right",
        className: "tb-col-sm",
        render: (val, record) => (val ? convertDigit(val, 4) : "-"),
      },
      {
        title: <div className="text-center">Cost</div>,
        dataIndex: "npr_formula_detail_item_cost1",
        width: "20%",
        align: "right",
        className: "tb-col-sm",
        render: (val) => (val ? convertDigit(val, 4) : "-"),
      },
    ],
  },
  {
    title: "",
    className: "tb-col-sm",
    width: "2%",
  },
  {
    title: (
      <>
        {/* <CustomSelect
          showSearch
          allowClear
          className="full-width"
          placeholder="Formula No.2"
          field_id="npr_formula_id"
          field_name="npr_formula_no"
          data={formula_list_2}
          onChange={(val) =>
            onChangeSearch({ npr_formula_id_2: val ? val : null })
          }
        /> */}
        <Text strong>KCC-BB-01A / NPRm005-2021-001</Text>
      </>
    ),
    width: "34%",
    align: "center",
    className: "tb-col-sm",
    children: [
      {
        title: (
          <div className="text-center">
            <CustomLabel label={"Item"} />
          </div>
        ),
        dataIndex: "item_no_name2",
        align: "left",
        width: "40%",
        ellipsis: true,
        className: "tb-col-sm",
        render: (val, record) => (
          <div className="text-value">
            <Text>{val || "-"}</Text>
          </div>
        ),
      },
      {
        title: (
          <div className="text-center">
            <CustomLabel label={"%"} />
          </div>
        ),
        dataIndex: "npr_formula_detail_percent_qty2",
        width: "20%",
        align: "right",
        className: "tb-col-sm",
        render: (val, record) => (val ? convertDigit(val, 4) : "-"),
      },
      {
        title: <div className="text-center">Cost</div>,
        dataIndex: "npr_formula_detail_item_cost2",
        width: "20%",
        align: "right",
        className: "tb-col-sm",
        render: (val) => (val ? convertDigit(val, 4) : "-"),
      },
    ],
  },
];
const CompareFormulaMain = () => {
  const dispatch = useDispatch();
  const { branch_id } = useSelector((state) => state.auth.authData);
  const { operations, loading } = useSelector((state) => state.sales);
  const list = operations.npr.list;
  const [state, setState] = useState({
    npr_id_1: null,
    year_1: moment(),
    year_2: moment(),
    secondYear: null,
    npr_formula_id_1: null,
    npr_formula_id_2: null,
  });
  const [modal, setModal] = useState({
    visible: false,
    npr_formula_1: [],
    npr_formula_2: [],
  });
  useEffect(() => {
    dispatch(getNPRList(branch_id));
  }, []);
  const layoutConfig = {
    projectId: 7,
    title: "SALES",
    home: "/sales",
    show: true,
    breadcrumb: ["Sales", "Reporting", "Compare Formula"],
    search: false,
    create: "",
    buttonAction: [],
    discard: "",
    onCancel: () => {
      console.log("Cancel");
    },
  };
  console.log(list);
  const onChangeSearch = useCallback(
    (data) => {
      setState({ ...state, ...data });
    },
    [state]
  );
  const onSearch = useCallback(() => {
    console.log("Click Search Formula");
    setModal({ ...modal, visible: true });
  }, [state.npr_id_1, state.npr_id_2, state.year_1, state.year_2]);
  const modalConfig = useMemo(() => ({ modal, setModal }), [modal, setModal]);
  console.log("search", state);
  return (
    <>
      <MainLayout {...layoutConfig}>
        {loading ? (
          <DetailLoading />
        ) : (
          <>
            <div id="form">
              <h1>Compare Formula</h1>
              <div className="under-line mb-3"></div>
              <div>
                <Row gutter={24}>
                  <Col span={12}>
                    <Row className="col-2">
                      <div className="detail-tab-row">
                        <Text strong>NPR No.1</Text>
                      </div>
                    </Row>
                    <Row className="col-2 mt-1" gutter={8}>
                      <Col span={16}>
                        <CustomSelect
                          showSearch
                          allowClear
                          className="full-width"
                          placeholder="NPR 1"
                          field_id="npr_id"
                          field_name="npr_no"
                          data={list}
                          onChange={(val) =>
                            onChangeSearch({ npr_id_1: val ? val : null })
                          }
                          defaultValue={"NPRm001-2021"}
                        />
                      </Col>
                      <Col span={8}>
                        <DatePicker
                          placeholder="Year 1"
                          picker="year"
                          className="full-width"
                          format={"YYYY"}
                          value={state.year_1}
                          onChange={(val) =>
                            onChangeSearch({
                              year_1: val ? val : null,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="col-2">
                      <div className="detail-tab-row">
                        <Text strong>NPR No.2</Text>
                      </div>
                    </Row>
                    <Row className="col-2 mt-1" gutter={8}>
                      <Col span={16}>
                        <CustomSelect
                          showSearch
                          allowClear
                          className="full-width"
                          placeholder="NPR 2"
                          field_id="npr_id"
                          field_name="npr_no"
                          data={list}
                          onChange={(val) =>
                            onChangeSearch({ npr_id_2: val ? val : null })
                          }
                          defaultValue={"NPRm005-2021"}
                        />
                      </Col>
                      <Col span={8}>
                        <DatePicker
                          placeholder="Year 2"
                          picker="year"
                          className="full-width"
                          format={"YYYY"}
                          value={state.year_2}
                          onChange={(val) =>
                            onChangeSearch({
                              year_2: val ? val : null,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="col-2 mt-3">
                  <Col span={24} className="text-center">
                    <Button
                      icon={<SearchOutlined />}
                      className="primary"
                      onClick={onSearch}
                    >
                      Search Formula
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="under-line mt-3 mb-3"></div>
              <div className="d-flex flex-end mb-1">
                <Button icon={<PrinterOutlined />} className="primary">
                  Print Formula
                </Button>
              </div>
              <Row className="col-2" gutter={8}>
                <Col span={24}>
                  <Table
                    columns={columns({
                      onChangeSearch,
                      formula_list_1: [],
                      formula_list_2: [],
                    })}
                    dataSource={mockupData}
                    pagination={{ pageSize: 999 }}
                    rowKey={"id"}
                    rowClassName="row-table-detail"
                    bordered={true}
                  />
                </Col>
              </Row>
              <ModalSelectFormula {...modalConfig} />
            </div>
          </>
        )}
      </MainLayout>
    </>
  );
};

export default CompareFormulaMain;
