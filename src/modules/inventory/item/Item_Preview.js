import React, { useState } from "react";
import { Upload, Modal, Space } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ItemPreview = ({ image_file }) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });
  const handleCancel = () => setState({ ...state, previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      //   file.preview = await getBase64(file.originFileObj);
      file.preview = await require("./no_image.svg");
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  const { previewVisible, previewImage, previewTitle } = state;
  return (
    <>
      <div className="input-center-disabled">
        <Space>
          <EyeOutlined
            className="button-icon"
            title="View Image"
            onClick={() => handlePreview(image_file)}
          />
          View
        </Space>
      </div>
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

export default React.memo(ItemPreview);
