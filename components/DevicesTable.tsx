"use client";
import React, { useState, useMemo } from "react";

const DevicesTable = () => {
  const initialDevices = [
    {
      name: "Đồng hồ đo điện 1",
      type: "Điện",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo điện 2",
      type: "Điện",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo điện 3",
      type: "Điện",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo điện 4",
      type: "Điện",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo điện 5",
      type: "Điện",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo điện 6",
      type: "Điện",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo điện 7",
      type: "Điện",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo điện 8",
      type: "Điện",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo nước 9",
      type: "Nước",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo nước 10",
      type: "Nước",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo nước 11",
      type: "Nước",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo nước 12",
      type: "Nước",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo nước 13",
      type: "Nước",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
    {
      name: "Đồng hồ đo nước 14",
      type: "Nước",
      setting: {
        warning: "Consumption",
        thresholds: {
          warning: 100,
          critical: 150,
        },
      },
    },
  ];

  const [devices, setDevices] = useState(initialDevices);
  const [selectedType, setSelectedType] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [modalType, setModalType] = useState(null);

  const itemsPerPage = 14;

  // Memoized filtered devices to improve performance
  const filteredDevices = useMemo(() => {
    return selectedType === "All"
      ? devices
      : devices.filter((device) => device.type === selectedType);
  }, [selectedType, devices]);

  // Memoized pagination calculations
  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageDevices = filteredDevices.slice(startIndex, endIndex);

    return { totalPages, currentPageDevices };
  }, [filteredDevices, currentPage, itemsPerPage]);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openModal = (device, type) => {
    setSelectedDevice(device);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedDevice(null);
    setModalType(null);
  };

  const handleThresholdChange = (field, value) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.name === selectedDevice.name
          ? {
              ...device,
              setting: {
                ...device.setting,
                thresholds: {
                  ...(device.setting.thresholds || {}),
                  [field]: parseFloat(value),
                },
              },
            }
          : device
      )
    );
  };

  const renderModal = () => {
    if (!selectedDevice || !modalType) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">
            {modalType === "warning"
              ? "Cài đặt ngưỡng cảnh báo"
              : "Cài đặt mức tiêu thụ"}
            - {selectedDevice.name}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Ngưỡng cảnh báo</label>
              <input
                type="number"
                value={selectedDevice.setting?.thresholds?.warning || 0}
                onChange={(e) =>
                  handleThresholdChange("warning", e.target.value)
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label className="block mb-2">Ngưỡng nguy hiểm</label>
              <input
                type="number"
                value={selectedDevice.setting?.thresholds?.critical || 0}
                onChange={(e) =>
                  handleThresholdChange("critical", e.target.value)
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-700 font-bold">
            <th className="py-1 px-8 text-left w-3/5">Thiết bị</th>
            <th className="py-1 px-4 text-left w-1/5 relative">
              <div className="flex items-center gap-2">
                Phân loại
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="border p-1 rounded bg-gray-100 hover:bg-gray-200"
                  >
                    ▼
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute bg-white border mt-1 rounded shadow-md z-10 w-[100px]">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleTypeSelect("All")}
                      >
                        Tất cả
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleTypeSelect("Điện")}
                      >
                        Điện
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleTypeSelect("Nước")}
                      >
                        Nước
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </th>
            <th className="py-1 px-4 text-center w-1/5">Cài đặt</th>
          </tr>
        </thead>
        <tbody>
          {paginationInfo.currentPageDevices.map((device, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-1 px-8">{device.name}</td>
              <td
                className={`py-1 px-4 ${
                  device.type === "Điện" ? "text-orange-500" : "text-blue-500"
                }`}
              >
                {device.type}
              </td>
              <td className="py-1 px-4 text-right">
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => openModal(device, "warning")}
                    className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                  >
                    Cảnh báo
                  </button>
                  <button
                    onClick={() => openModal(device, "consumption")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Mức tiêu thụ
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded border ${
            currentPage === 1
              ? "text-gray-400 border-gray-200"
              : "text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {"<"}
        </button>

        {[...Array(paginationInfo.totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === index + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === paginationInfo.totalPages}
          className={`px-2 py-1 rounded border ${
            currentPage === paginationInfo.totalPages
              ? "text-gray-400 border-gray-200"
              : "text-gray-600 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {">"}
        </button>
      </div>

      {renderModal()}
    </div>
  );
};

export default DevicesTable;
