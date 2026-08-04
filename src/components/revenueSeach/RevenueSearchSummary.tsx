/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DollarSign,
  Users,
  Package,
  FileText,
} from "lucide-react";

interface Props {
  summary: any;
}

export default function RevenueSearchSummary({ summary }: Props) {
  const cards = [
    {
      title: "Tổng doanh thu",
      value: summary?.totalRevenue || 0,
      icon: DollarSign,
      suffix: "VNĐ",
    },
    {
      title: "Khách hàng",
      value: summary?.totalCustomers || 0,
      icon: Users,
    },
    {
      title: "Sản phẩm",
      value: summary?.totalProducts || 0,
      icon: Package,
    },
    {
      title: "Số bản ghi",
      value: summary?.totalRecords || 0,
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
            group
            rounded-2xl
            border
            border-stroke
            dark:border-gray-700
            bg-white
            dark:bg-gray-900
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.title}
              </p>

              <div
                className="
                h-10
                w-10
                rounded-xl
                bg-primary/10
                flex
                items-center
                justify-center
                text-primary
                group-hover:scale-110
                transition
                dark:bg-gray-500
              "
              >
                <Icon size={20} />
              </div>
            </div>

            <h3 className="mt-5 text-2xl font-bold dark:text-white">
              {item.value.toLocaleString()}
            </h3>

            {item.suffix && (
              <p className="mt-1 text-xs text-gray-500">{item.suffix}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}