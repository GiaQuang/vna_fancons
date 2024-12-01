import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { FaSquare } from "react-icons/fa"; // Importing react-icons for the legend squares

const CompareTwoChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const data = [
      {
        name: "Giờ cao điểm",
        value: 70,
        itemStyle: {
          color: "red",
        },
      },
      {
        name: "Giờ bình thường",
        value: 50, // Thay đổi giá trị cho hợp lý hơn
        itemStyle: {
          color: "#00FF00", // Green
        },
      },
      {
        name: "Giờ thấp điểm",
        value: 30, // Thay đổi giá trị cho hợp lý hơn
        itemStyle: {
          color: "blue",
        },
      },
    ];

    const option = {
      title: [
        {
          text: "BIỂU ĐỒ SO SÁNH TỶ TRỌNG",
          left: "center",
          textStyle: {
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          },
        },
        {
          text: "Tháng X",
          left: "32.5%",
          top: "13%",
          textAlign: "center",
        },
        {
          text: "Tháng Y",
          left: "65.5%",
          top: "13%",
          textAlign: "center",
        },
      ],
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)", // Format tooltip to show name, value, and percentage
      },
      series: [
        {
          type: "pie",
          radius: "55%",
          center: ["100%", "50%"],
          data: data,
          label: {
            position: "outer",
            alignTo: "none",
            bleedMargin: 5,
          },
          left: 0,
          right: "66.6667%",
          top: 0,
          bottom: 0,
        },
        {
          type: "pie",
          radius: "55%",
          center: ["100%", "50%"],
          data: data,
          label: {
            position: "outer",
            alignTo: "labelLine",
            bleedMargin: 5,
          },
          left: "33.3333%",
          right: "33.3333%",
          top: 0,
          bottom: 0,
        },
      ],
      graphic: [
        {
          type: "text",
          left: "29%",
          top: "90%",
          style: {
            text: "Giờ cao điểm",
            fontSize: 18,
            fontWeight: "bold",
            fill: "#FF0000", // Red color
          },
        },
        {
          type: "text",
          left: "44%",
          top: "90%",
          style: {
            text: "Giờ bình thường",
            fontSize: 18,
            fontWeight: "bold",
            fill: "#00FF00", // Green color
          },
        },
        {
          type: "text",
          left: "62%",
          top: "90%",
          style: {
            text: "Giờ thấp điểm",
            fontSize: 18,
            fontWeight: "bold",
            fill: "#0000FF", // Blue color
          },
        },
      ],
    };

    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <div>
      <div ref={chartRef} className="h-[400px] w-full"></div>
      {/* Custom Legend outside the chart */}
      <div className="flex items-center space-x-2 text-[12px] ml-16">
        <FaSquare className="text-red-500" />
        <span>Giờ cao điểm</span>
        <FaSquare className="text-green-500" />
        <span>Giờ bình thường</span>
        <FaSquare className="text-blue-500" />
        <span>Giờ thấp điểm</span>
      </div>
    </div>
  );
};

export default CompareTwoChart;
