/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSnapshot } from "valtio";
import { state } from "../data/state.js";
import { getHeader } from "../services/constant.js";
import UploadFile from "../component/Modal/UploadFile.jsx";
import SideBar from "../component/dashboard/Sidebar.jsx";
import CreateTag from "../component/Modal/CreateTag.jsx";
import Header from "../component/ui/Header.jsx";

const MainPage = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
  }, []);

  return (
    <>
      <div className="w-full ">
        <Header />
        <div className="flex w-full gap-6">
          <div className="w-[17vw] bg-primary ">
            <SideBar />
          </div>
          <div className="w-[83vw]">
            <Outlet />
            {snap.uploadFile ? <UploadFile /> : null}
            {snap.createTag ? <CreateTag /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
