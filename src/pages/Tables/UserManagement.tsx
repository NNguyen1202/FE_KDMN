
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import {
  getUsers,
  getUserById,
  getRoleById,
  deleteUser,
} from "../../services/userService";

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 20;

  // Thứ tự hiển thị Role
  const ROLE_ORDER: Record<string, number> = {
    "Admin": 1,
    "Manager": 2,
    "Business specialist": 3,
    "Probationary employee": 4,
  };

  // Lấy danh sách user và xác định quyền Admin
  const loadUsers = async (adminStatus: boolean) => {
    try {
      const res = await getUsers();

      const allUsers = Array.isArray(res.data) ? res.data : [];

      // Admin thấy tất cả
      // Các role khác không thấy Admin
      let visibleUsers = adminStatus
        ? allUsers
        : allUsers.filter(
            (user: any) =>
              user?.roleID?.roleName !== "Admin",
          );

      // Không hiển thị user inactive
      visibleUsers = visibleUsers.filter(
        (user: any) => user?.isActive !== false,
      );

      // Sắp xếp theo Role
      visibleUsers.sort((a: any, b: any) => {
        const roleA = a?.roleID?.roleName || "";
        const roleB = b?.roleID?.roleName || "";

        const orderA = ROLE_ORDER[roleA] ?? 999;
        const orderB = ROLE_ORDER[roleB] ?? 999;

        // Khác Role thì ưu tiên theo thứ tự Role
        if (orderA !== orderB) {
          return orderA - orderB;
        }

        // Cùng Role thì sắp xếp theo tên
        return (a?.fullName || "").localeCompare(
          b?.fullName || "",
          "vi",
          {
            sensitivity: "base",
          },
        );
      });

      setUsers(visibleUsers);
    } catch (error) {
      console.error("Load users error:", error);
    }
  };

  // Load user hiện tại trước
  // Sau đó mới load danh sách user
  useEffect(() => {
    const initialize = async () => {
      try {
        const currentUser = JSON.parse(
          localStorage.getItem("user") || "null",
        );

        if (!currentUser?._id) {
          setIsAdmin(false);
          await loadUsers(false);
          return;
        }

        const userRes = await getUserById(currentUser._id);
        const user = userRes.data.getUser;

        if (!user?.roleID) {
          setIsAdmin(false);
          await loadUsers(false);
          return;
        }

        const roleId =
          typeof user.roleID === "string"
            ? user.roleID
            : user.roleID?._id;

        if (!roleId) {
          setIsAdmin(false);
          await loadUsers(false);
          return;
        }

        const roleRes = await getRoleById(roleId);

        const admin =
          roleRes.data.roleName === "Admin";

        setIsAdmin(admin);

        await loadUsers(admin);
      } catch (error) {
        console.error(
          "Load current user error:",
          error,
        );

        setIsAdmin(false);
        await loadUsers(false);
      }
    };

    initialize();
  }, []);

  // Tìm kiếm
  const filteredUsers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return users.filter((user) => {
      return (
        user.fullName
          ?.toLowerCase()
          .includes(keyword) ||
        user.email
          ?.toLowerCase()
          .includes(keyword) ||
        user.phone
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [users, search]);

  // Pagination
  const totalPages = Math.ceil(
    filteredUsers.length / pageSize,
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";

    const d = new Date(dateString);

    if (isNaN(d.getTime())) {
      return "-";
    }

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(
      d.getMonth() + 1,
    ).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  // Xóa user
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa user này?",
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);

      setUsers((prev) =>
        prev.filter((x) => x._id !== id),
      );

      alert("Xóa thành công");
    } catch (error) {
      console.error(error);
      alert("Xóa thất bại");
    }
  };

  // Thống kê
  const activeUsers = users.filter(
    (x) => x.isActive !== false,
  );

  const adminCount = activeUsers.filter(
    (x) =>
      x?.roleID?.roleName === "Admin",
  ).length;

  const managerCount = activeUsers.filter(
    (x) =>
      x?.roleID?.roleName === "Manager",
  ).length;

  const businessCount = activeUsers.filter(
    (x) =>
      x?.roleID?.roleName ===
      "Business specialist",
  ).length;

  const probationCount = activeUsers.filter(
    (x) =>
      x?.roleID?.roleName ===
      "Probationary employee",
  ).length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Quản lý người dùng
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quản lý tài khoản và thông tin nhân viên trong hệ thống
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              loadUsers(isAdmin);
            }}
            className="
              rounded-lg border border-stroke
              bg-white px-4 py-2
              text-gray-700 hover:bg-gray-50
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-200
              dark:hover:bg-gray-700
            "
          >
            Làm mới
          </button>

          {isAdmin && (
            <button
              onClick={() =>
                navigate("/users/create")
              }
              className="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2 text-white hover:bg-brand-600"
            >
              <Plus size={18} />
              Thêm người dùng
            </button>
          )}
        </div>
      </div>

      <div
        className="
          mb-6 rounded-xl border border-stroke
          bg-white p-5 shadow-sm
          dark:border-gray-700
          dark:bg-gray-900
        "
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Tìm tên, email hoặc số điện thoại..."
              className="
                w-full rounded-lg border border-stroke
                bg-white py-2.5 pl-10 pr-4
                text-gray-900
                dark:border-gray-700
                dark:bg-gray-800
                dark:text-white
              "
            />
          </div>

          <select
            className="
              rounded-lg border border-stroke
              bg-white px-4
              text-gray-900
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-white
            "
          >
            <option>Tất cả vai trò</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>Business specialist</option>
            <option>Probationary employee</option>
          </select>

          <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400">
            Tổng cộng{" "}
            <b className="mx-1">
              {activeUsers.length}
            </b>{" "}
            người dùng
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6">
        <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tổng người dùng
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {activeUsers.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Quản trị viên
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-500">
            {adminCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Quản lý
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-500">
            {managerCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Chuyên viên kinh doanh
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-500">
            {businessCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nhân viên thử việc
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-500">
            {probationCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-500">
            {filteredUsers.length}
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">
                Avatar
              </th>

              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">
                Họ tên
              </th>

              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">
                Chức danh
              </th>

              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">
                Ngày sinh
              </th>

              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">
                SĐT
              </th>

              <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-200">
                Email
              </th>

              <th className="px-4 py-3 text-center text-gray-700 dark:text-gray-200">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className="
                  border-b border-gray-200
                  hover:bg-gray-50
                  dark:border-gray-700
                  dark:hover:bg-gray-800
                "
              >
                <td className="px-4 py-3">
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="
                      h-12 w-12 rounded-full
                      border object-cover
                      border-gray-200
                      dark:border-gray-700
                    "
                  />
                </td>

                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {user.fullName}
                </td>

                <td className="px-4 py-3 text-left">
                  <span
                    className={`inline-flex min-w-[90px] justify-center rounded-full px-3 py-1 text-xs font-semibold ${
                      user?.roleID?.roleName ===
                      "Admin"
                        ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
                        : user?.roleID?.roleName ===
                          "Manager"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400"
                        : user?.roleID?.roleName ===
                          "Business specialist"
                        ? "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400"
                        : user?.roleID?.roleName ===
                          "Probationary employee"
                        ? "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {user?.roleID?.roleName}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {formatDate(user.doB)}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {user.phone}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  {user.email}
                </td>

                <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          `/users/view/${user._id}`,
                        )
                      }
                      className="
                        rounded-lg border border-blue-200
                        p-2 text-blue-600
                        hover:bg-blue-50
                        dark:border-blue-900
                        dark:text-blue-400
                        dark:hover:bg-blue-950
                      "
                    >
                      <Eye size={16} />
                    </button>

                    {isAdmin && (
                      <>
                        <button
                          onClick={() =>
                            navigate(
                              `/users/edit/${user._id}`,
                            )
                          }
                          className="
                            rounded-lg border border-yellow-200
                            p-2 text-yellow-600
                            hover:bg-yellow-50
                            dark:border-yellow-900
                            dark:text-yellow-400
                            dark:hover:bg-yellow-950
                          "
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(user._id)
                          }
                          className="
                            rounded-lg border border-red-200
                            p-2 text-red-600
                            hover:bg-red-50
                            dark:border-red-900
                            dark:text-red-400
                            dark:hover:bg-red-950
                          "
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage((prev) => prev - 1)
          }
          className="
            rounded border px-3 py-1
            border-gray-300
            text-gray-700
            dark:border-gray-700
            dark:text-gray-200
            dark:bg-gray-800
          "
        >
          Trước
        </button>

        <span className="px-3 py-1 text-gray-700 dark:text-gray-200">
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={
            page === totalPages ||
            totalPages === 0
          }
          onClick={() =>
            setPage((prev) => prev + 1)
          }
          className="
            rounded border px-3 py-1
            border-gray-300
            text-gray-700
            dark:border-gray-700
            dark:text-gray-200
            dark:bg-gray-800
          "
        >
          Sau
        </button>
      </div>
    </div>
  );
}

