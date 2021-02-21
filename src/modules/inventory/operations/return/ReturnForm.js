import { message } from "antd";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getIssueRefList,
  getReturnByID,
  saveIssueReturn,
} from "../../../../actions/inventory/operation/return/returnActions";
import DetailLoading from "../../../../components/DetailLoading";
import FormLayout from "../../../../components/FormLayout";
import MainLayout from "../../../../components/MainLayout";
import { AppContext, ReturnContext } from "../../../../include/js/context";
import {
  sortData,
  validateFormHead,
} from "../../../../include/js/function_main";
import { returnFields, returnRequireFields } from "./config";
import ReturnHead from "./ReturnHead";
import ReturnTabs from "./ReturnTabs";
const initialState = returnFields;
const ReturnForm = () => {
  const { id } = useParams();
  const { auth, currentProject, currentMenu } = useContext(AppContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    ...initialState,
    return_created_by_no_name: auth.employee_no_name_eng,
  });

  const config = {
    projectId: currentProject && currentProject.project_id,
    title: currentProject && currentProject.project_name,
    home: currentProject && currentProject.project_url,
    show: true,
    breadcrumb: [
      "Home",
      "Operations",
      "Return",
      state?.return_id ? "Edit" : "Create",
      state.return_no,
    ],
    search: false,
    buttonAction: ["Save", "Discard"],
    step: {},
    create: `${currentMenu.menu_url}/create/`,
    discard: currentMenu.menu_url,
    back: currentMenu.menu_url,
    save: "function",
    edit: {
      path: `${currentMenu.menu_url}/edit/` + id,
      data: {},
    },
    onSave: (e) => {
      console.log("Save", state);
      const { validate, objKey } = validateFormHead(state, returnRequireFields);
      console.log("validate", validate, objKey);
      if (validate) {
        console.log(state);
        const dataSave = { ...state, user_name: auth.user_name, commit: 1 };
        const save = async (data) =>
          await saveIssueReturn(data)
            .then((res) => {
              console.log(res);
              message.success(
                state.return_id ? "Update Success.." : "Create Created..",
                3
              );
              res.data[0].Success &&
                history.push(
                  `${currentMenu.menu_url}/view/${res.data[0].return_id}`
                );
            })
            .catch((error) => {
              message.error(
                "Error. Somethings went wrong. Please contact programmer"
              );
            });
        save(dataSave);
      } else {
        console.log(state);
      }
    },
  };
  const saveForm = useCallback(
    (data) => {
      setState({ ...state, ...data });
    },
    [state]
  );

  useEffect(() => {
    // setLoading(true);
    const getReturnData = async (id, user_name) =>
      await getReturnByID(id, user_name).then((res) => {
        console.log(res.data[0]);
        setState({
          ...res.data[0],
          return_detail: sortData(res.data[0].return_detail),
        });
        console.log("getReturnByID", res.data);
        setLoading(false);
      });
    const getMasterData = () => {
      dispatch(getIssueRefList());
      setLoading(false);
    };
    console.log("useEffect", id);
    id ? getReturnData(id, auth.user_name) : getMasterData();
  }, [id]);

  const contextValue = useMemo(() => {
    return { data: state, saveForm };
  }, [state, saveForm]);

  return (
    <>
      <ReturnContext.Provider value={contextValue}>
        <MainLayout {...config}>
          {loading ? (
            <DetailLoading />
          ) : (
            <FormLayout>
              <ReturnHead />
              <ReturnTabs />
            </FormLayout>
          )}
        </MainLayout>
      </ReturnContext.Provider>
    </>
  );
};

export default React.memo(ReturnForm);
