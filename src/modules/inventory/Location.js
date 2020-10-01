import React, { useState, useEffect } from "react";
import { Row, Col, Table, Modal } from "antd";
import MainLayout from "../../components/MainLayout";
import { columns, locations, warehouses } from "../../data/locationData";
import { Form, Input, Select } from "antd";
import $ from "jquery";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const Location = () => {
  const [locationData, setLocationData] = useState([...locations]);
  const [count, setCount] = useState(locationData.length);
  const [visible, setVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [newLo, setNewLo] = useState({
    locationId: count,
    locationName: null,
    locationDesc: null,
    whId: null,
    whName: null,
  });
  const [editRow, setEditRow] = useState();
  const [rowClick, setRowClick] = useState(false);
  useEffect(() => {}, [newLo]);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const resetValue = () => {
    setNewLo({
      locationId: count,
      locationName: null,
      locationDesc: null,
      whId: null,
      whName: null,
    });
  };

  const projectDetail = JSON.parse(localStorage.getItem("project_detail"));
  const config = {
    projectId: projectDetail.project_id,
    title: projectDetail.project_name,
    home: projectDetail.project_url,
    show: true,
    breadcrumb: ["Home", "Location"],
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
    discard: "/inventory/location",
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
      setLocationData([...locationData, newLo]);
    } else {
      setLocationData(
        locationData.map((location) =>
          location.locationId === editRow.locationId
            ? { ...location, ...editRow }
            : location
        )
      );
    }
    resetValue();
    setVisible(false);
  };
  const onChangeValue = (data) => {
    if (modalTitle === "Create") {
      setNewLo({ ...newLo, ...data });
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
    title: modalTitle + " Location",
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
              columns={columns}
              dataSource={locationData}
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
          initialValues={modalTitle == "Create" ? newLo : editRow}
        >
          <Form.Item
            name={"locationName"}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={"Location Name..."}
              onChange={(e) => onChangeValue({ locationName: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name={"whId"}
            label="Warehouse"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder={"Warehouse"}
              defaultValue={locationData.whName}
              onSelect={(data) =>
                onChangeValue({
                  whName: data,
                })
              }
            >
              {warehouses.map((wh, key) => {
                return (
                  <Option key={key} value={wh.whName}>
                    {wh.whName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name={"locationDesc"} label="Description">
            <Input.TextArea
              placeholder={"Description..."}
              onChange={(e) =>
                onChangeValue({
                  locationDesc: e.target.value,
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Location;
