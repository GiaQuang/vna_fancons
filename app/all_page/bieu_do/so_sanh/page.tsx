"use client";

import { useState } from "react";
import Header from "./Header";
import CompareCharts from "@/components/Echarts/so_sanh_cot";
import CompareTwoChart from "@/components/Echarts/so_sanh_tron";
import { toast } from "sonner";

const GridLayout = () => {
  const [criteria, setCriteria] = useState("Theo Năm"); // Tiêu chí so sánh
  const [showCharts, setShowCharts] = useState(false);

  const handleCriteriaChange = (event) => {
    setCriteria(event.target.value);
  };

  const handleCompare = () => {
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
    <div className="h-screen w-full flex flex-col overflow-hidden select-none">
      <Header />

      <main className="flex-1 p-4 min-h-0">
        <div className="h-full grid grid-rows-2 gap-4">
          <div className="grid grid-cols-12 gap-4 min-h-0">
            <div className="col-span-4 border-2 border-gray-300 rounded-lg p-4 overflow-y-auto">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-start gap-6">
                  <div className="flex flex-col">
                    <label className="ml-20 mb-2">Chọn Thiết Bị</label>
                    <select className="ml-20 border rounded-md px-3 py-2 bg-white w-36 mr-0.5">
                      <option>Dây chuyền 1</option>
                      <option>Dây chuyền 2</option>
                    </select>
                  </div>

                  {/* Chọn tiêu chí */}
                  <div className="flex flex-col">
                    <label className="ml-5 mb-2">Tiêu Chí So Sánh</label>
                    <select
                      className="ml-5 border rounded-md px-3 py-2 bg-white w-36"
                      value={criteria}
                      onChange={handleCriteriaChange}
                    >
                      <option value="Theo Năm">Theo Năm</option>
                      <option value="Theo Tháng">Theo Tháng</option>
                      <option value="Theo Ngày">Theo Ngày</option>
                    </select>
                  </div>
                </div>

                {/* So sánh theo Năm */}
                <div className="flex items-center gap-4">
                  <span className="w-16">Năm</span>
                  <select className="border rounded-md px-3 py-2 bg-white w-36">
                    {[2021, 2022, 2023].map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                  <span className="italic opacity-70">vs</span>
                  <select className="border rounded-md px-3 py-2 bg-white w-36">
                    {[2021, 2022, 2023].map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* So sánh theo Tháng */}
                <div className="flex items-center gap-4">
                  <span className="w-16">Tháng</span>
                  <select
                    className={`border rounded-md px-3 py-2 bg-white w-36 ${
                      criteria === "Theo Năm"
                        ? "opacity-30 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={criteria === "Theo Năm"}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <span className="italic opacity-70">vs</span>
                  <select
                    className={`border rounded-md px-3 py-2 bg-white w-36 ${
                      criteria === "Theo Năm"
                        ? "opacity-30 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={criteria === "Theo Năm"}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                {/* So sánh theo Ngày */}
                <div className="flex items-center gap-4">
                  <span className="w-16">Ngày</span>
                  <select
                    className={`border rounded-md px-3 py-2 bg-white w-36 ${
                      criteria !== "Theo Ngày"
                        ? "opacity-30 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={criteria !== "Theo Ngày"}
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <span className="italic opacity-70">vs</span>
                  <select
                    className={`border rounded-md px-3 py-2 bg-white w-36 ${
                      criteria !== "Theo Ngày"
                        ? "opacity-30 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={criteria !== "Theo Ngày"}
                  >
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md w-64 hover:bg-blue-600 transition-colors"
                  onClick={handleCompare}
                >
                  Thực Hiện So Sánh
                </button>
              </div>
            </div>

            <div className="col-span-8 border-2 border-gray-300 rounded-lg p-4 overflow-hidden">
              {showCharts && (
                <div className="w-full h-full">
                  <CompareTwoChart />
                </div>
              )}
            </div>
          </div>

          <div className="border-2 border-gray-300 rounded-lg p-4 overflow-hidden">
            {showCharts && (
              <div className="w-full h-full">
                <CompareCharts />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-8 flex justify-center items-center gap-4 p-2 border-t bg-blue-100 text-[8px]">
        ĐÂY LÀ FOOTER
      </footer>
    </div>
  );
};

export default GridLayout;
