"use client";

import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const EChartsComponent = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Khởi tạo ECharts
      const myChart = echarts.init(chartRef.current);

      // Tùy chỉnh biểu đồ
      const option: echarts.EChartsOption = {
        title: {
          text: "Biểu đồ tỷ lệ tiêu thụ điện",
          //subtext: "Fake Data",
          left: "center",
          textStyle: {
            fontSize: 18, // Kích thước font
            fontWeight: "bold", // Độ đậm font
            fontFamily: "Arial, sans-serif", // Chọn font chữ
          },
        },
        tooltip: {
          trigger: "item",
        },
        color: ["red", "#33FF57", "blue"],
        legend: {
          orient: "vertical",
          left: "25%",
          top: "15%",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 24.3, name: "Giờ cao điểm" },
              { value: 59.5, name: "Giờ bình thường" },
              { value: 16.2, name: "Giờ thấp điểm" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      myChart.setOption(option);

      // Đảm bảo giải phóng tài nguyên khi component bị unmount
      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={chartRef}
      className="w-full h-64 sm:h-96 bg-white shadow-lg rounded-md"
    />
  );
};

export default EChartsComponent;
