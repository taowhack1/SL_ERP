import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Input,
  Tabs,
  Typography,
  DatePicker,
  Radio,
  TimePicker,
  InputNumber,
} from "antd";
import { useHistory } from "react-router-dom";
import { reducer } from "../../reducers";
import Authorize from "../../../system/Authorize";
import CustomSelect from "../../../../components/CustomSelect";
import {
  qcTestItemFields,
  qcTestItemMethodFields,
  qcTestItemSpecFields,
  qcTestItemSubjectFields,
  subject_data,
} from "../../configs/qcTestItemConfig";
import Comments from "../../../../components/Comments";
import MainLayout from "../../../../components/MainLayout";
import { get_log_by_id } from "../../../../actions/comment&log";
import QCItemTestTabPanel from "./QCItemTestTabPanel";
import { getMasterDataItem } from "../../../../actions/inventory";
// import WorkCenterDetail from "./WorkCenterDetail";
const { Text } = Typography;
const { TextArea } = Input;

export const QCContext = React.createContext();
const initialStateSubject = [qcTestItemSubjectFields];
const initialStateSpec = [qcTestItemSpecFields];
const initialStateMethod = [qcTestItemMethodFields];

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

  const [data_head, headDispatch] = useReducer(reducer, {
    user_name: auth.user_name,
    branch_id: auth.branch_id,
    type_id: 1,
    type_name: "Raw Material",
    commit: 1,
  });
  const [subjectData, subjectDispatch] = useReducer(
    reducer,
    initialStateSubject
  );
  const [data_spec, specDispatch] = useReducer(reducer, initialStateSpec);
  const [data_method, methodDispatch] = useReducer(reducer, initialStateMethod);

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
  console.log("head render");
  return (
    <MainLayout {...config}>
      <div id="form">
        <Row className="col-2">
          <Col span={8}>
            <h2>
              <strong>
                {data_head.type_id ? "Edit" : "Create"} Quality Test Case{" "}
                {data_head.type_no_name && "#" + data_head.type_no_name}
              </strong>
            </h2>
          </Col>
          <Col span={16}></Col>
        </Row>
        <Row className="col-2">
          <Col span={24}>
            <Row className="col-2 mt-2" gutter={[32, 0]}>
              <Col span={12}>
                <Row className="col-2 row-margin-vertical">
                  <Col span={6}>
                    <Text strong>
                      <span className="require">* </span>Item Type :
                    </Text>
                  </Col>
                  <Col span={18}>
                    <CustomSelect
                      allowClear
                      showSearch
                      placeholder={"Item type"}
                      name="type_id"
                      field_id="type_id"
                      field_name="type_name"
                      value={data_head.type_name}
                      data={item_type_list}
                      onChange={(data, option) => {
                        data && data
                          ? upDateFormValue({
                              type_id: data,
                              type_no: option.data.type_no,
                              type_name: option.title,
                            })
                          : upDateFormValue({
                              type_id: null,
                              type_no: null,
                              type_name: null,
                            });
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <QCContext.Provider value={contextValue}>
          <QCItemTestTabPanel
          // readOnly={false}
          />
        </QCContext.Provider>
      </div>
      <Comments data={[]} />
    </MainLayout>
  );
};

export default QCItemTestCreate;
