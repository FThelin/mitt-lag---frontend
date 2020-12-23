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

const teamSlice = createSlice({
  name: "teamSlice",
  initialState: {
    isLoading: false,
    showCreateTeamErrorMessage: false,
  },
  reducers: {},
  extraReducers: {
    [createTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showCreateTeamErrorMessage = false;
    },
    [createTeam.pending]: (state) => {
      state.isLoading = true;
      state.showCreateTeamErrorMessage = false;
    },
    [createTeam.rejected]: (state) => {
      state.isLoading = false;
      state.showCreateTeamErrorMessage = true;
    },
  },
});

export default teamSlice;
