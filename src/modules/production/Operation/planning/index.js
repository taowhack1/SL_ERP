import FullCalendar from "@fullcalendar/react";
import React, { useCallback, useState } from "react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { rawData } from "./data";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { BorderOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import CustomLabel from "../../../../components/CustomLabel";

const CustomFullCalendar = () => {
  // const renderEventContent = (info) => (
  //   <span style={{ color: "red" }}>{info.event.text}</span>
  // );
  const [state, setState] = useState(rawData.jobs);
  const [modal, setModal] = useState({
    visible: false,
    data: {},
  });
  console.log(state);
  const openModal = (data) => setModal({ ...modal, visible: true, ...data });
  const closeModal = (data) =>
    setModal({
      visible: false,
      data: {},
    });
  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return "#59FF34";
      case 2:
        return "red";
      // case 3:
      //   return "#50F3FF";
      // case 4:
      //   return "#59FF34";
      default:
        return "red";
    }
  };
  const renderEventContent = (eventInfo) => {
    const props = eventInfo.event._def.extendedProps;
    // console.log("props", props);
    return (
      <>
        <div>
          <div
            className={"text-center"}
            style={{
              // backgroundColor: "white",
              // border: "1px solid #FFC357",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            onClick={() => {
              console.log(eventInfo);
              console.log("data", eventInfo.event._def.extendedProps);
            }}
          >
            {/* Render Job */}
            <div
              style={{
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {props?.jobs.length ? (
                props?.jobs.map((obj, key) => (
                  <div
                    key={key}
                    style={{
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#78FFFD",
                      border: "1px solid #00D8D4 ",
                      width: "100%",
                      marginTop: 5,
                      padding: 2,
                    }}
                    onClick={() =>
                      openModal({ data: obj, visible: !modal.visible })
                    }
                  >
                    <Text strong className="ml-1 mr-1">
                      {obj.title}
                    </Text>
                    <Text strong>{obj.totalHours} hr.</Text>
                    <div
                      style={{
                        backgroundColor: getStatusColor(obj.status),
                        borderRadius: "50%",
                        width: "14px",
                        height: "14px",
                        border: "1px solid gray",
                      }}
                      className={"ml-2"}
                    ></div>
                  </div>
                ))
              ) : (
                <Text className="text-value">{"< - - - ว่าง - - - >"}</Text>
              )}
            </div>
          </div>

          {props.tasks.map((obj, key) => (
            <div
              style={{
                border: "1px solid #FFE3B0",
                // borderRadius: "0px 0px 5px 5px",
                marginTop: 5,
                backgroundColor: "#ffc459",
              }}
              key={key}
            >
              <Row className="col-2 pd-left-1" key={key}>
                <Col span={18}>
                  <Space size={8}>
                    <Text strong>{obj.title}</Text>
                  </Space>
                </Col>
                <Col span={6}>
                  <Text strong>{obj.totalHours ?? "-"}</Text>
                  <Text strong>{" hr."}</Text>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </>
    );
  };

  const configs = {
    resourceAreaWidth: 210,
    plugins: [resourceTimelinePlugin],
    eventContent: { renderEventContent },
    resources: rawData.machine,
    initialView: "resourceTimelineMonth",
    aspectRatio: 2.5,
    timeZone: "UTC",
    initialDate: moment().format("YYYY-MM-DD HH:mm:ss"),

    views: {
      resourceTimelineMonth: {
        slotMinWidth: 160,
        slotLabelFormat: (value) => {
          // console.log(value);
          return (
            moment(value.date.marker).format("ddd") +
            " | " +
            moment(value.date.marker)
              .utc(true)
              .subtract(7, "hours")
              .format("DD/MM/YY")
          );
        },
        businessHours: {
          daysOfWeek: [1, 2, 3, 4, 5],
        },
      },
      resourceTimelineDay: {
        slotLabelFormat: (obj) => {
          return moment(obj.date.marker)
            .utc(true)
            .subtract(7, "hours")
            .format("H:mm");
        },
      },
    },
    eventClick: (info) => {
      info.el.style.backgroundColor = "white";
      // console.log(info);
    },
    nowIndicator: true,
    events: state,
    schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
    timeZone: "UTC",
    headerToolbar: {
      left: "prev,next",
      center: "title",
      right: "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
    },
    editable: true,
    resourceAreaHeaderContent: "Cost Center",
    eventOrder: ["id"],
    resources: rawData.machine,
    eventTimeFormat: {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return (
    <>
      <div style={{ margin: "50px auto", width: "90%", height: 800 }}>
        <FullCalendar {...configs} eventContent={renderEventContent} />
        <Row className="col-2" style={{ height: 50 }}>
          <Col span={20} offset={4}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomLabel label={"Material Status : "} />
              <div
                style={{
                  backgroundColor: "#59FF34",
                  borderRadius: "50%",
                  width: "14px",
                  height: "14px",
                  border: "1px solid gray",
                  marginRight: 10,
                }}
                className={"ml-2"}
              ></div>
              <CustomLabel label={"Ready"} readOnly={true} />
              <div
                style={{
                  backgroundColor: "red",
                  borderRadius: "50%",
                  width: "14px",
                  height: "14px",
                  border: "1px solid gray",
                  marginRight: 10,
                }}
                className={"ml-2"}
              ></div>
              <CustomLabel label={"Not Ready"} readOnly={true} />
              {/* <div
                style={{
                  backgroundColor: "#50F3FF",
                  borderRadius: "50%",
                  width: "14px",
                  height: "14px",
                  border: "1px solid gray",
                  marginRight: 10,
                }}
                className={"ml-2"}
              ></div>
              <CustomLabel label={"In-Process"} readOnly={true} />
              <div
                style={{
                  backgroundColor: "#59FF34",
                  borderRadius: "50%",
                  width: "14px",
                  height: "14px",
                  border: "1px solid gray",
                  marginRight: 10,
                }}
                className={"ml-2"}
              ></div>
              <CustomLabel label={"Complete"} readOnly={true} /> */}
            </div>
          </Col>
        </Row>
        <Modal
          width={800}
          visible={modal.visible}
          footer={
            <Button className="primary" onClick={closeModal}>
              Close
            </Button>
          }
          destroyOnClose
          onCancel={closeModal}
          title={"Detail"}
        >
          <Row className="col-2">
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={6} offset={1}>
                  <CustomLabel label={"Job : "} readOnly={true} />
                </Col>
                <Col span={16}>
                  <Text className="text-value">{modal.data.so_no}</Text>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6} offset={1}>
                  <CustomLabel label={"Plan : "} readOnly={true} />
                </Col>
                <Col span={16}>
                  <Text className="text-value">{modal.data.wo_no}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row className="col-2 row-margin-vertical">
                <Col span={6} offset={1}>
                  <CustomLabel label={"Delivery Date : "} readOnly={true} />
                </Col>
                <Col span={16}>
                  <Text className="text-value pd-left-2">
                    {moment(modal.data.delivery_date, "YYYY-MM-DD").format(
                      "DD/MM/YYYY"
                    )}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      </div>
    </>
  );
};

export default React.memo(CustomFullCalendar);
