/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import UserForm from "./UserForm";
import { createUser } from "../../services/userService";

export default function UserCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      await createUser(data);

      toast.success("Thêm người dùng thành công");

      navigate("/users");
    } catch (err: any) {
      console.error(err);
      console.error(err.response);

      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Thêm người dùng thất bại",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Thêm người dùng</h2>

          <p className="mt-1 text-gray-500">Tạo tài khoản mới cho nhân viên</p>
        </div>
      </div>

      <UserForm
        submitText="Tạo người dùng"
        onSubmit={handleSubmit}
        onCancel={() => navigate("/users")}
      />
    </div>
  );
}
