import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import logo from "../../../public/images/login1.png";
import axios from "axios";
import { API_URI } from "../../Contants";
import { OTPInput } from "../../Component/OTPInput";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userInfoSlice";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [open, setOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const requestOtp = async () => {
    try {
      const resp = await axios.post(`${API_URI}/user/login`, {
        mobileNumber: mobileNumber,
      });
      if (resp.status === 200) {
        setOtpSent(true);
      }
    } catch (error) {
      console.log("Error requesting OTP:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const resp = await axios.post(`${API_URI}/user/vefifyOpt`, {
        mobileNumber: mobileNumber,
        otp,
      });
      if (resp.status === 200) {
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('userId', resp.data.userId);
        dispatch(userActions.updateUser({ userId: resp.data.userId }));

        Swal.fire({
          title: 'Success!',
          text: 'User logged in successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        navigate("/");
      }
    } catch (error) {
      console.log("Error verifying OTP:", error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue logging in the user',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="flex justify-center pt-32 content-center items-center">
      <div className="flex justify-center items-center content-center">
        <img src={logo} alt="Logo" className="w-full" />
      </div>
      <div className="flex flex-col justify-center content-center items-center font-bold">
        <p className="text-base font-thin mb-4 text-black">Log in or Sign up</p>
        {otpSent ? (
          <OTPInput otp={otp} handleOtpChange={handleOtpChange} verifyOtp={verifyOtp} />
        ) : (
          <>
            <div className="w-72">
              <div className="relative w-full min-w-[200px] h-10">
                <input
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  +91
                </label>
              </div>
            </div>
            <div className="flex justify-center items-center lg:w-full w-72 min-w-[200px] my-4">
              <Button onClick={requestOtp} className="w-full bg-blue-gray-600">
                <span>Continue</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
