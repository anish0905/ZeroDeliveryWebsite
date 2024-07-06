import React from "react";

import { VscAccount } from "react-icons/vsc";

import { HiShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom"; // Import Link
import {useSelector} from 'react-redux'
import { Login } from "../../routes/Login";
import { FaClipboardList } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { CiLogin } from "react-icons/ci"
import loginIMg from "../../../public/images/login.png"

const NavBar2 = () => {

  const bag= useSelector((store)=>store.bag)
  return (
    <div className="mb-4">
      <div className="flex justify-center content-center items-center">
        {/* <IoSearch className=" absolute text-xl left-3 top-3 text-gray-400 " />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search  "
          className="bg-gray-200 w-11/12 h-10 rounded pl-10"
        /> */}
        <img src={loginIMg} alt="" className="h-40" />
      </div>
      <div className="px-1 my-4">
        <ul>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <div className="">
              <VscAccount className="text-2xl" />
            </div>
            <Link to={`/user/MyAcount`} className="border-bottom2">
              Profile
            </Link>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <div className="">
            <FaClipboardList className="text-2xl" />
            </div>
            <Link to={`/user/MyOrder`} className="border-bottom2">
             My Orders
            </Link>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <div className="">
            <MdLocationOn className="text-2xl" />
            </div>
            <Link  to={`/user/SaveAddress`}  className="border-bottom2">
            Save Address
            </Link>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <div className="">
            <IoWallet className="text-2xl" />
            </div>
            <Link  to={`/user/MyWishlist`}  className="border-bottom2">
            My Wishlist
            </Link>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
          <div className="flex justify-center content-center items-center relative">
            <HiShoppingBag className="text-2xl"/>
            <div class="absolute px-2 py-1  left-4 -top-3 rounded-full bg-deep-orange-800 text-white text-xs">
              {bag.length}
            </div>
            </div>
            <Link to="/Bag" className="border-bottom2">
              Bag
            </Link>

          </li>
          <li className="flex my-4 items-center content-center  hover:bg-blue-gray-200 pl-4 py-1 rounded w-60">
            <div className="">
            <CiLogin className="text-2xl" />
            </div>
            <Login name={"Login"}/>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <div className="">
            <CiLogin className="text-2xl" />
            </div>
            <Link  to={`/user/MyWishlist`}  className="border-bottom2">
             Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="my-4 px-1">
      </div>
    </div>
  );
};

export default NavBar2;
