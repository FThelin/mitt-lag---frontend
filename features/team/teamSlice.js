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

export const getTeam = createAsyncThunk("teamSlice/getTeam", async (id) => {
  const token = await getAuthHeader();
  const response = await fetch(
    `https://mittlag.herokuapp.com/api/teams/findOne/${id}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...token,
      },
    }
  );

  console.log("inne i async");

  const data = await response.json();

  return data;
});

export const deletePlayerFromTeam = createAsyncThunk(
  "teamSlice/deletePlayerFromTeam",
  async ({ teamId, userId }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/teams/deletePlayer`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...token,
        },
        body: JSON.stringify({ teamId, userId }),
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

export const acceptRequest = createAsyncThunk(
  "teamSlice/acceptRequest",
  async ({ requestId, teamId }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/teams/acceptRequest/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...token,
        },
        body: JSON.stringify({ requestId, teamId }),
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
    activeTeam: null,
    setActiveTeam: true,
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
    [deletePlayerFromTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [deletePlayerFromTeam.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePlayerFromTeam.rejected]: (state) => {
      state.isLoading = false;
    },
    [getTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.activeTeam = action.payload;
      console.log("inne i extra");
    },
    [getTeam.pending]: (state) => {
      state.isLoading = true;
    },
    [getTeam.rejected]: (state) => {
      state.isLoading = false;
    },
    [acceptRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.setActiveTeam = true;
    },
    [acceptRequest.pending]: (state) => {
      state.isLoading = true;
      state.setActiveTeam = false;
    },
    [acceptRequest.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default teamSlice;
