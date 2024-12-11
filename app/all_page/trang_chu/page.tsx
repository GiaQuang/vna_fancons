"use client";

import Header from "./Header";
import ProgressBar from "@/components/ui/ProgressBar";
import { FaArrowDown } from "react-icons/fa";
import { FaSquare } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";
import { MathJax, MathJaxContext } from "better-react-mathjax";

export default function ApSuatPage() {
  // Giá trị mẫu
  const totalElectricityCost = 1234567;
  const peakCost = 300000;
  const offPeakCost = 200000;
  const normal = totalElectricityCost - peakCost - offPeakCost;
  const totalElectricity = 1000;
  const totalWater = 33;
  const totalWaterCost = 1000000;
  const totalCost = totalElectricityCost + totalWaterCost;
  const totalElectricityDevices = 8;
  const totalWaterDevices = 6;
  const totalDevices = totalElectricityDevices + totalWaterDevices;

  const red = ((peakCost / totalElectricityCost) * 100).toFixed(2);
  const blue = ((offPeakCost / totalElectricityCost) * 100).toFixed(2);
  const green = (100 - parseFloat(red) - parseFloat(blue)).toFixed(2);

  return (
    <div className="min-h-screen w-[calc(100dvw-180px)] flex flex-col select-none">
      <Header />
      <div className="flex-1 grid grid-cols-1 gap-2 px-2 my-2">
        <div className="flex-1 grid grid-cols-3 grid-rows-2 bg-gray-600 text-white gap-2 rounded-lg p-2">
          <div className="border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              TIÊU THỤ ĐIỆN THÁNG NÀY
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-8">
              {totalElectricity.toLocaleString()} kWh{" "}
              <FaArrowDown className="ml-4 text-green-500" />
              <span className="text-green-500"> 5%</span>
            </h3>
            <h3 className="flex items-center justify-center text-2xl mt-2">
              {totalElectricityCost.toLocaleString()} VND{" "}
              <FaArrowUp className="ml-4 text-red-500" />
              <span className="text-red-500"> 23%</span>
            </h3>

            <div className="flex items-center space-x-2 text-[12px] ml-20 mt-8">
              <FaSquare className="text-red-500" />
              <span>Giờ cao điểm</span>
              <FaSquare className="text-green-500" />
              <span>Giờ bình thường</span>
              <FaSquare className="text-blue-500" />
              <span>Giờ thấp điểm</span>
            </div>
            <div className="mt-2 w-3/4 mx-auto">
              <ProgressBar red={red} green={green} blue={blue} />
            </div>
          </div>

          <div className=" border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              CHI PHÍ ĐIỆN GIỜ CAO ĐIỂM
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-8">
              {peakCost.toLocaleString()} VND{" "}
            </h3>
            <div className="mt-4 ml-12 text-2xl">
              Thời gian sử dụng: 9h30-11h30; 17h-20h30
            </div>
            <div className="mt-2 ml-12 text-2xl">Số điện: </div>
            <div className="mt-2 ml-12 text-2xl">Đơn giá: </div>
          </div>

          <div className=" border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              CHI PHÍ ĐIỆN GIỜ THẤP ĐIỂM
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-8">
              {offPeakCost.toLocaleString()} VND{" "}
            </h3>
            <div className="mt-4 ml-12 text-2xl">
              Thời gian sử dụng: 0h-4h, 22h-24h
            </div>
            <div className="mt-2 ml-12 text-2xl">Số điện: </div>
            <div className="mt-2 ml-12 text-2xl">Đơn giá: </div>
          </div>

          <div className="border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              TIÊU THỤ NƯỚC THÁNG NÀY
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-8">
              <MathJaxContext>
                <MathJax inline>
                  <div className="flex items-center">
                    <span
                      style={{
                        display: "inline-block",
                      }}
                      className="font-bold ml-0"
                    >
                      {totalWater.toLocaleString()}
                      {`\\( {m^3} \\)`}
                    </span>
                  </div>
                </MathJax>
              </MathJaxContext>

              <div className="flex items-center ml-4">
                <FaArrowDown className="text-green-500 mr-2" />
                <span className="text-green-500">5%</span>
              </div>
            </h3>

            <h3 className="flex items-center justify-center text-2xl mt-2">
              {totalWaterCost.toLocaleString()} VND{" "}
              <FaArrowUp className="ml-4 text-red-500" />
              <span className="text-red-500"> 5%</span>
            </h3>
          </div>

          <div className=" border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              TỔNG CHI PHÍ THÁNG NÀY
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-8">
              {totalCost.toLocaleString()} VND{" "}
              <FaArrowUp className="ml-4 text-red-500" />
              <span className="text-red-500"> 10%</span>
            </h3>
          </div>

          <div className=" border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              TỔNG SỐ THIẾT BỊ: {totalDevices}
            </h1>

            <div className="mt-4 ml-12 text-2xl">
              Đồng hồ đo điện: {totalElectricityDevices}
            </div>
            <div className="mt-2 ml-12 text-2xl">
              Đồng hồ đo nước: {totalWaterDevices}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
