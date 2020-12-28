import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthHeader } from "../jwt";

export const createTeam = createAsyncThunk(
  "teamSlice/createTeam",
  async ({ name, city, sport }) => {
    const token = await getAuthHeader();
    const response = await fetch("https://mittlag.herokuapp.com/api/teams", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...token,
      },
      body: JSON.stringify({ name, city, sport }),
    });

    const data = await response.json();

    return data;
  }
);

export const findTeam = createAsyncThunk(
  "teamSlice/findTeam",
  async (query) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/teams/${query}`,
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

export const createRequest = createAsyncThunk(
  "teamSlice/createRequest",
  async ({ teamId, player, message }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/requests/${teamId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...token,
        },
        body: JSON.stringify({ player, message }),
      }
    );

    const data = await response.json();

    return data;
  }
);

const teamSlice = createSlice({
  name: "teamSlice",
  initialState: {
    isLoading: false,
    showCreateTeamErrorMessage: false,
    success: false,
    searchResults: [],
  },
  reducers: {},
  extraReducers: {
    [createTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showCreateTeamErrorMessage = false;
      state.success = true;
    },
    [createTeam.pending]: (state) => {
      state.isLoading = true;
      state.showCreateTeamErrorMessage = false;
      state.success = false;
    },
    [createTeam.rejected]: (state) => {
      state.isLoading = false;
      state.showCreateTeamErrorMessage = true;
      state.success = false;
    },
    [findTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.searchResults = action.payload;
    },
    [findTeam.pending]: (state) => {
      state.isLoading = true;
    },
    [findTeam.rejected]: (state) => {
      state.isLoading = false;
    },
    [createRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [createRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [createRequest.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default teamSlice;
