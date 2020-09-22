import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Button, Input, Comment, Avatar, Tooltip, Divider } from "antd";
import moment from "moment";
export default function Comments(props) {
  return (
    <>
      <div id="comment">
        <Divider orientation="left" plain>
          Comments
        </Divider>
        {props.data &&
          props.data.map((item, index) => {
            return (
              <Comment
                key={index}
                author={item.author}
                avatar={<Avatar icon={<UserOutlined />} />}
                content={<p>{item.content}</p>}
                datetime={
                  <Tooltip title={moment().format(item.datetime)}>
                    <span>{moment(item.datetime).fromNow()}</span>
                  </Tooltip>
                }
              />
            );
          })}
        <Form.Item>
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="primary">
            Add Comment
          </Button>
        </Form.Item>
      </div>
    </>
  );
}
