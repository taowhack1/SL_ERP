import { Button, Card, Modal } from "antd";
import React from "react";
import TempImages from "../image/no_image.svg";
const ModalViewImages = (
  // {
  // visible,
  // onClose,
  // dataSource = [],
  // field = { name: "name", path: "path" },
  // }
  props
) => {
  const {
    visible,
    onClose,
    dataSource = [],
    field = { name: "name", path: "path" },
    fileServer,
  } = props;
  console.log("modal dataSource", props);
  return (
    <div>
      <Modal
        onCancel={onClose}
        onOk={onClose}
        width="700px"
        visible={visible}
        title="View Images"
        footer={[
          <Button key="close-btn" className="primary" onClick={onClose}>
            Close
          </Button>,
        ]}
      >
        <Card>
          {dataSource.map((obj, index) => {
            console.log(obj);
            return (
              <Card.Grid className="card-grid-sm" key={index}>
                <Card
                  className="pointer"
                  onClick={() =>
                    window.open(
                      `${fileServer}${obj[field.path] || TempImages}`,
                      "_blank"
                    )
                  }
                  cover={
                    <img
                      alt={obj[field.name] || "images"}
                      title={obj[field.name] || "images"}
                      src={`${fileServer}${obj[field.path] || TempImages}`}
                      width={150}
                      height={150}
                    />
                  }
                ></Card>
              </Card.Grid>
            );
          })}
        </Card>
      </Modal>
    </div>
  );
};

export default React.memo(ModalViewImages);
