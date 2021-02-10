import { Col, Input, Row } from "antd";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import { sortData } from "../../../../include/js/function_main";
import CustomLabel from "../../../../components/CustomLabel";
import CustomSelect from "../../../../components/CustomSelect";
import { useSelector } from "react-redux";
import { ReturnContext } from "../../../../include/js/context";

const ReturnHead = () => {
  const { data, saveForm, readOnly } = useContext(ReturnContext);
  const { issueRef } = useSelector(
    (state) => state.inventory.operations.issueReturn
  );
  const onChange = (data) => {
    setState({ ...state, ...data });
  };

  const [state, setState] = useState(data);
  return (
    <>
      <div className="full-width flex-space">
        <Title level={4}>
          {"Return  "}
          <span className="require">
            {readOnly && data.tg_trans_status_id !== 3
              ? "#View"
              : data.return_id && data.tg_trans_status_id !== 3 && "#Edit"}
            {data.tg_trans_status_id === 3 && "#" + data.trans_status_name}
          </span>
        </Title>
        <Text className="text-value">
          <Text strong>{`Create Date : `}</Text>
          {"03/02/2021"}
        </Text>
      </div>
      <hr />
      <Row className="mt-1">
        <Col span={11}>
          {state.return_id && (
            <Row className="col-2 row-margin-vertical">
              <Col span={7}>
                <CustomLabel title="Document Code : " />
              </Col>
              <Col span={16}>
                <Text className="text-value">{state.return_no}</Text>
              </Col>
            </Row>
          )}

          <Row className={"col-2 row-margin-vertical"}>
            <Col span={7}>
              <CustomLabel
                require={readOnly ? false : true}
                title="Issue Ref. :"
              />
            </Col>
            <Col span={16}>
              {state.return_id ? (
                <Text className="text-value">{state.issue_no_description}</Text>
              ) : (
                <CustomSelect
                  allowClear
                  showSearch
                  placeholder={"Issue No."}
                  data={issueRef}
                  name="issue_id"
                  field_id="issue_id"
                  field_name="issue_no_description"
                  value={state.issue_no_description}
                  onChange={(value, obj) =>
                    value
                      ? saveForm({
                          issue_id: obj.data.issue_id,
                          issue_no_description: obj.data.issue_no_description,
                          return_detail: sortData(obj.data.issue_detail),
                        })
                      : saveForm({
                          issue_id: null,
                          issue_no_description: null,
                          return_detail: [],
                        })
                  }
                />
              )}
            </Col>
          </Row>
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <CustomLabel
                require={readOnly ? false : true}
                title="Description : "
              />
            </Col>
            <Col span={16}>
              {readOnly ? (
                <Text className="text-value">{state.return_description}</Text>
              ) : (
                <Input
                  name="return_description"
                  className="full-width"
                  placeholder={"Description"}
                  value={state.return_description}
                  onChange={(e) =>
                    onChange({ return_description: e.target.value })
                  }
                  onBlur={(e) =>
                    saveForm({ return_description: e.target.value })
                  }
                />
              )}
            </Col>
          </Row>
        </Col>
        <Col span={1} />
        <Col span={1} />
        <Col span={11}>
          <Row className="col-2 row-margin-vertical">
            <Col span={7}>
              <CustomLabel title={"Created By : "} />
            </Col>
            <Col span={16}>
              <Text className="text-value">
                {state.return_created_by_no_name}
              </Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default React.memo(ReturnHead);
