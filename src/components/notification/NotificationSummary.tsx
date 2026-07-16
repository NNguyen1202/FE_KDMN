type Props = {
  total: number;
  unread: number;
};

export default function NotificationSummary({
  total,
  unread,
}: Props) {
  const read = total - unread;

  const cards = [
    {
      title: "Tổng thông báo",
      value: total,
      color: "text-brand-600",
      bg: "bg-brand-50 dark:bg-brand-500/10",
    },
    {
      title: "Chưa đọc",
      value: unread,
      color: "text-warning-600",
      bg: "bg-warning-50 dark:bg-warning-500/10",
    },
    {
      title: "Đã đọc",
      value: read,
      color: "text-success-600",
      bg: "bg-success-50 dark:bg-success-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div
            className={`inline-flex rounded-xl px-3 py-2 font-semibold ${item.bg} ${item.color}`}
          >
            {item.title}
          </div>

          <div className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}