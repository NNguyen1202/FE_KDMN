/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { createRevenue, updateRevenue } from "../../services/revenueService";
import { getUsers } from "../../services/userService";
import Select from "react-select";

interface RevenueFormProps {
  reportDate: string;
  record?: any;
  onSuccess: () => void;
}

interface User {
  _id: string;
  fullName: string;
  avatarUrl: string;
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

  const formatNumber = (value: number | string) => {
    if (!value) return "";
    return Number(value).toLocaleString("vi-VN");
  };

  const parseNumber = (value: string) => {
    return Number(value.replace(/\./g, "").replace(/,/g, ""));
  };

  const userOptions = users.map((user) => ({
    value: user._id,
    label: user.fullName,
    avatar: user.avatarUrl?.[0],
  }));

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
        name === "discountPercent"
          ? Number(value)
          : name === "revenue"
          ? parseNumber(value)
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
    <form
      onSubmit={handleSubmit}
      className="space-y-5 text-gray-900 dark:text-white"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Nhân viên
          </label>

          <Select
            options={userOptions}
            value={userOptions.find((item) => item.value === formData.userId)}
            onChange={(option) =>
              setFormData((prev) => ({
                ...prev,
                userId: option?.value || "",
              }))
            }
            formatOptionLabel={(user) => (
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar || "/images/default-avatar.png"}
                  className="h-7 w-7 rounded-full object-cover"
                />

                <span>{user.label}</span>
              </div>
            )}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "transparent",
                borderColor: state.isFocused ? "#3b82f6" : "rgb(75 85 99)",
                color: "inherit",
                minHeight: "42px",
              }),

              menu: (base) => ({
                ...base,
                backgroundColor: "#111827",
                zIndex: 9999,
              }),

              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#374151" : "#111827",
                color: "#ffffff",
                cursor: "pointer",
              }),

              singleValue: (base) => ({
                ...base,
                color: "#ffffff",
              }),

              input: (base) => ({
                ...base,
                color: "#ffffff",
              }),

              placeholder: (base) => ({
                ...base,
                color: "#9ca3af",
              }),
            }}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Sản phẩm
          </label>

          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="
w-full rounded-lg border px-3 py-2
bg-white text-gray-900 border-gray-300
dark:bg-gray-800 dark:border-gray-700 dark:text-white
"
          >
            <option value="">Chọn sản phẩm</option>

            <option value="EasyHRM MASS">EasyHRM MASS</option>
            <option value="EasyHRM PROJECT">EasyHRM PROJECT</option>
            <option value="EasyDocs">EasyDocs</option>
            <option value="iCare DN">iCare DN</option>
            <option value="iCare HKD">iCare HKD</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Nguồn
          </label>

          <select
            name="sourceType"
            value={formData.sourceType}
            onChange={handleChange}
            className="
w-full rounded-lg border px-3 py-2
bg-white text-gray-900 border-gray-300
dark:bg-gray-800 dark:border-gray-700 dark:text-white
"
          >
            <option value="">Chọn nguồn</option>

            <option value="Marketing">Marketing</option>
            <option value="ChuDong">Chủ động</option>
            <option value="CTV_DaiLy">CTV / Đại lý</option>
          </select>
        </div>
        {formData.sourceType === "CTV_DaiLy" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Chiết khấu
            </label>

            <div className="relative">
              <input
                type="number"
                name="discountPercent"
                min={0}
                max={100}
                value={formData.discountPercent}
                onChange={handleChange}
                className="
w-full rounded-lg border py-2 pl-3 pr-10
bg-white text-gray-900 border-gray-300
dark:bg-gray-800 dark:border-gray-700 dark:text-white
"
              />

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                %
              </span>
            </div>
          </div>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Số khách
          </label>

          <input
            type="number"
            name="customerCount"
            value={formData.customerCount}
            onChange={handleChange}
            className="
w-full rounded-lg border px-3 py-2
bg-white text-gray-900 border-gray-300
dark:bg-gray-800 dark:border-gray-700 dark:text-white
"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Số lượng sản phẩm
          </label>

          <input
            type="number"
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleChange}
            className="
w-full rounded-lg border px-3 py-2
bg-white text-gray-900 border-gray-300
dark:bg-gray-800 dark:border-gray-700 dark:text-white
"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Giá trị hợp đồng
          </label>

          <div className="relative">
            <input
              type="text"
              name="revenue"
              value={formatNumber(formData.revenue)}
              onChange={handleChange}
              inputMode="numeric"
              className="
w-full rounded-lg border py-2 pl-3 pr-12
bg-white text-gray-900 border-gray-300
dark:bg-gray-800 dark:border-gray-700 dark:text-white
"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
              VNĐ
            </span>
          </div>

          {formData.sourceType === "CTV_DaiLy" && (
            <div className="relative mt-3">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Doanh thu thực nhận
              </label>

              <input
                type="text"
                readOnly
                value={formatNumber(actualRevenue)}
                className="
w-full rounded-lg border py-2 pl-3 pr-12
bg-gray-100 border-gray-300
font-semibold text-green-600
dark:bg-gray-800
dark:border-gray-700
dark:text-green-400
"
              />

              <span className="absolute right-3 top-[45px] -translate-y-1/2 text-sm text-gray-500">
                VNĐ
              </span>
            </div>
          )}
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
            Ghi chú
          </label>

          <textarea
            rows={4}
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="
w-full rounded-lg border px-3 py-2
bg-white text-gray-900 border-gray-300
dark:bg-gray-800 dark:border-gray-700 dark:text-white
"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
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
