"use client";

import Header from "./Header";
import React, { useState } from "react";
import CompareTwoChart from "@/components/Echarts/tong_hop_tron";
import BarChart from "@/components/Echarts/tong_hop_cot";
import BarChartsWater from "@/components/Echarts/tong_hop_cot_nuoc";
import CompareThreeChart from "@/components/Echarts/Compare_gas";
import CompareElecChart from "@/components/Echarts/Compare_Elec";
import CompareWaterChart from "@/components/Echarts/Compare_Water";
import { toast } from "sonner";

export default function ApSuatPage() {
  const [selectedDevice, setSelectedDevice] = useState("Tất cả");
  const [selectedDate, setSelectedDate] = useState("2023-01");
  const [chartDevice, setChartDevice] = useState(null);
  const [chartDate, setChartDate] = useState(null);
  const [showCharts, setShowCharts] = useState(false);

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDrawChart = () => {
    setChartDevice(selectedDevice);
    setChartDate(selectedDate);
    setShowCharts(true);
    toast.success("Đang vẽ biểu đồ", {
      position: "top-right",
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  return (
    <div className="h-screen flex flex-col select-none">
      <Header />
      <div className="ml-8 mr-8 mt-2 border rounded-lg">
        <div className="flex flex-row items-center justify-between w-[500px] gap-4 mb-2">
          <div className="flex flex-col">
            <div className="ml-2 mb-2">Chọn Thiết Bị</div>
            <select
              className="ml-2 border rounded-md px-3 py-2 bg-white"
              value={selectedDevice}
              onChange={handleDeviceChange}
            >
              <option>Tất cả</option>
              <option>Đồng hồ đo điện</option>
              <option>Đồng hồ đo nước</option>
            </select>
          </div>
          <div className="flex flex-col">
            <div className="mb-2">Thời gian</div>
            <input
              type="month"
              value={selectedDate}
              onChange={handleDateChange}
              className="border rounded-md px-3 py-2"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-8 whitespace-nowrap"
            onClick={handleDrawChart}
          >
            Vẽ biểu đồ
          </button>
        </div>

        {showCharts && chartDevice === "Tất cả" && (
          <CompareTwoChart date={chartDate} />
        )}
        {showCharts && chartDevice === "Đồng hồ đo điện" && (
          <>
            <CompareElecChart date={chartDate} />
            <div className="mt-4 ml-8 mr-8 border rounded-lg">
              <BarChart date={chartDate} />
            </div>
          </>
        )}
        {showCharts && chartDevice === "Đồng hồ đo nước" && (
          <>
            <CompareWaterChart date={chartDate} />
            <BarChartsWater date={chartDate} />
          </>
        )}
      </div>
    </div>
  );
}
