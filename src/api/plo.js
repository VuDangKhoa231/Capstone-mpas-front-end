import { getDetailPLOFail, getDetailPLOStart, getDetailPLOSuccess, getDetailRatingPLOFail, getDetailRatingPLOStart, getDetailRatingPLOSuccess, getPLOFail, getPLOStart, getPLOSuccess } from "../redux/ploSlice";
import axiosWrapper from "../ultis/axiosWrapper";

export const getPLOlist = async (data, dispatch, accessToken) => {
  let url =  `/plo/getPloByParkingStatus?pageNum=${data.pageNum}&pageSize=${data.pageSize}&status=${data.status}`;
  if (data.searchValue && data.searchValue.trim() !== "") {
    url = `/plo/searchListPloByKeywords?keyword=${data.searchValue}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&parkingStatus=${data.status}`
  }
  dispatch(getPLOStart());
  try {
    const res = await axiosWrapper.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    dispatch(getPLOSuccess(res?.data));

  } catch (error) {
    dispatch(getPLOFail());
  }
}


export const getDetailPLO = async (ploId, dispatch, accessToken) => {
  dispatch(getDetailPLOStart());
  try {

    const res = await axiosWrapper.get(`/plo/getDetailPlo?ploID=${ploId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    dispatch(getDetailPLOSuccess(res?.data));
  } catch (error) {
    dispatch(getDetailPLOFail())
  }

}



export const getDetailRatingPLO = async (data, dispatch, accessToken) => {
  dispatch(getDetailRatingPLOStart());
  try {

    const res = await axiosWrapper.get(`rating/getByPloId?pageNum=${data.pageNum}&pageSize=${data.pageSize}&ploId=${data.ploID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    dispatch(getDetailRatingPLOSuccess(res?.data));
  } catch (error) {
    dispatch(getDetailRatingPLOFail())
  }
}


export const getHistoryByLicencePlate = async (licencePlate, accessToken) => {
  try {
    const res = await axiosWrapper.get(`plo/getMotorbikeHistoryOfAdmin?licensePlate=${licencePlate}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    if(res.data.status === 200) {
      return res.data.data;
    } 
    if(res.data.message == 'License Plate Not Exist In System'){
      return 1;
    }
    
    return 2;
  } catch (error) {
    console.log(error);
  }
}
