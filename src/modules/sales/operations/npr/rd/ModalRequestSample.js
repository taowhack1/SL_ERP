import { ConsoleSqlOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, InputNumber, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import Text from "antd/lib/typography/Text";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomLabel from "../../../../../components/CustomLabel";
import CustomSelect from "../../../../../components/CustomSelect";
import { convertDigit } from "../../../../../include/js/main_config";

const ModalRequestSample = ({
  visible = true,
  readOnly = true,
  data,
  onClose,
}) => {
  const modalConfig = {
    title: "Request Sample",
    visible,
    width: 800,
    onOk: onClose,
    onCancel: onClose,
    footer: [
      <Button key="discard" onClick={onClose}>
        Discard
      </Button>,
      <Button key="back" className="primary" onClick={onClose}>
        Save
      </Button>,
    ],
  };
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: data,
  });
  useEffect(() => {
    reset(data);
  }, [data]);
  const {
    npr_additional_created_by_name,
    npr_additional_request_date,
    npr_additional_request_qty,
    npr_additional_remark,
  } = data;
  const watchForm = watch();
  console.log("watchForm", watchForm);
  console.log("data", data);
  return (
    <>
      <Modal {...modalConfig}>
        <div className="form-section">
          <Row className="col-2 mb-1" gutter={[36, 0]}>
            <Col span={12} className="col-border-right">
              <Row className="col-2 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel require readOnly={readOnly} label={"PIC :"} />
                </Col>
                <Col span={16}>
                  <CustomSelect
                    placeholder={"Person in charge"}
                    className="w-100"
                  />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Delivery Date :"}
                  />
                </Col>
                <Col span={16}>
                  <DatePicker placeholder={"Delivery Date"} className="w-100" />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Sample Qty. :"}
                  />
                </Col>
                <Col span={16}>
                  <InputNumber placeholder="Sample Qty" className="w-100" />
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Batch Size :"}
                  />
                </Col>
                <Col span={14}>
                  <InputNumber placeholder="Batch Size" className="w-100" />
                </Col>
                <Col span={2}>
                  <Text strong>Kg.</Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Request By :"}
                  />
                </Col>
                <Col span={16}>
                  <input
                    {...register("npr_additional_created_by")}
                    className="d-none"
                  />
                  <Text>{npr_additional_created_by_name || "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Request Date :"}
                  />
                </Col>
                <Col span={16}>
                  <input
                    {...register("npr_additional_request_date")}
                    className="d-none"
                  />
                  <Text>{npr_additional_request_date || "-"}</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel
                    require
                    readOnly={readOnly}
                    label={"Request Qty. :"}
                  />
                </Col>
                <Col span={16}>
                  <input
                    {...register("npr_additional_request_qty")}
                    className="d-none"
                  />
                  <Text>{convertDigit(npr_additional_request_qty, 4)}</Text>
                </Col>
              </Row>
              <Row className="col-2 mt-1 mb-1" gutter={8}>
                <Col span={8}>
                  <CustomLabel require readOnly={readOnly} label={"Remark :"} />
                </Col>
                <Col span={16}>
                  <Text>Remark</Text>
                  <input
                    {...register("npr_additional_remark")}
                    className="d-none"
                  />
                  <Text className="pre-wrap">
                    {npr_additional_remark || "-"}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default ModalRequestSample;
