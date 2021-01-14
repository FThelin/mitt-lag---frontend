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

export const createGame = createAsyncThunk(
  "gameSlice/createGame",
  async ({
    teamId,
    homeGame,
    goals,
    opponentGoals,
    opponent,
    date,
    season,
  }) => {
    const token = await getAuthHeader();
    const response = await fetch("https://mittlag.herokuapp.com/api/game", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...token,
      },
      body: JSON.stringify({
        teamId,
        homeGame,
        goals,
        opponentGoals,
        opponent,
        date,
        season,
      }),
    });

    const data = await response.json();

    return data;
  }
);

export const updateGame = createAsyncThunk(
  "gameSlice/updateGame",
  async ({
    gameId,
    homeGame,
    goals,
    opponentGoals,
    opponent,
    date,
    season,
  }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      "https://mittlag.herokuapp.com/api/game/updateGame",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...token,
        },
        body: JSON.stringify({
          gameId,
          homeGame,
          goals,
          opponentGoals,
          opponent,
          date,
          season,
        }),
      }
    );

    const data = await response.json();

    return data;
  }
);

export const deleteGame = createAsyncThunk(
  "gameSlice/deleteGame",
  async ({ teamId, gameId }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/game/${teamId}/${gameId}`,
      {
        method: "DELETE",
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
    [updateGame.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.updateGames = true;
    },
    [updateGame.pending]: (state) => {
      state.isLoading = true;
      state.updateGames = false;
    },
    [updateGame.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteGame.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.updateGames = true;
    },
    [deleteGame.pending]: (state) => {
      state.isLoading = true;
      state.updateGames = false;
    },
    [deleteGame.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default gameSlice;
