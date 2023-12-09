import { createSlice } from "@reduxjs/toolkit"

const browseSlice = createSlice({
    name: 'browse',
    initialState: {
        browseList: {
            list: null,
            isFetching: false,
            err: null
        },

        detailBrowse: {
            browse: null,
            isFetching: false,
            err: null
        },

        browseHistory: {
            browse: null,
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
        //List
        getBrowseStart: (state) => {
            state.browseList.isFetching = true
        },
        getBrowseSuccess: (state, action) => {
            state.browseList.isFetching = false
            state.browseList.list = action.payload
        },
        getBrowseFail: (state) => {
            state.browseList.isFetching = false
            state.browseList.err = true
        },

        //Detail
        getDetailBrowseStart: (state) => {
            state.detailBrowse.isFetching = true
        },
        getDetailBrowseSuccess: (state, action) => {
            state.detailBrowse.isFetching = false
            state.detailBrowse.browse = action.payload
        },
        getDetailBrowseFail: (state) => {
            state.detailBrowse.isFetching = false
            state.detailBrowse.err = true
        },

        //History
        getBrowseHistoryStart: (state) => {
            state.browseHistory.isFetching = true
        },
        getBrowseHistorySuccess: (state, action) => {
            state.browseHistory.isFetching = false
            state.browseHistory.browse = action.payload
        },
        getBrowseHistoryFail: (state) => {
            state.browseHistory.isFetching = false
            state.browseHistory.err = true
        },

        //Approval
        getBrowseConfirmStart: (state) => {
            state.confirm.isFetching = true
        },
        getWBrowseConfirmSuccess: (state, action) => {
            state.confirm.isFetching = false
            state.confirm.message = action.payload
        },
        getBrowseConfirmFail: (state) => {
            state.confirm.isFetching = false
            state.confirm.err = true
        },

    }
})
export const { getBrowseStart, getBrowseSuccess, getBrowseFail, getDetailBrowseStart, getDetailBrowseSuccess, getDetailBrowseFail , getBrowseHistoryFail, getBrowseHistoryStart, getBrowseHistorySuccess, getBrowseConfirmFail, getBrowseConfirmStart, getWBrowseConfirmSuccess} = browseSlice.actions;

export default browseSlice.reducer;