"use client";
import { useState, useMemo } from "react";
import Header from "./Header";
import { Toaster, toast } from "sonner";
import * as XLSX from "xlsx";

const INITIAL_SETTINGS = {
  lowTime: "0h-4h, 22h-24h",
  lowPrice: 1234,
  normalTime: "4h-9h30, 11h30-17h, 20h-22h",
  normalPrice: 2000,
  highTime: "9h30-11h30, 17h-20h",
  highPrice: 3000,
  lowEnergy: 218.5,
  normalEnergy: 2000,
  highEnergy: 3000,
};

const DEVICE_OPTIONS = ["Đồng hồ điện 1", "Đồng hồ điện 2", "Đồng hồ điện 3"];

const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(number);
};

export default function ApSuatPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [initialSettings, setInitialSettings] = useState(INITIAL_SETTINGS);
  const [device, setDevice] = useState(DEVICE_OPTIONS[0]);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2024-01-01");

  const costCalculations = useMemo(() => {
    const LowCost = settings.lowPrice * settings.lowEnergy;
    const NormalCost = settings.normalPrice * settings.normalEnergy;
    const HighCost = settings.highPrice * settings.highEnergy;
    const TotalCost = LowCost + NormalCost + HighCost;

    return { LowCost, NormalCost, HighCost, TotalCost };
  }, [settings]);

  const handleSave = () => {
    setInitialSettings(settings);
    setIsModalOpen(false);
    toast.success("Cài đặt đã được lưu", {
      position: "top-right",
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  const handleCancel = () => {
    setSettings(initialSettings);
    setIsModalOpen(false);
  };

  const exportData = (format) => {
    const exportData = {
      device,
      timeExport: new Date().toLocaleString(),
      startDate,
      endDate,
      details: {
        lowPeriod: {
          timeRange: settings.lowTime,
          energy: settings.lowEnergy,
          price: settings.lowPrice,
          cost: costCalculations.LowCost,
        },
        normalPeriod: {
          timeRange: settings.normalTime,
          energy: settings.normalEnergy,
          price: settings.normalPrice,
          cost: costCalculations.NormalCost,
        },
        highPeriod: {
          timeRange: settings.highTime,
          energy: settings.highEnergy,
          price: settings.highPrice,
          cost: costCalculations.HighCost,
        },
        totalCost: costCalculations.TotalCost,
      },
    };

    if (format === "json") {
      const jsonData = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${device}-${startDate}_${endDate}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === "xlsx") {
      const worksheetData = [
        ["Thiết bị", exportData.device],
        ["Thời gian xuất", exportData.timeExport],
        ["Ngày bắt đầu", exportData.startDate],
        ["Ngày kết thúc", exportData.endDate],
        [],
        [
          "Khung giờ",
          "Giờ",
          "Điện năng tiêu thụ (kWh)",
          "Đơn giá (VND)",
          "Chi phí (VND)",
        ],
        [
          "Khung giờ thấp điểm",
          exportData.details.lowPeriod.timeRange,
          exportData.details.lowPeriod.energy,
          exportData.details.lowPeriod.price,
          formatNumber(exportData.details.lowPeriod.cost),
        ],
        [
          "Khung giờ bình thường",
          exportData.details.normalPeriod.timeRange,
          exportData.details.normalPeriod.energy,
          exportData.details.normalPeriod.price,
          formatNumber(exportData.details.normalPeriod.cost),
        ],
        [
          "Khung giờ cao điểm",
          exportData.details.highPeriod.timeRange,
          exportData.details.highPeriod.energy,
          exportData.details.highPeriod.price,
          formatNumber(exportData.details.highPeriod.cost),
        ],
        [
          "Tổng chi phí",
          "",
          "",
          "",
          formatNumber(exportData.details.totalCost),
        ],
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Báo cáo");

      XLSX.writeFile(workbook, `${device}-${startDate}_${endDate}.xlsx`);
    }

    setIsExportModalOpen(false);
    toast.success("Xuất dữ liệu thành công", {
      position: "top-right",
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });
  };

  const renderSettingsModal = () => {
    if (!isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-1/3">
          <h2 className="text-xl font-bold mb-4">Cài đặt</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Khung giờ</h3>
              {[
                { label: "Thấp điểm", key: "lowTime" },
                { label: "Bình thường", key: "normalTime" },
                { label: "Cao điểm", key: "highTime" },
              ].map(({ label, key }) => (
                <div key={key} className="mb-3">
                  <label className="block mb-1">{label}</label>
                  <input
                    type="text"
                    value={settings[key]}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }))
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2">Đơn giá</h3>
              {[
                { label: "Thấp điểm (VND)", key: "lowPrice" },
                { label: "Bình thường (VND)", key: "normalPrice" },
                { label: "Cao điểm (VND)", key: "highPrice" },
              ].map(({ label, key }) => (
                <div key={key} className="mb-3">
                  <label className="block mb-1">{label}</label>
                  <input
                    type="number"
                    value={settings[key]}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        [key]: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full border rounded px-2 py-1"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderExportModal = () => {
    if (!isExportModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-1/3">
          <h2 className="text-xl font-bold mb-4">Chọn định dạng xuất</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => exportData("json")}
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              Xuất File JSON
            </button>
            <button
              onClick={() => exportData("xlsx")}
              className="flex-1 bg-green-600 text-white py-2 rounded"
            >
              Xuất File Excel
            </button>
          </div>
          <button
            onClick={() => setIsExportModalOpen(false)}
            className="w-full mt-4 bg-gray-200 py-2 rounded"
          >
            Hủy
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster richColors />
      <Header />

      {renderSettingsModal()}
      {renderExportModal()}

      <div className="mx-auto p-4 mt-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div>
              <label className="block mb-2">Chọn Thiết Bị</label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="border rounded px-3 py-2"
              >
                {DEVICE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Ngày Bắt Đầu</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-2">Ngày Kết Thúc</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>

            <button
              onClick={() =>
                toast.success("Đang lấy dữ liệu", {
                  position: "top-right",
                  style: {
                    backgroundColor: "white",
                    color: "green",
                  },
                })
              }
              className="mt-8 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Tra cứu
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4 text-center">
            Tính toán điện năng tiêu thụ của {device}
          </h2>

          <table className="w-full border-collapse text-[18px]">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-2">Khung giờ làm việc</th>
                <th className="border p-2">Điện năng tiêu thụ (kWh)</th>
                <th className="border p-2">Đơn giá (VND)</th>
                <th className="border p-2">Chi phí (VND)</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Khung giờ thấp điểm",
                  time: settings.lowTime,
                  energy: settings.lowEnergy,
                  price: settings.lowPrice,
                  cost: costCalculations.LowCost,
                },
                {
                  label: "Khung giờ bình thường",
                  time: settings.normalTime,
                  energy: settings.normalEnergy,
                  price: settings.normalPrice,
                  cost: costCalculations.NormalCost,
                },
                {
                  label: "Khung giờ cao điểm",
                  time: settings.highTime,
                  energy: settings.highEnergy,
                  price: settings.highPrice,
                  cost: costCalculations.HighCost,
                },
              ].map(({ label, time, energy, price, cost }) => (
                <tr key={label} className="border">
                  <td className="border p-2">
                    <strong>{label}: </strong>
                    {time}
                  </td>
                  <td className="border p-2 text-center">{energy}</td>
                  <td className="border p-2 text-center">{price}</td>
                  <td className="border p-2 text-right">
                    {formatNumber(cost)}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-blue-50">
                <td className="border p-2" colSpan="3">
                  Tổng chi phí
                </td>
                <td className="border p-2 text-right">
                  {formatNumber(costCalculations.TotalCost)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Cài đặt
            </button>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Xuất dữ liệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
