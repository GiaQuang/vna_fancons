export type dataType = {
  name: string; // *tên máy
  address: number; // *địa chỉ máy
  Vavg?: number; // * giá trị điện áp trung bình
  Iavg?: number; // * giá trị dòng điện trung bình
  TotalW?: number; // * tổng công suất tiêu thụ
  TotalAvr?: number; // *tổng công suất phản kháng
  TotalVA?: number; // *tổng công suất biểu kiến
  Freq?: number; // *tần số dòng điện
  ActiveNetWh?: number; //*tổng điện năng tiêu thụ
  TotalWater?: number; //*tổng lượng nước tiêu thụ
};

export const data: dataType[] = [
  {
    name: "Đồng hồ đo điện 1",
    address: 1,
    Vavg: 236.15,
    Iavg: 10,
    TotalW: 2000,
    TotalAvr: 100,
    TotalVA: 150,
    Freq: 50.065,
    ActiveNetWh: 1800,
  },
  {
    name: "Đồng hồ đo điện 2",
    address: 2,
    Vavg: 234,
    Iavg: 10,
    TotalW: 2000,
    TotalAvr: 100,
    TotalVA: 150,
    Freq: 50.036,
    ActiveNetWh: 1800,
  },
  {
    name: "Đồng hồ đo điện 3",
    address: 3,
    Vavg: 236,
    Iavg: 10,
    TotalW: 2000,
    TotalAvr: 100,
    TotalVA: 150,
    Freq: 50.13,
    ActiveNetWh: 1800,
  },
  {
    name: "Đồng hồ đo điện 4",
    address: 4,
    Vavg: 236.04,
    Iavg: 10,
    TotalW: 2000,
    TotalAvr: 100,
    TotalVA: 150,
    Freq: 50.059,
    ActiveNetWh: 1800,
  },
  {
    name: "Đồng hồ đo điện 5",
    address: 5,
    Vavg: 234.11,
    Iavg: 10,
    TotalW: 2000,
    TotalAvr: 100,
    TotalVA: 150,
    Freq: 50.125,
    ActiveNetWh: 1800,
  },
  {
    name: "Đồng hồ đo điện 6",
    address: 6,
    Vavg: 235,
    Iavg: 10,
    TotalW: 2000,
    TotalAvr: 100,
    TotalVA: 150,
    Freq: 50.073,
    ActiveNetWh: 1800,
  },
  {
    name: "Đồng hồ đo điện 7",
    address: 7,
    Vavg: 236,
    Iavg: 10,
    TotalW: 2000,
    TotalAvr: 100,
    TotalVA: 150,
    Freq: 49.911,
    ActiveNetWh: 1800,
  },
  {
    name: "Đồng hồ đo điện 8",
    address: 8,
    Vavg: 234,
    Iavg: 10,
    TotalW: 2000,
    TotalAvr: 100,
    TotalVA: 150,
    Freq: 50.213,
    ActiveNetWh: 1800,
  },

  {
    name: "Đồng hồ đo nước 9",
    address: 9,
    TotalWater: 999,
  },
  {
    name: "Đồng hồ đo nước 10",
    address: 10,
    TotalWater: 0,
  },
  {
    name: "Đồng hồ đo nước 11",
    address: 11,
    TotalWater: 0,
  },
  {
    name: "Đồng hồ đo nước 12",
    address: 12,
    TotalWater: 0,
  },
  {
    name: "Đồng hồ đo nước 13",
    address: 13,
    TotalWater: 4.7,
  },
  {
    name: "Đồng hồ đo nước 14",
    address: 14,
    TotalWater: 4.5,
  },
];
