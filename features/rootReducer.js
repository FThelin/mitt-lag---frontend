import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import navigationSlice from "./navigaton/navigationSlice";
import teamSlice from "./team/teamSlice";
import gameSlice from "./game/gameSlice";
import playerResultSlice from "./playerResult/playerResultSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  navigation: navigationSlice.reducer,
  team: teamSlice.reducer,
  game: gameSlice.reducer,
  playerResult: playerResultSlice.reducer,
});

export default rootReducer;
