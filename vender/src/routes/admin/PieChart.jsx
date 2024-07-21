import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Sales",
        data: [100, 100, 100],
        backgroundColor: ["#fe8a96", "#3a9be9", "#39d2bc"],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
