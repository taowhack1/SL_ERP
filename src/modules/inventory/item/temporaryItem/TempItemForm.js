import { message } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  getItemType,
  getSampleItemById,
  getUOM,
} from "../../../../actions/inventory";
import { saveSampleItem } from "../../../../actions/inventory/itemActions";
import { SET_LOADING } from "../../../../actions/types";
import MainLayout from "../../../../components/MainLayout";
import MainLayoutLoading from "../../../../components/MainLayoutLoading";
import TempItemFormHead from "./TempItemFormHead";
import TempItemFormHeadN from "./TempItemFormHeadN";
import TempItemFormTabs from "./TempItemFormTabs";
import TempItemFormTabsN from "./TempItemFormTabsN";

const initialState = {
  type_id: null,
  item_sample_no: null,
  item_sample_name_trade: null,
  user_name: null,
  commit: 1,
  item_sample_remark: null,
  item_sample_name_inci: null,
  item_sample_cost: 0,
  uom_id: null,
};
export const TempItemContext = React.createContext();
const TempItemForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const readOnly = action === "edit" ? false : true;
  console.log("action id props readOnly", action, id, props, readOnly);
  const { user_name } = useSelector((state) => state.auth.authData);
  const [state, setState] = useState(initialState);
  const layoutConfig = useMemo(
    () => ({
      projectId: 3,
      title: "INVENTORY",
      home: "/inventory",
      show: true,
      breadcrumb: ["Inventory", "Master Data", "Temporary Items"],
      search: false,
      create: "",
      save: "function",
      buttonAction: readOnly ? ["Edit", "Back"] : ["Save", "Discard"],
      edit: {
        path: "/inventory/master_data/temp_item/edit/" + id,
        state: state,
      },
      back: "/inventory/master_data/temp_item",
      discard: "/inventory/master_data/temp_item",
      onSave: () => {
        document.getElementById("submit-btn").click();
      },
    }),
    [action]
  );
  const { loading } = useSelector((state) => state.inventory);
  const [masterData, setMasterData] = useState({
    type: [],
    uom: [],
  });

  useEffect(() => {
    dispatch({ type: SET_LOADING, payload: true });
    const getType = async () => {
      if (action !== "create" && (id !== null || id !== undefined)) {
        const respItem = await getSampleItemById(id);
        console.log("respItem", respItem);
        if (respItem.success) {
          setState(respItem.data[0]);
        }
      }
      const respType = await getItemType();
      const respUOM = await getUOM();
      if (respType.status === 200 && respUOM.status === 200) {
        setMasterData({
          type: respType.data[0],
          uom: respUOM.data[0],
        });
      }
      dispatch({ type: SET_LOADING, payload: false });
    };
    getType();
  }, [id, action]);

  const onSubmit = async (data) => {
    console.log("submit data", state);
    const saveData = {
      ...state,
      user_name: user_name,
    };

    const resp = await saveSampleItem(id, saveData);
    if (resp.success) {
      message.success("Save Sucessfully..");
      history.push({
        pathname: "/inventory/master_data/temp_item/view/" + id,
        state: state,
      });
    } else {
      console.log("Error", resp);
    }
  };
  const onChange = (data) => {
    console.log("onChange", data);
    setState({
      ...state,
      ...data,
      commit: 1,
    });
  };
  console.log("state", state);
  return (
    <>
      {loading ? (
        <MainLayoutLoading></MainLayoutLoading>
      ) : (
        <MainLayout {...layoutConfig}>
          <div className="mt-2">
            <TempItemContext.Provider
              value={{
                masterData,
                state,
                onChange,
                readOnly,
              }}
            >
              <div id="form">
                <h1>Create / Edit Temporary Items</h1>
                <TempItemFormHeadN />
                <TempItemFormTabsN />
              </div>
              <button onClick={onSubmit} id="submit-btn" className="d-none">
                Submit
              </button>
            </TempItemContext.Provider>
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default TempItemForm;
