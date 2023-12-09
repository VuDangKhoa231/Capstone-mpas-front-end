import { getChartCustomerFail, getChartCustomerStart, getChartCustomerSuccess, getChartPLOFail, getChartPLOStart, getChartPLOSuccess, getDashboardCusFail, getDashboardCusStart, getDashboardCusSuccess, getDashboardFail, getDashboardPLOParkingFail, getDashboardPLOParkingRevenueFail, getDashboardPLOParkingRevenueStart, getDashboardPLOParkingRevenueSuccess, getDashboardPLOParkingStart, getDashboardPLOParkingSuccess, getDashboardStart, getDashboardSuccess } from "../redux/dashboardSlice";
import axiosWrapper from "../ultis/axiosWrapper";



export const getDashboard = async (dispatch, accessToken) => {
    dispatch(getDashboardStart());
    try {
        const res = await axiosWrapper.get('/custAndPlo/getTotalCustAndPlo', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(getDashboardSuccess(res.data));
    } catch (error) {
        dispatch(getDashboardFail());
    }
}

export const getDashboardCus = async (data, dispatch, accessToken) => {
    dispatch(getDashboardCusStart());
    try {
        const res = await axiosWrapper.get(`/customer/getTop5Reservation?month=${data.month}&year=${data.year}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(getDashboardCusSuccess(res.data));
    } catch (error) {
        dispatch(getDashboardCusFail());
    }
}


export const getDashboardPLOParking = async (data, dispatch, accessToken) => {
    dispatch(getDashboardPLOParkingStart());
    try {
        const res = await axiosWrapper.get(`/plo/getTop5Parking?month=${data.month}&year=${data.year}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(getDashboardPLOParkingSuccess(res.data));
    } catch (error) {
        dispatch(getDashboardPLOParkingFail());
    }
}

export const getDashboardPLOTop5ParkingRevenue = async (data, dispatch, accessToken) => {
    dispatch(getDashboardPLOParkingRevenueStart());
    try {
        const res = await axiosWrapper.get(`/plo/getTop5ParkingRevenue?month=${data.month}&year=${data.year}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(getDashboardPLOParkingRevenueSuccess(res.data));
    } catch (error) {
        dispatch(getDashboardPLOParkingRevenueFail());
    }
}


export const getChartCustomer = async (data, dispatch, accessToken) => {
    let url = `/customer/registerChartCustomer?month=${data.month}&year=${data.year}`
    dispatch(getChartCustomerStart())
    try {
        const res = await axiosWrapper.get(url ,
            {    headers: {
                Authorization: `Bearer ${accessToken}`
            }})
        dispatch(getChartCustomerSuccess(res?.data))
    } catch (error) {
        dispatch(getChartCustomerFail())
    }
}

export const getChartPLO = async (data, dispatch,accessToken) => {
    let url = `/plo/getChartPLO?month=${data.month}&year=${data.year}`
   
    dispatch(getChartPLOStart())
    try {
        const res = await axiosWrapper.get(url,
            { headers: {
                Authorization: `Bearer ${accessToken}`
            }})
        dispatch(getChartPLOSuccess(res?.data))
    } catch (error) {
        dispatch(getChartPLOFail())
    }
}




