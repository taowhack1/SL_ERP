import React, { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { reducer } from "../../reducers";
import Authorize from "../../../system/Authorize";
import CustomSelect from "../../../../components/CustomSelect";
import {
  qcTestItemSubjectFields,
  subject_data,
} from "../../configs/qcTestItemConfig";
import Comments from "../../../../components/Comments";
import MainLayout from "../../../../components/MainLayout";

import QCItemTestTabPanel from "./QCItemTestTabPanel";
import { getMasterDataItem } from "../../../../actions/inventory";
import ModalCreateQCTestCase from "./ModalCreateQCTestCase";
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;

export const QCContext = React.createContext();
const initialStateSubject = [qcTestItemSubjectFields];

const QCItemTestCreate = (props) => {
  const history = useHistory();
  const authorize = Authorize();
  authorize.check_authorize();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const readOnly = false;

  const data =
    props.location && props.location.state ? props.location.state : 0;
  const current_project = useSelector((state) => state.auth.currentProject);
  const item_type_list = useSelector(
    (state) => state.inventory.master_data.item_type
  );

  const [data_head, headDispatch] = useReducer(reducer, data);
  const [subjectData, subjectDispatch] = useReducer(
    reducer,
    data.qa_subject ?? initialStateSubject
  );

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
      //e.preventDefault();
      console.log("Save");
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

  const addLine = (dispatch) => {
    dispatch({
      type: "ADD_ROW_WOC",
      payload: { ...qcTestItemSubjectFields, ...data_head },
    });
  };

  const delLine = (id, qa_id, dispatch) => {
    if (qa_id !== undefined && qa_id !== null) {
      dispatch({
        type: "CHANGE_DETAIL_VALUE",
        payload: {
          id: id,
          data: { qa_subject_actived: 0, ...data_head },
        },
      });
    } else {
      dispatch({ type: "DEL_ROW", payload: { id: id } });
    }
  };

  const onChangeValue = (rowId, data, dispatch) => {
    dispatch({
      type: "CHANGE_DETAIL_VALUE",
      payload: {
        id: rowId,
        data: { ...data, ...data_head },
      },
    });
  };

  useEffect(() => {
    dispatch(getMasterDataItem(auth.user_name));
    subjectDispatch({
      type: "SET_DETAIL_WOC",
      payload: subject_data,
    });
  }, []);

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
      addLine,
      delLine,
      onChangeValue,
    };
  }, [
    data_head,
    readOnly,
    subjectData,
    subjectDispatch,
    addLine,
    delLine,
    onChangeValue,
  ]);
  console.log("Head render");
  return (
    <MainLayout {...config}>
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
            <Row className="col-2 row-margin-vertical">
              <Col span={6}>
                <Text strong>
                  <span className="require">* </span>Item Type :
                </Text>
              </Col>
              <Col span={18}>
                <Text className="text-value text-left">
                  {data_head.type_no_name}
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>

        <QCContext.Provider value={contextValue}>
          <QCItemTestTabPanel />
        </QCContext.Provider>
      </div>
      <Comments data={[]} />
    </MainLayout>
  );
};

export default React.memo(QCItemTestCreate);
