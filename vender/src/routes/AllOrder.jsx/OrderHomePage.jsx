import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import axios from "axios";
import Sidebar from "../Vendor/Sidebar";
import { API_URI } from "../../Contants";

const OrderHomePage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  const vendorId = localStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${API_URI}/api/vendor/placeOrder/${vendorId}`
      );
      if (response.status === 200) {
        setOrders(response.data);
        setFilteredOrders(response.data.filter(order => order.status === activeTab));
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchOrders(vendorId);
    }
  }, [vendorId]);

  useEffect(() => {
    setFilteredOrders(orders.filter(order => order.status === activeTab));
  }, [activeTab, orders]);

  const updateOrderStatus = async (orderId,newStatus) => {
    try {
      const response = await axios.put(
        `${API_URI}/api/vendor/changeOrderStatus`,
        {
          orderId,
           newStatus,
        }
      );
      fetchOrders()
      
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="flex">
      <div className="lg:block md:block hidden">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 pt-24">
        <div className="mb-2 flex space-x-4">
          {["pending", "processing", "shipped", "delivered", "cancelled"].map(status => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg ${
                activeTab === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-blue-600 hover:text-white transition-colors`}
              onClick={() => setActiveTab(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <OrderTable orders={filteredOrders} updateOrderStatus={updateOrderStatus} />
      </div>
    </div>
  );
};

export default OrderHomePage;
