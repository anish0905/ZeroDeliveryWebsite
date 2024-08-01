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
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentPincode, setCurrentPincode] = useState("");
  const [drivingLicenceNo, setDrivingLicenceNo] = useState("");
  const [uploadDrivingLicenceProof, setUploadDrivingLicenceProof] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const registerUser = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("mobile", mobileNumber);
      formData.append("name", name);
      formData.append("address", JSON.stringify({ address, pincode }));
      formData.append("currentAddress", JSON.stringify({ address: currentAddress, pincode: currentPincode }));
      formData.append("drivingLicenceNo", drivingLicenceNo);
      formData.append("uploadDrivingLicenceProof", uploadDrivingLicenceProof);
      formData.append("vehicleNo", vehicleNo);
      formData.append("profilePhoto", profilePhoto);

      const resp = await axios.post(`${API_URI}/api/vendor/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (resp.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "User registered successfully. Please verify your OTP.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setOtpModalOpen(true);
      }
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
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Current Address"
            value={currentAddress}
            onChange={handleInputChange(setCurrentAddress)}
            aria-label="Current Address"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Current Pincode"
            value={currentPincode}
            onChange={handleInputChange(setCurrentPincode)}
            aria-label="Current Pincode"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Driving Licence Number"
            value={drivingLicenceNo}
            onChange={handleInputChange(setDrivingLicenceNo)}
            aria-label="Driving Licence Number"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            className="w-full px-3 py-2 border rounded"
            onChange={handleFileChange(setUploadDrivingLicenceProof)}
            aria-label="Upload Driving Licence Proof"
          />
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Vehicle Number"
            value={vehicleNo}
            onChange={handleInputChange(setVehicleNo)}
            aria-label="Vehicle Number"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            className="w-full px-3 py-2 border rounded"
            onChange={handleFileChange(setProfilePhoto)}
            aria-label="Profile Photo"
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
