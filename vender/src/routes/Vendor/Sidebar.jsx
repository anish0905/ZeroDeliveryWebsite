import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FaTachometerAlt, FaBoxOpen, FaProductHunt, FaPlus, FaTruck, FaCalendar, FaMoneyBillWave, FaInbox, FaTags, FaUndoAlt, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/orders", label: "All Orders", icon: <FaBoxOpen /> },
    { to: "/products", label: "All Products", icon: <FaProductHunt /> },
    { to: "/createProduct", label: "Create Product", icon: <FaPlus /> },
    { to: "/DeliveryDetails", label: "Delivery Boy", icon: <FaTruck /> },
    { to: "/allEvents", label: "All Events", icon: <FaCalendar /> },
    { to: "/createEvent", label: "Create Event", icon: <FaPlus /> },
    { to: "/withdrawMoney", label: "Withdraw Money", icon: <FaMoneyBillWave /> },
    { to: "/shopInbox", label: "Shop Inbox", icon: <FaInbox /> },
    { to: "/discountCodes", label: "Discount Codes", icon: <FaTags /> },
    { to: "/refund", label: "Refund", icon: <FaUndoAlt /> },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col py-20">
      <nav className="flex flex-col p-4">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) => 
              `p-2 my-2 rounded flex items-center space-x-4 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
        <Button
          className="p-2 my-2 rounded flex items-center space-x-4 hover:bg-gray-700 shadow-none text-start"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-2xl" />
          <span>LOGOUT</span>
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
