import React, { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import logo from "../../public/images/vendorRegistation.svg";
import axios from "axios";
import { API_URI } from "../../src/Contants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OtpVerification from "./OtpVerification";

function Register() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);



  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const registerUser = async () => {
    try {
      const resp = await axios.post(`${API_URI}/api/vendor/register`, {
        email,
        password,
        mobile: mobileNumber,
      });
      if (resp.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "User registered successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
       
      }
      setOtpModalOpen(true);
    } catch (error) {
      console.error("Error registering user:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue registering the user",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center md:justify-end md:w-1/2">
        <img src={logo} alt="Register Logo" className="w-full  mb-4 md:mb-0" />
      </div>
      <div className="w-full md:w-1/2 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button onClick={registerUser} className="w-full bg-blue-gray-600">
          Register
        </Button>
        <p className="text-xs text-center mt-4">
          Already have an account? <a href="/">Login</a>
        </p>
        <p className="text-xs text-center mt-4">
          By continuing, you agree to our Terms of service & Privacy policy
        </p>
      </div>
      <Dialog open={otpModalOpen} handler={() => setOtpModalOpen(false)}>
        <OtpVerification
          email={email}
          password={password}
          mobileNumber={mobileNumber}
          onClose={() => setOtpModalOpen(false)}
        />
      </Dialog>
    </div>
  );
}

export default Register;