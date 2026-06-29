export const getRoleDisplayName = (role: string) => {
  switch (role) {
    case "Admin":
      return "Quản trị viên";

    case "Manager":
      return "Quản lý";

    case "Business specialist":
      return "Chuyên viên kinh doanh";

    case "Probationary employee":
      return "Nhân viên thử việc";

    default:
      return role || "Chưa có vai trò";
  }
};