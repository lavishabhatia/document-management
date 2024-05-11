import { proxy } from "valtio";

export const state = proxy({
  phone: null,
  resellerToken: null,
  userInfo:null,

  // Modal
  uploadFile:false,
});
