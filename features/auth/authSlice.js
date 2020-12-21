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
  async ({ email, password }) => {
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
  async ({ firstname, lastname, email, password }) => {
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

export const getJWT = async () => {
  if (Platform.OS === "web") {
    const token = localStorage.getItem("token");
    return token;
  } else {
    const jwt = await SecureStore.getItemAsync("jwt");
    return jwt;
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
    showLoginErrorMessage: false,
    showRegisterErrorMessage: false,
    loggedInUser: {},
  },
  reducers: {
    checkLoggedInUser,
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.showLoginErrorMessage = false;
      saveJWT(action.payload);
      checkLoggedInUser(state, action.payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoggedIn = false;
      state.isLoading = true;
      state.showLoginErrorMessage = false;
    },
    [loginUser.rejected]: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.showLoginErrorMessage = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showRegisterErrorMessage = false;
    },
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.showRegisterErrorMessage = false;
    },
    [registerUser.rejected]: (state) => {
      state.isLoading = false;
      state.showRegisterErrorMessage = true;
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

export default authSlice;
