import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message, Radio } from "antd";
import MainLayout from "../../../../components/MainLayout";
import moment from "moment";
import Authorize from "../../../system/Authorize";
import { validateFormHead } from "../../../../include/js/function_main";
import { type_fields, type_fields_require } from "./TypeConfig";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../include/js/context";

const TypeCreate = (props) => {
  const { appContext, setAppContext } = useContext(AppContext);
  console.log("appContext", appContext);
  useEffect(() => {
    setAppContext({ ...appContext, config: { page: "TypeCreate.js" } });
  }, []);
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [data_typeCreate, setData_typeCreate] = useState(
    data && data
      ? { ...data, commit: 1, user_name: auth.user_name }
      : {
          ...type_fields,
          commit: 1,
          user_name: auth.user_name,
          cnv_type_created: moment().format("DD/MM/YYYY"),
        }
  );
  const upDateFormValue = (data) => {
    setData_typeCreate({ ...data_typeCreate, ...data });
  };
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Type",
      data_typeCreate.type_no ? "Edit" : "Create",
      data_typeCreate.type_no &&
        "[ " + data_typeCreate.type_no + " ] " + data_typeCreate.type_name,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/inventory/configurations/type/",
    onSave: (e) => {
      //e.preventDefault();
      console.log("Save");
      const key = "validate";
      const validate = validateFormHead(data_typeCreate, type_fields_require);
      if (validate.validate) {
        console.log("pass");
        console.log(data_typeCreate);
        //data_typeCreate.type_no;
        //     ? dispatch(
        //         update_vendor(data_head.vendor_id, data_head, redirect_to_view)
        //       )
        //     : dispatch(create_vendor(data_head, redirect_to_view));
      } else {
        message.warning({
          content: "Please fill your form completely.",
          key,
          duration: 2,
        });
      }
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };
  const redirect_to_view = (id) => {
    history.push("/inventory/configurations/type/view/");
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_typeCreate.type_no ? "Edit" : "Create"} Item Type{" "}
                {data_typeCreate.type_no && "#" + data_typeCreate.type_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">
              {data_typeCreate.cnv_type_created}
            </Text>
          </Col>
        </Row>
        <Row className="col-2 row-tab-margin">
          <Col span={24} style={{ marginBottom: 8 }}>
            <Title level={5}>
              <span className="require">* </span>Name{" "}
            </Title>
            <Col span={24}>
              <Input
                name="type_name"
                placeholder="Name"
                onChange={(e) => upDateFormValue({ type_name: e.target.value })}
                value={data_typeCreate.type_name}
              />
            </Col>
          </Col>
        </Row>

        <Row className="col-2 row-tab-margin-l">
          <Col span={24}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="require">* </span>
                    Detail
                  </span>
                }
                key="1"
              >
                {/*Information */}
                <Row className="col-2 row-margin-vertical">
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={5}>
                        <Text strong>
                          <span className="require">*</span>Short Name
                        </Text>
                      </Col>
                      <Col span={18}>
                        <Input
                          name="type_no"
                          placeholder={"SRL"}
                          onChange={(e) =>
                            upDateFormValue({ type_no: e.target.value })
                          }
                          value={data_typeCreate.type_no}
                        />
                      </Col>
                      <Col span={1}></Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row className="row-margin">
                      <Col span={1}></Col>
                      <Col span={5}>
                        <Text strong>
                          <span className="require">*</span>QC
                        </Text>
                      </Col>
                      <Col span={18}>
                        <Radio.Group
                          name="qc_status"
                          onChange={(e) =>
                            upDateFormValue({ qc_status: e.target.value })
                          }
                          value={data_typeCreate.qc_status}
                        >
                          <Radio className="radio-vertical" value={1}>
                            Yes
                          </Radio>
                          <Radio className="radio-vertical" value={2}>
                            No
                          </Radio>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Tabs.TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};
export default TypeCreate;
