import { Tabs } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Text from "antd/lib/typography/Text";
import React from "react";
import CustomLabel from "../../../../components/CustomLabel";
import VendorAddressTab from "./VendorAddressTab";
import VendorDetailTab from "./VendorDetailTab";
import VendorPurchaseTab from "./VendorPurchaseTab";

const VendorTabs = (props) => {
  const { data_head, readOnly, upDateFormValue } = props;
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane
        tab={
          <CustomLabel require readOnly={readOnly} label="Contact & Detail" />
        }
        key="1"
      >
        {/* Address & Information */}
        <VendorDetailTab {...props} />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<CustomLabel require readOnly={readOnly} label="Address" />}
        key="2"
      >
        <VendorAddressTab {...props} />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<CustomLabel require readOnly={readOnly} label="Purchase" />}
        key="3"
      >
        <VendorPurchaseTab {...props} />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<CustomLabel readOnly={readOnly} label="Purchase" />}
        key="4"
      >
        {readOnly ? (
          <Text className="pre-wrap">{data_head.vendor_remark || "-"}</Text>
        ) : (
          <TextArea
            rows={3}
            name="vendor_remark"
            placeholder={"Notes"}
            value={data_head.vendor_remark}
            onChange={(e) => upDateFormValue({ vendor_remark: e.target.value })}
          />
        )}
      </Tabs.TabPane>
    </Tabs>
  );
};

export default VendorTabs;
