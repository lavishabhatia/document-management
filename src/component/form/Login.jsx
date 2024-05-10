/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLockAlt } from "react-icons/bi";
import { requestOtp } from "../../services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnapshot } from "valtio";
import { state } from "../../data/state";
import { successAlert } from "../../enum/toast";

const schema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Invalid phone number"),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate("");
  const snap = useSnapshot(state);
  const loginHandler = async (data) => {
    state.phone = data.phone;
    try {
      let success = await requestOtp({ mobile_number: data.phone });
      if (success?.status === 200) {
        successAlert("OTP sent successfully");
        navigate("verify");
        return;
      }
    } catch (error) {
      failureAlert(error?.data);
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center bg-white sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md shadow-lg">
          <div className="bg-white py-6 px-8 shadow sm:px-10">
            <form onSubmit={handleSubmit(loginHandler)} className="space-y-6">
              <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col gap-2.5">
                <h2 className="text-center text-[26px] font-semibold tracking-tight sm:text-gray-900">
                  Enter your{" "}
                  <span className="text-[ade9d6f5]">Phone Number</span>
                </h2>
                <h2 className="flex justify-center items-center text-base font-normal text-[#2C2A2ACC] px-0.5">
                  allSoft will need to verify your account.
                </h2>

                <div className="mt-3 w-full">
                  <input
                    placeholder="99XXXXXXXX"
                    {...register("phone")}
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm sm:text-sm outline-none"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                  {warning && (
                    <p className="text-red-500">Please Enter Valid Number</p>
                  )}
                </div>
              </div>

              <div className="relative">
                <BiSolidLockAlt className="absolute flex justify-start items-center w-5 h-5 text-white mt-2 ms-2" />
                <button
                  type="submit"
                  className="flex w-full justify-center bg-secoundary py-2.5 px-4 text-base font-normal text-white shadow-sm"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
