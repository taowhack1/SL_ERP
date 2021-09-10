/** @format */

import React, { useMemo, useState } from "react";
import { useParams } from "react-router";
import MainLayout from "../../../components/MainLayout";
import { LineContext } from "../../../include/js/context";
import Form from "./form/Form";
const LineForm = () => {
  const [config, setConfig] = useState({
    readOnly: false,
    loading: false,
  });
  const setLoading = (bool) =>
    setConfig((prev) => ({ ...prev, loading: bool }));
  const { id } = useParams();
  const layoutConfig = useMemo(
    () => ({
      projectId: 11,
      title: "SETTING",
      home: "/Setting",
      show: true,
      breadcrumb: ["Setting", "Line Notify", "Create"],
      search: false,
      create: "",
      buttonAction: ["Save", "Discard"],

      discard: "/setting/notifications/line",
      save: "function",
      onSave: async () => {
        setLoading(true);
        setLoading(false);
      },
    }),
    []
  );
  return (
    <>
      <MainLayout {...layoutConfig}>
        <LineContext.Provider>
          <Form />
        </LineContext.Provider>
      </MainLayout>
    </>
  );
};

export default LineForm;
