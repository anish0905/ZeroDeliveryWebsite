import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";



const User = () => {
  return (
    <div className="flex justify-center text-sm content-center items-center px-32 h-screen w-full">
      <div className="bg-white shadow-md rounded flex justify-center items-center content-center border-[1px] border-solid px-2 py-4  w-full ">
        <div className="w-1/5   ">
        <ul className="w-full ">
        <li className=" h-20  mb-4  ">
                <p className="hover:bg-gray-200 px-4 py-2"> 635293601</p>
                </li>
                <li className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center">
                <FaClipboardList className="text-xl" />
                <p>My Orders</p></li>
                <li className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center ">
                <MdLocationOn  className="text-2xl"/>
                <p>Save Address</p> </li>
                <li className="px-4 py-2 hover:bg-gray-200 flex gap-2 content-center items-center mb-4 ">
                <IoWallet className="text-xl"/>
                 <p> My Wishlist</p>
                  
                </li>
                
                <li className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center">
                <SiGnuprivacyguard  className="text-xl"/>
                <p>Account Privacy</p></li>
                <li className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center" >Logout</li>
        </ul>
        </div>
        <div className="w-9/12">
        sdflbh
        </div>
      </div>
    </div>
  );
};

export default User;
