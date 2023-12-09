import { createSlice } from "@reduxjs/toolkit"

const ploSlice = createSlice({
    name: 'plo',
    initialState: {
        aplo: {
            allPlo: null,
            isFetching: false,
            err: null
        },

        detailPLO: {
            plo: null,
            isFetching: false,
            err: null
        },

        rating: {
            isFetching: false,
            err: null,
            data: null
        }
    },
    

    reducers: {
        getPLOStart: (state) => {
            state.aplo.isFetching = true
        },
        getPLOSuccess: (state, action) => {
            state.aplo.isFetching = false
            state.aplo.allPlo = action.payload
        },
        getPLOFail: (state) => {
            state.aplo.isFetching = false
            state.aplo.err = true
        },

        getDetailPLOStart: (state) => {
            state.detailPLO.isFetching = true
            state.detailPLO.plo = null
        },
        getDetailPLOSuccess: (state, action) => {
            state.detailPLO.isFetching = false
            state.detailPLO.plo = action.payload
        },
        getDetailPLOFail: (state) => {
            state.detailPLO.isFetching = false
            state.detailPLO.err = true
        },

        getDetailRatingPLOStart: (state) => {
            state.rating.isFetching = true

        },
        getDetailRatingPLOSuccess: (state, action) => {
            state.rating.isFetching = false
            state.rating.data = action.payload
        },
        getDetailRatingPLOFail: (state) => {
            state.rating.isFetching = false
            state.rating.err = true
        },

    }
})
export const { getPLOFail, getPLOStart, getPLOSuccess, getDetailPLOFail, getDetailPLOStart, getDetailPLOSuccess, getDetailRatingPLOStart, getDetailRatingPLOSuccess , getDetailRatingPLOFail} = ploSlice.actions;

export default ploSlice.reducer;