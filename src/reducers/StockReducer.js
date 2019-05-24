import {
    STOCK_FETCH_SUCCESS,
    STOCK_FETCH,
    STOCK_QUERY_FETCH,
    STOCK_QUERY_FETCH_SUCCESS,
    STOCK_QUERY_FETCH_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	stock: [],
	stocks: [],
	loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  	    case STOCK_FETCH:
      return { ...state, loading: true };
        case STOCK_FETCH_SUCCESS:
      return { ...state, loading: false, stock: action.payload };
        case STOCK_QUERY_FETCH:
      return { ...state, loading: true };
        case STOCK_QUERY_FETCH_SUCCESS:
      return { ...state, loading: false, stocks: action.payload };
        case STOCK_QUERY_FETCH_FAIL:
      return { ...state, loading: false, stocks: null };

    default:
      return state;
  }
};
