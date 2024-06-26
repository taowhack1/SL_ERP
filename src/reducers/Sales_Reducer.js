/** @format */

import { UPDATE_FILTER } from "../actions/sales";
import { CUSTOMER_SEARCH } from "../actions/sales/customerActions";
import { SEARCH_DR } from "../actions/sales/drActions";
import {
  GET_NPR_ITEM_LIST,
  GET_NPR_LIST,
  GET_NPR_SMD_MASTER_DATA,
} from "../actions/sales/nprActions";
import {
  SET_QN_LIST,
  RESET_QN,
  GET_ALL_CUSTOMER,
  GET_CUSTOMER_BY_ID,
  GET_SO_LIST,
  GET_MASTER_DATA,
  RESET_ALL_SALES,
  RESET_SO,
  GET_QN_OPEN_SO,
  GET_QN_BY_ID,
  GET_SO_BY_ID,
  SET_LOADING,
  SEARCH_QN,
  SEARCH_NPR,
  SEARCH_NPR_RD,
  SEARCH_NPR_PU,
  SEARCH_NPR_PD,
  SEARCH_NPR_ESTIMATE,
} from "../actions/types";
import dr from "../modules/sales/operations/dr";

const inititalState = {
  loading: false,
  qn: {
    qn_list: [],
    qn_head: {},
    qn_detail: [],
    filter: {
      keyword: null,
      page: 1,
      pageSize: 20,
      qn_id: null,
    },
  },
  so: {
    qn_ref: [],
    so_list: [],
    so_head: {},
    so_detail: [],
    filter: {
      salesType: 3,
      soProductionType: 0,
      keyword: null,
      so_status: null,
      page: 1,
      pageSize: 20,
    },
  },
  operations: {
    npr: {
      itemList: [],
      list: [],
      filter_rd: {
        pageSize: 10,
        page: 1,
        keyword: null,
        npr_id: null,
      },
      filter_pu: {
        pageSize: 10,
        page: 1,
        keyword: null,
        npr_id: null,
      },
      filter_pd: {
        pageSize: 10,
        page: 1,
        keyword: null,
        npr_id: null,
      },
      filter_estimate: {
        pageSize: 10,
        page: 1,
        keyword: null,
        npr_id: null,
      },
    },
    dr: {
      search: {
        keyword: null,
        page: 1,
        status: 1,
      },
    },
    do: {
      search: {
        keyword: null,
        page: 1,
        status: 1,
      },
    },
  },
  customer: {
    search: {
      keyword: null,
      page: 1,
    },
    customer_list: [],
    customer: {},
    customer: {
      data_head: {},
      dataDetail: [],
    },
  },
  master_data: {
    customers: [],
    smd: {},
  },
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_QN_LIST:
      return { ...state, qn: { ...state.qn, qn_list: action.payload } };
    case SEARCH_QN:
      return {
        ...state,
        qn: {
          ...state.qn,
          filter: {
            ...state.qn.filter,
            ...action.payload,
          },
        },
      };
    case GET_QN_BY_ID:
      return { ...state, qn: { ...state.qn, ...action.payload } };
    case RESET_QN:
      return { ...state, qn: { ...inititalState.qn } };
    case RESET_SO:
      return { ...state, so: { ...inititalState.so } };
    case GET_ALL_CUSTOMER:
      return {
        ...state,
        customer: { ...state.customer, customer_list: action.payload },
      };
    case GET_CUSTOMER_BY_ID:
      return {
        ...state,
        customer: { ...state.customer, customer: action.payload },
      };

    case GET_SO_LIST:
      return { ...state, so: { ...state.so, so_list: action.payload } };
    case GET_QN_OPEN_SO:
      return { ...state, so: { ...state.so, qn_ref: action.payload } };
    case GET_SO_BY_ID:
      return { ...state, so: { ...state.so, ...action.payload } };
    case UPDATE_FILTER:
      return {
        ...state,
        so: { ...state.so, filter: { ...state.so.filter, ...action.payload } },
      };
    case GET_MASTER_DATA:
      return { ...state, master_data: { ...action.payload } };
    case GET_NPR_LIST:
      return {
        ...state,
        loading: false,
        operations: {
          ...state.operations,
          npr: {
            ...state.npr,
            list: action.payload,
          },
        },
      };
    case SEARCH_NPR_RD:
      return {
        ...state,
        loading: false,
        operations: {
          ...state.operations,
          npr: {
            ...state.operations.npr,
            filter_rd: {
              ...state.operations.npr.filter_rd,
              ...action.payload,
            },
          },
        },
      };
    case SEARCH_NPR_PU:
      return {
        ...state,
        loading: false,
        operations: {
          ...state.operations,
          npr: {
            ...state.operations.npr,
            filter_pu: {
              ...state.operations.npr.filter_pu,
              ...action.payload,
            },
          },
        },
      };
    case SEARCH_NPR_PD:
      return {
        ...state,
        loading: false,
        operations: {
          ...state.operations,
          npr: {
            ...state.operations.npr,
            filter_pd: {
              ...state.operations.npr.filter_pd,
              ...action.payload,
            },
          },
        },
      };
    case SEARCH_NPR_ESTIMATE:
      return {
        ...state,
        loading: false,
        operations: {
          ...state.operations,
          npr: {
            ...state.operations.npr,
            filter_estimate: {
              ...state.operations.npr.filter_estimate,
              ...action.payload,
            },
          },
        },
      };
    case GET_NPR_ITEM_LIST:
      return {
        ...state,
        loading: false,
        operations: {
          ...state.operations,
          npr: {
            ...state.npr,
            itemList: action.payload,
          },
        },
      };
    case GET_NPR_SMD_MASTER_DATA:
      return {
        ...state,
        loading: false,
        master_data: {
          ...state.master_data,
          smd: action.payload,
        },
      };

    case CUSTOMER_SEARCH:
      return {
        ...state,
        loading: false,
        customer: {
          ...state.customer,
          search: {
            ...state.customer.search,
            ...action.payload,
          },
        },
      };
    case SEARCH_DR:
      return {
        ...state,
        operations: {
          ...state.operations,
          dr: {
            ...state.operations.dr,
            search: {
              ...state.operations.dr.search,
              ...action.payload,
            },
          },
        },
      };
    case RESET_ALL_SALES:
      return inititalState;
    default:
      return state;
  }
};
