import { BankTwoTone, PlusOutlined } from "@ant-design/icons";
import { Button, Row, Typography } from "antd";
import React from "react";
const { Title } = Typography;
const ButtonGroup = (props) => {
  const { title, customBtn = [] } = props;
  return (
    <div
      style={{
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        border: "1px solid #E5E5E5",
        borderRadius: 7,
      }}
    >
      <Row
        style={{
          marginLeft: 5,
          marginTop: 10,
          marginBottom: 5,
        }}
      >
        {/* Actions Control. */}
        <Title level={5}>{title}</Title>
      </Row>
      <Row style={{ marginLeft: 10, marginTop: 5, marginBottom: 10 }}>
        {customBtn.map((button, key) => {
          return (
            <Button
              key={key}
              className={key === 0 ? "primary" : ""}
              style={{ width: 150, marginRight: 20 }}
              onClick={() => button.action()}
            >
              <PlusOutlined />
              {button.name}
            </Button>
          );
        })}
      </Row>
    </div>
  );
};

export default React.memo(ButtonGroup);
