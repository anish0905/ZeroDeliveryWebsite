import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogin } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";

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
          <div>
            <h1 className="text-xl font-semibold">Save Address</h1>
            <p>Address details go here...</p>
          </div>
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
    <div className="flex justify-center text-sm content-center items-center lg:px-32 px-5 h-screen w-full">
      <div className="bg-white shadow-md rounded lg:flex md:flex block  justify-center items-center content-center border-[1px] border-solid px-2 py-4 w-full">
        <div className="w-1/5 lg:block md:block hidden">
          <ul className="w-full">
            <li className="h-12 mb-4">
              <p className=" px-4 py-2">+91635293601</p>
            </li>
            <Link to={`/user/MyOrder`} className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <FaClipboardList className="text-xl" />
              <p>My Orders</p>
            </Link>
            <Link to={`/user/SaveAddress`} className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <MdLocationOn className="text-2xl" />
              <p>Save Address</p>
            </Link>
            <Link to={`/user/MyWishlist`} className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <IoWallet className="text-xl" />
              <p>My Wishlist</p>
            </Link>
            <Link to={`/user/MyAcount`} className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <SiGnuprivacyguard className="text-xl" />
              <p>Account Privacy</p>
            </Link>
            <Link to="/" className="px-4 py-2 hover:bg-gray-200 mb-4 flex gap-2 content-center items-center cursor-pointer">
              <CiLogin className="text-xl" />
              <p>Logout</p>
            </Link>
          </ul>
        </div>
        <div className="w-9/12 flex justify-center text-sm content-center items-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default User;
