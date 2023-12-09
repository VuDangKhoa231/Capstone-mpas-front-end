import { setCookie } from "cookies-next";
import axiosWrapper from "../ultis/axiosWrapper";
import {  loginFail1, loginFail2, loginStart, loginSuccess } from "../redux/authSlice";
import { requestPermission } from '../firebase/messaging_init_in_sw';
import ToastMessage from "../Layout/ToastMessage";

export const loginUser = async (user, dispatch, navigate, setOpen) => {
  dispatch(loginStart());
  try {
    const res = await axiosWrapper.post('/user/loginUser', user )
      if(res.data.isAdmin){
        dispatch(loginSuccess(res.data));
     
        setTimeout(() => {
          navigate("/");
        }, 2000);
        setCookie('token', res.data.access_token) 
        requestPermission();
      } else {
        dispatch(loginFail1());
      }
  } catch (error) {
    dispatch(loginFail2());
  }
}


