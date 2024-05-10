import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./pages/AuthLayout";
import Login from "./component/form/Login";
import OtpPage from "./component/form/OtpPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<AuthLayout />}>
          <Route path="" element={<Login />} />
          <Route path="verify" element={<OtpPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
