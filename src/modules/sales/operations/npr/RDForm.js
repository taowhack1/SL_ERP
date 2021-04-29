import { Checkbox, Col, Input, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import CustomLabel from "../../../../components/CustomLabel";
import MainLayout from "../../../../components/MainLayout";
import RDFormDetail from "./RDFormDetail";
const initialState = {
  npr_responsed_required_by: null,
  npr_responsed_delivery_date: null,
  user_name: null,
  npr_responsed_remark: null,
  tg_trans_status_id: 1,
};
const RDForm = () => {
  const { id } = useParams();
  console.log(id);
  const {
    register,
    formState: { error },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: initialState,
  });
  const layoutConfig = useMemo(
    () => ({
      projectId: 7,
      title: "SALES",
      home: "/sales",
      show: true,
      breadcrumb: ["Sales", "NPR"],
      search: false,
      create: "",
      buttonAction: ["Save", "Discard"],
      edit: {},
      discard: "/sales/npr",
      save: "/sales/npr/" + id,
    }),
    []
  );
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <MainLayout {...layoutConfig}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="form">
            <div
              className="full-width text-center mb-2"
              style={{ borderBottom: "1px solid #c0c0c0" }}
            >
              <h1>NEW PRODUCT REQUISITION FORM</h1>
            </div>
            <Row className="col-2">
              <Col
                span={10}
                // className="col-border-right"
                style={{ padding: 10 }}
              >
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label={"Product Code :"} />
                  </Col>
                  <Col span={14}>
                    <Text>{"Test Information" || "-"}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label={"Customer Code :"} />
                  </Col>
                  <Col span={14}>
                    <Text>{"Test Information" || "-"}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label={"Customer Name :"} />
                  </Col>
                  <Col span={14}>
                    <Text>{"Test Information" || "-"}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label={"Product Name :"} />
                  </Col>
                  <Col span={14}>
                    <Text>{"Test Information" || "-"}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label="Declare weight" />
                  </Col>
                  <Col span={14}>
                    <Text>{"Test Information" || "-"}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label="Contact No./Email" />
                  </Col>
                  <Col span={14}>
                    <Text>{"Test Information" || "-"}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label="Production Line" />
                  </Col>
                  <Col span={14}>
                    <Text>{"Test Information" || "-"}</Text>
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label="Sell to" />
                  </Col>
                  <Col span={14}>
                    <Checkbox id="cbk-sample" />
                    <CustomLabel label={"Export"} />
                    <Checkbox id="cbk-sample" className="ml-4" />
                    <CustomLabel label={"Local"} />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={10}>
                    <CustomLabel label="Ref. Formulation :" />
                  </Col>
                  <Col span={14}>
                    <Text>{"Test Information" || "-"}</Text>
                  </Col>
                </Row>
              </Col>
              <Col span={14} style={{ padding: 10 }}>
                <Row className="col-2">
                  <Col span={12}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <CustomLabel label={"Sample Request"} />
                        <Checkbox id="cbk-sample" className="ml-2" />
                        <CustomLabel label={"Revision"} />
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <CustomLabel label={"Cost Request"} />
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <CustomLabel label={"Other :"} />
                        <Text>{"Test Information" || "-"}</Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={10}>
                        <CustomLabel label="Running No." />
                      </Col>
                      <Col span={14}>
                        <Text>{"Test Information" || "-"}</Text>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={10}>
                        <CustomLabel label="Issued Date :" />
                      </Col>
                      <Col span={14}>
                        <Text>{"Test Information" || "-"}</Text>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={10}>
                        <CustomLabel label="Request Date :" />
                      </Col>
                      <Col span={14}>
                        <Text>{"Test Information" || "-"}</Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="col-2 mt-3">
                  <Col span={24}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={10}>
                        <CustomLabel label="Sample Request Q'ty :" />
                      </Col>
                      <Col span={12} className="text-right">
                        <Text>{"Test Information" || "-"}</Text>
                      </Col>
                      <Col span={2}>
                        <CustomLabel label="pcs." />
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={10}>
                        <CustomLabel label="Launch Timing :" />
                      </Col>
                      <Col span={12}>
                        <Text>{"Test Information" || "-"}</Text>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={10}>
                        <CustomLabel label="Volume / Order :" />
                      </Col>
                      <Col span={12} className="text-right">
                        <Text>{"Test Information" || "-"}</Text>
                      </Col>
                      <Col span={2}>
                        <CustomLabel label="pcs." />
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={10}>
                        <CustomLabel label="Export to (specify country) :" />
                      </Col>
                      <Col span={12}>
                        <Text>{"Test Information" || "-"}</Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="col-2">
              <Col span={24} style={{ padding: 10 }}>
                <Row className="col-2 row-margin-vertical">
                  <Col span={3}>
                    <CustomLabel label={"Customer Group"} />
                  </Col>
                  <Col span={3} offset={9}>
                    <CustomLabel label={"Product Group"} />
                  </Col>
                </Row>
                <Row className="col-2 row-margin-vertical">
                  <Col span={11} offset={1}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <Text className="pd-left-2">
                          <b className="pd-right-1">A</b> High potential
                          customer
                        </Text>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <Text className="pd-left-2">
                          <b className="pd-right-1">B</b> Meduim potential
                          customer (Bauty Clinic , New Brand)
                        </Text>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <Text className="pd-left-2">
                          <b className="pd-right-1">C</b> Others customer
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={11} offset={1}>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <Text className="pd-left-2">
                          <b className="pd-right-1">A</b> New Product
                          development ( 14 days )
                        </Text>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <Text className="pd-left-2">
                          <b className="pd-right-1">B</b> Library formula
                          modification ( 10 days )
                        </Text>
                      </Col>
                    </Row>
                    <Row className="col-2 row-margin-vertical">
                      <Col span={24}>
                        <Checkbox id="cbk-sample" />
                        <Text className="pd-left-2">
                          <b className="pd-right-1">C</b> Library formula ( 7
                          days )
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <RDFormDetail />
          </div>
        </form>
      </MainLayout>
    </>
  );
};

export default RDForm;
