/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductRevenue {
  productType: string;
  customers: number;
  revenue: number;
}

interface Props {
  title: string;

  totalRevenue: number;

  products: ProductRevenue[];

  children?: React.ReactNode;

  summary: any;
}

export default function RevenueSummary({
  title,

  children,

  summary,
}: Props) {
  return (
    <div
      className="
rounded-2xl
border
border-gray-200
bg-white
p-6
shadow-sm
transition-colors
dark:border-gray-700
dark:bg-gray-900
"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-brand-600 dark:text-brand-400">
            {formatCurrency(summary.totalRevenue || 0)}
          </h2>
        </div>

        {children}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {summary?.products?.map((item: ProductRevenue) => (
          <div
            key={item.productType}
            className="
rounded-2xl
border
border-gray-200
bg-white
p-5
transition-all
duration-200
hover:-translate-y-1
hover:shadow-md
dark:border-gray-700
dark:bg-gray-800
"
          >
            <p className="text-base font-semibold text-gray-900 dark:text-white">
              📦 {item.productType}
            </p>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Khách hàng
              </p>

              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {item.customers}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                Doanh thu
              </p>

              <p className="text-lg font-bold text-green-600">
                {formatCurrency(item.revenue)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
