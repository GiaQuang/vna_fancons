"use client";

import Header from "./Header";
import React, { useState } from "react";
import EChartsComponent from "@/components/Echarts/chi_tiet_tron";
import BarChart from "@/components/Echarts/chi_tiet_cot";
import { toast } from "sonner";

export default function ApSuatPage() {
  const [selectedDevice, setSelectedDevice] = useState("Đồng hồ điện 1");
  const [selectedTime, setSelectedTime] = useState("2023-01");
  const [showCharts, setShowCharts] = useState(false);

  const handleDeviceChange = (event) => {
    setSelectedDevice(event.target.value);
    setShowCharts(false);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    setShowCharts(false);
  };

  const handleDrawChart = () => {
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

      <div className="ml-8 mt-2 border rounded-lg">
        <div className="flex flex-row items-center justify-between w-[500px] gap-4 mb-2">
          <div className="flex flex-col">
            <label className="ml-2 mb-2">Chọn Thiết Bị</label>
            <select
              className="ml-2 border rounded-md px-3 py-2 bg-white"
              value={selectedDevice}
              onChange={handleDeviceChange}
            >
              <option>Đồng hồ điện 1</option>
              <option>Đồng hồ điện 2</option>
              <option>Đồng hồ điện 3</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2">Thời gian</label>
            <input
              type="month"
              value={selectedTime}
              onChange={handleTimeChange}
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

        {/* Hiển thị biểu đồ */}
        {showCharts && (
          <>
            <EChartsComponent device={selectedDevice} time={selectedTime} />

            <div className="mt-2 border rounded-lg ">
              <BarChart device={selectedDevice} time={selectedTime} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
