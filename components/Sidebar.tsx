"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { RiSettingsFill } from "react-icons/ri";
import { AiFillCalculator } from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";
import { RiHome6Fill } from "react-icons/ri";
import { HiMiniDocumentText } from "react-icons/hi2";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { FaCodeCompare } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";

export default function Sidebar() {
  const path = usePathname();
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed flex flex-col w-[180px] min-w-[180px] border-r min-h-screen font-bold text-[15px] select-none">
      <div className="grow">
        <div className="p-4">
          {/* TỔNG QUAN */}
          <Link href="/all_page/tong_quan">
            <div
              className={`font-bold cursor-pointer mt-4 ${
                path === "/all_page/tong_quan" ? "opacity-100" : "opacity-50"
              }`}
            >
              <span className="flex items-center">
                <RiHome6Fill className="text-xl relative -top-0.5 mr-2" />
                TỔNG QUAN
              </span>
            </div>
          </Link>

          {/* BIỂU ĐỒ */}
          <div className="mt-4">
            <div
              className={`font-bold cursor-pointer flex justify-between items-center ${
                path.startsWith("/all_page/bieu_do") ||
                path === "/all_page/bieu_do/so_sanh"
                  ? "opacity-100"
                  : "opacity-50"
              }`}
              onClick={toggleSubmenu}
            >
              <span className="flex items-center">
                <FaChartBar className="text-xl relative -top-0.5 mr-2" />
                BIỂU ĐỒ
              </span>
              <span>{isSubmenuOpen ? <FaAngleUp /> : <FaAngleDown />}</span>
            </div>
            {isSubmenuOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/all_page/bieu_do/tong_hop">
                  <div
                    className={`cursor-pointer flex items-center ${
                      path === "/all_page/bieu_do/tong_hop"
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <FaMagnifyingGlassChart className="mt-1 ml-1 mr-2" />
                    Tổng hợp
                  </div>
                </Link>
                <Link href="/all_page/bieu_do/chi_tiet">
                  <div
                    className={`cursor-pointer flex items-center mt-1 ${
                      path === "/all_page/bieu_do/chi_tiet"
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <IoInformationCircle className="mt-1 ml-1 mr-2" />
                    Chi tiết
                  </div>
                </Link>
                <Link href="/all_page/bieu_do/so_sanh">
                  <div
                    className={`cursor-pointer flex items-center mt-1 ${
                      path === "/all_page/bieu_do/so_sanh"
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
                    <FaCodeCompare className="mt-1 ml-1 mr-2" />
                    So sánh
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* TÍNH TOÁN CHI PHÍ */}
          <Link href="/all_page/tinh_toan_chi_phi">
            <div
              className={`font-bold cursor-pointer mt-4 flex items-center ${
                path === "/all_page/tinh_toan_chi_phi"
                  ? "opacity-100"
                  : "opacity-50"
              }`}
            >
              <AiFillCalculator className="text-2xl relative -top-2.5 mr-2" />
              TÍNH TOÁN CHI PHÍ
            </div>
          </Link>

          {/* CÀI ĐẶT */}
          <Link href="/all_page/cai_dat" passHref>
            <div
              className={`font-bold cursor-pointer mt-4 ${
                path === "/all_page/cai_dat" ? "opacity-100" : "opacity-50"
              }`}
            >
              <span className="flex items-center">
                <RiSettingsFill className="text-xl relative -top-0.5 mr-2" />
                CÀI ĐẶT
              </span>
            </div>
          </Link>

          {/* HƯỚNG DẪN SỬ DỤNG */}
          <Link href="/all_page/huong_dan_su_dung">
            <div
              className={`font-bold cursor-pointer mt-4 ${
                path === "/all_page/huong_dan_su_dung"
                  ? "opacity-100"
                  : "opacity-50"
              }`}
            >
              <span className="flex items-center">
                <HiMiniDocumentText className="text-3xl relative -top-0.5 mr-2" />
                HƯỚNG DẪN SỬ DỤNG
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
