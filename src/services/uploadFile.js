import axios from "axios";
import { BASE_URL, getHeader } from "./constant";

export const uploadFileData = async (data) => {
  try {
    let response = await axios.post(
      `${BASE_URL}/saveDocumentEntry`,
      data,
      getHeader()
    );
    if (response?.status === 200) {
      return response;
    }
  } catch (error) {
    return error.response;
  }
  return false;
};

export const searchUploadFile = async (data) => {
  try {
    let res = await axios.post(
      `${BASE_URL}/searchDocumentEntry`,
      data,
      getHeader()
    );
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
};
