import React, { useState, useEffect } from "react";
import { Row, Col, Table, Modal } from "antd";
import MainLayout from "../../components/MainLayout";
import { whColumns, warehouses, companys } from "../../data/locationData";
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
const Warehouse = () => {
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

  const config = {
    title: "INVENTORY",
    show: true,
    breadcrumb: ["Home", "Warehouse"],
    search: true,
    create: "modal",
    edit: "modal",
    openModal: (title) => {
      setModalTitle(title);
      resetValue();
      setVisible(true);
      console.log("modal open");
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
      console.log("modal open");
    },
  };

  const modalSave = () => {
    console.log(modalTitle);
    if (modalTitle === "Create") {
      setCount(count + 1);
      setwarehouseData([...warehouseData, newWh]);
      console.log(newWh);
      console.log(warehouseData);
    } else {
      setwarehouseData(
        warehouseData.map((warehouse) =>
          warehouse.whId === editRow.whId
            ? { ...warehouse, ...editRow }
            : warehouse
        )
      );
      console.log(editRow);
    }
    resetValue();
    setVisible(false);
  };
  const onChangeValue = (data) => {
    console.log(modalTitle);
    if (modalTitle === "Create") {
      setnewWh({ ...newWh, ...data });
      console.log("create :", newWh);
    } else {
      setEditRow({ ...editRow, ...data });
      console.log("edit :", editRow);
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
          initialValues={modalTitle == "Create" ? newWh : editRow}
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
                console.log(data);
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
