import React, { useState } from "react";
import { Upload, Modal, Space, Button } from "antd";
import { EyeOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";

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
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </div>
);
const ItemFileUpload = ({
  data_file,
  updateFile,
  readOnly,
  file_type_id,

  upload_type,
  chkbox_upload_fields,
}) => {
  const saveFile = (file_type_id, file_tmp) => {
    if (file_type_id === 1) {
      updateFile({ item_image: file_tmp }, file_type_id);
    } else {
      updateFile({ [file_type_id]: file_tmp }, file_type_id);
    }
  };
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });
  const { previewVisible, previewImage, previewTitle } = state;
  const handleCancel = () => setState({ ...state, previewVisible: false });
  const handleChange = async ({ file, fileList }) => {
    const reader = new FileReader();
    let file_tmp = null;
    if (fileList.length) {
      file_tmp = file;
      // file_tmp = fileList[0];
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        file_tmp.uid = file.uid;
        file_tmp.thumbUrl = e.target.result;
        file_tmp.url = e.target.result;
        // file_tmp.url = e.target.result;
        file_tmp.file = e.target.result;
        file_tmp.commit = 1;
        file_tmp.file_type_id = file_type_id;
        saveFile(file_type_id, file_tmp);
      };
    } else {
      saveFile(file_type_id, file_tmp);
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
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: "download ",
    },
  };

  const get_file_render_by_type = (upload_type, data_file) => {
    let file_temp = [];
    switch (file_type_id) {
      case 1:
        file_temp = data_file.item_image ? [data_file.item_image] : [];
        break;
      default:
        file_temp = data_file.certificate[file_type_id]
          ? [data_file.certificate[file_type_id]]
          : [];
        break;
    }
    switch (upload_type) {
      case "Card":
        return (
          <>
            <Upload
              {...uploadConfig}
              listType="picture-card"
              className="avatar-uploader"
              fileList={file_temp}
              disabled={readOnly}
              onPreview={handlePreview}
            >
              {file_temp.length ? null : uploadButton}
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
                onClick={() => handlePreview(file_temp)}
              />
              View
            </Space>
          </div>
        );
      case "Button":
        return (
          <>
            {readOnly ? (
              chkbox_upload_fields &&
              (file_temp[0].item_file_path ? (
                <Upload
                  {...uploadConfig}
                  fileList={file_temp}
                  disabled={readOnly}
                  onPreview={handlePreview}
                >
                  {readOnly ||
                  (file_temp.length && file_temp[0].item_file_path) ? null : (
                    <Button
                      icon={<UploadOutlined />}
                      disabled={chkbox_upload_fields ? 0 : 1}
                    >
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
                disabled={readOnly}
                onPreview={handlePreview}
              >
                {readOnly ||
                (file_temp.length &&
                  file_temp[0] &&
                  file_temp[0].name) ? null : (
                  <Button
                    icon={<UploadOutlined />}
                    disabled={chkbox_upload_fields ? 0 : 1}
                  >
                    Click to upload
                  </Button>
                )}
              </Upload>
            )}
          </>
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      {get_file_render_by_type(upload_type, data_file ?? [])}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ItemFileUpload;
