import { AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Toast } from 'native-base';
import {
  STOCK_FETCH,
  STOCK_FETCH_SUCCESS,
  STOCK_QUERY_FETCH, STOCK_QUERY_FETCH_FAIL,
  STOCK_QUERY_FETCH_SUCCESS
} from './types';
import { STOCK_FETCH_URL, } from '../services/URLs';

export const stockFetch = () => {
  return async (dispatch) => {
    dispatch({ type: STOCK_FETCH });
    try {
      let response = await fetch(STOCK_FETCH_URL);
      const stock = await response.json();
      console.log(stock.data);
      dispatch({ type: STOCK_FETCH_SUCCESS, payload: stock.data });
    }
    catch (e) {
      console.log(e)
    }
  };
};
export const stockQueryFetch = (stockCode) => {
  return async (dispatch) => {
    dispatch({ type: STOCK_QUERY_FETCH });
    try {
      const res = await fetch(STOCK_FETCH_URL + '/' + stockCode);
      console.log('url' +STOCK_FETCH_URL + '/' + stockCode);
      const stocks = await res.json();
      console.log('data'+stocks.data[0].BAKIYE);
      // console.log('response'+res);
      dispatch({ type: STOCK_QUERY_FETCH_SUCCESS, payload: stocks.data});
    }
    catch (e) {
      console.log("Errrrrr" + e);
      dispatch({ type: STOCK_QUERY_FETCH_FAIL});
    }
  };
};
