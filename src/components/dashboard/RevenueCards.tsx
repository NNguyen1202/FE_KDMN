/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "../../utils/formatCurrency";
import { useDashboard } from "../../context/DashboardContext";

export default function RevenueCards() {
  const { yearRevenue, revenueYear, setRevenueYear } =
    useDashboard();

  const expectedRevenue: number = 2400000000; // <-- Mục tiêu năm, sửa tại FE

  const currentRevenue = yearRevenue.totalRevenue || 0;

  const completedPercent =
    expectedRevenue === 0 ? 0 : (currentRevenue / expectedRevenue) * 100;

  const remainingRevenue = Math.max(expectedRevenue - currentRevenue, 0);

  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 3 + i);

  return (
    <div className="space-y-6">
      {/* ================= DOANH THU NĂM ================= */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-gray-500">Tổng doanh thu năm</p>

            <h2 className="mt-2 text-4xl font-bold text-green-600">
              {formatCurrency(yearRevenue.totalRevenue)}
            </h2>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Chọn năm</label>

            <select
              value={revenueYear}
              onChange={(e) => setRevenueYear(Number(e.target.value))}
              className="rounded-lg border border-stroke px-4 py-2"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {yearRevenue.products.map((item: any) => (
            <div
              key={item._id}
              className="rounded-xl border border-gray-200 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold">{item._id}</h3>

              <div className="mt-6">
                <p className="text-sm text-gray-500">Tổng khách hàng</p>

                <p className="text-3xl font-bold text-gray-800">
                  {item.customers}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-500">Doanh thu</p>

                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(item.revenue)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= KPI ================= */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg">
          <p className="text-sm opacity-90">
            Doanh thu dự kiến năm {revenueYear}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {formatCurrency(expectedRevenue)}
          </h2>

          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm">
              <span>Đã hoàn thành</span>

              <span>{completedPercent.toFixed(2)}%</span>
            </div>

            <div className="h-3 w-full rounded-full bg-white/30">
              <div
                className="h-3 rounded-full bg-white transition-all duration-500"
                style={{
                  width: `${Math.min(completedPercent, 100)}%`,
                }}
              />
            </div>

            <p className="mt-4 text-sm opacity-90">
              Đã đạt {formatCurrency(currentRevenue)}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Còn thiếu để đạt mục tiêu</p>

          <h2 className="mt-3 text-4xl font-bold text-red-500">
            {formatCurrency(remainingRevenue)}
          </h2>

          <p className="mt-5 text-sm text-gray-400">
            {completedPercent >= 100
              ? "Đã hoàn thành mục tiêu 🎉"
              : `${completedPercent.toFixed(2)}% kế hoạch`}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-gray-500">Doanh thu năm hiện tại</p>

          <h2 className="mt-3 text-4xl font-bold text-green-600">
            {formatCurrency(currentRevenue)}
          </h2>

          <p className="mt-5 text-sm text-gray-400">Năm {revenueYear}</p>
        </div>
      </div>
    </div>
  );
}
