/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  data: any;
}

export default function RevenueRangeSummary({ data }: Props) {
  const totalRevenue = data.totalRevenue || 1;

  const cards = [
    {
      title: "EasyHRM",
      icon: "👨🏻‍💼",
      revenue: data.easyHRMRevenue || 0,
      customers: data.easyHRMCustomers || 0,
      color: "blue",
    },
    {
      title: "EasyDocs",
      icon: "📄",
      revenue: data.easyDocsRevenue || 0,
      customers: data.easyDocsCustomers || 0,
      color: "green",
    },
    {
      title: "iCare",
      icon: "🏥",
      revenue: data.iCareRevenue || 0,
      customers: data.iCareCustomers || 0,
      color: "orange",
    },
  ];

  const colorClass = (color: string) => {
    switch (color) {
      case "blue":
        return {
          border: "border-blue-200 dark:border-blue-800",
          bg: "bg-blue-50 dark:bg-blue-950/30",
          text: "text-blue-600 dark:text-blue-400",
          progress: "bg-blue-500",
        };

      case "green":
        return {
          border: "border-green-200 dark:border-green-800",
          bg: "bg-green-50 dark:bg-green-950/30",
          text: "text-green-600 dark:text-green-400",
          progress: "bg-green-500",
        };

      default:
        return {
          border: "border-orange-200 dark:border-orange-800",
          bg: "bg-orange-50 dark:bg-orange-950/30",
          text: "text-orange-600 dark:text-orange-400",
          progress: "bg-orange-500",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-600 p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-sm opacity-80">
              📊 Báo cáo khoảng thời gian
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              {Number(data.totalRevenue || 0).toLocaleString("vi-VN")}đ
            </h2>

            <p className="mt-2 text-sm opacity-80">
              Tổng doanh thu
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-sm opacity-80">
                Khách hàng
              </p>

              <h3 className="text-3xl font-bold">
                {data.totalCustomers || 0}
              </h3>
            </div>

            <div>
              <p className="text-sm opacity-80">
                Sản phẩm
              </p>

              <h3 className="text-3xl font-bold">
                {data.totalProducts || 0}
              </h3>
            </div>

            <div>
              <p className="text-sm opacity-80">
                Bản ghi
              </p>

              <h3 className="text-3xl font-bold">
                {data.totalRecords || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Product */}

      <div className="grid gap-5 lg:grid-cols-3">
        {cards.map((card) => {
          const percent = Math.round(
            (card.revenue / totalRevenue) * 100,
          );

          const style = colorClass(card.color);

          return (
            <div
              key={card.title}
              className={`rounded-2xl border ${style.border} ${style.bg} p-6 transition-all hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm font-semibold ${style.text}`}>
                    {card.icon} {card.title}
                  </p>

                  <h2 className={`mt-3 text-3xl font-bold ${style.text}`}>
                    {Number(card.revenue).toLocaleString("vi-VN")}đ
                  </h2>

                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">
                      👥 {card.customers} khách
                    </span>

                    <span className={`font-semibold ${style.text}`}>
                      {percent}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-full rounded-full ${style.progress}`}
                      style={{
                        width: `${percent}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    Chiếm {percent}% tổng doanh thu
                  </p>
                </div>

                <div className="text-5xl">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}