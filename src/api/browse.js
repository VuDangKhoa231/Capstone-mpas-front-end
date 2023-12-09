import { getBrowseConfirmFail, getBrowseConfirmStart, getBrowseFail, getBrowseHistoryFail, getBrowseHistoryStart, getBrowseHistorySuccess, getBrowseStart, getBrowseSuccess, getDetailBrowseFail, getDetailBrowseStart, getDetailBrowseSuccess, getWBrowseConfirmSuccess } from "../redux/browseSlice";
import { getDetailPLOFail, getDetailPLOStart, getDetailPLOSuccess } from "../redux/ploSlice";
import axiosWrapper from "../ultis/axiosWrapper";

export const getBrowselist = async (data, dispatch, accessToken) => {
  dispatch(getBrowseStart());
  let url = `/plo/getRegistrationByParkingStatus?pageNum=${data.pageNum}&pageSize=${data.pageSize}&status=2`;
  if(data.searchValue && data.searchValue?.trim() !== ""){
    url = `/plo/getRegistrationByParkingStatus?keywords=${data.searchValue}&pageNum=${data.pageNum}&pageSize=${data.pageSize}&status=2`;
  }

  try {
    const res = await axiosWrapper.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    dispatch(getBrowseSuccess(res?.data));
  } catch (error) {
    dispatch(getBrowseFail());
  }
}


export const getDetailBrowse = async (browseId, dispatch, accessToken) => {
  dispatch(getDetailBrowseStart());
  try {
    const res = await axiosWrapper.get(`/plo/getRegistrationDetail?ploID=${browseId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    dispatch(getDetailBrowseSuccess(res?.data));
  } catch (error) {
    dispatch(getDetailBrowseFail())
  }
} 


export const getBrowseHistory = async (data, dispatch, accessToken) => {
    dispatch(getBrowseHistoryStart());
  
    let url = `/plo/getRegistrationHistory?pageNum=${data.pageNum}&pageSize=${data.pageSize}`;
    if(data.searchValue && data.searchValue?.trim() !== ""){
      url = `/plo/getRegistrationHistory?keywords=${data.searchValue}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`;
    }
    try {
      const res = await axiosWrapper.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      dispatch(getBrowseHistorySuccess(res?.data));
    } catch (error) {
      dispatch(getBrowseHistoryFail())
    }
  }

  export const confirmBrowseAccept = async (data, dispatch, accessToken) => {
    dispatch(getBrowseConfirmStart());

    await axiosWrapper.put(`/plo/updatePloStatus`, data,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }).then((res) => {
        dispatch(getWBrowseConfirmSuccess(res?.data));
    }).catch((error) => {
        dispatch(getBrowseConfirmFail());
    })

}

export const confirmBrowseDeny = async (id, dispatch, accessToken) => {
  dispatch(getBrowseConfirmStart());
  await axiosWrapper.delete(`/plo/deleteRegistrationOfPlo?ploID=${id}`,{
      headers: {
          Authorization: `Bearer ${accessToken}`
      },
  }).then((res) => {
      dispatch(getWBrowseConfirmSuccess(res?.data));
  }).catch((error) => {
      dispatch(getBrowseConfirmFail());
  })
}

