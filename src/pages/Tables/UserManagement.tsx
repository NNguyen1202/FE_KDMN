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
import { getUsers } from "../../services/userService";
import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { deleteUser } from "../../services/userService";

export default function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data || []);
    console.log(res);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý User</h2>

        <button onClick={loadUsers} className="rounded-lg border px-4 py-2">
          Làm mới
        </button>

        <button
          onClick={() => navigate("/users/create")}
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
        >
          <Plus size={18} />
          Thêm User
        </button>
      </div>

      <div className="mb-5 relative">
        <Search size={18} className="absolute left-3 top-3 text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tên, email, SĐT..."
          className="w-full rounded-lg border py-2 pl-10 pr-4"
        />
      </div>

      <div className="overflow-x-auto">
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

                <td className="px-4 py-3">{user.role}</td>

                <td className="px-4 py-3">{formatDate(user.doB)}</td>

                <td className="px-4 py-3">{user.phone}</td>

                <td className="px-4 py-3">{user.email}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/users/view/${user._id}`)}
                      className="rounded bg-blue-500 p-2 text-white"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => navigate(`/users/edit/${user._id}`)}
                      className="rounded bg-amber-500 p-2 text-white"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="rounded bg-red-500 p-2 text-white"
                    >
                      <Trash2 size={16} />
                    </button>
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
