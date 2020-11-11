import React from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  Form,
  Button,
  Input,
  Comment,
  Avatar,
  Tooltip,
  Divider,
  Typography,
} from "antd";
import moment from "moment";
const { Text, Title } = Typography;
const Comments = (props) => {
  const getActionColor = (id) => {
    switch (id) {
      case "1":
        return "#FECD2D";
      case "2":
        return "#FE9727";
      case "4":
        return "#50D968";
      case "5":
        return "#1078FC";
      case "6":
        return "red";

      default:
        break;
    }
  };
  return (
    <>
      <div id="comment">
        <Divider orientation="left" plain>
          Comments & Approve Log
        </Divider>
        {props.data &&
          props.data.map((item, index) => {
            return (
              item && (
                <Comment
                  key={index}
                  author={
                    <>
                      <Text
                        style={{
                          color: getActionColor(item.process_status_no),
                        }}
                        strong
                      >
                        {item.stay_decision}
                      </Text>
                    </>
                  }
                  avatar={<Avatar icon={<UserOutlined />} />}
                  content={
                    <>
                      <Text>{item.process_member_remark}</Text>
                    </>
                  }
                  datetime={
                    <Tooltip title={moment().format(item.datetime)}>
                      <span style={{ marginRight: 15 }}>
                        {item.process_member_created}
                      </span>
                      <span>
                        ({" "}
                        {moment(
                          item.process_member_created,
                          "DD/MM/YYYY HH:mm"
                        ).fromNow()}{" "}
                        )
                      </span>
                    </Tooltip>
                  }
                />
              )
            );
          })}
        {/* <Form.Item>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="primary">
            Add Comment
          </Button>
        </Form.Item> */}
      </div>
    </>
  );
};
export default React.memo(Comments);
