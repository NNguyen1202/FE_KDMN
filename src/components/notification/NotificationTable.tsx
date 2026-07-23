/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserById, getRoleById } from "../../services/userService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotificationLink } from "../../utils/notificationRedirect";

type Props = {
  data: any[];
  loading: boolean;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
};

const moduleColor: Record<string, string> = {
  USER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  ROLE: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  SALES_RECORD:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  AGENCY:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  PROVINCE: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  MANAGEMENT_AREA:
    "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  AGENCY_CONTACT:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  ONLINE_REGISTRATION:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  PAYMENT_ACCOUNT:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
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
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user") || "null");
        console.log("Người dùng hiện tại: ", currentUser);

        if (!currentUser?._id) return;

        // Lấy user đầy đủ
        const userRes = await getUserById(currentUser._id);
        console.log("Người dùng lấy ID hiện tại: ", userRes);
        const user = userRes.data.getUser;

        if (!user?.roleID) return;

        // Nếu roleID là ObjectId
        const roleId =
          typeof user.roleID === "string" ? user.roleID : user.roleID._id;

        const roleRes = await getRoleById(roleId);

        console.log("Lấy role người dùng: ", roleRes);

        setIsAdmin(roleRes.data.roleName === "Admin");
      } catch (err) {
        console.error(err);
      }
    };

    loadCurrentUser();
  }, []);
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white">
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
              <th className="px-5 py-3 text-left text-gray-700 dark:text-gray-300">
                Tiêu đề
              </th>
              <th className="px-5 py-3 text-left text-gray-700 dark:text-gray-300">
                Module
              </th>
              <th className="px-5 py-3 text-left text-gray-700 dark:text-gray-300">
                Người thực hiện
              </th>
              <th className="px-5 py-3 text-center text-gray-700 dark:text-gray-300">
                Trạng thái
              </th>
              <th className="px-5 py-3 text-center text-gray-700 dark:text-gray-300">
                Thời gian
              </th>
              <th className="px-5 py-3 text-center text-gray-700 dark:text-gray-300">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  Không có dữ liệu.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => {
                    onRead(item._id);

                    navigate(
                      getNotificationLink(
                        item.referenceModel,
                        item.referenceId,
                      ),
                    );
                  }}
                  className={`border-t border-gray-200 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800 ${
                    !item.isRead ? "bg-blue-50/40 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </div>

                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {item.message}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        moduleColor[item.module] ??
                        "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {moduleName[item.module] ?? item.module}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-gray-900 dark:text-gray-300">
                    {item.actorName}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {item.isRead ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/100 dark:text-green-300">
                        Đã đọc
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/100 dark:text-red-300">
                        Chưa đọc
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
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

                      {isAdmin && (
                        <button
                          onClick={() => onDelete(item._id)}
                          className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                        >
                          Xóa
                        </button>
                      )}
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
