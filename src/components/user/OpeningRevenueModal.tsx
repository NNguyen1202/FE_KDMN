/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { updateOpeningRevenue } from "../../services/userService";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  user: any;
  onSuccess: () => void;
}

export default function OpeningRevenueModal({
  isOpen,
  closeModal,
  user,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [openingRevenue, setOpeningRevenue] = useState("");

  useEffect(() => {
    if (user) {
      setOpeningRevenue(String(user.openingRevenue || 0));
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateOpeningRevenue(
        user._id,
        Number(openingRevenue.replace(/,/g, ""))
      );

      toast.success("Cập nhật doanh thu đầu kỳ thành công");

      onSuccess();

      closeModal();
    } catch (error) {
      toast.error("Không thể cập nhật doanh thu đầu kỳ");
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (value: string) => {
    const number = value.replace(/\D/g, "");

    return Number(number || 0).toLocaleString("vi-VN");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-stroke bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        <div className="border-b border-stroke px-6 py-5 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Doanh thu đầu kỳ
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Nhập doanh thu 6 tháng đầu năm của nhân viên.
          </p>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nhân viên
            </label>

            <div className="rounded-xl border border-stroke bg-gray-50 px-4 py-3 font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
              {user?.fullName}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Doanh thu đầu kỳ (VNĐ)
            </label>

            <input
              type="text"
              value={formatNumber(openingRevenue)}
              onChange={(e) =>
                setOpeningRevenue(e.target.value.replace(/\D/g, ""))
              }
              placeholder="0"
              className="w-full rounded-xl border border-stroke bg-white px-4 py-3 text-gray-900 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
            Giá trị này chỉ dùng để bù doanh thu của những tháng chưa sử dụng hệ
            thống (ví dụ 6 tháng đầu năm 2026).
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-stroke px-6 py-5 dark:border-gray-700">
          <button
            onClick={closeModal}
            disabled={loading}
            className="rounded-xl border border-stroke px-5 py-2.5 text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-xl bg-brand-500 px-6 py-2.5 font-medium text-white transition hover:bg-brand-600 disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}