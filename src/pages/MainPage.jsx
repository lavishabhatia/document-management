/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { ToastContainer } from "react-toastify";
import LoginHeader from "../component/ui/LoginHeader";
import { state } from "../data/state.js";
import { getHeader } from "../services/constant.js";

const MainPage = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (getHeader()) {
      state.isLoggedIn = true;
    }
  }, []);

  return (
    <>
      <div className="w-full ">
        <LoginHeader />
        <div className="w-full">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default MainPage;
