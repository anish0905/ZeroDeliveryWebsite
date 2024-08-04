import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(LinearScale, CategoryScale, BarElement, Legend, Title, Tooltip);

const options = {
  responsive: true,
  scales: {
    x: {
      barPercentage: 0.8,
      categoryPercentage: 0.9,
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Orders",
      fontSize: 30,
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Charts = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchMonthlyOrderQty = async () => {
      try {
        const token = localStorage.getItem("token");
        const vendorId = localStorage.getItem("userId"); // Replace with actual vendorId

        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch(
          `http://localhost:5001/api/vendor/qty/totalorder/monthwise/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSales(data);

        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMonthlyOrderQty();
  }, []);

  const datasetData = new Array(12).fill(0);
  sales.forEach((monthData) => {
    if (monthData.month !== null) {
      datasetData[monthData.month - 1] = monthData.orderCount;
    }
  });

  const datasets = [
    {
      label: "Monthly Orders",
      data: datasetData,
      backgroundColor: "#3a9be9",
      barThickness: 20,
    },
  ];

  const data = {
    labels,
    datasets,
  };

  return <Bar data={data} options={options} />;
};

export default Charts;
