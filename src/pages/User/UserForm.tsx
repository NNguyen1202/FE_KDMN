/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface UserFormData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  roleID: string;
  password: string;
  confirmPassword: string;
  doB: Date | null;
  avatarUrl: string;
}

interface UserFormProps {
  initialValues?: any;
  loading?: boolean;
  submitText?: string;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

const defaultValues: UserFormData = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  roleID: "6a3a31285b1107c9a166df56",
  gender: "male",
  doB: null,
  avatarUrl: "",
};

export default function UserForm({
  initialValues,
  loading = false,
  submitText = "Lưu",
  onSubmit,
  onCancel,
}: UserFormProps) {
  const [form, setForm] = useState<UserFormData>(defaultValues);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...defaultValues,
        ...initialValues,
        confirmPassword: "",
      });
    }
  }, [initialValues]);

  useEffect(() => {
    return () => {
      if (form.avatarUrl.startsWith("blob:")) {
        URL.revokeObjectURL(form.avatarUrl);
      }
    };
  }, [form.avatarUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName.trim()) {
      return alert("Vui lòng nhập họ tên");
    }

    if (!form.email.trim()) {
      return alert("Vui lòng nhập email");
    }

    if (!initialValues) {
      if (form.password.length < 6) {
        return alert("Mật khẩu tối thiểu 6 ký tự");
      }

      if (form.password !== form.confirmPassword) {
        return alert("Mật khẩu xác nhận không khớp");
      }
    }

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-gray-900 dark:text-white"
    >
      {/* Thông tin cá nhân */}
      <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">Thông tin cá nhân</h3>

        <div className="mb-8">
          <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-200">Ảnh đại diện</label>

          <div className="flex items-center gap-6">
            <img
              src={form.avatarUrl || "https://ui-avatars.com/api/?name=User"}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://ui-avatars.com/api/?name=User";
              }}
              alt="Avatar"
              className="h-28 w-28 rounded-full border-4 border-gray-200 object-cover dark:border-gray-700"
            />

            <div className="flex-1">
              <input
                type="text"
                name="avatarUrl"
                value={form.avatarUrl}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />

              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Nhập URL ảnh đại diện.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Họ và tên</label>

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke px-4 py-2.5"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Số điện thoại
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke px-4 py-2.5"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Ngày sinh</label>

            <DatePicker
              selected={form.doB}
              onChange={(date: Date | null) =>
                setForm((prev) => ({
                  ...prev,
                  doB: date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Giới tính</label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tài khoản */}
      <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h3 className="mb-6 text-lg font-semibold">Thông tin tài khoản</h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke px-4 py-2.5"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">Vai trò</label>

            <select
              name="roleID"
              value={form.roleID}
              onChange={handleChange}
              className="w-full rounded-lg border border-stroke bg-white px-4 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              <option value="67f87c9ac19b91da666bbdc5">Quản trị viên</option>
              <option value="6a3a30ff5b1107c9a166df50">Quản lý</option>
              <option value="6a3a31285b1107c9a166df56">
                Chuyên viên kinh doanh
              </option>
              <option value="6a3a31395b1107c9a166df5a">
                Nhân viên thử việc
              </option>
            </select>
          </div>

          {!initialValues && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Mật khẩu
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stroke px-4 py-2.5"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Xác nhận mật khẩu
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-stroke px-4 py-2.5"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-stroke px-5 py-2.5 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Hủy
        </button>

        <button
          disabled={loading}
          type="submit"
          className="rounded-lg bg-brand-500 px-6 py-2.5 text-white hover:bg-brand-600 disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : submitText}
        </button>
      </div>
    </form>
  );
}
