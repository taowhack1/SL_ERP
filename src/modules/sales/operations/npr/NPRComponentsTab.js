import {
  CheckOutlined,
  DeleteTwoTone,
  EllipsisOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  InputNumber,
  Popconfirm,
  Row,
  Table,
} from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTable from "../../../../components/CustomTable";
import ModalViewImages from "../../../../components/ModalViewImages";
import {
  convertDigit,
  getNumberFormat,
} from "../../../../include/js/main_config";
import { NPRFormContext } from "./NPRViewById";
import imagesTest from "../../../../image/no_image.svg";
import imagesTest2 from "../../../../image/unnamed.png";
import {
  sortData,
  validateFormHead,
} from "../../../../include/js/function_main";
import { useDispatch, useSelector } from "react-redux";
import { getPUEmp } from "../../../../actions/hrm";
import { AppContext } from "../../../../include/js/context";
import {
  getNPRPkPrice,
  saveNPRPkPrice,
} from "../../../../actions/sales/nprActions";
import moment from "moment";

const mockupImages = [
  {
    name: "TEST 1",
    path: imagesTest,
  },
];
const componentColumns = ({ viewImages }) => [
  {
    title: "Item Code",
    dataIndex: "npr_detail_item_no",
    align: "left",
    width: "13%",
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: "Description",
    dataIndex: "npr_detail_item_name",
    align: "left",
    ellipsis: true,
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: "Supply by",
    dataIndex: "npr_detail_supply_by",
    align: "left",
    width: "10%",
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: "Supplier",
    dataIndex: "npr_detail_supply_name",
    align: "left",
    width: "20%",
    ellipsis: true,
    className: "tb-col-sm",
    render: (val) => val || "-",
  },
  {
    title: (
      <div className="text-center">
        <Text>% Waste with customer</Text>
      </div>
    ),
    dataIndex: "npr_detail_watse_percent_qty",
    align: "right",
    width: "7%",
    className: "tb-col-sm",
    render: (val) => convertDigit(val || 0, 4),
  },
  {
    title: "Picture",
    dataIndex: "",
    align: "center",
    width: "5%",
    className: "tb-col-sm",
    render: (val) => (
      <PictureOutlined className="button-icon" onClick={viewImages} />
    ),
  },
];

