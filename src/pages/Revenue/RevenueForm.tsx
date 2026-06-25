/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createRevenue } from "../../services/revenueService";
import { getUsers } from "../../services/userService";

interface RevenueFormProps {
  reportDate: string;
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
  note: string;
}

export default function RevenueForm({
  reportDate,
  onSuccess
}: RevenueFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<RevenueFormData>({
    userId: "",
    reportDate: reportDate || "",
    productType: "",
    sourceType: "",
    customerCount: 0,
    productQuantity: 0,
    revenue: 0,
    note: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      reportDate,
    }));
  }, [reportDate]);

  const loadUsers = async () => {
    try {
      const res = await getUsers();

      setUsers(res?.data?.data || res?.data || []);
    } catch (error) {
      console.error(error);
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
        name === "revenue"
          ? Number(value)
          : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      reportDate,
      productType: "",
      sourceType: "",
      customerCount: 0,
      productQuantity: 0,
      revenue: 0,
      note: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.userId) {
        alert("Vui lòng chọn nhân viên");
        return;
      }

      if (!formData.productType) {
        alert("Vui lòng nhập sản phẩm");
        return;
      }

      if (!formData.sourceType) {
        alert("Vui lòng nhập nguồn");
        return;
      }

      setLoading(true);

      await createRevenue(formData);

      resetForm();

      onSuccess();
    } catch (error: any) {
      console.error(error);

      alert(error?.response?.data?.message || "Không thể lưu doanh thu");
    } finally {
      setLoading(false);
    }
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

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium">Ghi chú</label>

          <textarea
            name="note"
            rows={4}
            value={formData.note}
            onChange={handleChange}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 border-t pt-4">
        

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
        >
          {loading ? "Đang lưu..." : "Lưu doanh thu"}
        </button>
      </div>
    </form>
  );
}
