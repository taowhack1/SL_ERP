/** @format */

import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Column from "antd/lib/table/Column";
import Text from "antd/lib/typography/Text";
import React, { useRef, useState } from "react";
import CustomLabel from "../../components/CustomLabel";
import ItemFileUpload from "../inventory/item/ItemFileUpload";

const Customer_uploadfile = ({ dataDetail, readOnly }) => {
  const button_file_1 = useRef(null);
  const button_file_2 = useRef(null);
  const file = "test";
  const file_type_id = 11;
  const [loading, setLoading] = useState(false);
  // const updateFile = useCallback(
  //   (data, type) => {
  //     type === 1
  //       ? setFile({ ...data_file, ...data })
  //       : setFile({
  //           ...data_file,
  //           certificate: { ...data_file.certificate, ...data },
  //         });
  //   },
  //   [data_file]
  // );
  // const saveFile = (file_type_id, file_tmp) => {
  //   if (file_type_id === 1) {
  //     updateFile({ item_image: file_tmp }, file_type_id);
  //   } else {
  //     updateFile({ [file_type_id]: file_tmp }, file_type_id);
  //   }
  // };
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
  const handleChange = async ({ file, fileList }) => {
    setLoading(true);
    console.log("file", file);
    console.log("fileList", fileList);
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
        console.log(file_tmp);
        setFileList2([{ ...file_tmp }]);
        setLoading(false);
      };
    } else {
      //saveFile(file_type_id, file_tmp);
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
    onChange: handleChange,
    oncancel: handleCancel,
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "download ",
    },
    maxCount: 1,
  };
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image1.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  console.log("fileList2", fileList2);
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
                    company certificate Document (เอกสาร ภ.ธ. 20){" "}
                  </Text>
                </Col>
                <Col span={8}>
                  <Upload {...uploadConfig}>
                    {fileList2.length >= 1 ? null : uploadButton}
                  </Upload>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className='row-margin'>
                <Col span={6} className='row-margin'>
                  <Text strong>Memorandum Document (เอกสาร บริคณห์สนธิ)</Text>
                </Col>
                <Col span={8}>
                  <Upload {...uploadConfig}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      ) : (
        <>
          {" "}
          <Row className='col-2'>
            <Col span={12}>
              <Row className='row-margin'>
                <Col span={8} className='row-margin'>
                  <Text strong>
                    company certificate Document (เอกสาร ภ.ธ. 20)
                  </Text>
                </Col>
                <Col span={8}>
                  <Upload fileList={fileList}></Upload>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className='row-margin'>
                <Col span={6} className='row-margin'>
                  <Text strong>Memorandum Document (เอกสาร บริคณห์สนธิ)</Text>
                </Col>
                <Col span={8}>
                  <Upload fileList={fileList}></Upload>
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