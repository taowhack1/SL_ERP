import { EyeOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import CustomLabel from "./CustomLabel";

const getUploadFile = (type, uploadConfig, readOnly, enable) => {
  let file_temp = [];
  switch (type) {
    case "Card":
      return (
        <>
          <Upload
            {...uploadConfig}
            listType="picture-card"
            className="avatar-uploader"
            fileList={file_temp}
            // onPreview={handlePreview}
          >
            {file_temp.length ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </>
      );
    case "View":
      return (
        <div className="input-center-disabled">
          <Space>
            <EyeOutlined
              className="button-icon"
              title="View Image"
              //   onClick={() => handlePreview(file_temp)}
            />
            View
          </Space>
        </div>
      );
    case "Button":
      return (
        <>
          {readOnly ? (
            enable &&
            (file_temp[0].item_file_path ? (
              <Upload
                {...uploadConfig}
                fileList={file_temp}
                // onPreview={handlePreview}
              >
                {readOnly ||
                (file_temp.length && file_temp[0].item_file_path) ? null : (
                  <Button icon={<UploadOutlined />} disabled={enable ? 0 : 1}>
                    Click to upload
                  </Button>
                )}
              </Upload>
            ) : (
              <Text className="text-view">No file.</Text>
            ))
          ) : (
            <Upload
              {...uploadConfig}
              fileList={file_temp[0] && file_temp[0].name ? file_temp : []}

              //   onPreview={handlePreview}
            >
              {readOnly ||
              (file_temp.length && file_temp[0] && file_temp[0].name) ? null : (
                <Button icon={<UploadOutlined />} disabled={enable ? 0 : 1}>
                  Click to upload
                </Button>
              )}
            </Upload>
          )}
        </>
      );
    default:
      return false;
  }
};
const CustomUpload = ({ readOnly, fileDetail, type = "Button", checkbox }) => {
  const [state, setState] = useState({
    preview: false,
    fileName: null,
    fileSource: null,
    fileType: null,
    fileSize: null,
    uploadType: type,
  });
  const onClose = () => setState({ ...state, visible: false });
  const handleChange = async ({ file, fileList }) => {
    const reader = new FileReader();
    let file_temp = null;
    if (fileList.length) {
      file_temp = file;
      // file_temp = fileList[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        file_temp.uid = file.uid;
        file_temp.thumbUrl = e.target.result;
        file_temp.url = e.target.result;
        // file_temp.url = e.target.result;
        file_temp.file = e.target.result;
        file_temp.commit = 1;
        //   file_temp.file_type_id = file_type_id;
      };
    }
    setState({ ...state, ...file_temp });
  };
  const uploadConfig = {
    beforeUpload: () => false,
    onChange: handleChange,
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "download ",
    },
    disabled: readOnly,
  };
  return (
    <>
      {getUploadFile(state.uploadType, uploadConfig, readOnly, checkbox)}
      <Modal
        visible={state?.preview}
        title={state?.fileName}
        footer={null}
        onCancel={onClose}
      >
        <img
          alt={state?.fileName ?? "Error."}
          className={"full-width"}
          src={state?.fileSource}
        />
      </Modal>
    </>
  );
};

export default React.memo(CustomUpload);
