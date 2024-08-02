import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "../Vendor/PieChart";
import Charts from "../Vendor/Chart";
import Sidebar from "../Vendor/Sidebar";
import { API_URI } from "../../Contants";

const VendorDashBoard = () => {
  const [todaySales, setTodaySales] = useState(0);
  const [weeklySales, setWeeklySales] = useState(15000);
  const [weeklyOrders, setWeeklyOrders] = useState(42254);
  const [revenue, setRevenue] = useState(1024565);
  const [monthlyOrder, setMonthlyOrder] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const salesData = [
      { timestamp: new Date().toISOString(), totalRevenue: 5000 },
      { timestamp: new Date().toISOString(), totalRevenue: 7000 },
    ];

    const calculateTodaySales = (salesData) => {
      const today = new Date().toLocaleDateString();
      const todaySales = salesData
        .filter(
          (sale) => new Date(sale.timestamp).toLocaleDateString() === today
        )
        .reduce((total, sale) => total + sale.totalRevenue, 0);
      setTodaySales(todaySales);
    };

    calculateTodaySales(salesData);
  }, []);

  const fetchDataMonths = async () => {
    try {
      const resp = await axios.get(
        `${API_URI}/api/vendor/qty/products/lastThirtyDays/${userId}`
      );
      const data = resp.data.totalQuantity;
      console.log(data);
      setMonthlyOrder(data); // Assuming data is an array
    } catch (error) {
      console.error("Error fetching monthly order data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDataMonths();
    } else {
      console.error("No user ID found in localStorage");
    }
  }, [userId]); // Add userId as a dependency to re-run the effect if it changes

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
                  <p className="font-bold text-xl">RS. {todaySales}</p>
                  <p className="font-medium text-lg">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#88c6f7] to-[rgb(1,8,14)] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">All Order</p>
                  <p className="font-bold text-xl">$ {monthlyOrder}</p>
                  <p className="font-medium text-lg">
                    {" "}
                    <a href="">View Orders</a>
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#77d8cf] to-[rgb(1,94,80)] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">All Products</p>
                  <p className="font-bold text-xl">{weeklyOrders}</p>
                  <p className="font-medium text-lg">
                    {" "}
                    <a href="">View Products</a>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-[#ffbb96] via-[#fe8a96] to-[#fe8796] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">Today's Sales</p>
                  <p className="font-bold text-xl">RS. {todaySales}</p>
                  <p className="font-medium text-lg">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-[#88c6f7] to-[#3a9be9] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">Weekly Sales</p>
                  <p className="font-bold text-xl">$ {weeklySales}</p>
                  <p className="font-medium text-lg">Increased by 60%</p>
                </div>
                <div className="bg-gradient-to-r from-[#77d8cf] to-[#39d2bc] rounded-lg p-5 text-white">
                  <p className="font-medium text-lg">Weekly orders</p>
                  <p className="font-bold text-xl">{weeklyOrders}</p>
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

export default VendorDashBoard;
