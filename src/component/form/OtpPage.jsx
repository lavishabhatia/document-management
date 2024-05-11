import { useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import "./inputStyle.css";
import { verifyOtp } from "../../services/auth";
import { useSnapshot } from "valtio";
import { state } from "../../data/state";
import { failureAlert, successAlert } from "../../enum/toast";

function OtpPage() {
  const [otp, setOtp] = useState(null);
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  let phone = snap.phone;

  const verify = async () => {
    let data = { mobile_number: phone, otp };
    // state.isLoading = true;
    try {
      let response = await verifyOtp(data);
      if (response?.status === 200) {
        localStorage.setItem("token", response?.data?.data?.token);
        state.token = response?.data?.data?.token;
        state.userInfo = response?.data?.data;
        successAlert("Welcome!");
        navigate("/dashboard");
      } else if (response?.response?.status === 401) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      failureAlert("SomeThing Went Wrong");
      state.isLoading = false;
    }
    state.isLoading = false;
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center bg-white h-screen ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md shadow-md">
          <div className="bg-white py-8 px-4 shadow sm:px-8">
            <div className="space-y-6">
              <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col gap-2.5">
                <h2 className=" text-center text-[26px] font-semibold tracking-tight sm:text-gray-900 ">
                  Verifying Your <span className="text-[ade9d6f5]">Number</span>
                </h2>
                <h2 className="flex justify-center items-center text-base font-normal text-[#2C2A2ACC]  px-0.5">
                  Enter <span className="font-semibold px-1 "> OTP</span> sent
                  as SMS to{" "}
                  <span className="text-black px-1">+91 {snap.phone}</span>.
                </h2>
                <div className="text-base text-[#0D66FFCC] cursor-pointer font-medium w-full flex items-center justify-center">
                  Wrong Number?
                </div>
              </div>

              <div className=" flex justify-center w-full  mt-4">
                <OtpInput
                  inputStyle="inputStyle"
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  // renderSeparator={<span></span>}
                  renderInput={(props) => (
                    <input
                      className="flex w-8 h-8 border-gray-300 bg-white shadow-sm outline-none sm:text-sm text-green-400 "
                      {...props}
                    />
                  )}
                />
              </div>

              <div>
                <button
                  className="flex w-full justify-center bg-secoundary 
                   py-2 px-4 text-sm font-medium text-white"
                  onClick={verify}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtpPage;
