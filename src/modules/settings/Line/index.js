/** @format */

import React from "react";
import MainLayout from "../../../components/MainLayout";
import { LineContext } from "../../../include/js/context";
import Form from "./form/Form";
const Lineindex = () => {
  const layoutConfig = {
    projectId: 11,
    title: "SETTING",
    home: "/Setting",
    show: true,
    breadcrumb: ["Setting", "Line Notify"],
    search: false,
    create: "/setting/notifications/line/create/",
    buttonAction: ["Create"],
    discard: "",
    onSearch: (w) => {
      const text = w.toUpperCase();
    },
  };
  return (
    <>
      <MainLayout {...layoutConfig}></MainLayout>
    </>
  );
};

export default Lineindex;
