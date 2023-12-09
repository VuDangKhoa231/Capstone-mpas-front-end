import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: null,
            accessToken: null,
        },

        logout: {
            isFetching: false,
            error: false
        },
    },

    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
            state.login.error = null
        },
        loginSuccess: (state, action) => {
            const { access_token, Admin } = action.payload
            state.login.isFetching = false
            state.login.currentUser = Admin
            state.login.error = null
            state.login.accessToken = access_token
        },
        loginFail1: (state) => {
            state.login.isFetching = false
            state.login.error = 1
        },

        loginFail2 : (state) => {
            state.login.isFetching = false
            state.login.error = 2
        },

        logoutSuccess: (state) => {
            state.logout.isFetching = false
            state.login.currentUser = null
            state.login.accessToken = null
            state.login.error = null
        },
    }
})
export const { loginStart, loginFail1, loginSuccess, logoutSuccess, logoutFail, logoutStart, isAdmin , loginFail2} = authSlice.actions;

export default authSlice.reducer;