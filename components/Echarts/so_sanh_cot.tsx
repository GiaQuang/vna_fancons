// components/EChart.js
import { useEffect } from "react";
import * as echarts from "echarts";

const CompareCharts = () => {
  useEffect(() => {
    // Lấy phần tử DOM để vẽ biểu đồ
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);

    // Cấu hình của biểu đồ
    const option = {
      title: {
        text: "BIỂU ĐỒ CỘT SO SÁNH THÁNG X VÀ THÁNG Y",
        left: "center", // Căn giữa tiêu đề
        textStyle: {
          fontSize: 18, // Kích thước font
          fontWeight: "bold", // Độ đậm font
          fontFamily: "Arial, sans-serif", // Chọn font chữ
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Tháng X", "Tháng Y"],
        left: "44.5%",
        top: "8%",
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7",
            "Day 8",
            "Day 9",
            "Day 10",
            "Day 11",
            "Day 12",
          ],
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "kWh",
        },
      ],
      series: [
        {
          name: "Tháng X",
          type: "bar",
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
          ],
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
        {
          name: "Tháng Y",
          type: "bar",
          data: [
            2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
          ],
          markPoint: {
            data: [
              { name: "Max", value: 182.2, xAxis: 7, yAxis: 183 },
              { name: "Min", value: 2.3, xAxis: 11, yAxis: 3 },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
      ],
    };

    // Thiết lập cấu hình cho biểu đồ
    myChart.setOption(option);

    // Cleanup để tránh rò rỉ bộ nhớ khi component bị huỷ
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div className="w-full h-[400px]">
      <div id="main" className="w-full h-full"></div>
    </div>
  );
};

export default CompareCharts;
