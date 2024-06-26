/** @format */

import moment from "moment";
import { SEARCH_JOB_ORDER } from "../actions/production/jobOrderActions";
import {
  CLEAR_FILTER_PANNING_CALENDAR,
  FILTER_PANNING_CALENDAR,
} from "../actions/production/planningActions";
import { SEARCH_ROUTING } from "../actions/production/routingAction";
import {
  CLOSE_TIMESHEET,
  GET_MACHINE_PLAN,
  GET_TIMESHEET_SCAN_RM_LIST,
  RESET_SCAN_TIMESHEET_RPM_CHECKING,
  RESET_TIMESHEET,
  RESET_TIMESHEET_CONTROLLER,
  SCAN_TIMESHEET_RPM_CHECKING,
  SET_SCAN_TIMESHEET_RPM_CHECKING,
  SET_TIMESHEET,
  SET_TIMESHEET_CONTROLLER,
  START_TIMESHEET,
  UPDATE_TIMESHEET,
  // GET_TIMESHEET_MACHINE,
} from "../actions/production/timesheetActions";
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
  GET_ROUTING_ALL,
  GET_FGITEM,
  GET_ROUTING_ONE,
  GET_PLANNING_CALENDAR_DATA,
} from "../actions/types";

export const initialState = {
  loading: false,
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
    planning: {
      loading: false,
      costCenter: [],
      jobs: [],
      plan: [],
      filter: {
        keyword: null,
        month: moment().format("M"),
        year: moment().format("YYYY"),
        favoriteWorkCenter: [],
      },
    },
    jobOrder: {
      filter: {
        keyword: null,
        mrp_id: null,
        pageSize: 20,
        page: 1,
      },
    },
    timesheet: {
      workCenterID: null,
      plan_job_id: null,
      step: 1,
      closeJob: false,
      selectedWorker: [],
      rpmChecking: {
        progess: 0,
        bulkSpec: [],
      },
      controller: {
        timesheetID: null,
        on_time_sheet_type_id: null,
      },
    },
  },
  routing: {
    routing: {},
    routingList: [],
    filter: {
      keyword: null,
      routing_id: null,
      page: 1,
      pageSize: 20,
    },
  },
  fg: {
    fgList: [],
  },
  timesheet: {
    machine: {
      plan_job_detail: [],
    },
    RMList: [],
    start: {},
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
        loading: false,
        machine: { ...state.machine, machineList: action.payload },
      };
    case GET_MACHINE_BY_ID:
      return {
        ...state,
        machine: { ...state.machine, machine: action.payload },
      };
    case GET_ROUTING_ALL:
      return {
        ...state,
        routing: {
          ...state.routing,
          routingList: action.payload,
        },
      };
    case GET_ROUTING_ONE:
      return {
        ...state,
        routing: {
          ...state.routing,
          routing: action.payload,
        },
      };
    case SEARCH_ROUTING:
      return {
        ...state,
        routing: {
          ...state.routing,
          filter: {
            ...state.routing.filter,
            ...action.payload,
          },
        },
      };
    case GET_FGITEM:
      return {
        ...state,
        fg: {
          ...state.fg,
          fgList: action.payload,
        },
      };
    case RESET_PRODUCTION:
      return initialState;

    // planning: {
    //   loading: false,
    //   costCenter: [],
    //   jobs: [],
    // },

    case GET_PLANNING_CALENDAR_DATA:
      return {
        ...state,
        operations: {
          ...state.operations,
          planning: {
            ...state.operations.planning,
            loading: false,
            ...action.payload,
          },
        },
      };
    case FILTER_PANNING_CALENDAR:
      return {
        ...state,
        operations: {
          ...state.operations,
          planning: {
            ...state.operations.planning,
            filter: {
              ...state.operations.planning.filter,
              ...action.payload,
            },
          },
        },
      };
    case CLEAR_FILTER_PANNING_CALENDAR:
      return {
        ...state,
        operations: {
          ...state.operations,
          planning: {
            ...state.operations.planning,
            filter: initialState.operations.planning.filter,
          },
        },
      };

    // Timesheet
    // case GET_TIMESHEET_MACHINE:
    //   return {
    //     ...state,
    //     timesheet: {
    //       ...state.timesheet,
    //       machine: action.payload,
    //     },
    //   };
    case GET_MACHINE_PLAN:
      return {
        ...state,
        timesheet: {
          ...state.timesheet,
          machine: action.payload,
        },
      };
    case GET_TIMESHEET_SCAN_RM_LIST:
      return {
        ...state,

        timesheet: {
          ...state.timesheet,
          RMList: action.payload,
        },
        loading: false,
      };
    case START_TIMESHEET:
    case UPDATE_TIMESHEET:
    case CLOSE_TIMESHEET:
      return {
        ...state,

        timesheet: {
          ...state.timesheet,
          start: action.payload,
        },
        loading: false,
      };
    case SET_TIMESHEET:
      return {
        ...state,
        operations: {
          ...state.operations,
          timesheet: {
            ...state?.operations?.timesheet,
            ...action.payload,
          },
        },
      };
    case RESET_TIMESHEET:
      return {
        ...state,
        operations: {
          ...state.operations,
          timesheet: initialState.operations.timesheet,
        },
      };

    case SET_TIMESHEET_CONTROLLER:
      return {
        ...state,
        operations: {
          ...state.operations,
          timesheet: {
            ...state?.operations?.timesheet,
            controller: {
              ...state?.operations?.timesheet?.controller,
              ...action.payload,
            },
          },
        },
      };
    case RESET_TIMESHEET_CONTROLLER:
      return {
        ...state,
        operations: {
          ...state.operations,
          timesheet: {
            ...state?.operations?.timesheet,
            controller: initialState.operations.timesheet.controller,
          },
        },
      };
    case SET_SCAN_TIMESHEET_RPM_CHECKING:
      return {
        ...state,
        operations: {
          ...state.operations,
          timesheet: {
            ...state?.operations?.timesheet,
            rpmChecking: {
              ...state?.operations?.timesheet?.rpmChecking,
              ...action.payload,
            },
          },
        },
      };
    case SCAN_TIMESHEET_RPM_CHECKING:
      return {
        ...state,
        operations: {
          ...state.operations,
          timesheet: {
            ...state?.operations?.timesheet,
            rpmChecking: {
              ...state?.operations?.timesheet?.rpmChecking,
              bulkSpec: action.payload,
            },
          },
        },
      };
    case RESET_SCAN_TIMESHEET_RPM_CHECKING:
      return {
        ...state,
        operations: {
          ...state.operations,
          timesheet: {
            ...state?.operations?.timesheet,
            rpmChecking: initialState.operations.timesheet.rpmChecking,
          },
        },
      };
    case SEARCH_JOB_ORDER:
      return {
        ...state,
        operations: {
          ...state?.operations,
          jobOrder: {
            ...state?.operations?.jobOrder,
            filter: {
              ...state?.operations?.jobOrder?.filter,
              ...action?.payload,
            },
          },
        },
      };
    // case CLEAR_FILTER_JOB_ORDER:
    //   return {
    //     ...state,
    //     operations: {
    //       ...state?.operations,
    //       jobOrder: {
    //         ...state?.operations?.jobOrder,
    //         filter: initialState?.operations?.jobOrder,
    //       },
    //     },
    //   };
    default:
      return state;
  }
};
