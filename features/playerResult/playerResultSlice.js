import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthHeader } from "../jwt";

export const getPlayerResults = createAsyncThunk(
  "playerResultSlice/getPlayerResults",
  async ({ gameId }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/playerResult/${gameId}`,
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

export const addPlayerResult = createAsyncThunk(
  "playerResultSlice/addPlayerResult",
  async ({ gameId, userId, goals, assists, penalties }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/playerResult/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...token,
        },
        body: JSON.stringify({
          gameId,
          userId,
          goals,
          assists,
          penalties,
        }),
      }
    );

    const data = await response.json();

    return data;
  }
);

export const deletePlayerResult = createAsyncThunk(
  "playerResultSlice/deletePlayerResult",
  async ({ playerResultId, gameId }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/playerResult/${playerResultId}/${gameId}`,
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

const playerResultSlice = createSlice({
  name: "playerResultSlice",
  initialState: {
    isLoading: false,
    updatePlayerResults: false,
  },
  reducers: {},
  extraReducers: {
    [getPlayerResults.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [getPlayerResults.pending]: (state) => {
      state.isLoading = true;
    },
    [getPlayerResults.rejected]: (state) => {
      state.isLoading = false;
    },
    [addPlayerResult.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addPlayerResult.pending]: (state) => {
      state.isLoading = true;
    },
    [addPlayerResult.rejected]: (state) => {
      state.isLoading = false;
    },
    [deletePlayerResult.fulfilled]: (state, action) => {
      state.updatePlayerResults = true;
      state.isLoading = false;
    },
    [deletePlayerResult.pending]: (state) => {
      state.updatePlayerResults = false;
      state.isLoading = true;
    },
    [deletePlayerResult.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default playerResultSlice;
