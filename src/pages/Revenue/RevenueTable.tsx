/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Props {
  records: any[];
  onEdit: (record: any) => void;
  onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const [year, month, day] = dateString.substring(0, 10).split("-");

  return `${day}/${month}/${year}`;
};

const formatMoney = (money: number) => {
  return money.toLocaleString("vi-VN") + "đ";
};

const sourceTypeMap: Record<string, string> = {
  Marketing: "Marketing",
  ChuDong: "Chủ động",
  CTV_DaiLy: "CTV / Đại lý",
};

const productConfig: Record<
  string,
  {
    icon: string;
    className: string;
  }
> = {
  "EasyHRM MASS": {
    icon: "👨🏻‍💼",
    className: "bg-blue-100 text-blue-700",
  },

  "EasyHRM PROJECT": {
    icon: "🏢",
    className: "bg-violet-100 text-violet-700",
  },

  EasyDocs: {
    icon: "📄",
    className: "bg-slate-100 text-slate-700",
  },

  "iCare DN": {
    icon: "🏥",
    className: "bg-green-100 text-green-700",
  },

  "iCare HKD": {
    icon: "🩺",
    className: "bg-orange-100 text-orange-700",
  },
};

const sourceColor = (source: string) => {
  switch (source) {
    case "Marketing":
      return "bg-blue-50 text-blue-700";

    case "ChuDong":
      return "bg-green-50 text-green-700";

    case "CTV_DaiLy":
      return "bg-orange-50 text-orange-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function RevenueTable({ records, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-stroke px-6 py-4 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          📋 Danh sách doanh thu
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
                className="border-b border-gray-200 transition hover:bg-brand-50 dark:border-gray-700 dark:hover:bg-brand-800"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        item.userId?.avatarUrl ||
                        "/images/user/default-avatar.png"
                      }
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.userId?.fullName}
                      </p>

                      <p className="text-xs text-gray-500">
                        {item.userId?.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                      productConfig[item.productType]?.className
                    }`}
                  >
                    {productConfig[item.productType]?.icon}

                    {item.productType}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${sourceColor(
                      item.sourceType,
                    )}`}
                  >
                    {sourceTypeMap[item.sourceType]}
                  </span>
                </td>

                <td className="p-3 text-center text-gray-900 dark:text-gray-100">
                  {item.customerCount}
                </td>

                <td className="p-3 text-center text-gray-900 dark:text-gray-100">
                  {item.productQuantity}
                </td>

                <td className="p-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">
                      {formatMoney(item.revenue)}
                    </p>
                  </div>
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
