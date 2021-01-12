import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthHeader } from "../jwt";

export const getGames = createAsyncThunk(
  "teamSlice/getGames",
  async (teamId) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/game/${teamId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...token,
        },
      }
    );

    const data = await response.json();

    return data;
  }
);

export const getSeasonGames = createAsyncThunk(
  "teamSlice/getSeasonGames",
  async (teamId, season) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/game/${teamId}/${season}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...token,
        },
      }
    );

    const data = await response.json();

    return data;
  }
);

export const createGame = createAsyncThunk(
  "gameSlice/createGame",
  async ({ teamId, homeGame, opponent, date, season }) => {
    const token = await getAuthHeader();
    const response = await fetch("https://mittlag.herokuapp.com/api/teams", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...token,
      },
      body: JSON.stringify({ teamId, homeGame, opponent, date, season }),
    });

    const data = await response.json();

    return data;
  }
);

const gameSlice = createSlice({
  name: "gameSlice",
  initialState: {
    isLoading: false,
    games: [],
    updateGames: true,
  },
  reducers: {},
  extraReducers: {
    [getGames.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
    },
    [getGames.pending]: (state) => {
      state.isLoading = true;
    },
    [getGames.rejected]: (state) => {
      state.isLoading = false;
    },
    [getSeasonGames.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
    },
    [getSeasonGames.pending]: (state) => {
      state.isLoading = true;
    },
    [getSeasonGames.rejected]: (state) => {
      state.isLoading = false;
    },
    [createGame.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.updateGames = true;
    },
    [createGame.pending]: (state) => {
      state.isLoading = true;
      state.updateGames = false;
    },
    [createGame.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default gameSlice;
