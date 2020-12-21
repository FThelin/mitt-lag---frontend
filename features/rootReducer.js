import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import navigationSlice from "./navigaton/navigationSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  navigation: navigationSlice.reducer,
});

export default rootReducer;
