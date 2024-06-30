import React from "react";
import { IoSearch } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { IoIosHeart } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom"; // Import Link
import { NavBarModal } from "./NavBarModal";
import {useSelector} from 'react-redux'

const NavBar2 = () => {

  const bag= useSelector((store)=>store.bag)
  return (
    <div className="my-4">
      <div className="relative">
        <IoSearch className=" absolute text-xl left-3 top-3 text-gray-400 " />
        <input
          type="search"
          name=""
          id=""
          placeholder="Search  "
          className="bg-gray-200 w-11/12 h-10 rounded pl-10"
        />
      </div>
      <div className="px-1 my-4">
        <ul>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <div className="">
              <VscAccount className="text-2xl" />
            </div>
            <Link to="/" className="border-bottom2">
              Profile
            </Link>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <div className="flex justify-center content-center items-center">
              <IoIosHeart className="text-2xl" />
            </div>
           
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
        </ul>
      </div>
      <div className="my-4 px-1">
        <ul>
          <li className="my-4 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <Link to="/">MEN</Link>
          </li>
          <li className="my-4 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <Link to="/about">WOMEN</Link>
          </li>
          <li className="my-4 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <Link to="/contact">KIDS</Link>
          </li>
          <li className="my-4 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <Link to="/portfolio">HOME&LIVING</Link>
          </li>
          <li className="my-2 hover:bg-blue-gray-200 px-4 py-1 rounded w-60">
            <Link to="/resume">BEAUTY</Link>
          </li>
          <li className="relative my-4 hover:bg-blue-gray-200 px-5 py-1 rounded w-60 h-14 flex content-center items-center">
            <p className="absolute left-12 top-0 text-sm text-pink-600 font-think">
              new
            </p>
            <Link to="/blog">STUDIO</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar2;
