/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from "react";
import { bhxhAgencies, BhxhAgency } from "../../data/bhxhData";

const BhxhTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  // Quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Trích xuất tự động danh sách Tỉnh/Thành duy nhất để đưa vào Dropdown bộ lọc
  const uniqueProvinces = useMemo(() => {
    const provinces = bhxhAgencies.map((item) => item.provinceName);
    return ["All", ...Array.from(new Set(provinces))];
  }, []);

  // Xử lý bộ lọc thông minh (Chấp nhận tìm kiếm theo Mã Cơ quan, Tên Cơ quan hoặc Tên Tỉnh)
  const filteredAgencies = useMemo(() => {
    setCurrentPage(1); // Reset về trang 1 khi người dùng đổi điều kiện lọc
    return bhxhAgencies.filter((item) => {
      const matchSearch =
        item.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agencyCode.includes(searchTerm) ||
        item.provinceName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchProvince =
        selectedProvince === "All" || item.provinceName === selectedProvince;
      const matchLevel =
        selectedLevel === "All" || item.level === selectedLevel;

      return matchSearch && matchProvince && matchLevel;
    });
  }, [searchTerm, selectedProvince, selectedLevel]);

  // Tính toán dữ liệu hiển thị trên trang hiện tại
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAgencies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAgencies, currentPage]);

  const totalPages = Math.ceil(filteredAgencies.length / itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-6">
      {/* KHU VỰC CHỨC NĂNG: KIỂM TRA & BỘ LỌC */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Tìm theo mã CQ, tên cơ sở (VD: 00101, Càng Long, Sa Đéc...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-4 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-black dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Dropdown Tỉnh/Thành phố */}
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="rounded border border-stroke bg-transparent py-2 px-3 font-medium outline-none dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
          >
            <option value="All" className="dark:bg-boxdark">
              Tất cả khu vực
            </option>
            {uniqueProvinces
              .filter((p) => p !== "All")
              .map((prov) => (
                <option key={prov} value={prov} className="dark:bg-boxdark">
                  {prov}
                </option>
              ))}
          </select>

          {/* Dropdown phân cấp quản lý */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="rounded border border-stroke bg-transparent py-2 px-3 font-medium outline-none dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
          >
            <option value="All" className="dark:bg-boxdark">
              Tất cả cấp
            </option>
            <option value="Cấp Tỉnh" className="dark:bg-boxdark">
              Cấp Tỉnh
            </option>
            <option value="Cấp Huyện/Cơ sở" className="dark:bg-boxdark">
              Cấp Huyện/Cơ sở
            </option>
          </select>
        </div>
      </div>

      {/* THỂ HIỆN BẢNG DỮ LIỆU */}
      {/* <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11 min-w-[100px]">
                Mã Tỉnh
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[150px]">
                Địa bàn quản lý
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[150px]">
                Mã Cơ quan BHXH
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[280px]">
                Tên Cơ quan BHXH
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white min-w-[120px]">
                Phân loại
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((agency) => (
                <tr
                  key={agency.id}
                  className="border-b border-stroke dark:border-strokedark"
                >
                  <td className="py-4 px-4 pl-9 xl:pl-11 text-sm font-medium text-black dark:text-white">
                    {agency.provinceCode}
                  </td>
                  <td className="py-4 px-4 text-sm text-black dark:text-white">
                    {agency.provinceName}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex rounded bg-[#EBF3FF] dark:bg-meta-4 py-1 px-2.5 text-sm font-bold text-primary dark:text-white font-mono">
                      {agency.agencyCode}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm font-semibold text-black dark:text-white">
                    {agency.agencyName}
                  </td>
                  <td className="py-5 px-4">
                    {agency.level === "Cấp Tỉnh" ? (
                      <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-xs font-medium text-success">
                        Cấp Tỉnh
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-xs font-medium text-warning">
                        Cấp Huyện/Cơ sở
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500 dark:text-bodydark"
                >
                  Không tìm thấy cơ quan BHXH nào khớp với từ khóa của bạn.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">
                ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Tỉnh/Thành phố
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Cơ quan BHXH
              </th>
              <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                Mã xã
              </th>
              {/* TIÊU ĐỀ CỘT G MỚI */}
              <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                Địa bàn xã quản lý
              </th>
            </tr>
          </thead>
          <tbody>
            {bhxhAgencies.map((agency) => (
              <tr
                key={agency.id}
                className="border-b border-[#eee] dark:border-strokedark"
              >
                <td className="py-5 px-4 text-sm text-black dark:text-white">
                  {agency.id.replace("agency-", "")}
                </td>
                <td className="py-5 px-4">
                  <p className="text-sm font-medium text-black dark:text-white">
                    {agency.provinceName}
                  </p>
                  <span className="text-xs text-gray-5">
                    Mã: {agency.provinceCode}
                  </span>
                </td>
                <td className="py-5 px-4">
                  <p className="text-sm text-black dark:text-white">
                    {agency.agencyName}
                  </p>
                  <span className="text-xs text-gray-5">
                    Mã CQ: {agency.agencyCode}
                  </span>
                </td>
                <td className="py-5 px-4 text-sm text-black dark:text-white">
                  <code className="rounded bg-gray-1 py-1 px-2 text-sm font-semibold dark:bg-meta-4">
                    {agency.maXa}
                  </code>
                </td>
                {/* NỘI DUNG CỘT G MỚI */}
                <td className="py-5 px-4">
                  <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                    {agency.tenXaQuanLy}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* THANH ĐIỀU HƯỚNG PHÂN TRANG (PAGINATION) */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t border-stroke pt-4 dark:border-strokedark">
          <p className="text-sm font-medium text-black dark:text-white">
            Hiển thị trang <span className="font-bold">{currentPage}</span> /{" "}
            {totalPages} ({filteredAgencies.length} kết quả)
          </p>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="rounded border border-stroke py-1 px-3 text-sm font-medium hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 disabled:opacity-50 text-black dark:text-white"
            >
              Trước
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="rounded border border-stroke py-1 px-3 text-sm font-medium hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 disabled:opacity-50 text-black dark:text-white"
            >
              Sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BhxhTable;
