import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { API_URI } from "../../src/Contants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function OtpVerification({ email, mobileNumber, onClose }) {
  const [otp, setOtp] = useState("");
  const navagate = useNavigate()

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async () => {
    try {
      const resp = await axios.post(`${API_URI}/api/admin/verify-otp`, {
        email,
        otp,
      });
      if (resp.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "OTP verified successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        onClose();
        navagate("/")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to verify OTP. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const resendOtp = async () => {
    try {
      const resp = await axios.post(`${API_URI}/api/admin/resend-otp`, {
        email,
        mobile: mobileNumber,
      });
      if (resp.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "OTP resent successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to resend OTP. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">OTP Verification</h2>
      <div className="mb-4">
        <input
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleOtpChange}
        />
      </div>
      <Button onClick={verifyOtp} className="w-full bg-blue-gray-600 mb-4">
        Verify OTP
      </Button>
      <Button onClick={resendOtp} className="w-full bg-gray-500">
        Resend OTP
      </Button>
    </div>
  );
}

export default OtpVerification;
