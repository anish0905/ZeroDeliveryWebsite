import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import logo from "../../../public/images/adminlogin.jpg";
import axios from "axios";
import { API_URI } from "../../Contants";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userInfoSlice";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginWithEmail = async () => {
    try {
      const resp = await axios.post(`${API_URI}/api/admin/login`, {
        email: email,
        password: password,
      });
      if (resp.status === 200) {
        const userDetails = resp.data;
        console.log(userDetails)
        localStorage.setItem("token", userDetails.token);
        localStorage.setItem("userId", userDetails?.user?._id);
        // dispatch(userActions.updateProfile(userDetails));
        navigate("/dashboard");
      }
    } catch (error) {
      Swal.fire("Error", "Invalid email or password", "error");
      console.log("Error:", error);
    }
  };

  return (
    <div className="lg:flex md:flex block gap-0  pt-32 content-center items-center w-full">
      <div className="flex justify-center items-center content-center lg:w-1/2 md:w-1/2 w-full">
        <img src={logo} alt="Logo" className="w-[80%]" />
      </div>
      <div className="flex flex-col justify-center content-center items-center font-bold lg:w-1/2 md:w-1/2 w-full">
        <p className="text-xl font-bold mb-4 text-black">Log in </p>
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
              type="password"
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline-none focus:outline-none disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-center items-center lg:w-full w-72 min-w-[200px] my-4">
            <Button onClick={loginWithEmail} className="w-full bg-blue-gray-600">
              <span>Login</span>
            </Button>
          </div>
          <p className="text-sm font-thin text-center">
          create new account ? 
            <a href="/adminregister"> singUp </a>
          </p>
        </div>
      </div>
    </div>
  );
}
