import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Radio,
  Select,
  AutoComplete,
  Typography,
  InputNumber,
  Checkbox,
  Space,
  Switch,
  message,
  Upload,
  Button,
} from "antd";
import MainLayout from "../../components/MainLayout";
import moment from "moment";
import Line from "../../components/VendorLine";
import {
  autoCompleteUser,
  locationData,
  autoCompleteUnit,
} from "../../data/inventoryData";
import Comments from "../../components/Comments";
import { dataComments } from "../../data";
import Barcode from "react-barcode";
import { vendorColumns, vendors, companys } from "../../data/itemData";
import {
  getSelectDetail,
  createNewItems,
  upDateItem,
} from "../../actions/inventory/itemActions";
import { item_fields } from "./config/item";
import { getNameById } from "../../include/js/function_main";
import $ from "jquery";
import { getMasterDataItem } from "../../actions/inventory";
import {
  BorderOutlined,
  CheckSquareOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import CustomSelect from "../../components/CustomSelect";
import { item_vendor_columns } from "./config/item";
import numeral from "numeral";
import Authorize from "../system/Authorize";
import ItemPreview from "./item/ItemFileUpload";
import TabPanel from "./item/TabPanel";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;
const ItemView = (props) => {
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMasterDataItem());
  }, []);

  const fileList = [
    {
      name: "no_image.svg",
      status: "done",
      uid: "-1",
      url: "/static/media/no_image.07087820.svg",
    },
  ];
  const data_head = useSelector((state) => state.inventory.item.item_head);
  const data_detail = useSelector((state) => state.inventory.item.item_detail);

  // const data_head = useSelector(state=>state.inventory.item.item_head);
  // const data_detail = useSelector(state=>state.inventory.item.item_detail);

  const callback = (key) => {};

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Items",
      "View",
      data_head.item_no &&
        "[ " + data_head.item_no + " ] " + data_head.item_name,
    ],
    search: false,
    buttonAction: ["Edit", "Discard"],
    create: "",
    edit: {
      data: {
        data_head: data_head,
        data_detail: data_detail,
      },
      path: data_head && "/inventory/items/edit/" + data_head.item_id,
    },

    // save: "function",
    discard: "/inventory/items",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={11}>
            {/* <h2>
              <strong>{data_head.item_no ? "Edit" : "Create"} Item</strong>
            </h2> */}
            <h3 style={{ marginBottom: 8 }}>
              {data_head.item_no && (
                <strong>
                  Item Code {data_head.item_no ? "#" + data_head.item_no : "-"}
                </strong>
              )}
            </h3>
          </Col>
          <Col span={2}></Col>
          <Col span={3}></Col>
          <Col span={8} style={{ textAlign: "right" }}>
            {/* <Barcode
              value={data_head.item_barcode}
              width={1.5}
              height={30}
              fontSize={14}
            /> */}
          </Col>
        </Row>
        <Row className="col-2">
          <Col span={19} style={{ marginBottom: 15 }}>
            <h3>
              <strong>Description Name</strong>
            </h3>
            <Text className="text-view">
              {data_head.item_name ? data_head.item_name : "-"}
            </Text>
            <Col span={24} style={{ marginLeft: 5 }}>
              <Space align="baseline">
                {data_head.item_sale ? (
                  <CheckSquareOutlined />
                ) : (
                  <BorderOutlined />
                )}
                <Text>Can be sold</Text>
              </Space>
              <br />
              <Space align="baseline">
                {data_head.item_purchase ? (
                  <CheckSquareOutlined />
                ) : (
                  <BorderOutlined />
                )}
                <Text>Can be purchase</Text>
              </Space>

              {data_head.item_no && (
                <Space
                  align="baseline"
                  style={{ float: "right", marginRight: 10 }}
                >
                  <Text strong>Active</Text>
                  <Switch
                    checkedChildren={""}
                    unCheckedChildren={""}
                    disabled
                    checked={data_head.item_actived}
                    style={{ width: 35 }}
                  />
                </Space>
              )}
            </Col>
          </Col>
          <Col span={1}></Col>
          <Col span={4}>
            <div>
              <ItemPreview
                fileList={fileList}
                readOnly={true}
                maxFile={1}
                // setFileList={setFileList}
                file_type_id={1}
              />
            </div>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin">
          <Col span={24}>
            <TabPanel
              data_head={data_head}
              data_detail={data_detail}
              // headDispatch={headDispatch}
              // detailDispatch={detailDispatch}
              // upDateFormValue={upDateFormValue}
              readOnly={true}
            />
          </Col>
        </Row>
      </div>
      <Comments data={dataComments} />
    </MainLayout>
  );
};

export default ItemView;
