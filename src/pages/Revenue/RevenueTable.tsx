/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Props {
  records: any[];
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatMoney = (money: number) => {
  return money.toLocaleString("vi-VN") + "đ";
};

const sourceTypeMap: Record<string, string> = {
  Marketing: "Marketing",
  ChuDong: "Chủ động",
  CTV_DaiLy: "CTV / Đại lý",
};

export default function RevenueTable({ records, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-stroke px-6 py-4 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Danh sách doanh thu
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                Nhân viên
              </th>

              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                Sản phẩm
              </th>

              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                Nguồn
              </th>

              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                Khách
              </th>

              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                SL
              </th>

              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                Doanh thu
              </th>

              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                Ngày
              </th>

              <th className="p-3 text-center text-gray-700 dark:text-gray-200">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {records.map((item: any) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <td className="p-3 text-center text-gray-900 dark:text-gray-100">
                  {item.userId?.fullName}
                </td>

                <td className="p-3 text-center text-gray-900 dark:text-gray-100">
                  {item.productType}
                </td>

                <td className="p-3 text-center text-gray-900 dark:text-gray-100">
                  {sourceTypeMap[item.sourceType] || item.sourceType}
                </td>

                <td className="p-3 text-center text-gray-900 dark:text-gray-100">
                  {item.customerCount}
                </td>

                <td className="p-3 text-center text-gray-900 dark:text-gray-100">
                  {item.productQuantity}
                </td>

                <td className="p-3 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                  {formatMoney(item.revenue)}
                </td>

                <td className="p-3 text-center text-gray-500 dark:text-gray-400">
                  {formatDate(item.reportDate)}
                </td>

                <td className="p-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="
                        rounded-lg border border-blue-200 
                        p-2 text-blue-600 transition 
                        hover:bg-blue-50
                        dark:border-blue-900 
                        dark:text-blue-400 
                        dark:hover:bg-blue-950
                      "
                      title="Chỉnh sửa"
                    >
                      <FiEdit2 size={16} />
                    </button>

                    <button
                      onClick={() => onDelete(item._id)}
                      className="
                        rounded-lg border border-red-200 
                        p-2 text-red-600 transition 
                        hover:bg-red-50
                        dark:border-red-900 
                        dark:text-red-400 
                        dark:hover:bg-red-950
                      "
                      title="Xóa"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {records.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
