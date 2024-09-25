import React, { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import logo from "../../public/images/login.png";
import axios from "axios";
import { API_URI } from "../../src/Contants";
import { OTPInput } from "../Component/OTPInput";
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { userActions } from "../store/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { userProfileAction } from "../store/userProfile";

export function Login({ name }) {
  const [open, setOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [inputType, setInputType] = useState("mobile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => {
    // Reset state when opening the modal
    setMobileNumber("");
    setEmail("");
    setOtp("");
    setOtpSent(false);
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    if (inputType === "mobile") {
      setMobileNumber(e.target.value);
    } else {
      setEmail(e.target.value);
    }
  };

  const handleLogin = async () => {
    if ((inputType === "mobile" && !mobileNumber) || (inputType === "email" && !email)) {
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return;
    }

    try {
      const payload = inputType === "mobile" ? { mobileNumber: `+91${mobileNumber}` } : { email };
      const response = await axios.post(`${API_URI}/user/request-otp`, payload);

      if (response.status === 200) {
        setOtpSent(true); // Set OTP sent state to true
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Invalid mobile number or email.", "error");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter the OTP.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    try {
      // Prepare the request payload based on available data
      const payload = { otp };
      if (mobileNumber) {
        payload.mobileNumber = `+91${mobileNumber}`; // Assuming mobileNumber is already defined
      } else if (email) {
        payload.email = email; // Assuming email is already defined
      }
  
      const resp = await axios.post(`${API_URI}/user/verify-otp`, payload);
  
      if (resp.status === 200) {
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('userId', resp.data.userId);
        dispatch(userActions.updateUser({ userId: resp.data.userId }));
        FetchUserDetails(resp.data.userId);
  
        Swal.fire({
          title: 'Success!',
          text: 'User logged in successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
  
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'There was an issue logging in the User',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  

  const FetchUserDetails = async (userId) => {
    try {
      const resp = await axios.get(`${API_URI}/user/getUser/${userId}`);
      dispatch(userProfileAction.updateProfile(resp.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="text-black shadow-none hover:shadow-none">
        {name}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex justify-center items-center mb-6">
          <img src={logo} alt="Logo" className="w-60 h-72" />
        </div>

        <div className="flex justify-center flex-col items-center font-bold">
          <p className="text-lg font-semibold mb-4 text-black">Log in or Sign up</p>
          {otpSent ? (
            <OTPInput otp={otp} handleOtpChange={setOtp} verifyOtp={verifyOtp} />
          ) : (
            <>
              <div className="w-72 mb-4">
                <div className="flex justify-between">
                  <Button 
                    onClick={() => setInputType("mobile")} 
                    className={`w-1/2 py-2 text-white ${inputType === "mobile" ? "bg-blue-600" : "bg-gray-400"} transition duration-200`}
                  >
                    Mobile
                  </Button>
                  <Button 
                    onClick={() => setInputType("email")} 
                    className={`w-1/2 py-2 text-white ${inputType === "email" ? "bg-blue-600" : "bg-gray-400"} transition duration-200`}
                  >
                    Email
                  </Button>
                </div>
                <div className="relative w-full min-w-[200px] h-10 mt-4">
                  <input
                    type={inputType === "email" ? "email" : "text"}
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 border focus:border-2 border-t-transparent text-sm px-3 py-2.5 rounded-md border-blue-gray-200 focus:border-gray-900"
                    placeholder={inputType === "mobile" ? "+91" : "Email Address"}
                    value={inputType === "mobile" ? mobileNumber : email}
                    onChange={handleInputChange}
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal leading-tight -top-1.5 text-gray-500 transition-all">
                    {inputType === "mobile" ? "+91" : "Email Address"}
                  </label>
                </div>
              </div>
              <Button 
                onClick={handleLogin}
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded"
              >
                Login
              </Button>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}
