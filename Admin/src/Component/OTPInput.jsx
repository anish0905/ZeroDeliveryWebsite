import React from "react";
import { Button } from "@material-tailwind/react";

export function OTPInput({ otp, handleOtpChange, verifyOtp }) {
  return (
    <div className="flex justify-center flex-col content-center items-center font-bold ">
      <p className="text-base mb-1">Enter OTP</p>
      <div className="w-72">
        <div className="relative w-full min-w-[200px] h-10">
          <input
            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
          />
        </div>
      </div>
      <div className="flex justify-center items-center content-center my-2 w-full">
        <Button onClick={verifyOtp} className="w-6/12 bg-blue-gray-600">
          <span>Submit</span>
        </Button>
      </div>
    </div>
  );
}
