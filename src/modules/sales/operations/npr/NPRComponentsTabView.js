import {
  BorderOutlined,
  CheckOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Col, Row, Table } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import CustomLabel from "../../../../components/CustomLabel";
import CustomTable from "../../../../components/CustomTable";
import ModalViewImages from "../../../../components/ModalViewImages";
import { convertDigit } from "../../../../include/js/main_config";
import { NPRFormContext } from "./NPRViewById";
import imagesTest from "../../../../image/no_image.svg";
import { useSelector } from "react-redux";
import { getNPRPkPrice } from "../../../../actions/sales/nprActions";
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
const NPRComponentsTabView = () => {
  const { state: mainState } = useContext(NPRFormContext);
  const [modal, setModal] = useState({
    visible: false,
    loading: false,
  });

  const viewImages = () => setModal({ ...modal, visible: true });
  const onCloseModal = () => setModal({ ...modal, visible: false });

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const getData = async () => {
      const resp = await getNPRPkPrice(mainState.npr_id);
      console.log("resp", resp);
      if (resp.success) {
        setState(resp.data ? resp.data : initialState);
      }
    };
    mainState.npr_id && getData();
  }, [mainState]);

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
        render: (val, row) => convertDigit(val || 0, 2),
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
        render: (val, row) => convertDigit(val || 0, 2),
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
        render: (val, row) => row.uom_no,
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
        />
      </>
    );
  };

  const { tg_trans_status_id: trans_id } = state;

  return (
    <>
      <div className="form-section pd-left-2 pd-right-2">
        <div className="d-flex flex-space under-line">
          <div className="d-flex flex-row">
            <h3>Packaging Components</h3>
            <div className="pd-left-3">
              {trans_id === 4 ? (
                <>
                  <CheckOutlined className="complete" />
                  <Text className="pd-left-2 complete" strong>
                    Finished
                  </Text>
                </>
              ) : (
                <>
                  <BorderOutlined />
                  <Text className="pd-left-2" strong>
                    Finished
                  </Text>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="form-section-detail" style={{ padding: 10 }}>
          <Row className="mt-2 mb-2 col-2" gutter={24}>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel label="Person In Charge" />
                </Col>
                <Col span={16}>
                  <Text>{state.npr_price_request_by_no_name || "-"}</Text>
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={8}>
                  <CustomLabel label="Delivery Date" />
                </Col>
                <Col span={16}>
                  <Text>{state.npr_price_request_date || "-"}</Text>
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

export default React.memo(NPRComponentsTabView);
