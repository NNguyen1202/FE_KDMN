/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  deleteEmployeeTarget,
  getEmployeeTargets,
} from "../../services/employeeTargetService";
import EmployeeTargetModal from "./EmployeeTargetModal";

export default function EmployeeTargetTable() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const loadData = async () => {
    setLoading(true);

    try {
      const now = dayjs();

      const res = await getEmployeeTargets(now.month() + 1, now.year());

      setData(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xóa KPI này?")) return;

    await deleteEmployeeTarget(id);

    loadData();
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Doanh thu dự kiến
          </h2>

          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className="rounded-lg bg-brand-500 px-4 py-2 text-white"
          >
            + Thêm
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th className="px-5 py-3 text-left text-gray-700 dark:text-gray-200">
                Nhân viên
              </th>

              <th className="text-center text-gray-700 dark:text-gray-200">
                Tháng
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
                    {item.month}
                  </td>

                  <td className="text-center text-gray-900 dark:text-white">
                    {item.year}
                  </td>

                  <td className="text-center font-semibold text-green-600 dark:text-green-400">
                    {Number(item.targetRevenue).toLocaleString("vi-VN")}₫
                  </td>

                  <td className="space-x-2 text-center text-gray-900 dark:text-white">
                    <button
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                      onClick={() => setOpenModal(true)}
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
                  colSpan={5}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EmployeeTargetModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        onSuccess={() => {
          loadData();
          setOpenModal(false);
        }}
      />
    </>
  );
}
