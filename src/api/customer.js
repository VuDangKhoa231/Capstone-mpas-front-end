import { getCusFail, getCusStart, getCusSuccess } from "../redux/customerSlice";
import axiosWrapper from "../ultis/axiosWrapper";

export const getCusList = async (data, dispatch, accessToken) => {

  let url = `/customer/listCustomer?pageNum=${data.pageNum}&pageSize=${data.pageSize}`;
  if (data.searchValue && data.searchValue.trim() !== "") {
    url = `/customer/listCustomerByName?name=${data.searchValue}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`
  }
  dispatch(getCusStart());

  try {
    const res = await axiosWrapper.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    })
    dispatch(getCusSuccess(res?.data))
  } catch (error) {
    dispatch(getCusFail());
  }
}



