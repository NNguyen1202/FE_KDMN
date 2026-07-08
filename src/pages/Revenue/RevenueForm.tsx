/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createRevenue, updateRevenue } from "../../services/revenueService";
import { getUsers } from "../../services/userService";

interface RevenueFormProps {
  reportDate: string;
  record?: any;
  onSuccess: () => void;
}

interface User {
  _id: string;
  fullName: string;
}

interface RevenueFormData {
  userId: string;
  reportDate: string;
  productType: string;
  sourceType: string;
  customerCount: number;
  productQuantity: number;
  revenue: number;
  discountPercent: number;
  note: string;
}

const defaultForm = (reportDate: string): RevenueFormData => ({
  userId: "",
  reportDate,
  productType: "",
  sourceType: "",
  customerCount: 0,
  productQuantity: 0,
  revenue: 0,
  discountPercent: 0,
  note: "",
});

export default function RevenueForm({
  reportDate,
  record,
  onSuccess,
}: RevenueFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<RevenueFormData>(
    defaultForm(reportDate),
  );

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (record) {
      setFormData({
        userId: record.userId?._id || record.userId,
        reportDate: record.reportDate,
        productType: record.productType,
        sourceType: record.sourceType,
        customerCount: record.customerCount,
        productQuantity: record.productQuantity,
        revenue: record.revenue,
        discountPercent: record.discountPercent || 0,
        note: record.note || "",
      });
    } else {
      setFormData(defaultForm(reportDate));
    }
  }, [record, reportDate]);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res?.data?.data || res?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "customerCount" ||
        name === "productQuantity" ||
        name === "revenue" ||
        name === "discountPercent"
          ? Number(value)
          : value,
    }));
  };

  const resetForm = () => {
    setFormData(defaultForm(reportDate));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId) {
      alert("Vui lòng chọn nhân viên");
      return;
    }

    if (!formData.productType) {
      alert("Vui lòng chọn sản phẩm");
      return;
    }

    if (!formData.sourceType) {
      alert("Vui lòng chọn nguồn");
      return;
    }

    try {
      setLoading(true);

      if (record) {
        await updateRevenue(record._id, payload);
      } else {
        await createRevenue(payload);
      }

      onSuccess();
      resetForm();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Không thể lưu doanh thu");
    } finally {
      setLoading(false);
    }
  };

  const actualRevenue =
    formData.sourceType === "CTV_DaiLy"
      ? Math.round(formData.revenue * (1 - formData.discountPercent / 100))
      : formData.revenue;

  const payload = {
    ...formData,
    revenue: actualRevenue,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
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
          <label className="mb-1 block text-sm font-medium">Sản phẩm</label>

          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Chọn sản phẩm</option>

            <option value="EasyHRM MASS">EasyHRM MASS</option>
            <option value="EasyHRM PROJECT">EasyHRM PROJECT</option>
            <option value="iCare DN">iCare DN</option>
            <option value="iCare HKD">iCare HKD</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Nguồn</label>

          <select
            name="sourceType"
            value={formData.sourceType}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="">Chọn nguồn</option>

            <option value="Marketing">Marketing</option>
            <option value="ChuDong">Chủ động</option>
            <option value="CTV_DaiLy">CTV / Đại lý</option>
          </select>
        </div>
        {formData.sourceType === "CTV_DaiLy" && (
          <div>
            <label className="mb-1 block text-sm font-medium">
              Chiết khấu (%)
            </label>

            <input
              type="number"
              name="discountPercent"
              min={0}
              max={100}
              value={formData.discountPercent}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">Số khách</label>

          <input
            type="number"
            name="customerCount"
            value={formData.customerCount}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Số lượng sản phẩm
          </label>

          <input
            type="number"
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Giá trị hợp đồng
          </label>

          <input
            type="number"
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
          {formData.sourceType === "CTV_DaiLy" && (
            <div>
              <label className="mb-1 block text-sm font-medium">
                Doanh thu thực nhận
              </label>

              <input
                type="text"
                readOnly
                value={actualRevenue.toLocaleString("vi-VN")}
                className="w-full rounded-lg border bg-gray-100 px-3 py-2"
              />
            </div>
          )}
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium">Ghi chú</label>

          <textarea
            rows={4}
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-brand-500 px-5 py-2 text-white hover:bg-brand-600 disabled:opacity-60"
        >
          {loading
            ? "Đang lưu..."
            : record
            ? "Cập nhật doanh thu"
            : "Lưu doanh thu"}
        </button>
      </div>
    </form>
  );
}