const initialState = {
  npr_id: null,
  npr_price_request_date: null,
  npr_price_request_by: null,
  user_name: null,
  npr_price_description: null,
  npr_price_remark: null,
  commit: 1,
  tg_trans_status_id: 1,
  tg_trans_close_id: 1,
  npr_price_detail: [],
};
const initialStateDetail = {
  id: 0,
  npr_detail_id: null,
  npr_detail_price_remark: null,
  npr_price_detail_item_no: null,
  npr_price_detail_item_name: null,
  npr_price_detail_supply_by: null,
  npr_price_detail_supply_name: null,
  npr_price_detail_cost: 0,
  npr_price_detail_moq: 0,
  uom_id: null,
};
const NPRComponentsTab = () => {
  const dispatch = useDispatch();
  const {
    auth: { user_name },
  } = useContext(AppContext);
  const { state: mainState } = useContext(NPRFormContext);
  const { itemList } = useSelector((state) => state.sales.operations.npr);
  const { uom } = useSelector((state) => state.inventory.configurations);
  const { pu } = useSelector((state) => state.hrm.employee);
  const [modal, setModal] = useState({
    visible: false,
    loading: false,
  });

  const viewImages = () => setModal({ ...modal, visible: true });
  const onCloseModal = () => setModal({ ...modal, visible: false });

  const [state, setState] = useState(initialState);
  const [method, setMethod] = useState("view");
  useEffect(() => {
    mainState.npr_id && dispatch(getPUEmp());
  }, []);

  useEffect(() => {
    const getData = async () => {
      const resp = await getNPRPkPrice(mainState.npr_id);
      console.log("resp", resp);
      if (resp.success) {
        setState(
          resp.data
            ? {
                ...resp.data,
                user_name,
                commit: 1,
                npr_price_detail: sortData(resp.data.npr_price_detail),
              }
            : {
                ...initialState,
                npr_id: mainState.npr_id,
                npr_price_request_by: user_name,
                user_name,
                commit: 1,
              }
        );
      }
    };
    mainState.npr_id && getData();
  }, [mainState, method]);

  const onChangeDetail = (key, data) => {
    console.log(key, data);
    setState((prev) => ({
      ...prev,
      commit: 1,
      npr_price_detail: prev.npr_price_detail.map((obj) =>
        obj.id === key ? { ...obj, ...data, commit: 1 } : obj
      ),
    }));
  };

  const onDeleteDetail = (key) =>
    setState((prev) => ({
      ...prev,
      npr_price_detail: prev.npr_price_detail.filter((obj) => obj.id !== key),
    }));

  const onAddDetail = (npr_detail_id) =>
    setState((prev) => ({
      ...prev,
      npr_price_detail: sortData([
        ...prev.npr_price_detail,
        { ...initialStateDetail, npr_detail_id },
      ]),
    }));

  const onSave = async () => {
    const requireFieldHead = ["npr_price_request_by", "npr_price_request_date"];
    const { validate, objKey } = validateFormHead(state, requireFieldHead);
    console.log("state onSave", state);
    const saveData = {
      ...state,
      npr_price_detail: state.npr_price_detail.filter(
        (obj) =>
          obj.trans_field_id !== null &&
          obj.trans_id !== null &&
          obj.uom_id !== null
      ),
    };
    console.log("saveData", saveData);
    if (validate) {
      const resp = await saveNPRPkPrice(saveData);
      setMethod("view");
    }

    console.log("validate", validate);

    console.log("saveData", saveData);
  };

  const expandedRowRender = (record, index) => {
    const { npr_detail_id } = record;
    console.log("record", record, "index", index);
    const columns = [
      {
        title: "No.",
        dataIndex: "id",
        width: "5%",
        align: "center",
        className: "tb-col-sm",
        render: (val, _, index) => index + 1,
      },
      {
        title: (
          <div className="text-center">
            <Text>Item</Text>
          </div>
        ),
        dataIndex: "item_no_name",
        align: "left",
        ellipsis: true,
        className: "tb-col-sm",
        render: (val, row) =>
          method === "view" ? (
            val
          ) : (
            <CustomSelect
              allowClear
              showSearch
              placeholder={"Select Item"}
              size={"small"}
              data={itemList}
              field_id="id"
              field_name="item_no_name"
              value={val}
              onChange={(val, props) => {
                if (val !== undefined) {
                  const { trans_id, trans_field_id, item_no_name, uom_id } =
                    props.data;
                  console.log("select item", props.data);
                  onChangeDetail(row.id, {
                    trans_id,
                    trans_field_id,
                    item_no_name,
                    uom_id,
                  });
                } else {
                  onChangeDetail(row.id, {
                    trans_id: null,
                    trans_field_id: null,
                    item_no_name: null,
                    uom_id: null,
                  });
                }
              }}
            />
          ),
      },
      {
        title: (
          <div className="text-center">
            <Text>Price / Unit</Text>
          </div>
        ),
        dataIndex: "npr_price_detail_cost",
        align: "right",
        width: "15%",
        className: "tb-col-sm",
        render: (val, row) =>
          method === "view" ? (
            convertDigit(val || 0, 2)
          ) : (
            <InputNumber
              {...getNumberFormat(2)}
              value={val}
              placeholder="Cost"
              step={1}
              min={0}
              size="small"
              className="full-width"
              onChange={(value) =>
                onChangeDetail(row.id, { npr_price_detail_cost: value })
              }
            />
          ),
      },
      {
        title: (
          <div className="text-center">
            <Text>MOQ</Text>
          </div>
        ),
        dataIndex: "npr_price_detail_moq",
        align: "right",
        width: "10%",
        className: "tb-col-sm",
        render: (val, row) =>
          method === "view" ? (
            convertDigit(val || 0, 2)
          ) : (
            <InputNumber
              {...getNumberFormat(2)}
              value={val}
              placeholder="MOQ"
              step={1}
              min={0}
              size="small"
              className="full-width"
              onChange={(value) =>
                onChangeDetail(row.id, { npr_price_detail_moq: value })
              }
            />
          ),
      },
      {
        title: (
          <div className="text-center">
            <Text>UOM</Text>
          </div>
        ),
        dataIndex: "uom_id",
        align: "left",
        width: "10%",
        className: "tb-col-sm",
        render: (val, row) =>
          method === "view" ? (
            row.uom_no
          ) : (
            <CustomSelect
              placeholder={"UOM"}
              showSearch
              size={"small"}
              className="full-width"
              field_name="uom_no"
              field_id="uom_id"
              data={uom}
              value={val}
              onChange={(val, recordData) => {
                val !== undefined
                  ? onChangeDetail(row.id, {
                      uom_id: val,
                    })
                  : onChangeDetail(row.id, { uom_id: null });
              }}
            />
          ),
      },
      {
        title: <EllipsisOutlined />,
        dataIndex: "id",
        align: "center",
        width: "5%",
        className: "tb-col-sm",
        render: (val) =>
          method !== "view" && (
            <Popconfirm
              title="Are you sure ?."
              onConfirm={() => onDeleteDetail(val)}
            >
              <DeleteTwoTone className="button-icon" />
            </Popconfirm>
          ),
      },
    ];
    return (
      <>
        <CustomTable
          columns={columns}
          dataSource={state.npr_price_detail.filter(
            (obj) => obj.npr_detail_id === npr_detail_id
          )}
          bordered
          rowKey={"id"}
          pagination={false}
          rowClassName="row-table-detail"
          onAdd={method !== "view" && (() => onAddDetail(record.npr_detail_id))}
        />
      </>
    );
  };

  const onChangeHead = (data) =>
    setState((prev) => ({ ...prev, ...data, commit: 1 }));

  const { tg_trans_status_id: trans_id, tg_trans_close_id: close_id } = state;
  const pageStatus = {
    disabledAssign: trans_id !== 1 || method === "view" || trans_id === 4,
    disabledEdit: trans_id === 4,
    isFinish: trans_id === 4,
  };
  const { disabledAssign, disabledEdit, isFinish } = pageStatus;
  console.log("state", state);
  console.log("Page Status ", method, pageStatus);
  return (
    <>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="d-flex flex-space under-line">
          <div className="d-flex flex-row">
            <h3>Packaging Components</h3>
            <div className="pd-left-3">
              {isFinish && method === "view" ? (
                <>
                  <CheckOutlined className="complete" />
                  <Text className="pd-left-2 complete" strong>
                    Finished
                  </Text>
                </>
              ) : (
                <>
                  <Checkbox
                    checked={trans_id === 4 ? true : false}
                    disabled={method === "view"}
                    onChange={(e) =>
                      onChangeHead({
                        tg_trans_status_id: e.target.checked ? 4 : 2,
                      })
                    }
                  />
                  <Text className="pd-left-2" strong>
                    Finished
                  </Text>
                </>
              )}
            </div>
          </div>
          {method === "view" ? (
            <Button
              className={!disabledEdit ? "primary" : ""}
              size="small"
              loading={false}
              disabled={disabledEdit}
              onClick={() => {
                setMethod("edit");
              }}
            >
              Edit
            </Button>
          ) : (
            <Button
              className={"primary"}
              size="small"
              loading={false}
              onClick={onSave}
            >
              Save
            </Button>
          )}
        </div>
        <div className="form-section-detail" style={{ padding: 10 }}>
          <Row className="mt-2 mb-2 col-2" gutter={24}>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel
                    label="Person In Charge"
                    require
                    readOnly={disabledAssign}
                  />
                </Col>
                <Col span={16}>
                  {disabledAssign ? (
                    <Text>{state.npr_price_request_by_no_name || "-"}</Text>
                  ) : (
                    <CustomSelect
                      showSearch
                      allowClear
                      disabled={disabledAssign}
                      placeholder="Person In Charge"
                      data={pu}
                      className="w-100"
                      name="npr_price_request_by"
                      field_id="employee_no"
                      field_name="employee_no_name"
                      value={state.npr_price_request_by}
                      onChange={(val, record) =>
                        val !== undefined
                          ? onChangeHead({
                              npr_price_request_by: record.data.employee_no,
                            })
                          : onChangeHead({ npr_price_request_by: null })
                      }
                    />
                  )}
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel
                    label="Delivery Date"
                    require
                    readOnly={disabledAssign}
                  />
                </Col>
                <Col span={16}>
                  {disabledAssign ? (
                    <Text>{state.npr_price_request_date || "-"}</Text>
                  ) : (
                    <DatePicker
                      name={"npr_price_request_date"}
                      format={"DD/MM/YYYY"}
                      className={"full-width"}
                      placeholder="Delivery Date"
                      disabled={disabledAssign}
                      required
                      value={
                        state.npr_price_request_date
                          ? moment(state.npr_price_request_date, "DD/MM/YYYY")
                          : null
                      }
                      onChange={(val) =>
                        onChangeHead({
                          npr_price_request_date: val
                            ? moment(val).format("DD/MM/YYYY")
                            : null,
                        })
                      }
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Table
            columns={componentColumns({ viewImages })}
            dataSource={mainState.npr_detail}
            pagination={false}
            rowKey={"npr_detail_id"}
            size={"small"}
            className="full-width"
            expandable={{ expandedRowRender }}
            bordered
          />
          <Row className="col-2 row-margin-vertical">
            <Col span={24}>
              <CustomLabel label="Remark :" />
            </Col>
            <Col span={24}>
              <Text className="ml-4">
                {mainState.npr_responsed_remark || "-"}
              </Text>
            </Col>
          </Row>
        </div>
      </div>
      <ModalViewImages
        {...modal}
        onClose={onCloseModal}
        dataSource={mockupImages}
      />
    </>
  );
};

export default React.memo(NPRComponentsTab);
