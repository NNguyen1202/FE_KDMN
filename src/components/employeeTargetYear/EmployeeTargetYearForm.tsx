/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import {
  createEmployeeTargetYear,
  updateEmployeeTargetYear,
} from "../../services/employeeTargetYearService";
import { getUsers } from "../../services/userService";

interface Props {
  record?: any;
  userId?: string;
  onSuccess: () => void;
}

interface User {
  _id: string;
  fullName: string;
}

const getDefaultForm = (userId?: string) => ({
  userId: userId ?? "",
  year: new Date().getFullYear(),
  targetRevenue: 0,
});

export default function EmployeeTargetYearForm({
  record,
  userId,
  onSuccess,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(getDefaultForm(userId));

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (record) {
      setFormData({
        userId: record.userId?._id || record.userId,
        year: record.year,
        targetRevenue: record.targetRevenue,
      });
    } else {
      setFormData(getDefaultForm(userId));
    }
  }, [record, userId]);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data.data || []);
  };

  const formatNumber = (value: number) => {
    return Number(value || 0).toLocaleString("vi-VN");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "targetRevenue") {
      const number = Number(value.replace(/\./g, "").replace(/\D/g, ""));

      setFormData((prev) => ({
        ...prev,
        targetRevenue: number,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (record) {
        await updateEmployeeTargetYear(record._id, formData);
      } else {
        await createEmployeeTargetYear(formData);
      }

      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 text-gray-900 dark:text-white"
    >
      <div className="grid grid-cols-2 gap-4">
        {!userId && (
          <div className="col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nhân viên
            </label>

            <select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            >
              <option value="">Chọn nhân viên</option>

              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Năm
          </label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Doanh thu dự kiến
          </label>

          <div className="relative">
            <input
              type="text"
              name="targetRevenue"
              value={formatNumber(formData.targetRevenue)}
              onChange={handleChange}
              className="w-full rounded-lg border py-2 pl-3 pr-12"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              VNĐ
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t pt-4">
        <button
          disabled={loading}
          className="rounded-lg bg-brand-500 px-6 py-2 text-white hover:bg-brand-600"
        >
          {loading ? "Đang lưu..." : record ? "Cập nhật" : "Lưu KPI năm"}
        </button>
      </div>
    </form>
  );
}
