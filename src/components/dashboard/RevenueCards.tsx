/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "../../utils/formatCurrency";
import { useDashboard } from "../../context/DashboardContext";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MegaphoneIcon,
  UserIcon,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

export default function RevenueCards() {
  const { yearRevenue, revenueYear, setRevenueYear } = useDashboard();

  const allProducts = [
    "EasyHRM MASS",
    "EasyHRM PROJECT",
    "EasyDocs",
    "iCare HKD",
    "iCare DN",
  ];

  const getSourceName = (source: string) => {
    switch (source) {
      case "Marketing":
        return "Marketing";
      case "ChuDong":
        return "Chủ động";
      case "CTV_DaiLy":
        return "CTV / Đại lý";
      default:
        return source;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Marketing":
        return <MegaphoneIcon className="h-6 w-6 text-orange-500" />;
      case "ChuDong":
        return <UserIcon className="h-6 w-6 text-green-600" />;
      case "CTV_DaiLy":
        return <UserCheck className="h-6 w-6 text-blue-600" />;
      default:
        return <UserCheck className="h-6 w-6 text-gray-500" />;
    }
  };

  const groupedSources = yearRevenue.sourceCustomers.reduce(
    (acc: Record<string, any[]>, item: any) => {
      const source = item._id.sourceType;

      if (!acc[source]) acc[source] = [];

      acc[source].push(item);

      return acc;
    },
    {},
  );

  Object.keys(groupedSources).forEach((source) => {
    allProducts.forEach((product) => {
      if (
        !groupedSources[source].find((x: any) => x._id.productType === product)
      ) {
        groupedSources[source].push({
          _id: {
            sourceType: source,
            productType: product,
          },
          customers: 0,
          revenue: 0,
        });
      }
    });

    groupedSources[source].sort(
      (a: any, b: any) =>
        allProducts.indexOf(a._id.productType) -
        allProducts.indexOf(b._id.productType),
    );
  });

  const [openSource, setOpenSource] = useState<string>(
    Object.keys(groupedSources)[0] || "",
  );

  const expectedRevenue: number = 2800000000; // <-- Mục tiêu năm, sửa tại FE

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
          {[...(yearRevenue.products || [])]
            .sort((a: any, b: any) => b.revenue - a.revenue)
            .map((item: any) => (
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

        <div className="mt-10">
          <h2 className="mb-5 text-2xl font-bold">Khách hàng theo nguồn</h2>

          <div className="space-y-4">
            {Object.entries(groupedSources).map(([source, products]: any) => {
              const isOpen = openSource === source;

              const totalCustomer = products.reduce(
                (sum: number, p: any) => sum + p.customers,
                0,
              );

              const totalRevenue = products.reduce(
                (sum: number, p: any) => sum + p.revenue,
                0,
              );

              return (
                <div
                  key={source}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <button
                    onClick={() => setOpenSource(isOpen ? "" : source)}
                    className="flex w-full items-center justify-between bg-slate-50 px-6 py-5 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        {getSourceIcon(source)}
                      </div>

                      <div className="text-left">
                        <h3 className="text-lg font-semibold">
                          {getSourceName(source)}
                        </h3>

                        <div className="mt-2 flex gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            👥 {totalCustomer} khách
                          </span>

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            💰 {formatCurrency(totalRevenue)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isOpen ? (
                      <ChevronUpIcon className="h-6 w-6 text-gray-500" />
                    ) : (
                      <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left">Sản phẩm</th>

                            <th className="px-6 py-3 text-center">Khách</th>

                            <th className="px-6 py-3 text-right">Doanh thu</th>
                          </tr>
                        </thead>

                        <tbody>
                          {products.map((item: any) => (
                            <tr
                              key={item._id.productType}
                              className="border-t hover:bg-gray-50"
                            >
                              <td className="px-6 py-4">
                                {item._id.productType}
                              </td>

                              <td className="px-6 py-4 text-center font-semibold text-blue-600">
                                {item.customers}
                              </td>

                              <td className="px-6 py-4 text-right font-semibold text-green-600">
                                {formatCurrency(item.revenue)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
