import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-5 text-lg font-bold">Admin Panel</div>
      <nav className="flex flex-col p-4">
        <NavLink
          to="/dashboard"
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

export default Sidebar;
