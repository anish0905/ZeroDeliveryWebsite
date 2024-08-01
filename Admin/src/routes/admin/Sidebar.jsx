import { Button } from "@material-tailwind/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col py-20">
      <nav className="flex flex-col p-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/venderDetails"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Vendor Details
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          All Products
        </NavLink>

        <NavLink
          to="/createProduct"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Create Product
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          All Events
        </NavLink>

        <NavLink
          to="/createEvent"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Create Event
        </NavLink>

        <NavLink
          to="/withdrawMoney"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Withdraw Money
        </NavLink>

        <NavLink
          to="/shopInbox"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Shop Inbox
        </NavLink>

        <NavLink
          to="/discountCodes"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Discount Codes
        </NavLink>

        <NavLink
          to="/refund"
          className={({ isActive }) => 
            `p-2 my-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
          }
        >
          Refund
        </NavLink>

        <Button
          className="p-2 my-2 rounded hover:bg-gray-700 shadow-none text-start"
          onClick={handleLogout}
        >
          LOGOUT
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
