import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthHeader } from "../jwt";

export const createTeam = createAsyncThunk(
  "teamSlice/createTeam",
  async ({ name, city, sport }, { rejectWithValue }) => {
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
    if (response.status === 400) {
      return rejectWithValue(data);
    }
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

  const data = await response.json();

  return data;
});

export const getUserTeams = createAsyncThunk(
  "teamSlice/getUserTeams",
  async (id) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/users/userTeams/${id}`,
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

export const deleteLeaderFromTeam = createAsyncThunk(
  "teamSlice/deletePlayerFromTeam",
  async ({ teamId, userId }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/teams/deleteLeader`,
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

export const deleteRequest = createAsyncThunk(
  "teamSlice/deleteRequest",
  async ({ teamId, reqId }) => {
    const token = await getAuthHeader();
    const response = await fetch(`https://mittlag.herokuapp.com/api/requests`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...token,
      },
      body: JSON.stringify({ teamId, reqId }),
    });

    const data = await response.json();

    return data;
  }
);

export const changeTeamRole = createAsyncThunk(
  "teamSlice/changeTeamRole",
  async ({ teamId, userId }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/teams/teamRole/`,
      {
        method: "PUT",
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

export const changeActiveTeam = createAsyncThunk(
  "teamSlice/changeActiveTeam",
  async ({ teamId, userId }) => {
    const token = await getAuthHeader();
    const response = await fetch(
      `https://mittlag.herokuapp.com/api/teams/changeTeam/`,
      {
        method: "PUT",
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

const teamSlice = createSlice({
  name: "teamSlice",
  initialState: {
    isLoading: false,
    success: false,
    searchResults: [],
    activeTeam: null,
    setActiveTeam: true,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [createTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.errorMessage = "";
    },
    [createTeam.pending]: (state) => {
      state.isLoading = true;
      state.success = false;
      state.errorMessage = "";
    },
    [createTeam.rejected]: (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.errorMessage = action.payload;
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
      state.setActiveTeam = true;
    },
    [deletePlayerFromTeam.pending]: (state) => {
      state.isLoading = true;
      state.setActiveTeam = false;
    },
    [deletePlayerFromTeam.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteLeaderFromTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.setActiveTeam = true;
    },
    [deleteLeaderFromTeam.pending]: (state) => {
      state.isLoading = true;
      state.setActiveTeam = false;
    },
    [deleteLeaderFromTeam.rejected]: (state) => {
      state.isLoading = false;
    },
    [getTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.activeTeam = action.payload;
    },
    [getTeam.pending]: (state) => {
      state.isLoading = true;
    },
    [getTeam.rejected]: (state) => {
      state.isLoading = false;
    },
    [getUserTeams.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.activeTeam = action.payload;
    },
    [getUserTeams.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserTeams.rejected]: (state) => {
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
    [deleteRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.setActiveTeam = true;
    },
    [deleteRequest.pending]: (state) => {
      state.isLoading = true;
      state.setActiveTeam = false;
    },
    [deleteRequest.rejected]: (state) => {
      state.isLoading = false;
    },
    [changeTeamRole.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.setActiveTeam = true;
    },
    [changeTeamRole.pending]: (state) => {
      state.isLoading = true;
      state.setActiveTeam = false;
    },
    [changeTeamRole.rejected]: (state) => {
      state.isLoading = false;
    },
    [changeActiveTeam.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.setActiveTeam = true;
    },
    [changeActiveTeam.pending]: (state) => {
      state.isLoading = true;
      state.setActiveTeam = false;
    },
    [changeActiveTeam.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default teamSlice;
