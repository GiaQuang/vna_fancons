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
            fontSize: 23, // Kích thước font
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
          left: "80%",
          top: "70%",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "70%",
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

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start">
      {/* Container nội dung bên phải */}
      <div className="w-full sm:w-1/2 px-4 mt-4 sm:mt-0 sm:ml-4 sm:h-96 bg-gray-100 shadow-lg rounded-md mr-4">
        <h3 className="text-2xl font-bold text-center mb-4 mt-2">
          Thông tin chi tiết
        </h3>
        <ul className="text-xl space-y-2 font-bold ml-4">
          <li>
            <span className="">Giá trị điện áp trung bình: 236V</span>{" "}
          </li>
          <li>
            <span>Giá trị dòng điện trung bình: 0.035A</span>{" "}
          </li>
          <li>
            <span>Tổng công suất tiêu thụ: 68.1W</span>{" "}
          </li>
          <li>
            <span>Tổng công suất phản kháng: 22.75VAr</span>{" "}
          </li>
          <li>
            <span>Tổng công suất biểu kiến: 79VA</span>{" "}
          </li>
          <li>
            <span>Tần số dòng điện: 50Hz</span>
          </li>
          <li>
            <span>Tổng điện năng tiêu thụ: 92736.8Wh</span>{" "}
          </li>
        </ul>
      </div>
      {/* Container biểu đồ */}
      <div
        ref={chartRef}
        className="w-full sm:w-2/3 mr-4 h-64 sm:h-96 bg-gray-100 shadow-lg rounded-md "
      />
    </div>
  );
};

export default EChartsComponent;
