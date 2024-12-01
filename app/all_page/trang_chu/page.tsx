"use client";

import Header from "./Header";
import ProgressBar from "@/components/ui/ProgressBar";
import { FaArrowDown } from "react-icons/fa";
import { FaSquare } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa6";

export default function ApSuatPage() {
  // Giá trị mẫu
  const totalCost = 1234567;
  const peakCost = 300000;
  const offPeakCost = 200000;
  const normal = totalCost - peakCost - offPeakCost;
  const totalElectricity = 1000;
  const averageElectricity = 33;
  const totalDevices = 30;

  const red = ((peakCost / totalCost) * 100).toFixed(2);
  const blue = ((offPeakCost / totalCost) * 100).toFixed(2);
  const green = (100 - parseFloat(red) - parseFloat(blue)).toFixed(2);

  return (
    <div className="min-h-screen w-[calc(100dvw-180px)] flex flex-col select-none">
      <Header />
      <div className="flex-1 grid grid-cols-1 gap-2 px-2 my-2">
        <div className="flex-1 grid grid-cols-3 grid-rows-2 bg-gray-600 text-white gap-2 rounded-lg p-2">
          <div className="border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              TỔNG CHI PHÍ ĐIỆN THÁNG NÀY
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-2">
              {totalCost.toLocaleString()} VND{" "}
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
              CHI PHÍ GIỜ CAO ĐIỂM
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-2">
              {peakCost.toLocaleString()} VND{" "}
            </h3>
            <div className="mt-4 ml-12 text-2xl">Thời gian sử dụng: </div>
            <div className="mt-2 ml-12 text-2xl">Số điện: </div>
            <div className="mt-2 ml-12 text-2xl">Đơn giá: </div>
          </div>

          <div className=" border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              CHI PHÍ GIỜ THẤP ĐIỂM
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-2">
              {offPeakCost.toLocaleString()} VND{" "}
            </h3>
            <div className="mt-4 ml-12 text-2xl">Thời gian sử dụng: </div>
            <div className="mt-2 ml-12 text-2xl">Số điện: </div>
            <div className="mt-2 ml-12 text-2xl">Đơn giá: </div>
          </div>

          <div className="border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              TỔNG LƯỢNG ĐIỆN THÁNG NÀY
            </h1>

            <h3 className="flex items-center justify-center text-2xl mt-2">
              {totalElectricity.toLocaleString()} kWh{" "}
              <FaArrowDown className="ml-4 text-green-500" />
              <span className="text-green-500"> 5%</span>
            </h3>
          </div>

          <div className=" border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-24 text-3xl">
              LƯỢNG ĐIỆN TRUNG BÌNH NGÀY
            </h1>

            <h3 className="flex flex-col items-center justify-center text-2xl mt-2">
              {averageElectricity.toLocaleString()} kWh{" "}
            </h3>
          </div>

          <div className=" border-2 border-white bg-gray-800 font-bold cursor-pointer">
            <h1 className="flex flex-col items-center justify-center mt-16 text-3xl">
              TỔNG SỐ THIẾT BỊ: {totalDevices.toLocaleString()}
            </h1>

            <div className="mt-4 ml-12 text-2xl">Dây chuyền: </div>
            <div className="mt-2 ml-12 text-2xl">Cụm lò liệu: </div>
            <div className="mt-2 ml-12 text-2xl">Cụm nghiền: </div>
            <div className="mt-2 ml-12 text-2xl">Quạt phân ly: </div>
            <div className="mt-2 ml-12 text-2xl">..... </div>
          </div>
        </div>
      </div>
    </div>
  );
}
