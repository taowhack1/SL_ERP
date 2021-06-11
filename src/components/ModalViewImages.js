import { Button, Card, Modal } from "antd";
import React from "react";
import TempImages from "../image/no_image.svg";
const ModalViewImages = ({ visible, onClose, dataSource = [] }) => {
  return (
    <div>
      <Modal
        onCancel={onClose}
        onOk={onClose}
        width="700px"
        visible={visible}
        title="View Images"
        footer={[
          <Button className="primary" onClick={onClose}>
            Close
          </Button>,
        ]}
      >
        <Card>
          {dataSource.map((obj) => (
            <Card.Grid className="card-grid-sm">
              <Card
                cover={
                  <img
                    alt={obj.name || "images"}
                    title={obj.name || "images"}
                    src={obj.path || TempImages}
                    width={150}
                    height={150}
                  />
                }
              ></Card>
            </Card.Grid>
          ))}
        </Card>
      </Modal>
    </div>
  );
};

export default React.memo(ModalViewImages);
