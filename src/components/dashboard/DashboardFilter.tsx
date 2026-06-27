/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "../../utils/formatCurrency";

interface ProductRevenue {
  _id: string;
  customers: number;
  revenue: number;
}

interface MonthlyRevenue {
  month: number;
  year: number;
  totalRevenue: number;
  products: ProductRevenue[];
}

interface DashboardFilterProps {
  month: number;
  year: number;
  monthlyRevenue: MonthlyRevenue;
  setMonth: (m: number) => void;
  setYear: (y: number) => void;
}

export default function DashboardFilter({
  month,
  year,
  monthlyRevenue,
  setMonth,
  setYear,
}: DashboardFilterProps) {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const years = [];

  for (let i = currentYear - 3; i <= currentYear + 1; i++) {
    years.push(i);
  }

  return (
    <div className="rounded-2xl border border-stroke bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Tháng</label>

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="rounded-lg border border-stroke px-3 py-2"
          >
            {months.map((item) => (
              <option key={item} value={item}>
                Tháng {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Năm</label>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-lg border border-stroke px-3 py-2"
          >
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setMonth(currentMonth);
            setYear(currentYear);
          }}
          className="rounded-lg border border-stroke px-4 py-2 hover:bg-gray-50"
        >
          Tháng hiện tại
        </button>
      </div>
      <div className="mt-6 rounded-2xl border border-brand-200 bg-gradient-to-r from-blue-50 to-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Tổng doanh thu tháng {month}/{year}
            </p>

            <h2 className="mt-2 text-4xl font-bold text-brand-500">
              {formatCurrency(monthlyRevenue.totalRevenue)}
            </h2>
          </div>

          <div className="rounded-xl bg-brand-500 px-5 py-3 text-white">
            <p className="text-xs opacity-80">Tổng sản phẩm</p>

            <p className="mt-1 text-3xl font-bold">
              {monthlyRevenue.products.length}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {monthlyRevenue.products.map((item: any) => (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{item._id}</h3>

                <div className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600">
                  🖤
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Khách hàng
                  </p>

                  <p className="mt-1 text-3xl font-bold text-gray-800">
                    {item.customers}
                  </p>
                </div>

                <div className="h-10 w-px bg-gray-200" />

                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Doanh thu
                  </p>

                  <p className="mt-1 text-lg font-bold text-green-600">
                    {formatCurrency(item.revenue)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
