import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { FaSquare } from "react-icons/fa";

const CompareElecChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const data1 = [
      {
        name: "Đồng hồ đo điện 1",
        value: 70,
        itemStyle: {
          color: "red",
        },
      },
      {
        name: "Đồng hồ đo điện 2",
        value: 50,
        itemStyle: {
          color: "#00FF00",
        },
      },
      {
        name: "Đồng hồ đo điện 3",
        value: 30,
        itemStyle: {
          color: "blue",
        },
      },
      {
        name: "Đồng hồ đo điện 4",
        value: 30,
        itemStyle: {
          color: "orange",
        },
      },
      {
        name: "Đồng hồ đo điện 5",
        value: 30,
        itemStyle: {
          color: "yellow",
        },
      },
      {
        name: "Đồng hồ đo điện 6",
        value: 30,
        itemStyle: {
          color: "purple",
        },
      },
      {
        name: "Đồng hồ đo điện 7",
        value: 30,
        itemStyle: {
          color: "gray",
        },
      },
      {
        name: "Đồng hồ đo điện 8",
        value: 30,
        itemStyle: {
          color: "blue",
        },
      },
    ];
    const data2 = [
      {
        name: "Giờ cao điểm",
        value: 70,
        itemStyle: {
          color: "red",
        },
      },
      {
        name: "Giờ bình thường",
        value: 50,
        itemStyle: {
          color: "#00FF00",
        },
      },
      {
        name: "Giờ thấp điểm",
        value: 30,
        itemStyle: {
          color: "blue",
        },
      },
    ];
    const data3 = [
      {
        name: "1",
        value: 70,
        itemStyle: {
          color: "red",
        },
      },
      {
        name: "2",
        value: 50,
        itemStyle: {
          color: "#00FF00",
        },
      },
      {
        name: "3",
        value: 30,
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
          text: "Theo lượng điện tiêu thụ",
          left: "20%",
          top: "13%",
          textAlign: "center",
        },
        {
          text: "Theo khung giờ",
          left: "50%",
          top: "13%",
          textAlign: "center",
        },
        {
          text: "NaN",
          left: "80%",
          top: "13%",
          textAlign: "center",
        },
      ],
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          center: ["20%", "50%"], // Vị trí của biểu đồ thứ nhất
          data: data1,
          label: {
            position: "outer",
            alignTo: "none",
            bleedMargin: 5,
          },
        },
        {
          type: "pie",
          radius: "50%",
          center: ["50%", "50%"], // Vị trí của biểu đồ thứ hai
          data: data2,
          label: {
            position: "outer",
            alignTo: "labelLine",
            bleedMargin: 5,
          },
        },
        {
          type: "pie",
          radius: "50%",
          center: ["80%", "50%"], // Vị trí của biểu đồ thứ ba
          data: data3,
          label: {
            position: "outer",
            alignTo: "labelLine",
            bleedMargin: 5,
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
      <div ref={chartRef} className="h-[350px] w-full"></div>
      {/* Custom Legend outside the chart */}
      {/* <div className="flex items-center space-x-2 text-[12px] ml-16 mt-2">
        <FaSquare className="text-red-500" />
        <span>Giờ cao điểm</span>
        <FaSquare className="text-green-500" />
        <span>Giờ bình thường</span>
        <FaSquare className="text-blue-500" />
        <span>Giờ thấp điểm</span>
      </div> */}
    </div>
  );
};

export default CompareElecChart;
