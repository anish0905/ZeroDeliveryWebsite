import React, { useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import logo from "../../public/images/adminlogin.jpg";
import axios from "axios";
import { API_URI } from "../../src/Contants";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userInfoSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function Login({ name }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => setOpen(!open);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const resp = await axios.post(`${API_URI}/user/login`, {
        email,
        password,
      });
      if (resp.status === 200) {
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("userId", resp.data.userId);
        dispatch(userActions.updateUser({ userId: resp.data.userId }));
        fetchUserDetails(resp.data.userId);

        Swal.fire({
          title: "Success!",
          text: "User logged in successfully",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue logging in the user",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const resp = await axios.get(`${API_URI}/user/getUser/${userId}`);
      setUserDetails(resp.data);
      dispatch(userActions.updateUserProfile(resp.data));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="text-black shadow-none hover:shadow-none">
        {name}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex justify-center items-center content-center">
          <img src={logo} alt="zerodelivery Logo" className="w-60 h-72" />
        </div>
        <div className="flex flex-col justify-center items-center font-bold">
          <p className="text-base font-thin mb-4 text-black">Log in or Sign up</p>
          <div className="w-72">
            <div className="relative w-full min-w-[200px] h-10 mb-4">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="relative w-full min-w-[200px] h-10 mb-4">
              <input
                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                placeholder="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>
          <div className="flex justify-center items-center content-center w-full min-w-[200px] my-4">
            <Button onClick={handleLogin} className="w-6/12 bg-blue-gray-600">
              Login
            </Button>
          </div>
          <div className="absolute top-5 left-5 text-2xl cursor-pointer">
            <HiArrowSmallLeft onClick={handleOpen} />
          </div>
        </div>
        <p className="text-xs text-center mb-4 mt-2">
          By continuing, you agree to our Terms of service & Privacy policy
        </p>
      </Dialog>
    </>
  );
}
