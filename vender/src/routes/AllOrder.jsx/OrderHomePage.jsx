import React, { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import axios from "axios";
import Sidebar from "../admin/Sidebar";
import { API_URI } from "../../Contants";

const OrderHomePage = () => {
  const [orders, setOrders] = useState([]);

  const vendorId = localStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${API_URI}/api/vendor/placeOrder/${vendorId}`
      );
      if (response.status === 200) {
        setOrders(response.data);
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

  const updateOrderStatus = async (orderId) => {
    try {
      const response = await axios.put(
        `${API_URI}/api/orders/${orderId}/status`,
        {
          status: "completed", // Example status update
        }
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "completed" } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="flex">
      <div className="lg:block md:block hidden">
        <Sidebar />
      </div>
      <OrderTable orders={orders} updateOrderStatus={updateOrderStatus} />
    </div>
  );
};

export default OrderHomePage;
