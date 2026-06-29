/* eslint-disable @typescript-eslint/no-explicit-any */
// import PageBreadcrumb from "../../components/common/PageBreadCrumb";
// import ComponentCard from "../../components/common/ComponentCard";
// import PageMeta from "../../components/common/PageMeta";
// import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

// export default function BasicTables() {
//   return (
//     <>
//       <PageMeta
//         title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
//         description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
//       />
//       <PageBreadcrumb pageTitle="Basic Tables" />
//       <div className="space-y-6">
//         <ComponentCard title="Basic Table 1">
//           <BasicTableOne />
//         </ComponentCard>
//       </div>
//     </>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { getUsers,getUserById, getRoleById } from "../../services/userService";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { deleteUser } from "../../services/userService";

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const keyword = search.toLowerCase();

      return (
        user.fullName?.toLowerCase().includes(keyword) ||
        user.email?.toLowerCase().includes(keyword) ||
        user.phone?.toLowerCase().includes(keyword)
      );
    });
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";

    const d = new Date(dateString);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa user này?");

    if (!confirmed) return;

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((x) => x._id !== id));

      alert("Xóa thành công");
    } catch (error) {
      console.error(error);

      alert("Xóa thất bại");
    }
  };

  useEffect(() => {
  const loadCurrentUser = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "null");
      console.log("Người dùng hiện tại: ",currentUser);
      
      if (!currentUser?._id) return;

      // Lấy user đầy đủ
      const userRes = await getUserById(currentUser._id);
      console.log("Người dùng lấy ID hiện tại: ",userRes);
      const user = userRes.data.getUser;

      if (!user?.roleID) return;

      // Nếu roleID là ObjectId
      const roleId =
        typeof user.roleID === "string"
          ? user.roleID
          : user.roleID._id;

      const roleRes = await getRoleById(roleId);

      console.log("Lấy role người dùng: ",roleRes);
      

      setIsAdmin(roleRes.data.roleName === "Admin");
    } catch (err) {
      console.error(err);
    }
  };

  loadCurrentUser();
}, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data || []);
    console.log(res);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Quản lý người dùng
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Quản lý tài khoản và thông tin nhân viên trong hệ thống
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={loadUsers}
            className="rounded-lg border border-stroke bg-white px-4 py-2 hover:bg-gray-50"
          >
            Làm mới
          </button>

          {isAdmin && (
            <button
              onClick={() => navigate("/users/create")}
              className="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2 text-white hover:bg-brand-600"
            >
              <Plus size={18} />
              Thêm người dùng
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-stroke bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              placeholder="Tìm tên, email hoặc số điện thoại..."
              className="w-full rounded-lg border border-stroke py-2.5 pl-10 pr-4"
            />
          </div>
          <select className="rounded-lg border border-stroke px-4">
            <option>Tất cả vai trò</option>
            <option>Admin</option>
            <option>User</option>
          </select>

          <div className="flex items-center justify-end text-sm text-gray-500">
            Tổng cộng <b className="mx-1">{users.length}</b> người dùng
          </div>
        </div>
      </div>

      {/* <div className="mb-5 relative">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên, email, SĐT..."
          className="w-full rounded-lg border py-2 pl-10 pr-4"
        />
      </div> */}

      <div className="overflow-x-auto ">
        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Tổng người dùng</p>

            <h2 className="mt-2 text-3xl font-bold text-brand-500">
              {users.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Quản trị viên</p>

            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {users.filter((x) => x?.roleID?.roleName === "Admin").length}
            </h2>
          </div>

          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Quản lý</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-500">
              {users.filter((x) => x?.roleID?.roleName === "Manager").length}
            </h2>
          </div>

          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Chuyên viên kinh doanh</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-500">
              {
                users.filter(
                  (x) => x?.roleID?.roleName === "Business specialist",
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Nhân viên thử việc</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-500">
              {
                users.filter(
                  (x) => x?.roleID?.roleName === "Probationary employee",
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Hiển thị</p>

            <h2 className="mt-2 text-3xl font-bold text-green-500">
              {filteredUsers.length}
            </h2>
          </div>
        </div>
        <table className="min-w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left">Avatar</th>

              <th className="px-4 py-3 text-left">Họ tên</th>

              <th className="px-4 py-3 text-left">Chức danh</th>

              <th className="px-4 py-3 text-left">Ngày sinh</th>

              <th className="px-4 py-3 text-left">SĐT</th>

              <th className="px-4 py-3 text-left">Email</th>

              <th className="px-4 py-3 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="h-12 w-12 rounded-full border object-cover"
                  />
                </td>

                <td className="px-4 py-3 font-medium">{user.fullName}</td>

                <td className="px-4 py-3 text-left">
                  <span
                    className={`inline-flex min-w-[90px] justify-center rounded-full px-3 py-1 text-xs font-semibold 
                  ${
                    user?.roleID?.roleName === "Admin"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                  >
                    {user?.roleID?.roleName}
                  </span>
                </td>

                <td className="px-4 py-3">{formatDate(user.doB)}</td>

                <td className="px-4 py-3">{user.phone}</td>

                <td className="px-4 py-3">{user.email}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/users/view/${user._id}`)}
                      className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Eye size={16} />
                    </button>

                    {isAdmin && (
                      <>
                        <button
                          onClick={() => navigate(`/users/edit/${user._id}`)}
                          className="rounded-lg border border-yellow-200 p-2 text-yellow-600 hover:bg-yellow-50"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
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
          onClick={() => setPage(page - 1)}
          className="rounded border px-3 py-1"
        >
          Trước
        </button>

        <span className="px-3 py-1">
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="rounded border px-3 py-1"
        >
          Sau
        </button>
      </div>
    </div>
  );
}
