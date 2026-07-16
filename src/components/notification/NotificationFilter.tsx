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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm theo tiêu đề hoặc nội dung..."
          className="h-11 w-72 rounded-lg border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
        />

        {/* Module */}
        <select
          value={module}
          onChange={(e) => setModule(e.target.value)}
          className="h-11 rounded-lg border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
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
          className="h-11 rounded-lg border border-gray-300 px-4 dark:border-gray-700 dark:bg-gray-900"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="false">Chưa đọc</option>
          <option value="true">Đã đọc</option>
        </select>

        {/* Search */}
        <button
          onClick={onSearch}
          className="rounded-lg bg-brand-500 px-5 py-2.5 text-white hover:bg-brand-600"
        >
          Tìm kiếm
        </button>

        <div className="ml-auto flex gap-3">
          <button
            onClick={onReadAll}
            className="rounded-lg border border-blue-500 px-4 py-2 text-blue-600 hover:bg-blue-50"
          >
            Đọc tất cả
          </button>

          <button
            onClick={onDeleteAll}
            className="rounded-lg border border-red-500 px-4 py-2 text-red-600 hover:bg-red-50"
          >
            Xóa tất cả
          </button>
        </div>
      </div>
    </div>
  );
}