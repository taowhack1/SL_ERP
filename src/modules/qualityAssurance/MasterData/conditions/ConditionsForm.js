import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { Row, Col } from "antd";
import { useHistory, useParams } from "react-router-dom";
import Authorize from "../../../system/Authorize";
import {
  qcTestItemFields,
  qcTestItemMethodFields,
  qcTestItemSpecFields,
  qcTestItemSubjectFields,
} from "../../configs/qcTestItemConfig";
import Comments from "../../../../components/Comments";
import MainLayout from "../../../../components/MainLayout";

import QCItemTestTabPanel from "./ConditionsTab";
import {
  getQATestByTypeID,
  saveQAConditions,
} from "../../../../actions/qa/qaTestAction";
import { mainReducer } from "../../../../include/reducer";
import SelectItemType from "./SelectItemType";
import { AppContext } from "../../../../include/js/context";

export const QCContext = React.createContext();
const initialStateMain = qcTestItemFields;
const initialStateSubject = [qcTestItemSubjectFields];
const initialStateSpecification = [qcTestItemSpecFields];
const initialStateMethod = [qcTestItemMethodFields];

const ConditionsForm = (props) => {
  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const { action, id } = useParams();
  const { readOnly } = props?.location?.state ?? {
    readOnly: action !== "view" ? false : true,
  };
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  // const readOnly = false;
  const [loading, setLoading] = useState(true);
  const [data_head, headDispatch] = useReducer(mainReducer, initialStateMain);
  const [subjectData, subjectDispatch] = useReducer(
    mainReducer,
    initialStateSubject
  );
  const [specificationData, specificationDispatch] = useReducer(
    mainReducer,
    initialStateSpecification
  );
  const [methodData, methodDispatch] = useReducer(
    mainReducer,
    initialStateMethod
  );
  useEffect(() => {
    setLoading(true);
    const getData = async () =>
      await getQATestByTypeID(id).then((res) => {
        console.log("getQATestByTypeID", res.data[0]);
        headDispatch({
          type: "SET_HEAD",
          payload: res.data[0],
        });
        subjectDispatch({
          type: "SET_DETAIL_WOC",
          payload: res.data[0].qa_subject,
        });
        specificationDispatch({
          type: "SET_DETAIL_WOC",
          payload: res.data[0].qa_specification,
        });
        methodDispatch({
          type: "SET_DETAIL_WOC",
          payload: res.data[0].qa_method,
        });
        setLoading(false);
      });
    id && getData();
  }, [readOnly]);

  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "QA",
      "Master Data",
      "Conditions",
      data_head.type_no ? "Edit" : "Create",
      data_head.type_no && data_head.type_no,
    ],
    search: false,
    buttonAction:
      action !== "create" && readOnly ? ["Edit", "Back"] : ["Save", "Discard"],
    step: {},
    create: "",
    save: "function",
    discard: currentMenu.menu_url,
    back: currentMenu.menu_url,
    edit: {
      path: `${currentMenu.menu_url}/edit/` + (id ?? "new"),
      data: { readOnly: false },
    },
    onSave: (e) => {
      const redirectToView = () =>
        history.push({
          pathname: `${currentMenu.menu_url}/view/` + (id ?? "new"),
          state: { readOnly: true },
        });
      // e.preventDefault();
      console.log("Save");
      const data = {
        type_id: data_head.type_id,
        subjectData: subjectData,
        specData: specificationData,
        methodData: methodData,
      };
      console.log(data);
      saveQAConditions(data, redirectToView);
      // return () => {

      // };
    },
    onEdit: (e) => {
      //e.preventDefault();
      console.log("Edit");
    },
    onApprove: (e) => {
      //e.preventDefault();
      console.log("Approve");
    },
    onConfirm: () => {
      console.log("Confirm");
    },
  };

  const upDateFormValue = (data) => {
    headDispatch({ type: "CHANGE_HEAD_VALUE", payload: data });
  };
  const contextValue = useMemo(() => {
    return {
      data_head,
      readOnly,
      subjectData,
      subjectDispatch,
      specificationData,
      specificationDispatch,
      methodData,
      methodDispatch,
      commonData: {
        user_name: auth.user_name,
        branch_id: auth.branch_id,
        commit: 1,
        type_id: data_head.type_id,
      },
    };
  }, [data_head, readOnly, subjectData, specificationData, methodData]);
  console.log("itemType");
  return (
    <MainLayout {...config} loading={loading}>
      <>
        <div id="form">
          <>
            <Row className="col-2">
              <Col span={24}>
                <h2>
                  <strong>
                    {!readOnly ? (data_head.type_id ? "Edit " : "Create ") : ""}
                    {"Condition "}
                    {data_head.type_no_name && "#" + data_head.type_no_name}
                  </strong>
                </h2>
              </Col>
            </Row>
            <Row className="col-2 mt-2" gutter={[32, 0]}>
              <Col span={12}>
                <SelectItemType
                  data_head={data_head}
                  action={action}
                  readOnly={readOnly}
                  upDateFormValue={upDateFormValue}
                />
              </Col>
            </Row>

            <QCContext.Provider value={contextValue}>
              <QCItemTestTabPanel />
            </QCContext.Provider>
          </>
        </div>
        <Comments data={[]} />
      </>
    </MainLayout>
  );
};

export default React.memo(ConditionsForm);
