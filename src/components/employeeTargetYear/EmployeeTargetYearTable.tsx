/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useState } from "react";
import {
  deleteEmployeeTargetYear,
  getEmployeeTargetYears,
} from "../../services/employeeTargetYearService";
import EmployeeTargetYearModal from "./EmployeeTargetYearModal";

export default function EmployeeTargetYearTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const [year, setYear] = useState(new Date().getFullYear());

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const res = await getEmployeeTargetYears(year);
      setData(res.data.data || []);
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa KPI này?")) return;

    await deleteEmployeeTargetYear(id);

    loadData();
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Doanh thu dự kiến năm
          </h2>

          <div className="flex items-center gap-3">
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="rounded-lg border px-3 py-2 dark:bg-gray-800 dark:text-white"
            >
              {[2024, 2025, 2026, 2027, 2028].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setSelectedRecord(null);
                setOpenModal(true);
              }}
              className="rounded-lg bg-brand-500 px-4 py-2 text-white"
            >
              + Thêm
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th className="px-5 py-3 text-left text-gray-700 dark:text-gray-200">
                Nhân viên
              </th>

              <th className="text-center text-gray-700 dark:text-gray-200">
                Năm
              </th>

              <th className="text-center text-gray-700 dark:text-gray-200">
                Doanh thu dự kiến
              </th>

              <th className="text-center text-gray-700 dark:text-gray-200">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  <td className="px-5 py-4 text-gray-900 dark:text-white">
                    {item.userId?.fullName}
                  </td>

                  <td className="text-center text-gray-900 dark:text-white">
                    {item.year}
                  </td>

                  <td className="text-center font-semibold text-green-600 dark:text-green-400">
                    {Number(item.targetRevenue).toLocaleString("vi-VN")}₫
                  </td>

                  <td className="space-x-2 text-center">
                    <button
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                      onClick={() => {
                        setSelectedRecord(item);
                        setOpenModal(true);
                      }}
                    >
                      Quản lý
                    </button>

                    <button
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                      onClick={() => handleDelete(item._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EmployeeTargetYearModal
        isOpen={openModal}
        year={year}
        record={selectedRecord}
        closeModal={() => {
          setOpenModal(false);
          setSelectedRecord(null);
        }}
        onSuccess={() => {
          loadData();
          setOpenModal(false);
          setSelectedRecord(null);
        }}
      />
    </>
  );
}
