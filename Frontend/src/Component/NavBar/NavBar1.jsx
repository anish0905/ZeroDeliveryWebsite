import React from "react";
import { IoSearch } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FaCartShopping } from "react-icons/fa6";
import { HiShoppingBag } from "react-icons/hi2";
import { NavBarModal } from "./NavBarModal";
import logo from "../../../public/images/logo2.png";
import { Search } from "./Search";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "../../routes/Login";
import Location from "../Location";

const NavBar1 = () => {
  const bag = useSelector((store) => store.bag);

  return (
    <div className="flex lg:px-10 md:pl-2 h-20 py-5 px-5 bg-white  content-center items-center shadow-lg justify-between md:gap-10 fixed z-50 w-full">
      <div className="lg:pr-10 ">
        <Link to="/">
          {" "}
          <img src={logo} alt="logo" className="w-20 h-14 " />
        </Link>
      </div>
      <div className="w-1/5 lg:pl-10 hidden lg:block ">
        <ul className="flex gap-10  content-center items-center font-semibold text-sm">
          <li>
            <Location />
          </li>
        </ul>
      </div>
      <div className="w-1/2  content-center items-center relative hidden lg:block md:block  ">
        <Search className="hidden md:block lg:hidden" />
        <IoSearch className="text-2xl lg:absolute lg:left-3 lg:top-2 text-gray-500 md:hidden lg:block  " />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search for products , brand and  more "
          className="bg-gray-200 rounded w-full h-10 hover:border-none px-12 md:hidden lg:block"
        />
      </div>
      <div className="w-1/4 gap-5  content-center items-center font-semibold text-sm hidden lg:block md:block">
        <ul className="flex gap-5 ">
          <li className="">
            <div className="flex justify-center content-center items-center">
              <VscAccount className="text-2xl" />
            </div>
            <Link to="/" className="border-bottom1">
              Profile
            </Link>
          </li>

          <li>
            <div className="flex justify-center content-center lg:text-sm text-xs items-center relative bg-green-600 px-3 py-2 gap-2 rounded shadow-md text-white">
              <FaCartShopping className="lg:text-2xl text-xl " />
              <div class="absolute px-2 py-1  left-4 -top-3 rounded-full bg-green-800 text-white text-xs">
                {bag.length}
              </div>
              <Link to="/Bag" className="lg:text-sm text-xs">My Card</Link>
            </div>
          </li>
          <li className="flex justify-center content-center items-center">
            <Login />
          </li>
        </ul>
      </div>
      <div>
        <NavBarModal />
      </div>
    </div>
  );
};

export default NavBar1;
