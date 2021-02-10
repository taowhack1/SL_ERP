import {
  RESET_PRODUCTION,
  GET_ALL_MACHINE,
  GET_ALL_WORK_CENTER,
  GET_MACHINE_BY_ID,
  GET_PRODUCTION_MASTER_DATA,
  GET_WORK_CENTER_BY_ID,
  GET_ALL_MRP,
  GET_MRP_BY_ID,
  GET_MRP_SO_REF,
} from "../actions/types";

export const initialState = {
  workCenter: {
    workCenter: {
      data_head: {},
      data_detail: [],
    },
    workCenterList: [],
  },
  machine: {
    machine: {
      data_head: {},
      data_detail: [],
    },
    machineList: [],
  },
  masterData: {
    machine: {
      itemType: [],
      machineType: [],
      machineCategory: [],
    },
    workCenter: {
      workCenterType: [],
      workCenterCategory: [],
      capacityCategory: [],
    },
  },
  operations: {
    mrp: {
      mrp: {
        data_head: {},
        data_material: [],
        data_so_ref: [],
      },
      mrpList: [],
    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTION_MASTER_DATA:
      return {
        ...state,
        masterData: {
          ...state.masterData,
          ...action.payload,
        },
      };
    case GET_MRP_SO_REF:
      return {
        ...state,
        operations: {
          ...state.operations,
          mrp: {
            ...state.operations.mrp,
            mrp: {
              ...state.operations.mrp.mrp,
              data_so_ref: action.payload,
            },
          },
        },
      };
    case GET_ALL_MRP:
      return {
        ...state,
        operations: {
          ...state.operations,
          mrp: {
            ...state.operations.mrp,
            mrpList: action.payload,
          },
        },
      };
    case GET_MRP_BY_ID:
      return {
        ...state,
        operations: {
          ...state.operations,
          mrp: {
            ...state.operations.mrp,
            mrp: {
              ...state.operations.mrp.mrp,
              ...action.payload,
            },
          },
        },
      };
    case GET_ALL_WORK_CENTER:
      return {
        ...state,
        workCenter: { ...state.workCenter, workCenterList: action.payload },
      };
    case GET_WORK_CENTER_BY_ID:
      return {
        ...state,
        workCenter: {
          ...state.workCenter,
          workCenter: action.payload,
        },
      };
    case GET_ALL_MACHINE:
      return {
        ...state,
        machine: { ...state.machine, machineList: action.payload },
      };
    case GET_MACHINE_BY_ID:
      return {
        ...state,
        machine: { ...state.machine, machine: action.payload },
      };
    case RESET_PRODUCTION:
      return initialState;
    default:
      return state;
  }
};
