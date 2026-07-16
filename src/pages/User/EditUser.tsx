import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { ArrowLeft, Save } from "lucide-react";

import {
  getUserById,
  updateUser,
  getRoleById,
} from "../../services/userService";

export default function EditUser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    doB: "",
    avatarUrl: "",
    isActive: true,
    isVerifiedEmail: false,
    isVerifiedPhone: false,
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (id) {
      loadUser(id);
    }
  }, [id]);

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

  const loadUser = async (userId: string) => {
    try {
      const res = await getUserById(userId);

      const user = res.data.getUser;

      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        doB: user.doB || "",
        avatarUrl: user.avatarUrl?.[0] || "",
        isActive: user.isActive,
        isVerifiedEmail: user.isVerifiedEmail,
        isVerifiedPhone: user.isVerifiedPhone,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser(id!, {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        doB: form.doB,
        avatarUrl: [form.avatarUrl],
        isActive: form.isActive,
        isVerifiedEmail: form.isVerifiedEmail,
        isVerifiedPhone: form.isVerifiedPhone,
      });

      alert("Cập nhật thành công");

      navigate(`/users/view/${id}`);
    } catch (error) {
      console.error(error);
      alert("Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sửa User</h2>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg border px-4 py-2"
        >
          <ArrowLeft size={18} />
          Quay lại
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Họ tên</label>

            <input
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Email</label>

            <input
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Số điện thoại</label>

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Ngày sinh</label>

            <input
              value={form.doB}
              onChange={(e) =>
                setForm({
                  ...form,
                  doB: e.target.value,
                })
              }
              placeholder="dd/MM/yyyy"
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <div>
          {isAdmin && (
            <label className="mb-2 block font-medium">Avatar URL</label>
          )}

          {isAdmin && (
            <input
              value={form.avatarUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  avatarUrl: e.target.value,
                })
              }
              className="w-full rounded-lg border p-3"
            />
          )}

          {form.avatarUrl && (
            <img
              src={form.avatarUrl}
              alt="Preview"
              className="mt-4 h-32 w-32 rounded-full border object-cover"
            />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.checked,
                })
              }
            />
            Đang hoạt động
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isVerifiedEmail}
              onChange={(e) =>
                setForm({
                  ...form,
                  isVerifiedEmail: e.target.checked,
                })
              }
            />
            Email xác thực
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isVerifiedPhone}
              onChange={(e) =>
                setForm({
                  ...form,
                  isVerifiedPhone: e.target.checked,
                })
              }
            />
            SĐT xác thực
          </label>
        </div>

        <div className="flex justify-end">
          <button
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-3 text-white"
          >
            <Save size={18} />

            {loading ? "Đang lưu..." : "Cập nhật User"}
          </button>
        </div>
      </form>
    </div>
  );
}
