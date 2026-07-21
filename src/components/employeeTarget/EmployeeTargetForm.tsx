/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import {
  createEmployeeTarget,
  updateEmployeeTarget,
} from "../../services/employeeTargetService";
import { getUsers } from "../../services/userService";

interface Props {
  record?: any;
  onSuccess: () => void;
}

interface User {
  _id: string;
  fullName: string;
}

const defaultForm = {
  userId: "",
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  targetRevenue: 0,
};

export default function EmployeeTargetForm({ record, onSuccess }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (record) {
      setFormData({
        userId: record.userId?._id || record.userId,
        month: record.month,
        year: record.year,
        targetRevenue: record.targetRevenue,
      });
    } else {
      setFormData(defaultForm);
    }
  }, [record]);

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
      [name]: name === "month" || name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (record) {
        await updateEmployeeTarget(record._id, formData);
      } else {
        await createEmployeeTarget(formData);
      }

      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium">Nhân viên</label>

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

        <div>
          <label className="mb-1 block text-sm font-medium">Tháng</label>

          <input
            type="number"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Năm</label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium">
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
          {loading ? "Đang lưu..." : record ? "Cập nhật" : "Lưu KPI"}
        </button>
      </div>
    </form>
  );
}
