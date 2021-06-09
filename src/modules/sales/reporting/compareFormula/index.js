import { Button, Checkbox, Col, DatePicker, Row, Space, Table } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getNPRByYear } from "../../../../actions/sales/nprActions";
import MainLayout from "../../../../components/MainLayout";
import CustomSelect from "../../../../components/CustomSelect";
import Text from "antd/lib/typography/Text";
import {
  DownloadOutlined,
  PrinterOutlined,
  PrinterTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { convertDigit } from "../../../../include/js/main_config";
import CustomLabel from "../../../../components/CustomLabel";
import moment from "moment";
import ModalSelectFormula from "./ModalSelectFormula";
import {
  getCompareFormula,
  getFormulaNoByNPRId,
} from "../../../../actions/sales/reporting";
import { pad2number } from "../../../../include/js/function_main";
import useKeepLogs from "../../../logs/useKeepLogs";
import Authorize from "../../../system/Authorize";
const columns = ({
  columnsConfig: { showPart, showPartNo, showItem, showCost },
  npr_formula_no_1,
  npr_formula_no_2,
}) => [
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"Part"} />
      </div>
    ),
    dataIndex: "npr_formula_detail_part",
    width: "15%",
    align: "center",
    className: "tb-col-sm",
    render: (val, record) => <Text>{showPart ? val : "#"}</Text>,
  },
  {
    title: (
      <div className="text-center">
        <CustomLabel label={"No."} />
      </div>
    ),
    dataIndex: "npr_formula_part_no",
    width: "15%",
    align: "center",
    className: "tb-col-sm",
    render: (val) => <Text>{showPartNo ? val : "##"}</Text>,
  },
  {
    title: (
      <>
        <Text strong>{npr_formula_no_1 || "Formula No.1"}</Text>
      </>
    ),
    width: "34%",
    align: "center",
    className: "tb-col-sm bg-tb-primary",
    children: [
      {
        title: (
          <div className="text-center">
            <CustomLabel label={"Item"} />
          </div>
        ),
        dataIndex: "item_no_name_1",
        align: "left",
        width: "40%",
        ellipsis: true,
        className: "tb-col-sm",
        render: (val, record) => (
          <div className="text-value">
            <Text>{showItem ? val || "-" : "####"}</Text>
          </div>
        ),
      },
      {
        title: (
          <div className="text-center">
            <CustomLabel label={"%"} />
          </div>
        ),
        dataIndex: "npr_formula_detail_percent_qty_1",
        width: "20%",
        align: "right",
        className: "tb-col-sm",
        render: (val, record) => (val !== null ? convertDigit(val, 4) : "-"),
      },
      {
        title: <div className="text-center">Cost</div>,
        dataIndex: "npr_formula_detail_item_cost_1",
        width: "20%",
        align: "right",
        className: "tb-col-sm",
        render: (val) =>
          showCost ? (val !== null ? convertDigit(val, 4) : "-") : "###.##",
      },
    ],
  },
  {
    title: "",
    className: "tb-col-sm bg-tb-disabled",
    width: "2%",
  },
  {
    title: (
      <>
        <Text strong>{npr_formula_no_2 || "Formula No.2"}</Text>
      </>
    ),
    width: "34%",
    align: "center",
    className: "tb-col-sm bg-tb-secondary",
    children: [
      {
        title: (
          <div className="text-center">
            <CustomLabel label={"Item"} />
          </div>
        ),
        dataIndex: "item_no_name_2",
        align: "left",
        width: "40%",
        ellipsis: true,
        className: "tb-col-sm",
        render: (val, record) => (
          <div className="text-value">
            <Text>{showItem ? val || "-" : "####"}</Text>
          </div>
        ),
      },
      {
        title: (
          <div className="text-center">
            <CustomLabel label={"%"} />
          </div>
        ),
        dataIndex: "npr_formula_detail_percent_qty_2",
        width: "20%",
        align: "right",
        className: "tb-col-sm",
        render: (val, record) => (val !== null ? convertDigit(val, 4) : "-"),
      },
      {
        title: <div className="text-center">Cost</div>,
        dataIndex: "npr_formula_detail_item_cost_2",
        width: "20%",
        align: "right",
        className: "tb-col-sm",
        render: (val) =>
          showCost ? (val !== null ? convertDigit(val, 4) : "-") : "###.##",
      },
    ],
  },
];
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
};

