import { createSlice } from "@reduxjs/toolkit"

const withdrawalSlice = createSlice({
    name: 'withdrawal',
    initialState: {
        withdrawalList: {
            list: null,
            isFetching: false,
            err: null
        },

        withdrawalHistory: {
            list: null,
            isFetching: false,
            err: null
        },

        confirm : {
            isFetching : false,
            err: null,
            message: null
        }
    },

    reducers: {
        getWithdrawalStart: (state) => {
            state.withdrawalList.isFetching = true
        },
        getWithdrawalSuccess: (state, action) => {
            state.withdrawalList.isFetching = false
            state.withdrawalList.list = action.payload
        },
        getWithdrawalFail: (state) => {
            state.withdrawalList.isFetching = false
            state.withdrawalList.err = true
        },
      
        getWithdrawalHistoryStart: (state) => {
            state.withdrawalHistory.isFetching = true
        },
        getWithdrawalHistorySuccess: (state, action) => {
            state.withdrawalHistory.isFetching = false
            state.withdrawalHistory.list = action.payload
        },
        getWithdrawalHistoryFail: (state) => {
            state.withdrawalHistory.isFetching = false
            state.withdrawalHistory.err = true
        },

        getWithdrawalConfirmStart: (state) => {
            state.confirm.isFetching = true
        },
        getWithdrawalConfirmSuccess: (state, action) => {
            state.confirm.isFetching = false
            state.confirm.message = action.payload
        },
        getWithdrawalConfirmFail: (state) => {
            state.confirm.isFetching = false
            state.confirm.err = true
        },
        
    }
})
export const { getWithdrawalStart,getWithdrawalSuccess ,getWithdrawalFail ,getWithdrawalHistoryStart ,getWithdrawalHistorySuccess ,getWithdrawalHistoryFail, getWithdrawalConfirmStart, getWithdrawalConfirmSuccess, getWithdrawalConfirmFail} = withdrawalSlice.actions;

export default withdrawalSlice.reducer;