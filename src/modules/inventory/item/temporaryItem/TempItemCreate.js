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
import TempItemFormTabs from "./TempItemFormTabs";

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
const TempItemCreate = (props) => {
  //   const data = props.location.state ? props.location.state : 0;
  const history = useHistory();
  console.log("props state", props);
  const dispatch = useDispatch();
  const { action, id } = useParams();
  const { user_name } = useSelector((state) => state.auth.authData);
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
      buttonAction: ["Save", "Discard"],
      edit: {},
      discard: "/inventory/master_data/temp_item",
      onSave: () => {
        document.getElementById("submit-btn").click();
      },
    }),
    []
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: initialState,
  });
  const { loading } = useSelector((state) => state.inventory);
  const [masterData, setMasterData] = useState({
    type: [],
    uom: [],
  });
  const [defaultValue, setDefaultValue] = useState(initialState);

  useEffect(() => {
    dispatch({ type: SET_LOADING, payload: true });
    const getType = async () => {
      console.log("1");
      // if (action !== "create" && (id !== null || id !== undefined)) {
      //   console.log("2");
      //   const respItem = await getSampleItemById(id);
      //   console.log("respItem", respItem);
      //   if (respItem.success) {
      //     console.log("3");
      //     setDefaultValue(respItem.data[0]);
      //     reset(respItem.data[0]);
      //   }
      // }
      const respType = await getItemType();
      const respUOM = await getUOM();
      console.log("4");
      if (respType.status === 200 && respUOM.status === 200) {
        setMasterData({
          type: respType.data[0],
          uom: respUOM.data[0],
        });
      }
      console.log("6");
      dispatch({ type: SET_LOADING, payload: false });
    };
    getType();
  }, [id, action]);

  const onSubmit = async (data) => {
    console.log("submit data", data);
    const saveData = {
      ...data,
      commit: 1,
      user_name: user_name,
    };

    const resp = await saveSampleItem(null, saveData);
    if (resp.success) {
      message.success("Save Sucessfully..");
      console.log(resp.data);
      history.push({
        pathname:
          "/inventory/master_data/temp_item/view/" +
          resp.data[0].item_sample_id,
        state: resp.data[0],
      });
    } else {
      console.log("Error", resp);
    }
  };
  console.log("errors ", errors);
  return (
    <>
      {loading ? (
        <MainLayoutLoading></MainLayoutLoading>
      ) : (
        <MainLayout {...layoutConfig}>
          <div className="mt-2">
            <TempItemContext.Provider
              value={{
                control,
                errors,
                masterData,
                defaultValue,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div id="form">
                  <h1>Create / Edit Temporary Items</h1>
                  <TempItemFormHead />
                  <TempItemFormTabs />
                </div>
                <button type="submit" id="submit-btn" className="d-none">
                  Submit
                </button>
                {/* <button type="reset" id="reset-btn" className="d-none">
                Reset
              </button> */}
              </form>
            </TempItemContext.Provider>
          </div>
        </MainLayout>
      )}
    </>
  );
};

export default TempItemCreate;
