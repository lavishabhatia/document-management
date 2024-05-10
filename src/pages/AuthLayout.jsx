/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import LoginHeader from "../component/ui/LoginHeader";

const AuthLayout = () => {
  return (
    <>
      <LoginHeader />
      <Outlet />
    </>
  );
};

export default AuthLayout;
