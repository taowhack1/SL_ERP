import { UploadOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Input,
  InputNumber,
  Row,
  Tabs,
  Upload,
  Button,
  Space,
} from "antd";
import Text from "antd/lib/typography/Text";
import React from "react";
import { useSelector } from "react-redux";
import ItemQADetail from "./Item_QA_Detail";
const { TextArea } = Input;

const TabItemQA = ({
  key,
  master_data,
  data_head,
  upDateFormValue,
  data_detail,
  detailDispatch,
}) => {
  const currency_list = useSelector(
    (state) => state.accounting.master_data.currency
  );
  return (
    <>
      <ItemQADetail
        readOnly={false}
        detailDispatch={detailDispatch}
        data_detail={data_detail}
      />
    </>
  );
};

export default TabItemQA;
