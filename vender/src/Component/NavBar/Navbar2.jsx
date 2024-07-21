import React from "react";
import { NavLink } from "react-router-dom";
import loginIMg from "../../../public/images/login.png";

const Navbar2 = () => {
  return (
    <div className="w-64 min-h-screen  text-black flex flex-col py-20">
       <div className="flex justify-center content-center items-center">
        <img src={loginIMg} alt="" className="h-40" />
      </div>
      <nav className="flex flex-col p-4">
        <NavLink
          to="/"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/orders"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          All Order
        </NavLink>
        <NavLink
          to="/orders"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          All Products
        </NavLink>

        <NavLink
          to="/createProduct"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Create product
        </NavLink>

        <NavLink
          to="/orders"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          All Events
        </NavLink>

        <NavLink
          to="/orders"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Create Events
        </NavLink>

        <NavLink
          to="/orders"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Withdrow Money
        </NavLink>

        <NavLink
          to="/shopinbox"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Shop Inbox
        </NavLink>

        <NavLink
          to="/shopinbox"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Discount Codes
        </NavLink>

        <NavLink
          to="/registration"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          Refund
        </NavLink>

        <NavLink
          to="/logout"
          className="p-2 my-2 rounded hover:bg-gray-700"
          activeClassName="bg-gray-700"
        >
          LOGOUT
        </NavLink>
      </nav>
    </div>
  );
};

export default Navbar2;
