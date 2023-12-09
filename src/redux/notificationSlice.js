import { createSlice } from "@reduxjs/toolkit"

const notificationSlice  = createSlice ( {
    name: 'notification',
    initialState: {
      list: {
        data: null,
        isFetching: false,
        err: null,
      },
    },

    reducers: {
        getNotiStart: (state) => {
            state.list.isFetching = true
        },
        getNotiSuccess: (state, action) => {
            state.list.isFetching = false
            state.list.data = action.payload
        },
        getNotiaFail : (state) => {
            state.list.isFetching = false
            state.list.err = true
        },
    }
})

export const {  getNotiStart, getNotiSuccess, getNotiaFail} = notificationSlice.actions;

export default notificationSlice.reducer;