import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        loggedIn: false
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        }
    }
})

export const {
    setLoggedIn
} = authSlice.actions
