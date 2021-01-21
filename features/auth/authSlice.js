import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

import jwt_decode from "jwt-decode";

const checkLoggedInUser = (state, action) => {
  const decoded = jwt_decode(action);
  state.loggedInUser = decoded;
  return state;
};

export const loginUser = createAsyncThunk(
  "authSlice/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    const response = await fetch(
      "https://mittlag.herokuapp.com/api/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (response.status === 400) {
      return rejectWithValue(data);
    }

    return data;
  }
);

export const logoutUser = createAsyncThunk("authSlice/logoutUser", async () => {
  const response = await fetch(
    "https://mittlag.herokuapp.com/api/auth/logout",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
});

export const registerUser = createAsyncThunk(
  "authSlice/registerUser",
  async ({ firstname, lastname, email, password }, { rejectWithValue }) => {
    const response = await fetch(
      "https://mittlag.herokuapp.com/api/users/register",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      }
    );
    const data = await response.json();

    if (response.status === 400) {
      return rejectWithValue(data);
    }

    return data;
  }
);

export const saveJWT = async (token) => {
  if (Platform.OS === "web") {
    localStorage.setItem("token", token);
  } else {
    await SecureStore.setItemAsync("jwt", token);
  }
};

export const deleteJwt = async () => {
  if (Platform.OS === "web") {
    localStorage.clear();
  } else {
    await SecureStore.deleteItemAsync("jwt");
  }
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    isLoggedIn: false,
    isLoading: false,
    isLeader: false,
    errorMessage: "",
    loggedInUser: {},
  },
  reducers: {
    checkLoggedInUser,
    setLeader: (state, action) => {
      state.isLeader = action.payload;
    },
    updateLoggedInUserActiveTeam: (state, action) => {
      state.loggedInUser = {
        ...state.loggedInUser,
        activeTeam: action.payload,
      };
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.errorMessage = "";
      saveJWT(action.payload);
      checkLoggedInUser(state, action.payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoggedIn = false;
      state.isLoading = true;
      state.errorMessage = "";
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = "";
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = "";
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    [logoutUser.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      deleteJwt();
    },
    [logoutUser.pending]: (state) => {
      state.isLoading = true;
    },
    [logoutUser.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;
export const { setLeader, updateLoggedInUserActiveTeam } = authSlice.actions;
