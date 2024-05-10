import axios from "axios";
import { BASE_URL } from "./constant";

export const requestOtp = async (data) => {
  try {
    let response = await axios.post(`${BASE_URL}/generateOTP`, data);
    if (response?.status === 200) {
      return response;
    }
  } catch (error) {
    return error.response;
  }
  return false;
};

export const verifyOtp = async (data) => {
  try {
    let response = await axios.post(`${BASE_URL}/validateOTP`, data);
    if (response?.status == 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
  return false;
};
