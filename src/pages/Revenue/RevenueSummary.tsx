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
    <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-brand-500">
            {formatCurrency(summary.totalRevenue || 0)}
          </h2>
        </div>

        {children}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summary?.products?.map((item: ProductRevenue) => (
          <div
            key={item.productType}
            className="rounded-xl border border-gray-200 p-4"
          >
            <p className="font-semibold">{item.productType}</p>

            <div className="mt-4">
              <p className="text-xs text-gray-500">Khách hàng</p>

              <p className="text-xl font-semibold">{item.customers}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500">Doanh thu</p>

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
