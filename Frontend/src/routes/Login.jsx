import React, { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import logo from "../../public/images/login.png";
import axios from "axios";
import { API_URI } from "../../src/Contants";
import { OTPInput } from "../Component/OTPInput";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userInfoSlice";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { userProfileAction } from "../store/userProfile";

export function Login({name}) {
  const [open, setOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const[userDetails,setUserDetails] = useState("")

  const dispatch = useDispatch()

  const handleOpen = () => setOpen(!open);

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

 
  const requestOtp = async () => {
    // Append +91 to the mobile number if it's not already included
    const fullMobileNumber = `+91${mobileNumber}`;

    // Regular expression for validating Indian mobile numbers
    const mobileNumberPattern = /^\+91\d{10}$/;

    if (!mobileNumberPattern.test(fullMobileNumber)) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid mobile number in the format XXXXXXXXXX (10 digits)',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    try {
      const resp = await axios.post(`${API_URI}/user/request-otp`, {
        mobileNumber: fullMobileNumber
      });
      if (resp.status === 200) {
        setOtpSent(true);
      }
    } catch (error) {
      console.log("Error requesting OTP:", error);
    }
  };
  const verifyOtp = async () => {
    // Append +91 to the mobile number for verification
    const fullMobileNumber = `+91${mobileNumber}`;

    try {
      const resp = await axios.post(`${API_URI}/user/verify-otp`, {
        mobileNumber: fullMobileNumber,
        otp
      });
      if (resp.status === 200) {
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('userId', resp.data.userId);
        dispatch(userActions.updateUser({ userId: resp.data.userId }));
        FetchUserDeatils(resp.data.userId)

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
        text: 'There was an issue logging in the User',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  const FetchUserDeatils = async(userId) =>{
    try {
      const resp = await axios.get(`${API_URI}/user/getGetUser/${userId}`)
      setUserDetails(resp.data);
      dispatch(userProfileAction.updateProfile(resp.data));


    } catch (error) {
      console.log(error);
      
    }


  }


  return (
    <>
      <Button
        onClick={handleOpen}
        className="text-black shadow-none hover:shadow-none"
      >
        {name}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex justify-center items-center content-center">
          <img src={logo} alt="zerodelivery
 Logo" className="w-60 h-72" />
        </div>

        <div className="flex justify-center flex-col content-center items-center font-bold">
          {/* <p className="text-black text-2xl mb-1">India's last minute app</p> */}
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
              <div className="flex justify-center items-center content-center w-full min-w-[200px] my-4">
                <Button onClick={requestOtp} className="w-6/12 bg-blue-gray-600">
                  <span>Continue</span>
                </Button>
              </div>
              <div className="absolute top-5 left-5 text-2xl cursor-pointer">
              <HiArrowSmallLeft onClick={() => setOpen(false)}/>
              </div>
            </>
          )}
        </div>
        <p className="text-xs text-center mb-4 mt-2">
          By continuing, you agree to our Terms of service & Privacy policy
        </p>
      </Dialog>
    </>
  );
}
