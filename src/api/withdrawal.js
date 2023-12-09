import { getDetailPLOFail, getDetailPLOStart, getDetailPLOSuccess, getDetailRatingPLOFail, getDetailRatingPLOStart, getDetailRatingPLOSuccess, getPLOFail, getPLOStart, getPLOSuccess } from "../redux/ploSlice";
import { getWithdrawalConfirmFail, getWithdrawalConfirmStart, getWithdrawalConfirmSuccess, getWithdrawalFail, getWithdrawalHistoryFail, getWithdrawalHistoryStart, getWithdrawalHistorySuccess, getWithdrawalStart, getWithdrawalSuccess } from "../redux/withdrawalSlice";
import axiosWrapper from "../ultis/axiosWrapper";

export const getWithdrawalList = async (data, dispatch, accessToken) => {
    let url = `ploTransaction/searchWithdrawalByKeyword?pageNum=${data.pageNum}&pageSize=${data.pageSize}&status=${data.status}`;
    if (data.searchValue && data.searchValue.trim() !== "") {
        url = `ploTransaction/searchWithdrawalByKeyword?keyword=${data.searchValue}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&status=${data.status}`
    }

    dispatch(getWithdrawalStart());
    try {
        const res = await axiosWrapper.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        dispatch(getWithdrawalSuccess(res?.data));

    } catch (error) {
        dispatch(getWithdrawalFail());
    }
}


export const confirmWithdrawal = async (data, dispatch, accessToken) => {
    dispatch(getWithdrawalConfirmStart());
    console.log('dataa nè', accessToken);
    const url = `ploTransaction/updateWithdrawalStatus?status=${data.status}&transactionID=${data.transactionID}`;
    try {
        const res = await axiosWrapper.put(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
        dispatch(getWithdrawalConfirmSuccess(res?.data));
    } catch (error) {
        dispatch(getWithdrawalConfirmFail());
    }
}

