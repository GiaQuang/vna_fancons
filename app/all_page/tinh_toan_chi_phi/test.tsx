import React, { useState } from "react";

const DEVICE_OPTIONS = [
  "Đồng hồ điện 1",
  "Đồng hồ điện 2",
  "Đồng hồ điện 3",
  "Đồng hồ nước",
];

function DeviceSelector() {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [showTable, setShowTable] = useState(null);

  const handleDeviceChange = (e) => {
    const device = e.target.value;
    setSelectedDevice(device);

    // Hiển thị bảng tương ứng
    if (device.includes("Đồng hồ điện")) {
      setShowTable("electric");
    } else if (device === "Đồng hồ nước") {
      setShowTable("water");
    } else {
      setShowTable(null);
    }
  };

  return (
    <div>
      <label htmlFor="deviceSelect">Chọn thiết bị:</label>
      <select
        id="deviceSelect"
        value={selectedDevice}
        onChange={handleDeviceChange}
      >
        <option value="">--Chọn thiết bị--</option>
        {DEVICE_OPTIONS.map((device, index) => (
          <option key={index} value={device}>
            {device}
          </option>
        ))}
      </select>

      {showTable === "electric" && (
        <div>
          <h3>Bảng dữ liệu - Đồng hồ điện</h3>
          <table>
            <thead>
              <tr>
                <th>Cột 1</th>
                <th>Cột 2</th>
                <th>Cột 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dữ liệu điện 1</td>
                <td>Dữ liệu điện 2</td>
                <td>Dữ liệu điện 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {showTable === "water" && (
        <div>
          <h3>Bảng dữ liệu - Đồng hồ nước</h3>
          <table>
            <thead>
              <tr>
                <th>Cột A</th>
                <th>Cột B</th>
                <th>Cột C</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dữ liệu nước 1</td>
                <td>Dữ liệu nước 2</td>
                <td>Dữ liệu nước 3</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DeviceSelector;
