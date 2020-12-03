import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Platform } from "react-native"
import * as SecureStore from 'expo-secure-store';

export const setLoggedIn = (state, action) => {
    state.isLoggedIn = action.payload
    return state
}

export const loginUser = createAsyncThunk(
    'authSlice/loginUser',
    async ({email, password}) => {
        const response = await fetch("https://mittlag.herokuapp.com/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
             "Content-Type": "application/json",
             },
            body: JSON.stringify({email, password}),
            });
            
            const data = response.json()
            
            return data
})

export const saveJWT = async (token) => {
    if (Platform.OS === 'web') {
        localStorage.setItem('token', token);
    } else {
        await SecureStore.setItemAsync('jwt', token);
    }
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isLoggedIn: false,
        isLoading: false,
        showErrorMessage: false
    },
    reducers: {
        setLoggedIn
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {          
          state.isLoggedIn = true
          state.isLoading = false
          saveJWT(action.payload)
        },
        [loginUser.pending]: (state) => { 
            state.isLoggedIn = false         
            state.isLoading = true            
        },
        [loginUser.rejected]: (state) => { 
            state.isLoggedIn = false         
            state.isLoading = false
            state.showErrorMessage = true            
        },
      }
})

export default authSlice