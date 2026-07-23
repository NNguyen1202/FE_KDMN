import { Bell, BellRing, CheckCircle2 } from "lucide-react";

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
      icon: Bell,
      color: "text-brand-600",
      bg: "bg-brand-50 dark:bg-brand-500/10",
    },
    {
      title: "Chưa đọc",
      value: unread,
      icon: BellRing,
      color: "text-warning-600",
      bg: "bg-warning-50 dark:bg-warning-500/10",
    },
    {
      title: "Đã đọc",
      value: read,
      icon: CheckCircle2,
      color: "text-success-600",
      bg: "bg-success-50 dark:bg-success-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                  {item.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
              >
                <Icon className={item.color} size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}