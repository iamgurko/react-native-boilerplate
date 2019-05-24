import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import CarReducer from './CarReducer';
import StockReducer from "./StockReducer";

export default combineReducers({
  auth: AuthReducer,
  carsState: CarReducer,
  stockState: StockReducer,
});