const initialState = {
  loading: false,
  npr_id_1: null,
  npr_id_2: null,
  npr_no_1: null,
  npr_no_2: null,
  year_1: moment(),
  year_2: moment(),
  secondYear: null,
  npr_formula_id_1: null,
  npr_formula_no_1: null,
  npr_formula_id_2: null,
  npr_formula_no_2: null,
  npr_formula_compare_result: [],
};
const CompareFormulaMain = () => {
  const keepLog = useKeepLogs();
  const authorize = Authorize();
  authorize.check_authorize();
  // const { loading } = useSelector((state) => state.sales);
  const [loading, setLoading] = useState(false);
  // keep search value
  const [state, setState] = useState(initialState);

  // keep master data
  const [masterData, setMasterData] = useState({
    loading: false,
    npr_list_1: [],
    npr_list_2: [],
  });

  // keep modal state
  const [modal, setModal] = useState({
    loading: false,
    visible: false,
    npr_formula_1: [],
    npr_formula_2: [],
  });

  // Columns Options
  const [columnsConfig, setColumnsConfig] = useState({
    showPart: true,
    showPartNo: true,
    showItem: true,
    showCost: false,
  });
  const onChangeColumnsConfig = (data) =>
    setColumnsConfig({ ...columnsConfig, ...data });

  useEffect(() => {
    // Always do this function when this visit this page
    //  Do get NPR Formula by default current year
    const getData = async (year) => {
      const resp = await getNPRByYear(year);
      setMasterData({
        ...masterData,
        npr_list_1: resp.data,
        npr_list_2: resp.data,
      });
    };
    getData(moment().format("YYYY"));
  }, []);

  const onChangeYear = async (key, year) => {
    // Do get npr by year when year has been change.
    const resp = await getNPRByYear(year);
    setMasterData({
      ...masterData,
      [key]: resp.data,
    });
  };

  const onChangeSearch = useCallback(
    (data) => {
      // Save Search Value
      setState({ ...state, ...data });
    },
    [state]
  );

  const onSearch = useCallback(async () => {
    // Do when click Search Formula
    keepLog.keep_log_action(
      `Compare Formula : ${state.npr_id_1} : ${state.npr_id_2}`
    );
    setLoading(true);
    const respFormula1 = await getFormulaNoByNPRId(state.npr_id_1);
    const respFormula2 = await getFormulaNoByNPRId(state.npr_id_2);
    setLoading(false);
    setModal({
      ...modal,
      visible: true,
      npr_no_1: state.npr_no_1,
      npr_no_2: state.npr_no_2,
      npr_formula_1: respFormula1.data,
      npr_formula_2: respFormula2.data,
    });
  }, [state.npr_id_1, state.npr_id_2]);

  const onClickCompareFormula = useCallback(
    async ({
      npr_formula_id_1,
      npr_formula_no_1,
      npr_formula_id_2,
      npr_formula_no_2,
    }) => {
      // Receive 2 npr_formula_id for compare when click Compare on the Modal
      const resp = await getCompareFormula(npr_formula_id_1, npr_formula_id_2);
      if (resp.success) {
        setState({
          ...state,
          npr_formula_id_1,
          npr_formula_no_1,
          npr_formula_id_2,
          npr_formula_no_2,
          npr_formula_compare_result: resp.data.map((obj, index) => ({
            ...obj,
            npr_formula_part_no: pad2number(index + 1),
          })),
        });
      }
      return resp;
    },
    [state]
  );

  const modalConfig = useMemo(
    // Set Modal config.
    () => ({ modal, setModal, onClickCompareFormula }),
    [modal, setModal, onClickCompareFormula]
  );

  const onPrintCompareFormula = () =>
    window.open(
      `${process.env.REACT_APP_REPORT_SERVER}/report_npr_formula_separate.aspx?npr_formula_id_1=${state.npr_formula_id_1}&npr_formula_id_2=${state.npr_formula_id_2}`,
      "_blank"
    );

  const disabledSearch = !state.npr_id_1 || !state.npr_id_2;
  const disabledPrintBtn = !state.npr_formula_id_1 || !state.npr_formula_id_2;
  return (
    <>
      <MainLayout {...layoutConfig}>
        <>
          <div id="form">
            <h1>Compare Formula</h1>
            <div className="under-line mb-3"></div>
            <div>
              <Row gutter={24}>
                <Col span={12}>
                  <Row className="col-2">
                    <Col span={24} className="text-center">
                      <div className="detail-tab-row">
                        <Text strong>NPR No.1</Text>
                      </div>
                    </Col>
                  </Row>
                  <Row className="col-2 mt-1" gutter={8}>
                    <Col span={8}>
                      <DatePicker
                        placeholder="Year 1"
                        picker="year"
                        className="full-width"
                        format={"YYYY"}
                        allowClear={false}
                        value={state.year_1}
                        onChange={(val) => {
                          onChangeSearch({
                            year_1: val,
                            npr_id_1: null,
                            npr_no_1: null,
                          });
                          onChangeYear(
                            "npr_list_1",
                            moment(val).format("YYYY")
                          );
                        }}
                      />
                    </Col>
                    <Col span={16}>
                      <CustomSelect
                        showSearch
                        allowClear
                        className="full-width"
                        placeholder="NPR 1"
                        field_id="npr_id"
                        field_name="npr_no"
                        data={masterData.npr_list_1}
                        onChange={(val, record) =>
                          val !== undefined
                            ? onChangeSearch({
                                npr_id_1: val,
                                npr_no_1: record.data.npr_no,
                              })
                            : onChangeSearch({
                                npr_id_1: null,
                                npr_no_1: null,
                              })
                        }
                        value={state.npr_id_1}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row className="col-2">
                    <Col span={24} className="text-center">
                      <div className="detail-tab-row">
                        <Text strong>NPR No.2</Text>
                      </div>
                    </Col>
                  </Row>
                  <Row className="col-2 mt-1" gutter={8}>
                    <Col span={8}>
                      <DatePicker
                        placeholder="Year 2"
                        picker="year"
                        className="full-width"
                        format={"YYYY"}
                        allowClear={false}
                        value={state.year_2}
                        onChange={(val) => {
                          onChangeSearch({
                            year_2: val,
                            npr_id_2: null,
                            npr_no_2: null,
                          });
                          onChangeYear(
                            "npr_list_2",
                            moment(val).format("YYYY")
                          );
                        }}
                      />
                    </Col>
                    <Col span={16}>
                      <CustomSelect
                        showSearch
                        allowClear
                        className="full-width"
                        placeholder="NPR 2"
                        field_id="npr_id"
                        field_name="npr_no"
                        data={masterData.npr_list_2}
                        onChange={(val, record) =>
                          val !== undefined
                            ? onChangeSearch({
                                npr_id_2: val,
                                npr_no_2: record.data.npr_no,
                              })
                            : onChangeSearch({
                                npr_id_2: null,
                                npr_no_2: null,
                              })
                        }
                        value={state.npr_id_2}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="col-2 mt-3">
                <Col span={24} className="text-center">
                  <Button
                    icon={<SearchOutlined />}
                    className={disabledSearch ? "" : "primary"}
                    onClick={onSearch}
                    disabled={disabledSearch}
                    loading={loading}
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="under-line mt-3 mb-3"></div>
            <div className="d-flex space-between mb-1">
              <Space>
                <div>
                  <Checkbox
                    checked={columnsConfig.showPart}
                    onChange={(e) =>
                      onChangeColumnsConfig({ showPart: e.target.checked })
                    }
                  />
                  <Text className="pd-left-1" strong>
                    Show Part
                  </Text>
                </div>
                <div className="pd-left-3">
                  <Checkbox
                    checked={columnsConfig.showPartNo}
                    onChange={(e) =>
                      onChangeColumnsConfig({ showPartNo: e.target.checked })
                    }
                  />
                  <Text className="pd-left-1" strong>
                    Show No.
                  </Text>
                </div>
                <div className="pd-left-3">
                  <Checkbox
                    checked={columnsConfig.showItem}
                    onChange={(e) =>
                      onChangeColumnsConfig({ showItem: e.target.checked })
                    }
                  />
                  <Text className="pd-left-1" strong>
                    Show Item
                  </Text>
                </div>
                <div className="pd-left-3">
                  <Checkbox
                    checked={columnsConfig.showCost}
                    onChange={(e) =>
                      onChangeColumnsConfig({ showCost: e.target.checked })
                    }
                  />
                  <Text className="pd-left-1" strong>
                    Show Cost
                  </Text>
                </div>
              </Space>
              <Button
                icon={
                  disabledPrintBtn ? <PrinterOutlined /> : <PrinterTwoTone />
                }
                className={disabledPrintBtn ? "" : "button-icon"}
                onClick={onPrintCompareFormula}
                disabled={disabledPrintBtn}
              >
                Print
              </Button>
            </div>
            <Row className="col-2" gutter={8}>
              <Col span={24}>
                <Table
                  columns={columns({
                    columnsConfig,
                    npr_formula_no_1: state.npr_formula_no_1,
                    npr_formula_no_2: state.npr_formula_no_2,
                  })}
                  dataSource={state.npr_formula_compare_result}
                  pagination={false}
                  rowKey={"id"}
                  rowClassName="row-table-detail"
                  bordered
                />
              </Col>
            </Row>
            <ModalSelectFormula {...modalConfig} />
          </div>
        </>
      </MainLayout>
    </>
  );
};

export default CompareFormulaMain;
