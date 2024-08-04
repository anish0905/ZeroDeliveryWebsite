import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OtpVerification from "./OtpVerification";
import { AiOutlineClose } from "react-icons/ai";
import { Button, Dialog } from "@material-tailwind/react";
import { API_URI } from "../../Contants";

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


  const userId = localStorage.getItem("userId");

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFileChange = (setter) => async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        const url = await uploadToImageService(base64);
        setter(url);
      } catch (error) {
        console.error("Error handling file:", error);
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadToImageService = async (base64) => {
    try {
      const response = await axios.post(`${API_URI}/upload`, { image: base64 });
      const { imageUrl } = response.data; // Assume the response contains an imageUrl
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const registerUser = async () => {
    try {
      const formData = {
        vendorId:userId,
        email,
        password,
        mobile: mobileNumber,
        name,
        address: { address, pincode },
        currentAddress: { address: currentAddress, pincode: currentPincode },
        drivingLicenceNo,
        uploadDrivingLicenceProof,
        vehicleNo,
        profilePhoto,
      };

      await axios.post(`${API_URI}/api/deliveryBoys/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      Swal.fire({
        title: "Success!",
        text: "User registered successfully. Please verify your OTP.",
        icon: "success",
        confirmButtonText: "OK",
      });
      
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
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-screen">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-col-1 gap-4">
          {/* Inputs */}
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Name"
            value={name}
            onChange={handleInputChange(setName)}
            aria-label="Name"
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            aria-label="Email"
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={handleInputChange(setMobileNumber)}
            aria-label="Mobile Number"
          />
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={handleInputChange(setPassword)}
            aria-label="Password"
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Address"
            value={address}
            onChange={handleInputChange(setAddress)}
            aria-label="Address"
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Pincode"
            value={pincode}
            onChange={handleInputChange(setPincode)}
            aria-label="Pincode"
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Current Address"
            value={currentAddress}
            onChange={handleInputChange(setCurrentAddress)}
            aria-label="Current Address"
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Current Pincode"
            value={currentPincode}
            onChange={handleInputChange(setCurrentPincode)}
            aria-label="Current Pincode"
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Driving Licence Number"
            value={drivingLicenceNo}
            onChange={handleInputChange(setDrivingLicenceNo)}
            aria-label="Driving Licence Number"
          />
          <input
            type="file"
            className="w-full px-3 py-2 border rounded"
            onChange={handleFileChange(setUploadDrivingLicenceProof)}
            aria-label="Upload Driving Licence Proof"
          />
          <input
            type="file"
            className="w-full px-3 py-2 border rounded"
            onChange={handleFileChange(setProfilePhoto)}
            aria-label="Profile Photo"
          />
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Vehicle Number"
            value={vehicleNo}
            onChange={handleInputChange(setVehicleNo)}
            aria-label="Vehicle Number"
          />
        </div>
        <Button onClick={registerUser} className="w-full mt-6 bg-blue-gray-600">
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
