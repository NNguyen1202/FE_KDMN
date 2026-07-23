/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import {
  getEmployeeTargets,
  saveEmployeeTargets,
} from "../../services/employeeTargetService";
import { getUsers } from "../../services/userService";
import { useDashboard } from "../../context/DashboardContext";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onSuccess?: () => void;
}

interface TargetItem {
  userId: string;
  fullName: string;
  avatar?: string;
  targetRevenue: number;
}

export default function EmployeeTargetModal({
  isOpen,
  closeModal,
  onSuccess,
}: Props) {
  const { month, year, reloadDashboard } = useDashboard();

  const [loading, setLoading] = useState(false);

  const [targets, setTargets] = useState<TargetItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      setLoading(true);

      const usersRes = await getUsers();

      console.log("usersRes", usersRes.data);

      const targetRes = await getEmployeeTargets(month, year);

      const users = Array.isArray(usersRes)
        ? usersRes
        : usersRes.data?.data || usersRes.data || [];

      console.log("users", users);

      const targetMap = new Map();

      (targetRes.data.data || []).forEach((item: any) => {
        targetMap.set(item.userId._id || item.userId, item);
      });

      const rows = users
        .filter(
          (user: any) =>
            user.roleID?.roleName !== "Admin" &&
            user.roleID?.roleName !== "Manager",
        )
        .map((user: any) => ({
          userId: user._id,
          fullName: user.fullName,
          avatar: user.avatarUrl,
          targetRevenue: targetMap.get(user._id)?.targetRevenue || 0,
        }));

      setTargets(rows);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value: number) =>
    Number(value || 0).toLocaleString("vi-VN");

  const handleChange = (userId: string, value: string) => {
    const number = Number(value.replace(/\D/g, ""));

    setTargets((prev) =>
      prev.map((item) =>
        item.userId === userId
          ? {
              ...item,
              targetRevenue: number,
            }
          : item,
      ),
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await saveEmployeeTargets({
        month,
        year,
        targets: targets.map((x) => ({
          userId: x.userId,
          targetRevenue: x.targetRevenue,
        })),
      });

      reloadDashboard();

      onSuccess?.();

      closeModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-3xl">
      <div className="w-[700px] max-w-[90vw]">
        <div className="border-b border-stroke px-6 py-4 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            KPI Doanh thu tháng {month}/{year}
          </h2>
        </div>

        <div className="max-h-[500px] overflow-y-auto p-6 text-gray-900 dark:text-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-gray-700">
                <th className="py-3 text-left text-gray-700 dark:text-gray-300">
                  Nhân viên
                </th>

                <th className="py-3 text-right text-gray-700 dark:text-gray-300">
                  KPI doanh thu
                </th>
              </tr>
            </thead>

            <tbody>
              {targets.map((item) => (
                <tr
                  key={item.userId}
                  className="border-b border-stroke dark:border-gray-700"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar || "/images/user/default-avatar.png"}
                        className="h-10 w-10 rounded-full"
                      />

                      <span className="font-medium text-gray-900 dark:text-white">
                        {item.fullName}
                      </span>
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-56 rounded-lg border border-gray-300 bg-white px-3 py-2 text-right text-gray-900 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        value={formatNumber(item.targetRevenue)}
                        onChange={(e) =>
                          handleChange(item.userId, e.target.value)
                        }
                      />

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        VNĐ
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 border-t border-stroke px-6 py-4 dark:border-gray-700">
          <button
            onClick={closeModal}
            className="rounded-lg border border-stroke px-5 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Hủy
          </button>

          <button
            disabled={loading}
            onClick={handleSave}
            className="rounded-lg bg-brand-500 px-6 py-2 text-white"
          >
            {loading ? "Đang lưu..." : "Lưu KPI"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
