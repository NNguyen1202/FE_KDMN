/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDashboard } from "../../context/DashboardContext";
import { useState } from "react";
import EmployeeTargetModal from "../employeeTarget/EmployeeTargetModal";
import {} from "lucide-react";

export default function TopEmployeesTable() {
  const { dashboard } = useDashboard();

  const [openTargetModal, setOpenTargetModal] = useState(false);

  const employees = dashboard?.employeeRevenue || [];

  // Tổng KPI của tất cả nhân viên
  const totalTargetRevenue = employees.reduce(
    (sum: number, item: any) => sum + (item.targetRevenue || 0),
    0,
  );

  // Tổng doanh thu thực tế
  const totalRevenue = employees.reduce(
    (sum: number, item: any) => sum + (item.revenue || 0),
    0,
  );

  // % hoàn thành toàn đội
  const totalPercent =
    totalTargetRevenue > 0 ? (totalRevenue / totalTargetRevenue) * 100 : 0;

  const productColor = (product: string) => {
    switch (product) {
      case "EasyHRM MASS":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";

      case "EasyHRM PROJECT":
        return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300";

      case "iCare DN":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";

      case "iCare HKD":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";

      case "EasyDocs":
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300";

      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const productIcon = (name: string) => {
    switch (name) {
      case "EasyHRM MASS":
        return "👨🏻‍💼";

      case "EasyHRM PROJECT":
        return "🏢";

      case "iCare DN":
        return "🏥";

      case "iCare HKD":
        return "🩺";

      case "EasyDocs":
        return "📄";

      default:
        return "📦";
    }
  };

  const productOrder = [
    "EasyHRM MASS",
    "EasyHRM PROJECT",
    "EasyDocs",
    "iCare DN",
    "iCare HKD",
  ];

  const progressColor = (percent: number) => {
    if (percent >= 100) return "bg-green-600";
    if (percent >= 70) return "bg-blue-500";
    if (percent >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            🏆 Top nhân viên kinh doanh
          </h3>

          <div className="flex items-center gap-4">
            <div className="rounded-xl border bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Tổng KPI dự kiến
              </div>

              <div className="font-bold text-blue-600 dark:text-blue-300">
                {Number(totalTargetRevenue).toLocaleString("vi-VN")}₫
              </div>

              <div className="text-xs text-green-600">
                Đạt {totalPercent.toFixed(1)}%
              </div>
            </div>

            <button
              onClick={() => setOpenTargetModal(true)}
              className="rounded-lg bg-brand-500 transition hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 px-4 py-2 text-white hover:bg-brand-600"
            >
              Quản lý KPI
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr className="border-b border-stroke border-gray-200 dark:border-gray-700">
                <th className="px-5 py-3 text-left text-gray-700 dark:text-gray-300 uppercase tracking-wide text-xs">
                  Nhân viên
                </th>

                <th className="px-5 py-3 text-left text-gray-700 dark:text-gray-300 uppercase tracking-wide text-xs">
                  Sản phẩm
                </th>

                <th className="px-5 py-3 text-center text-gray-700 dark:text-gray-300 uppercase tracking-wide text-xs">
                  Doanh thu
                </th>

                <th className="px-5 py-3 text-center text-gray-700 dark:text-gray-300 uppercase tracking-wide text-xs">
                  KPI
                </th>

                <th className="px-5 py-3 text-center text-gray-700 dark:text-gray-300 uppercase tracking-wide text-xs">
                  Hoàn thành
                </th>

                <th className="px-5 py-3 text-center text-gray-700 dark:text-gray-300 uppercase tracking-wide text-xs">
                  Khách
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((item: any, index: number) => (
                  <tr
                    key={item.user?._id ?? index}
                    className={`border-b transition hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      index === 0 ? "bg-yellow-50 dark:bg-yellow-200/90" : ""
                    }`}
                  >
                    {/* ================== USER ================== */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.user?.avatarUrl ||
                            "/images/user/default-avatar.png"
                          }
                          alt={item.user?.fullName}
                          className="h-11 w-11 rounded-full object-cover"
                        />

                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            {index === 0 && (
                              <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-bold text-yellow-700">
                                🥇 TOP 1
                              </span>
                            )}

                            {index === 1 && (
                              <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-bold text-gray-700">
                                🥈 TOP 2
                              </span>
                            )}

                            {index === 2 && (
                              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
                                🥉 TOP 3
                              </span>
                            )}

                            {index >= 3 && (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                                #{index + 1}
                              </span>
                            )}
                          </div>

                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.user?.fullName}
                          </p>

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* ================== PRODUCTS ================== */}

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {item.products
                          ?.filter((p: any) => p.revenue > 0)
                          .sort(
                            (a: any, b: any) =>
                              productOrder.indexOf(a.productType) -
                              productOrder.indexOf(b.productType),
                          )
                          .map((p: any) => (
                            <span
                              key={p.productType}
                              title={`Doanh thu: ${Number(
                                p.revenue,
                              ).toLocaleString("vi-VN")}₫
Khách hàng: ${p.customers}
Số lượng bán: ${p.quantity}`}
                              className={`rounded-full px-3 py-1 text-xs font-medium ${productColor(
                                p.productType,
                              )}`}
                            >
                              <div className="flex flex-col">
                                <span>
                                  {productIcon(p.productType)} {p.productType}
                                </span>

                                <span className="text-[11px] opacity-80">
                                  {p.quantity} SP • {p.customers} KH
                                </span>

                                <span className="text-[11px] font-semibold">
                                  {Number(p.revenue).toLocaleString("vi-VN")}₫
                                </span>
                              </div>
                            </span>
                          ))}
                      </div>
                    </td>

                    {/* ================== REVENUE ================== */}

                    <td className="px-5 py-4">
                      <div className="text-center font-semibold text-green-600 dark:text-green-400">
                        {Number(item.revenue || 0).toLocaleString("vi-VN")}₫
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className={`h-full rounded-full transition-all ${progressColor(
                            item.percent || 0,
                          )}`}
                          style={{
                            width: `${Math.min(item.percent || 0, 100)}%`,
                          }}
                        />
                      </div>
                    </td>

                    {/* ================== KPI ================== */}

                    <td className="text-center font-semibold text-gray-800 dark:text-gray-200">
                      {item.targetRevenue
                        ? `${Number(item.targetRevenue).toLocaleString(
                            "vi-VN",
                          )}₫`
                        : "-"}
                    </td>

                    {/* ================== PERCENT ================== */}

                    <td className="px-5 py-4 text-center">
                      <span className="font-semibold text-brand-600 dark:text-brand-400">
                        {item.targetRevenue > 0
                          ? `${Number(item.percent || 0).toFixed(1)}%`
                          : "-"}
                      </span>
                    </td>

                    {/* ================== CUSTOMER ================== */}

                    <td className="px-5 py-4 text-center">
                      <span className="rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 font-semibold">
                        {item.customers}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-500 dark:text-gray-400"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EmployeeTargetModal
        isOpen={openTargetModal}
        closeModal={() => setOpenTargetModal(false)}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
}
