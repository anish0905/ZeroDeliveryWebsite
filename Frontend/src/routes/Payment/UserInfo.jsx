import React from "react";
import { Login } from "../Login";
import { IoCheckmarkDone } from "react-icons/io5";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const  userProfile  = useSelector((store) => store.userProfile);

  return (
    <div className="bg-gray-50 shadow-md w-full flex gap-4 content-center items-center p-4 mt-2 mb-4 ">
      <span className="bg-blue-gray-200 py-1 px-2 text-sm rounded-sm text-blue-600">
        1
      </span>
      <div className="flex justify-between w-full items-center content-center ">
        <div>
          <div className="flex gap-2  items-center content-center">
            <h1 className="font-semibold text-gray-600 text-base">LOGIN</h1>
            <IoCheckmarkDone className="text-blue-600 text-xl font-extrabold" />
          </div>

          <div className=" flex justify-between content-center items-center gap-5 ">
            <h1>Jhone</h1>
            <p className="text-sm">{userProfile.mobileNumber}</p>
          </div>
        </div>

        <div>
          <Login name={"Change"} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
