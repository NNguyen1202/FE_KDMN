export default function NotificationEmpty() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center dark:border-gray-700 dark:bg-white/[0.03]">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <svg
          className="h-8 w-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.4-1.4A2 2 0 0118 14.17V11a6 6 0 10-12 0v3.17c0 .53-.21 1.04-.59 1.43L4 17h5m6 0a3 3 0 11-6 0"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Chưa có thông báo
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Hiện tại hệ thống chưa có thông báo nào.
      </p>
    </div>
  );
}