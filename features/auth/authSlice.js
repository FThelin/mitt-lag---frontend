import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const setLoggedIn = (state, action) => {
    state.isLoggedIn = action.payload
    return state
}

export const loginUser = createAsyncThunk(
    'authSlice/loginUser',
    async ({email, password}) => {
        const response = await fetch("http://localhost:5000/api/auth/login", {
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
          state.Loading = false
          localStorage.setItem("token", action.payload)
        },
        [loginUser.pending]: (state) => { 
            state.isLoggedIn = false         
            state.Loading = true            
        },
        [loginUser.rejected]: (state) => { 
            state.isLoggedIn = false         
            state.Loading = false
            state.showErrorMessage = true            
        },
      }
})

export default authSlice