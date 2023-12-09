import { createSlice } from "@reduxjs/toolkit"

const customerSlice = createSlice ( {
    name: 'customer',
    initialState: {
      customerList: {
        customers: null,
        isFetching: false,
        err: null,
      },
    },

    reducers: {
        getCusStart: (state) => {
            state.customerList.isFetching = true
        },
        getCusSuccess: (state, action) => {
            state.customerList.isFetching = false
            state.customerList.customers = action.payload
        },
        getCusFail : (state) => {
            state.customerList.isFetching = false
            state.customerList.err = true
        },
    }
})
export const {  getCusStart, getCusSuccess, getCusFail} = customerSlice.actions;

export default customerSlice.reducer;