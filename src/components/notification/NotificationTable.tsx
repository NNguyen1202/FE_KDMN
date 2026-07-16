/* eslint-disable @typescript-eslint/no-explicit-any */

type Props = {
  data: any[];
  loading: boolean;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
};

const moduleColor: Record<string, string> = {
  USER: "bg-blue-100 text-blue-700",
  ROLE: "bg-purple-100 text-purple-700",
  SALES_RECORD: "bg-green-100 text-green-700",
  AGENCY: "bg-orange-100 text-orange-700",
  PROVINCE: "bg-cyan-100 text-cyan-700",
  MANAGEMENT_AREA: "bg-pink-100 text-pink-700",
  AGENCY_CONTACT: "bg-yellow-100 text-yellow-700",
  ONLINE_REGISTRATION: "bg-indigo-100 text-indigo-700",
  PAYMENT_ACCOUNT: "bg-red-100 text-red-700",
};

const moduleName: Record<string, string> = {
  USER: "Người dùng",
  ROLE: "Vai trò",
  SALES_RECORD: "Doanh thu",
  AGENCY: "Cơ quan",
  PROVINCE: "Tỉnh",
  MANAGEMENT_AREA: "Xã/Phường",
  AGENCY_CONTACT: "Liên hệ",
  ONLINE_REGISTRATION: "Đăng ký Online",
  PAYMENT_ACCOUNT: "Tài khoản",
};

export default function NotificationTable({
  data,
  loading,
  onRead,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center dark:bg-gray-900">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-5 py-3 text-left">Tiêu đề</th>
              <th className="px-5 py-3 text-left">Module</th>
              <th className="px-5 py-3 text-left">Người thực hiện</th>
              <th className="px-5 py-3 text-center">Trạng thái</th>
              <th className="px-5 py-3 text-center">Thời gian</th>
              <th className="px-5 py-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id}
                  className={`border-t transition hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    !item.isRead ? "bg-blue-50/40" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold">
                      {item.title}
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                      {item.message}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        moduleColor[item.module] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {moduleName[item.module] ?? item.module}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {item.actorName}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {item.isRead ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Đã đọc
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Chưa đọc
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center text-sm">
                    {item.createdAt}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      {!item.isRead && (
                        <button
                          onClick={() => onRead(item._id)}
                          className="rounded-lg bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                        >
                          Đọc
                        </button>
                      )}

                      <button
                        onClick={() => onDelete(item._id)}
                        className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}