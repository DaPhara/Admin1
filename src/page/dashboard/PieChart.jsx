import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const getChartOptions = () => {
  return {
    series: [25, 25, 25, 25], // Values for football, volleyball, basketball, and badminton
    colors: ["#1C64F2", "#16BDCA", "#9061F9", "#FF7F50"], // Colors for each category

    chart: {
      height: 380,
      width: 380,
      type: "pie",
      redrawOnParentResize: true,
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        dataLabels: {
          offset: -25,
          minAngleToShowLabel: 10,
        },
      },
    },

    labels: ["Football", "Volleyball", "Basketball", "Badminton"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
        fontSize: "20px",
      },
      formatter: function (value, { seriesIndex }) {
        return `${value}%`;
      },
    },
    legend: {
      position: "bottom",
      offsetY: 5,
      layout: "horizontal",
      align: "center",
      fontFamily: "Inter, sans-serif",
      fontSize: "15px",
      markers: {
        size: 5,
      },
    },
  };
};

export default function PieChart() {
  const chartRef = useRef(null); // Ref to store chart instance

  useEffect(() => {
    if (!chartRef.current) {
      // Create new chart instance if it doesn't exist
      chartRef.current = new ApexCharts(
        document.getElementById("pie-chart"),
        getChartOptions()
      );
      chartRef.current.render(); // Render the chart
    }

    return () => {
      // Cleanup function to destroy the chart when component unmounts
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div id="pie-chart" className="mt-4">
          {/* Chart will be rendered here */}
        </div>
      </div>
    </>
  );
}
