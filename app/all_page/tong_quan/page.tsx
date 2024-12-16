"use client";

import Header from "./Header";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

export type dataType = {
  name: string;
  address: number;
  Vavg?: number;
  Iavg?: number;
  TotalW?: number;
  TotalWater?: number;
  Freq?: number;
  ActiveNetWh?: number;
};

enum Status {
  Normal = "bg-green-600",
  Disconnected = "bg-black opacity-30",
  Warning = "bg-yellow-400",
}

export default function TrangChuPage() {
  const [list_dong_ho_dien, setListDongHoDien] = useState<dataType[]>([]);
  const [list_dong_ho_nuoc, setListDongHoNuoc] = useState<dataType[]>([]);

  useInterval(async () => {
    try {
      const response = await fetch("/api/get_data");
      if (!response.ok) throw new Error("Lỗi khi gọi API");
      const result = await response.json();

      const updatedDongHoDien = result
        .filter((item: dataType) => item.Vavg !== undefined)
        .map((item: dataType) => ({ ...item, value: item.Vavg }));

      const updatedDongHoNuoc = result
        .filter((item: dataType) => item.TotalWater !== undefined)
        .map((item: dataType) => ({ ...item, value: item.TotalWater }));

      setListDongHoDien(padItems(updatedDongHoDien, "Không có dữ liệu"));
      setListDongHoNuoc(padItems(updatedDongHoNuoc, "Không có dữ liệu"));
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  }, 2000);

  const padItems = (items: dataType[], defaultName: string): dataType[] => {
    const paddedItems = [...items];
    while (paddedItems.length < 9) {
      paddedItems.push({
        name: defaultName,
        address: -1,
      });
    }
    return paddedItems;
  };

  const determineStatus = (item: dataType & { value?: number }) => {
    if (item.value === undefined) return Status.Disconnected;
    if (item.Vavg && (item.Vavg < 200 || item.Vavg > 240))
      return Status.Warning;
    return Status.Normal;
  };

  const renderItem = (
    item: dataType & { value?: number },
    type: "dien" | "nuoc"
  ) => {
    const status = determineStatus(item);

    return (
      <div
        key={item.address}
        className={`relative flex flex-col p-2 border-2 border-white w-full h-full ${status} cursor-pointer`}
        style={{
          boxShadow:
            status === Status.Normal
              ? "0 4px 20px rgba(0, 128, 0, 0.8)"
              : status === Status.Warning
              ? "0 4px 20px rgba(255, 255, 0, 0.8)"
              : "0 4px 20px rgba(255, 0, 0, 0.5)",
        }}
      >
        <div className="text-2xl flex justify-center items-center font-bold mb-1 text-yellow-300">
          {item.name}
        </div>
        <div className="border-b-2 border-yellow-300 w-[calc(100%+1rem)] relative left-[-0.5rem] mb-6 mt-1"></div>

        <div className="flex flex-row items-center justify-center mt-3 my-auto">
          <div className="text-5xl text-white">
            {item.value !== undefined
              ? type === "nuoc"
                ? item.value.toFixed(1)
                : item.value.toFixed(2)
              : "N/A"}
          </div>
          <span className="text-xl font-bold ml-0 transform translate-y-3 opacity-50">
            {type === "dien" ? "V" : "m³"}
          </span>
        </div>

        <div className="text-white text-sm mt-2">
          {type === "dien" && (
            <>
              <div>Dòng điện trung bình: {item.Iavg?.toLocaleString()} A</div>
              <div>Công suất tiêu thụ: {item.TotalW?.toLocaleString()} W</div>
              <div>Tần số dòng điện: {item.Freq?.toLocaleString()} Hz</div>
              <div>
                Điện năng tiêu thụ: {item.ActiveNetWh?.toLocaleString()} Wh
              </div>
            </>
          )}
          {type === "nuoc" && (
            <div>Tổng lượng nước: {item.TotalWater?.toLocaleString()} m³</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-[calc(100dvw-180px)] flex flex-col select-none">
      <Header />
      <div className="flex-1 grid grid-cols-2 gap-2 px-2 my-2">
        <div className="flex-1 grid grid-cols-3 grid-rows-3 bg-gray-600 text-white gap-2 rounded-lg p-2">
          {list_dong_ho_dien.map((item) => renderItem(item, "dien"))}
        </div>
        <div className="flex-1 grid grid-cols-3 grid-rows-3 bg-green-900 text-white gap-2 rounded-lg p-2">
          {list_dong_ho_nuoc.map((item) => renderItem(item, "nuoc"))}
        </div>
      </div>
      <div className="text-center m-2 grid grid-cols-2 gap-2 *:h-12 *:font-bold *:text-white">
        <div className="border rounded flex items-center justify-center bg-green-500">
          BÌNH THƯỜNG
        </div>
        <div className="border rounded flex items-center justify-center bg-black">
          MẤT KẾT NỐI
        </div>
      </div>
    </div>
  );
}
