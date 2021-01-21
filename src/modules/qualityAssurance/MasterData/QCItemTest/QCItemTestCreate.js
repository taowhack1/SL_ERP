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

import QCItemTestTabPanel from "./QCItemTestTabPanel";
import { getItemType } from "../../../../actions/inventory";
import {
  getQATestByTypeID,
  saveQATestCase,
} from "../../../../actions/qa/qaTestAction";
import { mainReducer } from "../../../../include/reducer";
import SelectItemType from "./SelectItemType";
import { AppContext } from "../../../../include/js/context";

let typeList = [];
getItemType().then(
  (res) =>
    (typeList = res.data[0].filter((type) => type.type_verify_qc === true))
);
export const QCContext = React.createContext();
const initialStateMain = qcTestItemFields;
const initialStateSubject = [qcTestItemSubjectFields];
const initialStateSpecification = [qcTestItemSpecFields];
const initialStateMethod = [qcTestItemMethodFields];

const QCItemTestCreate = (props) => {
  const { auth, current_project } = useContext(AppContext);
  const [pageLoad, setPageLoad] = useState(true);
  const params = useParams();
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const readOnly = false;
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
    const getData = async () =>
      await getQATestByTypeID(params.id).then((res) => {
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
        setPageLoad(false);
      });
    params && getData();
  }, []);

  const config = {
    projectId: current_project && current_project.project_id,
    title: current_project && current_project.project_name,
    home: current_project && current_project.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "QA",
      "Master Data",
      "Quality Test Item",
      data_head.type_no ? "Edit" : "Create",
      data_head.type_no && data_head.type_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    step: {},
    create: "",
    save: "function",
    discard: "/qa/master_data/quality_test_item",
    onSave: (e) => {
      // e.preventDefault();
      console.log("Save");
      const data = {
        type_id: data_head.type_id,
        subjectData: subjectData,
        specData: specificationData,
        methodData: methodData,
      };
      console.log(data);
      saveQATestCase(data);
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
  const redirect_to_view = (id) => {
    history.push("/qa/master_data/quality_test_item/view/" + (id ? id : "new"));
  };
  // const
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
  console.log("QCMain Render..");
  return (
    <MainLayout {...config} pageLoad={pageLoad}>
      <>
        <div id="form">
          <Row className="col-2">
            <Col span={24}>
              <h2>
                <strong>
                  {data_head.type_id ? "Edit" : "Create"} Quality Test Case{" "}
                  {data_head.type_no_name && "#" + data_head.type_no_name}
                </strong>
              </h2>
            </Col>
          </Row>
          <Row className="col-2 mt-2" gutter={[32, 0]}>
            <Col span={12}>
              <SelectItemType
                data_head={data_head}
                readOnly={readOnly}
                item_type={typeList}
                upDateFormValue={upDateFormValue}
              />
            </Col>
          </Row>

          <QCContext.Provider value={contextValue}>
            <QCItemTestTabPanel />
          </QCContext.Provider>
        </div>
        <Comments data={[]} />
      </>
    </MainLayout>
  );
};

export default React.memo(QCItemTestCreate);
