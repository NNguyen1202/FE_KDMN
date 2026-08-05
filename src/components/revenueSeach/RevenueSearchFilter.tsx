/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";

import { getUsers } from "../../services/userService";
import { getPayrollMonths } from "../../utils/revenuePeriod";
import { X } from "lucide-react";

interface Props {
  filters: any;

  setFilters: any;

  onSearch: () => void;

  currentUser: any;
}

export default function RevenueSearchFilter({
  filters,

  setFilters,

  onSearch,
}: Props) {
  const [users, setUsers] = useState<any[]>([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [searchUser, setSearchUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const inputClass = `w-full h-11 rounded-xl border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white `;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getUsers().then((res) => {
      const list = res.data?.data || res.data || [];
      console.log("Ha: ", list);

      const filteredUsers = list.filter((user: any) => {
        const roleName = user.roleID?.roleName || user.role?.name;

        console.log("Hi: ", roleName);

        return roleName !== "Admin" && roleName !== "Manager";
      });

      setUsers(filteredUsers);
    });
  }, []);

  const filteredUsers = users.filter((user) => {
    const keyword = searchUser.toLowerCase();

    return user.fullName?.toLowerCase().includes(keyword);
  });

  const update = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,

      [key]: value,
    }));
  };

  return (
    <div
      className="
rounded-2xl
border
border-stroke
dark:border-gray-700
bg-white
dark:bg-gray-900
p-5
"
    >
      <div
        className="
grid
grid-cols-1
md:grid-cols-5
gap-4
"
      >
        {/* tháng */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Kỳ lương
          </label>

          <select
            className={inputClass}
            value={filters.month}
            onChange={(e) => update("month", Number(e.target.value))}
          >
            {getPayrollMonths(filters.year).map((item) => (
              <option key={item.month} value={item.month}>
                Tháng {item.month} ({item.label})
              </option>
            ))}
          </select>
        </div>

        {/* năm */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Năm
          </label>

          <select
            value={filters.year}
            onChange={(e) => update("year", Number(e.target.value))}
            className={inputClass}
          >
            <option>2026</option>

            <option>2027</option>

            <option>2028</option>

            <option>2029</option>

            <option>2030</option>
          </select>
        </div>

        {/* nhân viên */}
        <div ref={userDropdownRef} className="relative">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nhân viên
          </label>

          <div
            className="
relative
"
          >
            <input
              type="text"
              value={searchUser || selectedUserName}
              onFocus={() => {
                setSearchUser("");
                setShowUserDropdown(true);
              }}
              onChange={(e) => {
                setSearchUser(e.target.value);
                setShowUserDropdown(true);
              }}
              placeholder="Tìm nhân viên..."
              className={inputClass}
            />

            {filters.userId && selectedUserName && !searchUser && (
              <img
                src={
                  users.find((u) => u._id === filters.userId)?.avatarUrl ||
                  "/images/user/default-avatar.png"
                }
                className="
absolute
right-3
top-1/2
-translate-y-1/2
h-6
w-6
rounded-full
object-cover
"
              />
            )}
            <button
              type="button"
              onClick={() => {
                update("userId", "");
                setSelectedUserName("");
                setSearchUser("");
              }}
              className="
absolute
right-10
top-1/2
-translate-y-1/2
text-gray-400
hover:text-red-500
"
            >
              <X size={16} />
            </button>
          </div>

          {showUserDropdown && (
            <div
              className="
absolute
z-50
mt-1
w-full
rounded-xl
border
dark:border-gray-700
bg-white
dark:bg-gray-900
shadow-lg
max-h-60
overflow-y-auto
"
            >
              <div
                onClick={() => {
                  update("userId", "");

                  setSearchUser("");

                  setSelectedUserName("");

                  setShowUserDropdown(false);
                }}
                className="
cursor-pointer
p-2
dark:text-white
hover:bg-gray-100
dark:hover:bg-gray-800
"
              >
                Tất cả nhân viên
              </div>

              {filteredUsers.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    update("userId", user._id);

                    setSelectedUserName(user.fullName);

                    setSearchUser("");

                    setShowUserDropdown(false);
                  }}
                  className="
flex
items-center
gap-2
cursor-pointer
p-2
hover:bg-gray-100
dark:hover:bg-gray-800
"
                >
                  <img
                    src={user.avatarUrl || "/images/user/default-avatar.png"}
                    className="
h-8
w-8
rounded-full
object-cover
"
                  />

                  <span
                    className="
dark:text-white
"
                  >
                    {user.fullName}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sản phẩm
          </label>

          <select
            value={filters.productType}
            onChange={(e) => update("productType", e.target.value)}
            className={inputClass}
          >
            <option value="">Tất cả</option>

            <option value="EasyHRM">EasyHRM</option>

            <option value="iCare">iCare</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onSearch}
            className="
w-full
h-11
rounded-xl

text-dark
dark:text-white
font-medium
transition
hover:opacity-90
active:scale-[0.98]
border
border-dark-300
bg-blue-200
dark:border-gray-600
dark:bg-green-800
dark:text-white
dark:hover:bg-gray-700
"
          >
            Tra cứu
          </button>
        </div>
      </div>
    </div>
  );
}
