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
      <div className="rounded-xl border bg-white">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-semibold">Doanh thu dự kiến</h2>

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
            <tr className="border-b">
              <th className="px-5 py-3 text-left">Nhân viên</th>

              <th className="text-center">Tháng</th>

              <th className="text-center">Năm</th>

              <th className="text-center">Doanh thu dự kiến</th>

              <th className="text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-5 py-4">{item.userId?.fullName}</td>

                  <td className="text-center">{item.month}</td>

                  <td className="text-center">{item.year}</td>

                  <td className="text-center font-semibold text-green-600">
                    {Number(item.targetRevenue).toLocaleString("vi-VN")}₫
                  </td>

                  <td className="space-x-2 text-center">
                    <button
                      className="rounded bg-blue-500 px-3 py-1 text-white"
                      onClick={() => setOpenModal(true)}
                    >
                      Quản lý
                    </button>

                    <button
                      className="rounded bg-red-500 px-3 py-1 text-white"
                      onClick={() => handleDelete(item._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
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
