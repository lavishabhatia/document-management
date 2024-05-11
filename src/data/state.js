import { proxy } from "valtio";

export const state = proxy({
  phone: null,
  token: null,
  userInfo:null,

  // Modal
  uploadFile:false,
});
