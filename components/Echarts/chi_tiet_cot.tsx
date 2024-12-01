// components/EChart.js
import { useEffect } from "react";
import * as echarts from "echarts";

const BarCharts = () => {
  useEffect(() => {
    // Lấy phần tử DOM để vẽ biểu đồ
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);

    // Cấu hình của biểu đồ
    const option = {
      title: {
        text: "Biểu đồ tiêu thụ điện theo ngày",
        left: "center", // Căn giữa tiêu đề
        textStyle: {
          fontSize: 24, // Kích thước font
          fontWeight: "bold", // Độ đậm font
          fontFamily: "Arial, sans-serif", // Chọn font chữ
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow", // Cách hiển thị tooltip khi hover
        },
      },
      legend: { left: "40%", top: "8%" },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        name: "kWh",
      },
      yAxis: {
        type: "category",
        data: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      },
      color: ["red", "green", "blue"],
      series: [
        {
          name: "Giờ cao điểm",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [200, 190, 180, 210, 185, 195, 205],
        },
        {
          name: "Giờ bình thường",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [320, 332, 310, 343, 335, 350, 340],
        },
        {
          name: "Giờ thấp điểm",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [120, 82, 91, 134, 190, 230, 210],
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

export default BarCharts;
