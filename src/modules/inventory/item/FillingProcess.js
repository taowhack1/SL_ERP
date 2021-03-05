import { Col, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import ItemFileUpload from "./ItemFileUpload";
import { ItemContext } from "../../../include/js/context";
import FillingProcessDetail from "./FillingProcessDetail";
import FillingWeight from "./FillingWeight";
import SelectBulk from "./SelectBulk";

const FillingProcess = (props) => {
  const { readOnly, data_file, updateFile } = useContext(ItemContext);
  return (
    <>
      <SelectBulk {...props} />

      <Row className="col-2 detail-tab-row mt-3 mb-1">
        <Col span={24}>
          <Text strong className="detail-tab-header">
            {"Filling Process Ducument"}
          </Text>
        </Col>
      </Row>
      <Row className="col-2">
        <Col span={12}>
          <Row className="col-2">
            <Col span={7}>
              <Text strong className={"pd-left-2"}>
                {"Ducument"}
              </Text>
            </Col>
            <Col span={10}>
              <ItemFileUpload
                data_file={data_file}
                updateFile={updateFile}
                chkbox_upload_fields={true}
                maxFile={1}
                file_type_id={8}
                upload_type={"Button"}
                readOnly={readOnly}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <FillingWeight {...props} />
      <Row className="col-2 detail-tab-row mt-4 mb-1">
        <Col span={18}>
          <div style={{ position: "absolute", bottom: 0 }}>
            <Text strong className="detail-tab-header">
              {"Filling Process Specify"}
            </Text>
          </div>
        </Col>
      </Row>
      <FillingProcessDetail />
    </>
  );
};

export default React.memo(FillingProcess);
