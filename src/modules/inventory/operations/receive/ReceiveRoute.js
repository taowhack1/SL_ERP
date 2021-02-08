import React from "react";
import ReceiveView from "./Receive_View";
import ReceiveForm from "./Receive_Create";
import { useParams } from "react-router-dom";

const ReceiveRoute = () => {
  const { action, id } = useParams();
  const getReceiveComponent = (action) => {
    switch (action) {
      case "view":
        return <ReceiveView />;
      case "edit":
      case "create":
        return <ReceiveForm />;
      default:
        return <ReceiveView />;
    }
  };
  return <>{getReceiveComponent(action)}</>;
};

export default React.memo(ReceiveRoute);
