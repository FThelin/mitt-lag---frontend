import { createSlice } from "@reduxjs/toolkit"

export const setLoggedIn = (state, action) => {
    state.loggedIn = action.payload
    return state
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        loggedIn: false
    },
    reducers: {
        setLoggedIn
    }
})

export default authSlice