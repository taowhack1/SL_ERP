import React, { Component, useState } from "react";
import { Row, Col, Table, Modal } from "antd";
import MainLayout from "../../components/MainLayout";
import { columns, locations, warehouse } from "../../data/locationData";
import { Form, Input, Select } from "antd";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const Location = () => {
  const [locationData, setLocationData] = useState([...locations]);
  const [count, setCount] = useState(locationData.length);
  // console.log(locationData);
  const [visible, setVisible] = useState(false);
  const [newLo, setNewLo] = useState({
    locationId: count,
    locationName: null,
    locationDesc: null,
    whId: null,
    whName: null,
  });
  const [rowClick, setRowClick] = useState(false);
  const [rowId, setRowId] = useState(0);
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
  const OpenModal = (type) => {
    if (type === "create") {
      resetValue();
    }
    setVisible(true);
  };
  const config = {
    title: "INVENTORY",
    show: true,
    breadcrumb: ["Home", "Location"],
    search: true,
    create: "modal",
    openModal: () => {
      OpenModal("create");
    },
    buttonAction: ["Create", "Edit"],
    disableEdit: rowClick ? false : true,
    discard: "/inventory/location",
    onCancel: () => {
      console.log("Cancel");
    },
    onCreate: () => {
      console.log("Create");
    },
    onEdit: () => {
      OpenModal("edit");
    },
  };
  const modalConfig = {
    width: 800,
    title: "Create Location",
    visible: visible,
    onOk: modalSave,
    onCancel: modalCancel,
    destroyOnClose: true,
    okText: "Save",
    cancelText: "Discard",
  };

  const modalSave = () => {
    // setLocationData([...locationData, { ...newLo }]);
    const isEditRow = locationData.filter(
      (location) => location.locationId === newLo.locationId
    ).length;
    if (isEditRow) {
      setLocationData(
        locationData.map((location) =>
          location.locationId === newLo.locationId
            ? { ...location, ...newLo }
            : location
        )
      );
    } else {
      setCount(count + 1);
      setLocationData([...locationData, newLo]);
    }

    setVisible(false);
  };

  const onChangeValue = (data) => {
    setNewLo({ ...newLo, ...data });
  };
  const modalCancel = () => {
    setVisible(false);
    setRowClick(false);
    resetValue();
  };

  const changeRow = (rowIndex) => {
    setRowClick(true);
    setRowId(rowIndex);
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
                    console.log(record);
                    rowId === rowIndex
                      ? setRowClick(!rowClick)
                      : changeRow(rowIndex, e);
                    setNewLo(record);
                  },
                  onDoubleClick: () => {
                    console.log(record, rowIndex);
                  },
                  onContextMenu: () => {
                    console.log(record, rowIndex);
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
          // onFinish={onFinish}
          validateMessages={validateMessages}
          initialValues={newLo}
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
              onSelect={(data) =>
                onChangeValue({
                  whId: data,
                })
              }
            >
              {warehouse.map((wh, key) => {
                return (
                  <Option key={key} value={wh.whId}>
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
