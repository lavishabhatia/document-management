import axios from "axios";
import { BASE_URL, getHeader } from "./constant";

export const uploadTag= async (data) => {
    try {
      let response = await axios.post(
        `${BASE_URL}/documentTags`,
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