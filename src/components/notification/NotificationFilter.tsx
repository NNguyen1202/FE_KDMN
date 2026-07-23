import { Search, CheckCheck, Trash2 } from "lucide-react";

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;

  module: string;
  setModule: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onSearch: () => void;
  onReadAll: () => void;
  onDeleteAll: () => void;
};

export default function NotificationFilter({
  keyword,
  setKeyword,
  module,
  setModule,
  status,
  setStatus,
  onSearch,
  onReadAll,
  onDeleteAll,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm tiêu đề hoặc nội dung..."
            className="h-11 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        {/* Module */}
        <select
          value={module}
          onChange={(e) => setModule(e.target.value)}
          className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Tất cả Module</option>
          <option value="USER">User</option>
          <option value="ROLE">Role</option>
          <option value="SALES_RECORD">Doanh thu</option>
          <option value="AGENCY">Cơ quan BHXH</option>
          <option value="PROVINCE">Tỉnh / Thành</option>
          <option value="MANAGEMENT_AREA">Xã / Phường</option>
          <option value="AGENCY_CONTACT">Liên hệ</option>
          <option value="ONLINE_REGISTRATION">Đăng ký Online</option>
          <option value="PAYMENT_ACCOUNT">Tài khoản</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-lg border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="false">Chưa đọc</option>
          <option value="true">Đã đọc</option>
        </select>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="flex h-11 items-center gap-2 rounded-lg bg-brand-500 px-5 text-white transition hover:bg-brand-600"
        >
          <Search size={18} />
          Tìm kiếm
        </button>

        <div className="ml-auto flex flex-wrap gap-3">
          <button
            onClick={onReadAll}
            className="flex h-11 items-center gap-2 rounded-lg border border-blue-500 px-4 text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-500/10"
          >
            <CheckCheck size={18} />
            Đọc tất cả
          </button>

          <button
            onClick={onDeleteAll}
            className="flex h-11 items-center gap-2 rounded-lg border border-red-500 px-4 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <Trash2 size={18} />
            Xóa tất cả
          </button>
        </div>
      </div>
    </div>
  );
}
