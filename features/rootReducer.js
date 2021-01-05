import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import navigationSlice from "./navigaton/navigationSlice";
import teamSlice from "./team/teamSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  navigation: navigationSlice.reducer,
  team: teamSlice.reducer,
});

export default rootReducer;
