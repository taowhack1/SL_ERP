import { Col, Input, message, Row, Spin } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getBarcodeDetail,
  scanTimesheetRPMChecking,
  setScanTimesheetRPMChecking,
} from "../../../../../actions/production/timesheetActions";
import CustomLabel from "../../../../../components/CustomLabel";
import { useFetch } from "../../../../../include/js/customHooks";
import { convertDigit } from "../../../../../include/js/main_config";
import { TimesheetContext } from "../TimeSheet";
const initialState = {
  item_part_no: null,
  weight_machine_net: null,
  item_no: null,
};
let countFullfill = 0;
const Scanner = ({ formulaPart = [] }) => {
  const dispatch = useDispatch();
  // const { plan } = form;
  const {
    plan_job_id,
    rpmChecking: { progress, bulkSpec },
  } = useContext(TimesheetContext);

  const [barcode, setBarcode] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);

  // useEffect(() => {
  //   setState(formulaPart || []);
  // }, [formulaPart]);

  const onScanBarcode = async (weight_machine_no) => {
    const el = document.getElementById("input_barcode");
    setLoading(true);
    // if (!bulkSpec.length) return message.error("Missing part of formula.");
    const resp = await getBarcodeDetail(weight_machine_no);
    if (resp.success) {
      // do compare redux
      const { weight_machine_id, weight_machine_net_scan } = resp?.data[0];
      dispatch(
        scanTimesheetRPMChecking(
          bulkSpec.map((obj) =>
            obj.weight_machine_id === weight_machine_id
              ? {
                  ...obj,
                  weight_machine_net_scan,
                  isFullfill:
                    convertDigit(obj.weight_machine_net, 6) ===
                    convertDigit(weight_machine_net_scan, 6),
                }
              : obj
          )
        )
      );

      message.success("Success.");
    }
    setLoading(false);
    el.select();
  };

  useEffect(() => {
    const progress =
      (bulkSpec.filter((obj) => obj?.isFullfill)?.length * 100) /
      bulkSpec.length;
    console.log(`progress : ${progress}`);
    dispatch(setScanTimesheetRPMChecking({ progress }));
    if (convertDigit(progress, 2) === 100.0) {
      message.success("วัตถุดิบครบแล้ว", 4);
    }
  }, [bulkSpec, dispatch]);
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
                      onScanBarcode(e.target.value)
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
                      {barcode?.weight_machine_net_scan || "-"}
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
