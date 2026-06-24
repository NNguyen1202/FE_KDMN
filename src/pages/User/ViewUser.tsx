/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { ArrowLeft } from "lucide-react";

import { getUserById } from "../../services/userService";

import { getSalesByUser } from "../../services/revenueService";

import { getRoleById } from "../../services/userService";

export default function ViewUser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  const [roleName, setRoleName] = useState("");

  const [sales, setSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (id) {
      loadUser(id);
    }
  }, [id]);

  const loadUser = async (userId: string) => {
    try {
      const res = await getUserById(userId);

      setUser(res.data.getUser);

      const userData = res.data.getUser;
      console.log(userData);
      
      // lấy role
      if (userData.roleID) {
        const roleId =
          typeof userData.roleID === "object"
            ? userData.roleID._id
            : userData.roleID;

        const roleRes = await getRoleById(roleId);

        setRoleName(roleRes.data.roleName);
        console.log(roleName);
        
      }

      const salesRes = await getSalesByUser(userId);

      setSales(salesRes.data);

      const total = salesRes.data.reduce(
        (sum: number, item: any) => sum + item.revenue,
        0,
      );

      setTotalRevenue(total);
    } catch (error) {
      console.error(error);
    }
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
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="text-sm text-gray-500">Tổng doanh thu</p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {totalRevenue.toLocaleString("vi-VN")} đ
              </h2>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm text-gray-500">Tổng giao dịch</p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                {sales.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
              <p className="text-sm text-gray-500">Trạng thái</p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                {user.isActive ? "Active" : "Inactive"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
