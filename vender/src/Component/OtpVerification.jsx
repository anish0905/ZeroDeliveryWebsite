
// OtpVerification.js
import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { API_URI } from "../../src/Contants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function OtpVerification({ email, password, mobileNumber, onClose }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [resendEnabled, setResendEnabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = async () => {
    try {
      const resp = await axios.post(`${API_URI}/api/vendor/verify-otp`, {
        otp,
        email,
        password,
        mobile: mobileNumber,
      });
      if (resp.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "OTP verified successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        onClose();
      }
      navigate("/")
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        title: "Error!",
        text: "Invalid OTP",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const resendOtp = async () => {
    try {
      const resp = await axios.post(`${API_URI}/api/vendor/resend-otp`, {
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
        setTimer(180);
        setResendEnabled(false);
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue resending the OTP",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full md:w-1/2 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">OTP Verification</h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleOtpChange}
            maxLength="6"
          />
        </div>
        <Button onClick={verifyOtp} className="w-full bg-blue-gray-600 mb-4">
          Verify OTP
        </Button>
        <div className="text-center mb-4">
          {resendEnabled ? (
            <Button onClick={resendOtp} className="w-full bg-blue-gray-600">
              Resend OTP
            </Button>
          ) : (
            <p>Resend OTP in {formatTime(timer)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
