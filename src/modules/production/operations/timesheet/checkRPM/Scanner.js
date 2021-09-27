import { Col, Input, message, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useState } from "react";
import { getBarcodeDetail } from "../../../../../actions/production/timesheetActions";
import CustomLabel from "../../../../../components/CustomLabel";
import { useFetch } from "../../../../../include/js/customHooks";
import { TimesheetContext } from "../TimeSheet";
const initialState = {
  item_part_no: null,
  weight_machine_net: null,
  item_no: null,
};

const Scanner = () => {
  // const { plan } = form;
  const [barcode, setBarcode] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const getBarcodeRMDetail = async (barcode) => {
    // const el = document.getElementById("input_barcode");
    // setLoading(true);
    // const resp = await getBarcodeDetail(barcode);
    // console.log("GET RM BARCODE ", resp);
    // if (resp.success) {
    //   console.log(resp.data);
    //   if (resp.data.length) {
    //     const data = resp.data[0];
    //     if (data.mrp_id === plan.mrp_id) {
    //       if (
    //         form.rmChecking.RMList.find(
    //           (obj) => obj.weight_machine_no === data.weight_machine_no
    //         ).isScanned
    //       ) {
    //         message.warning("This Barcode is used.");
    //       } else {
    //         message.success("Material has been filled.");
    //         console.log("GET_BARCODE", data);
    //         setBarcode({
    //           item_no: data.item_no,
    //           item_part_no: data.item_part_no,
    //           weight_machine_net_scan: data.weight_machine_net_scan,
    //         });
    //         tsFunction("SCAN_BARCODE", data);
    //       }
    //     } else {
    //       message.error("Error !! Job not match.");
    //     }
    //   } else {
    //     message.warning("Barcode not found.");
    //   }
    // }
    // setTimeout(() => {
    //   setLoading(false);
    //   el.select();
    // }, 500);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <div
          style={{
            width: "70%",
            border: "2px solid #c0c0c0",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0px 0px 5px #c0c0c0",
          }}
        >
          <Row className="col-2 row-margin-vertical">
            <Col span={20}>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel label={"Barcode"} />
                </Col>
                <Col span={16}>
                  <Input
                    placeholder={"Barcode"}
                    autoFocus={true}
                    id={"input_barcode"}
                    // value={weight_machine_no || null}
                    style={{ backgroundColor: "#ECFFF8" }}
                    onChange={(e) =>
                      e.target.value?.length === 13 &&
                      getBarcodeRMDetail(e.target.value)
                    }
                    maxLength={13}
                  />
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel label={"RM Code"} />
                </Col>
                <Col span={16} className="text-right">
                  <Spin spinning={loading}>
                    <Text className="text-value mr-2">
                      {barcode.item_no || "eg. 10xSRLA000xxx"}
                    </Text>
                  </Spin>
                </Col>
              </Row>
              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel label={"Formula Part No."} />
                </Col>
                <Col span={16} className="text-right">
                  <Spin spinning={loading}>
                    <Text className="text-value mr-2">
                      {barcode.item_part_no || "-"}
                    </Text>
                  </Spin>
                </Col>
              </Row>

              <Row className="col-2 row-margin-vertical">
                <Col span={6}>
                  <CustomLabel label={"Net Weight"} />
                </Col>
                <Col span={16} className="text-right">
                  <Spin spinning={loading}>
                    <Text className="text-value mr-2">
                      {barcode.weight_machine_net_scan || "-"}
                    </Text>
                  </Spin>
                </Col>
                <Col span={2}>
                  <Text strong>{"kg"}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <img
                src={require("../../../../../image/barcode-scanner.png")}
                alt="scanner"
                title="scanner"
                width={150}
                height={150}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default React.memo(Scanner);
