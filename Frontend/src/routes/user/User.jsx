import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogin } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import SaveAddress from "./SaveAddress";

const User = () => {
  const { name } = useParams();

  const renderContent = () => {
    switch (name) {
      case 'MyAcount':
        return (
          <div>
            <h1 className="text-xl font-semibold">My Account</h1>
            <p>Account details go here...</p>
          </div>
        );
      case 'MyOrder':
        return (
          <div>
            <h1 className="text-xl font-semibold">My Orders</h1>
            <p>Order details go here...</p>
          </div>
        );
      case 'SaveAddress':
        return (
          <SaveAddress/>
        );
      case 'MyWishlist':
        return (
          <div>
            <h1 className="text-xl font-semibold">My Wishlist</h1>
            <p>Wishlist details go here...</p>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-xl font-semibold">There is no data</h1>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center text-sm content-center lg:items-center md:items-center lg:px-32 px-5  w-full pt-24">
      <div className="bg-white shadow-md rounded lg:flex md:flex block  justify-center lg:items-center content-center border-[1px] border-solid px-2 py-4 w-full">
        <div className="lg:w-1/5 md:w-1/5  lg:block md:block overflow-x-auto max-w-96 w-full ">
          <ul className="w-full lg:block md:block flex justify-center content-center items-center ">
            <li className="h-12 mb-4 lg:block md:block hidden">
              <p className=" px-4 py-2">+91635293601</p>
            </li>
            <Link to={`/user/MyOrder`} className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <FaClipboardList className="text-xl " />
              <p className="lg:block md:block hidden">My Orders</p>
            </Link>
            <Link to={`/user/SaveAddress`} className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <MdLocationOn className="text-2xl" />
              <p  className="lg:block md:block hidden">Save Address</p>
            </Link>
            <Link to={`/user/MyWishlist`} className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <IoWallet className="text-xl" />
              <p  className="lg:block md:block hidden">My Wishlist</p>
            </Link>
            <Link to={`/user/MyAcount`} className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <SiGnuprivacyguard className="text-xl" />
              <p  className="lg:block md:block hidden">Account Privacy</p>
            </Link>
            <Link to="/" className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <CiLogin className="text-xl" />
              <p  className="lg:block md:block hidden">Logout</p>
            </Link>
          </ul>
        </div>
        <div className="lg:w-9/12 md:w-9/12 flex justify-start text-sm w-full lg:h-auto md:h-auto h-full ">
             
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default User;
