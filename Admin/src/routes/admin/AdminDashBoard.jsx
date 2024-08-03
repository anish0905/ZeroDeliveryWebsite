import React, { useEffect, useState } from "react";
import PieChart from "../admin/PieChart";
import Charts from "../admin/Chart";
import Sidebar from "../admin/Sidebar";
import axios from "axios";

const AdminDashBoard = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalProduct, setTotalProduct] = useState(15000); // Default values
  const [weeklyOrders, setWeeklyOrders] = useState(42254); // Default values
  const [revenue, setRevenue] = useState(1024565); // Default values

  const fetchTotalOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/admin/products/totalorder"
      );
      if (response.data && response.data.length > 0) {
        setTotalQuantity(response.data[0].totalQuantity);
      } else {
        setTotalQuantity(0); // In case no data is returned
      }
    } catch (error) {
      console.error("Error fetching total orders:", error);
    }
  };

  const fetchTotalProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/admin/products/addkiyahua/TotalProducts"
      );
      if (response.data && response.data.productCount !== undefined) {
        setTotalProduct(response.data.productCount); // Update state with productCount
      } else {
        setTotalProduct(0); // In case no data is returned
      }
    } catch (error) {
      console.error("Error fetching total product count:", error);
    }
  };

  const fetchWeeklyOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/admin/products/addkiyahua/TotalWeeklyProducts"
      );

      // Check the actual structure of the data and use the correct key
      if (response.data && response.data.totalQuantity !== undefined) {
        setWeeklyOrders(response.data.totalQuantity); // Update state with totalQuantity
      } else {
        setWeeklyOrders(0); // In case no data is returned
      }
    } catch (error) {
      console.error("Error fetching weekly orders:", error);
    }
  };
  const fetchRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/admin/products/revenue" // Adjust the endpoint as needed
      );
      if (response.data && response.data.revenue !== undefined) {
        setRevenue(response.data.revenue); // Update state with revenue
      } else {
        setRevenue(0); // Default value if no data is returned
      }
    } catch (error) {
      console.error("Error fetching revenue:", error);
    }
  };

  useEffect(() => {
    fetchTotalOrders();
    fetchTotalProduct();
    fetchWeeklyOrders();
    fetchRevenue();
  }, []);

  return (
    <div className="flex">
      <div className="lg:block md:block hidden">
        <Sidebar />
      </div>
      <div className="flex-1 px-10 py-5 mt-16">
        <div className="flex justify-end">
          <div className="w-full">
            <div className="p-5 bg-[#f2edf3] rounded-lg shadow-md">
              <h1 className="bg-blue-gray-100 text-blue-gray-900 font-bold text-center font-sans text-4xl mb-2">
                <marquee behavior="" direction="">
                  OverView
                </marquee>
              </h1>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-6">
                <div className="bg-gradient-to-r from-[#ffbb96] via-[hsl(140,37%,50%)] to-[#fe8796] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">Account Balance</p>
                  <p className="font-medium text-lg">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#88c6f7] to-[rgb(1,8,14)] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">All Orders</p>
                  <p className="font-bold text-xl">$ {totalQuantity}</p>
                  <p className="font-medium text-lg">
                    <a href="">View Orders</a>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#77d8cf] to-[rgb(1,94,80)] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">All Products</p>
                  <p className="font-bold text-xl">{totalProduct}</p>
                  <p className="font-medium text-lg">
                    <a href="">View Products</a>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-[#ffbb96] via-[#fe8a96] to-[#fe8796] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">Today's Sales</p>
                  <p className="font-medium text-lg">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#88c6f7] to-[#3a9be9] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">Weekly Sales</p>
                  {/* <p className="font-bold text-xl">$ {weeklySales}</p> */}
                  <p className="font-medium text-lg">Increased by 60%</p>
                </div>
                <div className="bg-gradient-to-r from-[#77d8cf] to-[#39d2bc] rounded-lg p-5 text-white">
                  <h2>Weekly Orders</h2>
                  <p>{weeklyOrders}</p>
                  <p className="font-medium text-lg">Increased by 40%</p>
                </div>
                <div className="bg-gradient-to-r from-[#cc80ff] to-[#9c57ff] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">Revenue</p>
                  <p className="font-bold text-xl">RS. {revenue}</p>
                  <p className="font-medium text-lg">Increased by 10%</p>
                </div>
              </div>
              <section>
                <div className="charts grid gap-6 md:grid-cols-2">
                  <div className="w-full h-96 p-4 bg-white rounded-lg shadow-lg">
                    <PieChart />
                  </div>
                  <div className="w-full h-96 p-4 bg-white rounded-lg shadow-lg">
                    <Charts />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
