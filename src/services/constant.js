export const BASE_URL = "https://apis.allsoft.co/api/documentManagement";

export const getHeader = () => {
  const token = localStorage.getItem("token");
  let header = {
    headers: { Authorization: "Bearer " + token },
  };
  return header;
};
