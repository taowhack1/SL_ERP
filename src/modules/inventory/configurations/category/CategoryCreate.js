import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Input, Tabs, Typography, message, Radio } from "antd";
import { useHistory } from "react-router-dom";
import Authorize from "../../../system/Authorize";
import {
  categoryFileds,
  categoryFiledsRequire,
  category_fileds,
} from "./CategoryConfig";
import moment from "moment";
import MainLayout from "../../../../components/MainLayout";
import { validateFormHead } from "../../../../include/js/function_main";
import CustomSelect from "../../../../components/CustomSelect";

const CategoryCreate = (props) => {
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  const history = useHistory();
  const authorize = Authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const current_project = useSelector((state) => state.auth.currentProject);
  const type = useSelector((state) => state.inventory.configurations.type);
  authorize.check_authorize();
  const data =
    props.location && props.location.state ? props.location.state : 0;
  const [dataCategoryCreate, setDataCategoryCreate] = useState(
    data && data
      ? { ...data, commit: 1, user_name: auth.user_name }
      : {
          ...categoryFileds,
          commit: 1,
          user_name: auth.user_name,
          cnvCategoryCreate: moment().format("DD/MM/YYYY"),
        }
  );
  const upDateFormValue = (data) => {
    setDataCategoryCreate({ ...dataCategoryCreate, ...data });
  };
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Category",
      dataCategoryCreate.category_no ? "Edit" : "Create",
      dataCategoryCreate.category_no &&
        " [ " +
          dataCategoryCreate.category_no +
          " ] " +
          dataCategoryCreate.category_name,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    create: "",
    save: "function",
    discard: "/inventory/configurations/category",
    onSave: (e) => {
      const key = "validate";
      const validate = validateFormHead(
        dataCategoryCreate,
        categoryFiledsRequire
      );
      if (validate.validate) {
        console.log("save", dataCategoryCreate);
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
  const redirectToView = (id) => {
    history.push("/inventory/configurations/category/view/");
  };
  return (
    <MainLayout {...config}>
      <div id="form">
        {/* Head */}
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {dataCategoryCreate.category_no ? "Edit" : "Create"} Category{" "}
                {dataCategoryCreate.category_no &&
                  "#" + dataCategoryCreate.category_no}
              </strong>
            </h2>
          </Col>
          <Col span={12}></Col>
          <Col span={2}>
            <Text strong>Create Date :</Text>
          </Col>
          <Col span={2} style={{ textAlign: "right" }}>
            <Text className="text-view">
              {dataCategoryCreate.cnvCategoryCreate}
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
                name="category_name"
                placeholder="Name"
                onChange={(e) =>
                  upDateFormValue({ category_name: e.target.value })
                }
                value={dataCategoryCreate.category_name}
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
                          <span className="require">*</span>Type
                        </Text>
                      </Col>
                      <Col span={18}>
                        <CustomSelect
                          allowClear
                          showSearch
                          placeholder={"Item Type"}
                          name="type_id"
                          field_id="type_id"
                          field_name="type_name"
                          value={dataCategoryCreate.type_id}
                          data={type}
                          onChange={(data, option) => {
                            data && data
                              ? upDateFormValue({
                                  type_id: data,
                                  type_name: option.title,
                                })
                              : upDateFormValue({
                                  type_id: null,
                                  type_name: null,
                                });
                          }}
                        />
                      </Col>
                      <Col span={1}></Col>
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
export default CategoryCreate;
