import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import navigationSlice from "./navigaton/navigationSlice";
import teamSlice from "./team/teamSlice";
import gameSlice from "./game/gameSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  navigation: navigationSlice.reducer,
  team: teamSlice.reducer,
  game: gameSlice.reducer,
});

export default rootReducer;
