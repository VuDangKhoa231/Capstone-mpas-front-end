import { getNotiStart, getNotiSuccess, getNotiaFail } from "../redux/notificationSlice";
import axiosWrapper from "../ultis/axiosWrapper";

export const getNotification = async (dispatch, accessToken) => {
  dispatch(getNotiStart());
  try {
    const res = await axiosWrapper.get('/user/getNotifcations', {
      headers: {
        Authorization: `Bearer ${accessToken}`
    }
    })
      dispatch(getNotiSuccess(res.data)); 
  } catch (error) {
    dispatch(getNotiaFail(error));
  }
}


