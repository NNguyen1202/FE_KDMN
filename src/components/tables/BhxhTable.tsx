/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { bhxhAgencies, BhxhAgency } from "../../data/bhxhData";

type GroupedAgency = BhxhAgency & {
  xaQuanLy: {
    maXa: string;
    tenXa: string;
  }[];
};
type ProvinceGroup = {
  provinceCode: string;
  provinceName: string;
  agencies: GroupedAgency[];
};

const BhxhTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedAgency, setSelectedAgency] = useState<GroupedAgency | null>(
    null,
  );
  const [selectedProvinceCard, setSelectedProvinceCard] =
    useState<ProvinceGroup | null>(null);

  const [showDetail, setShowDetail] = useState(false);

  // Quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, provinceFilter, selectedLevel]);

  const uniqueProvinces = useMemo(() => {
    const provinces = Array.from(
      new Set(bhxhAgencies.map((item) => item.provinceName)),
    ).sort((a, b) => a.localeCompare(b, "vi"));

    return ["All", ...provinces];
  }, []);

  // Xử lý bộ lọc thông minh (Chấp nhận tìm kiếm theo Mã Cơ quan, Tên Cơ quan hoặc Tên Tỉnh)
  const filteredAgencies = useMemo(() => {
    return bhxhAgencies.filter((item) => {
      const matchSearch =
        item.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.agencyCode.includes(searchTerm) ||
        item.maXa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tenXaQuanLy.toLowerCase().includes(searchTerm.toLowerCase());
        item.provinceName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchProvince =
        provinceFilter === "All" || item.provinceName === provinceFilter;

      const matchLevel =
        selectedLevel === "All" || item.level === selectedLevel;

      return matchSearch && matchProvince && matchLevel;
    });
  }, [searchTerm, provinceFilter, selectedLevel]);

  // Tính toán dữ liệu hiển thị trên trang hiện tại
  type GroupedAgency = BhxhAgency & {
    xaQuanLy: {
      maXa: string;
      tenXa: string;
    }[];
  };
  const groupedAgencies = useMemo<GroupedAgency[]>(() => {
    const map = new Map<string, GroupedAgency>();

    filteredAgencies.forEach((item) => {
      const key = item.agencyCode;

      if (!map.has(key)) {
        map.set(key, {
          ...item,
          xaQuanLy: [],
        });
      }

      const agency = map.get(key);

      if (agency) {
        agency.xaQuanLy.push({
          maXa: item.maXa,
          tenXa: item.tenXaQuanLy,
        });
      }
    });

    return Array.from(map.values());
  }, [filteredAgencies]);

  const groupedProvinces = useMemo<ProvinceGroup[]>(() => {
    const map = new Map<string, ProvinceGroup>();

    groupedAgencies.forEach((agency) => {
      if (!map.has(agency.provinceCode)) {
        map.set(agency.provinceCode, {
          provinceCode: agency.provinceCode,
          provinceName: agency.provinceName,
          agencies: [],
        });
      }

      map.get(agency.provinceCode)?.agencies.push(agency);
    });

    return Array.from(map.values()).sort((a, b) =>
      a.provinceName.localeCompare(b.provinceName, "vi"),
    );
  }, [groupedAgencies]);

  // const paginatedData = useMemo(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   return groupedAgencies.slice(startIndex, startIndex + itemsPerPage);
  // }, [groupedAgencies, currentPage]);

  const totalPages = Math.ceil(groupedAgencies.length / itemsPerPage);

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
            value={provinceFilter}
            onChange={(e) => setProvinceFilter(e.target.value)}
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groupedProvinces.map((province) => (
          <div
            key={province.provinceCode}
            onClick={() => setSelectedProvinceCard(province)}
            className="cursor-pointer rounded-lg border p-5"
          >
            <h3 className="font-bold">{province.provinceName}</h3>

            <p>{province.agencies.length} cơ quan BHXH</p>
          </div>
        ))}
      </div>

      {selectedProvinceCard && (
        <div className="fixed inset-0 z-[100000] flex">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSelectedProvinceCard(null)}
            
          />

          <div className="relative ml-auto h-full w-[650px] overflow-y-scroll bg-white p-6 dark:bg-boxdark">
            <div className="mb-5 flex justify-between">
              <h2 className="text-xl font-bold">
                {selectedProvinceCard.provinceName}
              </h2>

              <button onClick={() => setSelectedProvinceCard(null)}>
                Đóng
              </button>
            </div>

            <div className="space-y-3">
              {selectedProvinceCard.agencies.map((agency) => (
                <div
                  key={agency.agencyCode}
                  className="cursor-pointer rounded border p-4 hover:bg-gray-50"
                  onClick={() => {
                    setSelectedAgency(agency);
                    setShowDetail(true);
                  }}
                >
                  <div className="font-semibold">{agency.agencyName}</div>

                  <div className="text-sm text-gray-500">
                    Mã CQ: {agency.agencyCode}
                  </div>

                  <div className="text-sm text-gray-500">
                    {agency.xaQuanLy.length} xã/phường
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
      {showDetail && selectedAgency && (
        <div className="fixed inset-0 z-[100001] flex">
          <div
            className="absolute inset-0"
            onClick={() => setShowDetail(false)}
          />

          <div className="ml-auto h-full w-[650px] overflow-y-auto bg-white p-6 shadow-2xl dark:bg-boxdark">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white">
                  {selectedAgency.agencyName}
                </h2>

                <p className="mt-1 text-sm text-body">
                  {selectedAgency.provinceName}
                </p>
              </div>

              <button
                onClick={() => setShowDetail(false)}
                className="rounded border px-3 py-1"
              >
                Đóng
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="mb-2 font-semibold">Thông tin cơ quan</h4>

                <div className="space-y-2 text-sm">
                  <p>
                    <b>Mã cơ quan:</b> {selectedAgency.agencyCode}
                  </p>

                  <p>
                    <b>Tên cơ quan:</b> {selectedAgency.agencyName}
                  </p>

                  <p>
                    <b>Tỉnh/Thành:</b> {selectedAgency.provinceName}
                  </p>

                  <p>
                    <b>Địa chỉ:</b> {selectedAgency.address}
                  </p>

                  <p>
                    <b>Điện thoại:</b> {selectedAgency.phone}
                  </p>

                  <p>
                    <b>Email:</b> {selectedAgency.email}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="mb-2 font-semibold">Thông tin chuyển tiền</h4>

                <div className="space-y-2 text-sm">
                  <p>
                    <b>Ngân hàng:</b>
                    {selectedAgency.bankName}
                  </p>

                  <p>
                    <b>Số tài khoản:</b>
                    {selectedAgency.bankAccount}
                  </p>

                  <p>
                    <b>Chủ tài khoản:</b>
                    {selectedAgency.accountHolder}
                  </p>

                  <p>
                    <b>Nội dung chuyển khoản:</b>
                    {selectedAgency.transferContent}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="mb-2 font-semibold">Cách thức đóng BHXH</h4>

                <ul className="list-disc pl-5 text-sm">
                  {selectedAgency.paymentMethods?.map((method, index) => (
                    <li key={index}>{method}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t pt-5">
                <h4 className="mb-4 text-lg font-semibold">
                  Danh sách xã/phường quản lý
                </h4>

                <div className="grid grid-cols-1 gap-2">
                  {selectedAgency.xaQuanLy?.map((xa) => (
                    <div
                      key={xa.maXa}
                      className="flex items-center justify-between rounded border border-stroke p-3 dark:border-strokedark"
                    >
                      <div>
                        <p className="font-medium">{xa.tenXa}</p>
                      </div>

                      <span className="rounded bg-gray-2 px-2 py-1 text-xs dark:bg-meta-4">
                        {xa.maXa}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BhxhTable;
