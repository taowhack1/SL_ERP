/** @format */

import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Column from "antd/lib/table/Column";
import Text from "antd/lib/typography/Text";
import React, { useCallback, useRef, useState } from "react";
import CustomLabel from "../../components/CustomLabel";
import ItemFileUpload from "../inventory/item/ItemFileUpload";
const Customer_uploadfile = ({
  data_head,
  data_file,
  setFile,
  user_name,
  readOnly,
}) => {
  const button_file_1 = useRef(null);
  const button_file_2 = useRef(null);
  const file = "test";
  //const file_type_id = 11;
  const [loading, setLoading] = useState(false);
  const updateFile = useCallback(
    (data, type) => {
      type === 11
        ? setFile({
            ...data_file,
            companycer: { ...data_file.companycer, ...data },
          })
        : setFile({
            ...data_file,
            memorandum: { ...data_file.memorandum, ...data },
          });
    },
    [data_file]
  );
  const saveFile = (file_type_id, file_tmp) => {
    if (file_type_id === 11) {
      updateFile({ [0]: file_tmp }, file_type_id);
    } else {
      updateFile({ [0]: file_tmp }, file_type_id);
    }
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const uploadButton = (
    <div>
      <Button icon={<UploadOutlined />}>Select File</Button>
    </div>
  );
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });
  const { previewVisible, previewImage, previewTitle } = state;
  const handleCancel = () => {
    setState({ ...state, previewVisible: false });
  };
  const handleChange =
    (file_type_id) =>
    async ({ file, fileList, event }) => {
      setLoading(true);
      console.log("file", file);
      console.log("fileList", fileList);
      console.log("event", event);
      console.log("file_type_id", file_type_id);
      const reader = new FileReader();
      let file_tmp = null;
      if (fileList.length) {
        console.log("file", file);
        file_tmp = file;
        file_tmp = fileList[0];
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          console.log("reader.onload", file, e.target);
          file_tmp.uid = file.uid;
          file_tmp.thumbUrl = e.target.result;
          file_tmp.url = e.target.result;
          file_tmp.url = e.target.result;
          file_tmp.file = e.target.result;
          file_tmp.commit = 1;
          file_tmp.file_type_id = file_type_id;
          file_tmp.file_name = file.name;
          file_tmp.file_type = file.type;
          console.log("file_tmp", file_tmp);
          saveFile(file_type_id, file_tmp);
          setLoading(false);
        };
      } else {
        saveFile(file_type_id, file_tmp);
        setLoading(false);
      }
    };
  const handlePreview = async (file) => {
    console.log("file", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    if (file.item_file_original_type) {
      if (file.item_file_original_type.includes("image")) {
        setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle:
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        });
      } else {
        const link = document.createElement("a");
        link.href = file.url;
        link.setAttribute("download", file.item_file_original_name); //or any other extension
        link.setAttribute("target", "_blank"); //or any other extension

        document.body.appendChild(link);
        link.click();
      }
    } else {
      if (file.type.includes("image")) {
        setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle:
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        });
      } else {
        const link = document.createElement("a");
        link.href = file.url;
        link.setAttribute("download", file.name); //or any other extension
        link.setAttribute("target", "_blank"); //or any other extension

        document.body.appendChild(link);
        link.click();
      }
    }
  };
  const uploadConfig = {
    beforeUpload: (file, file_list) => {
      return false;
    },
    // onChange: handleChange,
    oncancel: handleCancel,
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "download ",
    },
    maxCount: 1,
  };
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const customer_file =
    data_head && data_head.customer_file
      ? [
          ...data_head.customer_file?.map((file) => ({
            uid: file.file_type_id,
            name: file.item_file_remark,
            status: "done",
            url: `${process.env.REACT_APP_SERVER}/${file.item_file_path}`,
          })),
        ]
      : [];
  const company = customer_file
    ? customer_file.filter((file) => file.uid == 11)
    : [];
  const Memorandum = customer_file
    ? customer_file.filter((file) => file.uid == 12)
    : [];
  console.log("fileList2", fileList2);
  console.log("data_file", data_file);
  console.log("customer_file", customer_file);
  console.log("Memorandum", Memorandum);
  console.log("company", company);
  console.log("data_file.companycer", data_file?.companycer[0]);
  return (
    <>
      {!readOnly ? (
        <>
          {" "}
          <Row className='col-2'>
            <Col span={12}>
              <Row className='row-margin'>
                <Col span={8} className='row-margin'>
                  <Text strong>
                    Company Certificate Document (เอกสาร ภ.ธ. 20){" "}
                  </Text>
                </Col>
                <Col span={8}>
                  <Upload
                    {...uploadConfig}
                    onChange={handleChange(11)}
                    name='company'>
                    {data_file?.companycer[0] === undefined ||
                    data_file?.companycer[0] === null
                      ? uploadButton
                      : null}
                  </Upload>
                  {data_file?.companycer[0] === undefined ||
                  data_file?.companycer[0] === null ? (
                    <Upload fileList={company}></Upload>
                  ) : null}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className='row-margin'>
                <Col span={6} className='row-margin'>
                  <Text strong>Memorandum Document (เอกสาร บริคณห์สนธิ)</Text>
                </Col>
                <Col span={8}>
                  <Upload
                    {...uploadConfig}
                    onChange={handleChange(12)}
                    name='memorandum'>
                    {data_file?.memorandum[0] === undefined ||
                    data_file?.memorandum[0] === null
                      ? uploadButton
                      : null}
                  </Upload>
                  {data_file?.memorandum[0] === undefined ||
                  data_file?.memorandum[0] === null ? (
                    <Upload fileList={Memorandum}></Upload>
                  ) : null}
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row className='col-2'>
            <Col span={12}>
              <Row className='row-margin'>
                <Col span={8} className='row-margin'>
                  <Text strong>
                    company certificate Document (เอกสาร ภ.ธ. 20)
                  </Text>
                </Col>
                <Col span={8}>
                  {company.length > 0 ? (
                    <Upload fileList={company}></Upload>
                  ) : (
                    <Text>-</Text>
                  )}
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className='row-margin'>
                <Col span={6} className='row-margin'>
                  <Text strong>Memorandum Document (เอกสาร บริคณห์สนธิ)</Text>
                </Col>
                <Col span={8}>
                  {Memorandum.length > 0 ? (
                    <Upload fileList={Memorandum}></Upload>
                  ) : (
                    <Text>-</Text>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Customer_uploadfile;
