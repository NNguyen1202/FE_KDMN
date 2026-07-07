/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getUserById } from "../../services/userService";

import { getUserDashboard } from "../../services/dashboardService";

import { getRoleById } from "../../services/userService";

import { getRoleDisplayName } from "../../utils/role";
import { getSalesByUser } from "../../services/revenueService";

export default function ViewUser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  const [roleName, setRoleName] = useState("");

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth() + 1);

  const [year, setYear] = useState(today.getFullYear());

  const [summary, setSummary] = useState<any>({});

  const [products, setProducts] = useState<any[]>([]);

  const [salesRecords, setSalesRecords] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      loadUser(id);
    }
  }, [id, month, year]);

  const loadUser = async (userId: string) => {
    try {
      const res = await getUserById(userId);

      setUser(res.data.getUser);

      const salesRes = await getSalesByUser(userId, month, year);

      setSalesRecords(salesRes.data.data ?? []);

      const userData = res.data.getUser;
      console.log(userData);

      // lấy role
      if (userData.roleID) {
        const roleId =
          typeof userData.roleID === "object"
            ? userData.roleID._id
            : userData.roleID;

        const roleRes = await getRoleById(roleId);

        setRoleName(getRoleDisplayName(roleRes.data.roleName));
        console.log(roleName);
      }

      const dashboard = await getUserDashboard(userId, month, year);

      setSummary(dashboard.summary ?? {});
      setProducts(dashboard.productRevenue ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const sourceTypeMap: Record<string, string> = {
    Marketing: "Marketing",
    ChuDong: "Chủ động",
    CTV_DaiLy: "CTV / Đại lý",
  };

  if (!user) {
    return <div className="p-5">Đang tải...</div>;
  }

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Chi tiết User</h2>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/users/edit/${user._id}`)}
            className="rounded-lg bg-amber-500 px-4 py-2 text-white"
          >
            Sửa User
          </button>

          <button
            onClick={() => navigate("/users")}
            className="rounded-lg border px-4 py-2"
          >
            Quay lại
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <img
              src={user.avatarUrl?.[0]}
              alt={user.fullName}
              className="h-32 w-32 rounded-full border-4 border-gray-100 object-cover shadow-md"
            />

            <div className="flex-1">
              <h3 className="text-3xl font-bold">{user.fullName}</h3>

              <p className="mt-1 text-gray-500">
                {roleName || "Chưa có vai trò"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    user.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    user.isVerifiedEmail
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.isVerifiedEmail
                    ? "Email xác thực"
                    : "Chưa xác thực Email"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    user.isVerifiedPhone
                      ? "bg-purple-100 text-purple-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.isVerifiedPhone ? "SĐT xác thực" : "Chưa xác thực SĐT"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl border border-gray-200 p-6">
            <h4 className="mb-5 text-lg font-semibold">Thông tin cá nhân</h4>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Họ tên</p>
                <p className="font-medium">{user.fullName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Số điện thoại</p>
                <p className="font-medium">{user.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Ngày sinh</p>
                <p className="font-medium">{user.doB}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Vai trò</p>
                <p className="font-medium">{roleName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Ngày tạo</p>
                <p className="font-medium">{user.createdAt}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              <div className="flex items-end gap-3">
                <div>
                  <label className="mb-1 block text-sm">Tháng</label>

                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="rounded-lg border px-3 py-2"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        Tháng {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm">Năm</label>

                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="rounded-lg border px-3 py-2"
                  >
                    {[2024, 2025, 2026, 2027].map((y) => (
                      <option key={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border border-green-200 mt-5 bg-green-50 p-5">
                <p className="text-sm text-gray-500">Tổng doanh thu</p>

                <h2 className="mt-2 text-3xl font-bold text-green-600 whitespace-nowrap">
                  {(summary?.totalRevenue ?? 0).toLocaleString("vi-VN")} đ
                </h2>
              </div>

              <div className="rounded-2xl border border-blue-200 mt-5 bg-blue-50 p-5">
                <p className="text-sm text-gray-500">Tổng giao dịch</p>

                <h2 className="mt-2 text-3xl font-bold text-blue-600">
                  {summary?.totalRecords ?? 0}
                </h2>
              </div>

              <div className="rounded-2xl border border-purple-200 mt-5 bg-purple-50 p-5">
                <p className="text-sm text-gray-500">Trạng thái</p>

                <h2 className="mt-2 text-3xl font-bold text-purple-600">
                  {user.isActive ? "Active" : "Inactive"}
                </h2>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="mb-5 text-lg font-semibold">
                Doanh thu theo sản phẩm
              </h3>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {(products ?? []).map((item: any) => (
                  <div key={item._id} className="rounded-xl border p-4">
                    <p className="font-semibold">{item._id}</p>

                    <p className="mt-3 text-2xl font-bold text-green-600">
                      {item.revenue.toLocaleString("vi-VN")} đ
                    </p>

                    <div className="mt-3 space-y-1 text-sm text-gray-500">
                      <p>👥 {item.customers} khách</p>

                      <p>📦 {item.quantity} sản phẩm</p>

                      <p>🧾 {item.records} giao dịch</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="mb-5 text-lg font-semibold">
                Danh sách giao dịch tháng {month}/{year}
              </h3>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">Ngày</th>
                      <th className="px-4 py-3 text-left">Sản phẩm</th>
                      <th className="px-4 py-3 text-left">Nguồn</th>
                      <th className="px-4 py-3 text-center">Khách hàng</th>
                      <th className="px-4 py-3 text-center">Số lượng</th>
                      <th className="px-4 py-3 text-right">Doanh thu</th>
                    </tr>
                  </thead>

                  <tbody>
                    {salesRecords.length > 0 ? (
                      salesRecords.map((item: any) => (
                        <tr
                          key={item._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-3">
                            {new Date(item.reportDate).toLocaleDateString(
                              "vi-VN",
                            )}
                          </td>

                          <td className="px-4 py-3 font-medium">
                            {item.productType}
                          </td>

                          <td className="px-4 py-3">
                            {sourceTypeMap[item.sourceType] || item.sourceType}
                          </td>

                          <td className="px-4 py-3 text-center">
                            {item.customerCount}
                          </td>

                          <td className="px-4 py-3 text-center">
                            {item.productQuantity}
                          </td>

                          <td className="px-4 py-3 text-right font-semibold text-green-600">
                            {item.revenue.toLocaleString("vi-VN")} đ
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-gray-500"
                        >
                          Không có giao dịch trong tháng này.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
