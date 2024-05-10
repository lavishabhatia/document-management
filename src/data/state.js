import { proxy } from "valtio";

export const state = proxy({
  phone: null,
  resellerToken: null,
});
