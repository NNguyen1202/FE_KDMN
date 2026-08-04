/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  products: any[];
  summary: any;
}

export default function RevenueSearchProduct({ products, summary }: Props) {
  const maxRevenue = summary.totalRevenue;
  console.log("Max: ", maxRevenue);

  const getPercentColor = (percent: number) => {
    if (percent >= 50) {
      return {
        bar: "bg-green-500",
        text: "text-green-600 dark:text-green-400",
      };
    }

    if (percent >= 30) {
      return {
        bar: "bg-yellow-500",
        text: "text-yellow-600 dark:text-yellow-400",
      };
    }

    if (percent >= 10) {
      return {
        bar: "bg-orange-500",
        text: "text-orange-600 dark:text-orange-400",
      };
    }

    return {
      bar: "bg-red-500",
      text: "text-red-600 dark:text-red-400",
    };
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
p-6
"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg dark:text-white">
          Doanh thu theo sản phẩm
        </h3>

        <span className="text-sm text-gray-500">
          {products.length} sản phẩm
        </span>
      </div>

      <div className="space-y-5">
        {products.map((item) => {
          const percent = (item.revenue / maxRevenue) * 100;
          const color = getPercentColor(percent);
          console.log("Percent: ", percent);

          return (
            <div
              key={item._id}
              className="group"
              title={`${item._id}
Doanh thu: ${item.revenue.toLocaleString()} VNĐ`}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium dark:text-white">{item._id}</span>

                <span className="font-semibold text-primary dark:text-white">
                  {item.revenue.toLocaleString()}
                </span>
              </div>
              <div className={`text-xs font-medium ${color.text}`}>
                {percent.toFixed(1)}%
              </div>
              <div
                className="
    h-2
    rounded-full
    bg-gray-200
    dark:bg-gray-700
    overflow-hidden
  "
              >
                <div
                  className={`
      h-full
      rounded-full
      transition-all
      duration-700
      ${color.bar}
    `}
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
