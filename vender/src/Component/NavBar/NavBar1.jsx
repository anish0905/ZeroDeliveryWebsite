import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { HiShoppingBag } from "react-icons/hi2";
import { NavBarModal } from "./NavBarModal";
import logo from "../../../public/images/logo11.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../routes/Login";
import Location from "../Location";
import Swal from 'sweetalert2';
import { userActions } from "../../store/userInfoSlice";

const NavBar1 = () => {
  const bag = useSelector((store) => store.bag) || { totalQuantity: 0, data: [] };
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userId = localStorage.getItem('userId');
  
   console.log(bag)
  const userProfile = useSelector((store) => store.userProfile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleCartClick = () => {
    if (userId) {
      navigate("/Bag");
    } else {
      Swal.fire({
        title: 'You are not logged in',
        text: 'Please log in to view your cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login"); // Navigate to login page
        }
      });
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch(userActions.clearUser());
    window.location.reload();
  };
 
  return (
    <div className="flex lg:px-10 md:pl-2 h-20 py-5 px-5 bg-white content-center items-center shadow-lg justify-between md:gap-10 fixed z-50 w-full">
      <div className="lg:pr-10">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 h-16" />
        </Link>
      </div>
      <div className="w-1/5 lg:pl-10 hidden lg:block">
        <ul className="flex gap-10 content-center items-center font-semibold text-sm">
          <li>
            <Location />
          </li>
        </ul>
      </div>
      <div className="w-1/2 flex content-center items-center relative">
        <IoSearch className="text-2xl absolute left-3 top-2 text-gray-500" />
        <input
          type="search"
          placeholder="Search for products, brand and more"
          className="bg-gray-200 rounded w-full h-10 hover:border-none px-12"
        />
      </div>
      <div className="w-1/4 gap-5 content-center items-center font-semibold text-sm hidden lg:block md:block">
        <ul className="flex gap-5 w-full">
          
          {!userId ? (
            <li className="flex justify-center content-center items-center">
              <Login name={"LOGIN"} />
            </li>
          ) : (
            <li className="">
              <div className="flex justify-center content-center items-center">
                <VscAccount className="text-2xl" />
              </div>
              <button onClick={toggleDropdown}>Profile</button>
              {dropdownVisible && (
                <div className="absolute bg-white text-gray-600 shadow-md rounded w-60 mt-4 p-5 z-10">
                  <Link
                    to={`/user/MyAcount`}
                    className="block px-4 py-2 hover:bg-gray-200 text-lg font-semibold"
                  >
                    My Account
                    <p className="text-sm font-thin">{userProfile.mobileNumber}</p>
                  </Link>
                  <Link
                    to={`/user/MyOrder`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Orders
                  </Link>
                  <Link
                    to={`/user/SaveAddress`}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Save Address
                  </Link>
                  <Link
                    to={`/user/MyWishlist`}
                    className="px-4 py-2 hover:bg-gray-200 flex justify-between items-center"
                  >
                    <span>My Wishlist</span>
                    <span className="text-sm font-thin">₹{userProfile.wallet}</span>
                  </Link>
                  <div className="border-t my-2"></div>
                  <Link to="/faqs" className="block px-4 py-2 hover:bg-gray-200">
                    FAQ's
                  </Link>
                  <Link
                    to="/account-privacy"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Account Privacy
                  </Link>
                  <button
                    className="block px-4 py-2 hover:bg-gray-200 text-red-500"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
      <div>
        <NavBarModal />
      </div>
    </div>
  );
};

export default NavBar1;