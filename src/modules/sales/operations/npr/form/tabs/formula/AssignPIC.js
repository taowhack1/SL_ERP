import { Col, Divider, message, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";
import Swal from "sweetalert2";
import CustomLabel from "../../../../../../../components/CustomLabel";
import CustomSelect from "../../../../../../../components/CustomSelect";
import { useFetch } from "../../../../../../../include/js/customHooks";
const apiGetRDEmp = `/hrm/employees/rd`;
const AssignPIC = () => {
  const { data: rdEmp, loading: getRDEmpLoading } = useFetch(`${apiGetRDEmp}`);
  const [loading, setLoading] = useState(false);
  const onChange = (val) => {
    message.success("Assign Success.");
    // Swal.fire({
    //   title: "Are you sure your want to assign this person ?.",
    //   text: "",
    //   confirmButtonText: "Yes",
    //   cancelButtonText: "No",
    //   showCancelButton: true,
    // }).then(({ isConfirmed, value }) => {
    //   if (isConfirmed) {
    //     console.log("Confirm assign PIC");
    //     message.success("Assign Success.");
    //   }
    // });
  };
  return (
    <div>
      <h3>Person In Charge ( มอบหมายงาน )</h3>
      <Divider className="divider-sm" />
      <Row
        className="col-2 mt-1 mb-1"
        gutter={16}
        style={{ padding: "0px 20px" }}
      >
        <Col span={12}>
          <Row className="col-2 mt-1 mb-1" gutter={8}>
            <Col span={6}>
              <CustomLabel readOnly={true} label="Person In Charge :" require />
            </Col>
            <Col span={18}>
              <CustomSelect
                allowClear
                showSearch
                placeholder={"เลือกผู้ปฏิบัติงาน"}
                disabled={getRDEmpLoading}
                // size={"small"}
                data={rdEmp ? rdEmp : []}
                field_id="employee_no"
                field_name="employee_no_name"
                // value={val}
                onChange={(val, props) => {
                  // const { trans_id, trans_field_id, item_cost, item_no_name } =
                  //   props.data;
                  val !== undefined
                    ? onChange({
                        //   trans_id,
                        //   trans_field_id,
                      })
                    : onChange({
                        //   trans_id: null,
                        //   trans_field_id: null,
                      });
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col span={12}></Col>
      </Row>
    </div>
  );
};

export default React.memo(AssignPIC);
