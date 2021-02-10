import { Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useContext } from "react";
import CustomRemark from "../../../../components/CustomRemark";
import { ReturnContext } from "../../../../include/js/context";
import ReturnDetail from "./ReturnDetail";
const { TabPane } = Tabs;
const ReturnTabs = () => {
  const { data, saveForm, readOnly } = useContext(ReturnContext);
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        size={"small"}
        style={{ marginBottom: 32 }}
        className="mt-4"
      >
        <TabPane tab={"Detail"} key="1">
          <ReturnDetail />
        </TabPane>
        <TabPane tab="Notes" key="2">
          {readOnly ? (
            <Text className="text-value">{data.return_remark ?? "-"}</Text>
          ) : (
            <CustomRemark
              fields={{
                name: "return_remark",
                value: data.return_remark,
                placeholder: "Remark",
              }}
              saveForm={saveForm}
            />
          )}
        </TabPane>
      </Tabs>
    </>
  );
};

export default ReturnTabs;
