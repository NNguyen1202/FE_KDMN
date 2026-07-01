/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";

import { getRoleById, getUserById } from "../services/userService";

export default function UserProfiles() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user") || "null");

      if (!currentUser?._id) return;

      const res = await getUserById(currentUser._id);
      const user = res.data.getUser;

      if (!user?.roleID) return;

      // Nếu roleID là ObjectId
      const roleId =
        typeof user.roleID === "string" ? user.roleID : user.roleID._id;

      const roleRes = await getRoleById(roleId);

      console.log("Lấy role người dùng: ", roleRes);

      setUser(user);
      setRole(roleRes.data);

      console.log("User hiện tại: ",user);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <PageMeta title="User Profile" description="User Profile" />

      <PageBreadcrumb pageTitle="Profile" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold">Hồ sơ cá nhân</h3>

        <div className="space-y-6">
          <UserMetaCard user={user} role={role} />

          <UserInfoCard user={user} role={role} reload={loadProfile} />

          {/* <UserAddressCard user={user} /> */}
        </div>
      </div>
    </>
  );
}
