import React, { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import axios from "axios";
import { API_URI } from "../../Contants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OtpVerification from "./OtpVerification";
import { AiOutlineClose } from "react-icons/ai";

const Register = ({ onClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const registerUser = async () => {
    try {
      const resp = await axios.post(`${API_URI}/api/vendor/register`, {
        email,
        password,
        mobile: mobileNumber,
        name,
        address,
        pincode,
      });
      if (resp.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "User registered successfully. Please verify your OTP.",
          icon: "success",
          confirmButtonText: "OK",
        });
        
      }
      setOtpModalOpen(true);
    } catch (error) {
      console.error("Error registering user:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "There was an issue registering the user",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-white p-10 rounded-md relative">
      <button className="absolute top-4 right-3 text-gray-500 hover:text-gray-700" onClick={onClose}>
        <AiOutlineClose size={24} />
      </button>
      <div className="w-full rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Name"
            value={name}
            onChange={handleInputChange(setName)}
            aria-label="Name"
          />
        </div>
        
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            aria-label="Email"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={handleInputChange(setMobileNumber)}
            aria-label="Mobile Number"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            aria-label="Password"
          />
        </div>
        
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Address"
            value={address}
            onChange={handleInputChange(setAddress)}
            aria-label="Address"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Pincode"
            value={pincode}
            onChange={handleInputChange(setPincode)}
            aria-label="Pincode"
          />
        </div>
        <Button onClick={registerUser} className="w-full bg-blue-gray-600">
          Register
        </Button>
      </div>
      <Dialog open={otpModalOpen} handler={() => setOtpModalOpen(false)}>
        <OtpVerification
          email={email}
          password={password}
          mobileNumber={mobileNumber}
          onClose={() => {
            setOtpModalOpen(false);
            onClose();
          }}
        />
      </Dialog>
    </div>
  );
};

export default Register;
