import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Table, Modal } from "antd";
import MainLayout from "../../components/MainLayout";
import { Form, Input, Select } from "antd";
import $ from "jquery";
import Authorize from "../system/Authorize";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const Warehouse = () => {
  const { whColumns, warehouses, companys } = [];
  const authorize = Authorize();
  authorize.check_authorize();
  const [warehouseData, setwarehouseData] = useState([...warehouses]);
  const [count, setCount] = useState(warehouseData.length);
  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [newWh, setnewWh] = useState({
    whId: count,
    whName: null,
    whDesc: null,
    companyId: null,
    companyName: null,
  });
  const [editRow, setEditRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  useEffect(() => {}, [newWh]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const resetValue = () => {
    setnewWh({
      locationId: count,
      locationName: null,
      locationDesc: null,
      companyId: null,
      companyName: null,
    });
  };

  const current_project = useSelector((state) => state.auth.currentProject);
  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: ["Home", "Warehouse"],
    search: true,
    create: "modal",
    edit: "modal",
    openModal: (title) => {
      setModalTitle(title);
      resetValue();
      setVisible(true);
    },
    buttonAction: ["Create", "Edit"],
    disabledEditBtn: !rowClick,
    discard: "/inventory/warehouse",
    onCancel: () => {
      console.log("Cancel");
    },
    onCreate: () => {
      console.log("Create");
    },
    onEdit: (title) => {
      setModalTitle(title);
      setVisible(true);
    },
  };

  const modalSave = () => {
    if (modalTitle === "Create") {
      setCount(count + 1);
      setwarehouseData([...warehouseData, newWh]);
    } else {
      setwarehouseData(
        warehouseData.map((warehouse) =>
          warehouse.whId === editRow.whId
            ? { ...warehouse, ...editRow }
            : warehouse
        )
      );
    }
    resetValue();
    setVisible(false);
  };
  const onChangeValue = (data) => {
    if (modalTitle === "Create") {
      setnewWh({ ...newWh, ...data });
    } else {
      setEditRow({ ...editRow, ...data });
    }
  };
  const modalCancel = () => {
    setRowClick(false);
    resetValue();
    setVisible(false);
  };
  const modalConfig = {
    width: 800,
    title: modalTitle + " Warehouse",
    visible: visible,
    onOk: modalSave,
    onCancel: modalCancel,
    destroyOnClose: true,
    okText: "Save",
    cancelText: "Discard",
  };

  return (
    <div>
      <MainLayout {...config}>
        <Row>
          <Col span={24}>
            <Table
              columns={whColumns}
              dataSource={warehouseData}
              onChange={onChange}
              size="small"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => {
                    $(e.target)
                      .closest("tbody")
                      .find("tr")
                      .removeClass("selected-row");
                    $(e.target).closest("tr").addClass("selected-row");

                    setRowClick(true);
                    setEditRow(record);
                  },
                };
              }}
            />
          </Col>
        </Row>
      </MainLayout>
      <Modal {...modalConfig}>
        <Form
          {...layout}
          preserve={false}
          name="nest-messages"
          initialValues={modalTitle === "Create" ? newWh : editRow}
        >
          <Form.Item
            name={"whName"}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={"Warehouse Name..."}
              onChange={(e) => onChangeValue({ whName: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name={"whId"}
            label="Company"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder={"Company"}
              defaultValue={warehouseData.companyName}
              onSelect={(data) => {
                onChangeValue({
                  companyId: data,
                  companyName: data,
                });
              }}
            >
              {companys.map((company, key) => {
                return (
                  <Option key={key} value={company.companyName}>
                    {company.companyName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name={"whDesc"} label="Description">
            <Input.TextArea
              placeholder={"Description..."}
              onChange={(e) =>
                onChangeValue({
                  whDesc: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Warehouse;
