import { Button, Row, Col, InputNumber, Typography, Input } from "antd";
import {
  DeleteTwoTone,
  PlusOutlined,
  EllipsisOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import React, { useContext } from "react";
import {
  qcTestItemSubjectColumns,
  qcTestItemSubjectFields,
} from "../../configs/qcTestItemConfig";
import { QCContext } from "./QCItemTestCreate";

const { Text } = Typography;

const QCItemTestTabSubjectDetail = ({
  readOnly,
  displayFields,
  data_detail,
  detailDispatch,
}) => {
  const { data_head, data_subject, subjectDispatch } = useContext(QCContext);
  const Columns = qcTestItemSubjectColumns;
  const addLine = () => {
    subjectDispatch({
      type: "ADD_ROW",
      payload: { ...qcTestItemSubjectFields, ...data_head },
    });
  };

  const delLine = (id) => {
    subjectDispatch({ type: "DEL_ROW", payload: { id: id } });
  };

  const onChangeValue = (rowId, data) => {
    subjectDispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: data,
      },
    });
  };
  console.log("subject-detail-render");
  return (
    <>
      <Row className="col-2 row-margin-vertical  detail-tab-row">
        <Col span={13} className="text-left">
          <Text strong style={{ fontSize: 16 }}>
            <ProfileOutlined style={{ marginRight: 10 }} /> Subject List
          </Text>
        </Col>
        <Col span={11} className="text-right"></Col>
      </Row>
      {/* Column Header */}
      <div className="detail-form">
        <Row gutter={2} className="detail-table-head">
          {Columns &&
            Columns.map((col, key) => {
              return (
                <Col key={col.id} span={col.size} className="col-outline">
                  {col.require && !readOnly && (
                    <span className="require">* </span>
                  )}
                  <Text strong>{col.name}</Text>
                </Col>
              );
            })}

          <Col span={1} className="col-outline">
            <Text strong>
              <EllipsisOutlined />
            </Text>
          </Col>
        </Row>
        {!readOnly ? (
          <>
            {/* Edit Form */}
            {data_subject.map((line, key) => (
              <Row
                key={line.id}
                style={{
                  margin: "0px 1px",
                  backgroundColor: key % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${key}`}
                gutter={4}
                className="form-row"
              >
                <Col span={1} className="text-center">
                  <Text>{key + 1}</Text>
                </Col>
                <Col span={11} className="text-string">
                  <Input
                    name="qa_subject_name"
                    placeholder={"Subject Name"}
                    onChange={(e) =>
                      onChangeValue(line.id, {
                        qa_subject_name: e.target.value,
                      })
                    }
                    value={line.qa_subject_name}
                    size="small"
                  />
                </Col>
                <Col span={11} className="text-string">
                  <Input
                    name="qa_subject_remark"
                    placeholder={"Description"}
                    onChange={(e) =>
                      onChangeValue(line.id, {
                        qa_subject_remark: e.target.value,
                      })
                    }
                    defaultValue={line.qa_subject_remark}
                    value={line.qa_subject_remark}
                    size="small"
                  />
                </Col>
                <Col span={1} style={{ textAlign: "center" }}>
                  <DeleteTwoTone onClick={() => delLine(line.id)} />
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              // className="primary"
              onClick={() => {
                addLine();
              }}
              style={{ borderRadius: 3, marginTop: 10 }}
              block
            >
              <PlusOutlined /> Add a line
            </Button>
          </>
        ) : (
          <>
            {/* View Form */}
            {data_subject.map((line, key) => (
              <Row
                key={line.id}
                style={{
                  margin: "0px 1px",
                  backgroundColor: key % 2 ? "#F8F8F8" : "#FCFCFC",
                }}
                name={`row-${key}`}
                gutter={4}
                className="form-row"
              >
                <Col span={1} className="text-center">
                  <Text className="text-value">{key + 1}</Text>
                </Col>
                <Col span={11}>
                  <Text className="text-left text-value">
                    {line.qa_subject_name ?? "-"}
                  </Text>
                </Col>
                <Col span={11}>
                  <Text className="text-left text-value">
                    {line.qa_subject_remark ?? "-"}
                  </Text>
                </Col>
              </Row>
            ))}
          </> //close tag
        )}
        {/* end readonly */}
      </div>
    </>
  );
};

export default React.memo(QCItemTestTabSubjectDetail);
