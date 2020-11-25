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
  readOnly,
  // qa
  data_qa_detail,
  qaDetailDispatch,
}) => {
  return (
    <>
      <ItemQADetail
        readOnly={readOnly}
        // qa
        data_qa_detail={data_qa_detail}
        qaDetailDispatch={qaDetailDispatch}
      />
    </>
  );
};

export default TabItemQA;
