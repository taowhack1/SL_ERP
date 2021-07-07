import React from "react";
import { Input, Tabs, Typography } from "antd";
import CustomerDocumentTab from "./CustomerDocumentTab";
import CustomerAddressTab from "./CustomerAddressTab";
import CustomerSalesTab from "./CustomerSalesTab";
import CustomerDetailTab from "./CustomerDetailTab";
import CustomLabel from "../../../../components/CustomLabel";

const { TextArea } = Input;
const { Title, Text } = Typography;

const CustomerTabs = (props) => {
  const {
    dataDetail,
    detailDispatch,
    auth,
    data_head,
    data_file,
    setFile,
    upDateFormValue,
    readOnly,
  } = props;
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane
        tab={
          <CustomLabel require readOnly={readOnly} label="Contact & Detail" />
        }
        key="1"
      >
        {/* Address & Information */}
        <CustomerDetailTab {...props} />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<CustomLabel require readOnly={readOnly} label="Address" />}
        key="2"
      >
        <CustomerAddressTab
          dataDetail={dataDetail}
          readOnly={readOnly}
          detailDispatch={detailDispatch}
          user_name={auth.user_name}
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<CustomLabel require readOnly={readOnly} label="Sales" />}
        key="3"
      >
        {/* CustomerSalesTab.js */}
        <CustomerSalesTab {...props} />
      </Tabs.TabPane>

      <Tabs.TabPane
        tab={<CustomLabel readOnly={readOnly} label="Documents" />}
        key="4"
      >
        <CustomerDocumentTab
          data_head={data_head}
          data_file={data_file}
          setFile={setFile}
          user_name={auth.user_name}
          readOnly={readOnly}
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<CustomLabel readOnly={readOnly} label="Notes" />}
        key="5"
      >
        {readOnly ? (
          <Text className="pre-wrap">{data_head.customer_remark || "-"}</Text>
        ) : (
          <TextArea
            rows={3}
            name="customer_remark"
            placeholder={"Notes"}
            value={data_head.customer_remark}
            onChange={(e) =>
              upDateFormValue({ customer_remark: e.target.value })
            }
          />
        )}
      </Tabs.TabPane>
    </Tabs>
  );
};

export default React.memo(CustomerTabs);
