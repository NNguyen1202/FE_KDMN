/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDashboard } from "../../context/DashboardContext";
import { useState } from "react";
import EmployeeTargetModal from "../employeeTarget/EmployeeTargetModal";
import {} from "lucide-react";

export default function TopEmployeesTable() {
  const { dashboard } = useDashboard();

  const [openTargetModal, setOpenTargetModal] = useState(false);

  const employees = dashboard?.employeeRevenue || [];

  const productColor = (product: string) => {
    switch (product) {
      case "EasyHRM MASS":
        return "bg-blue-100 text-blue-700";

      case "EasyHRM PROJECT":
        return "bg-violet-100 text-violet-700";

      case "iCare DN":
        return "bg-green-100 text-green-700";

      case "iCare HKD":
        return "bg-orange-100 text-orange-700";

      case "EasyDocs":
        return "bg-slate-100 text-slate-700";

      default:
        return "bg-gray-100 text-gray-700";
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
      <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-stroke px-6 py-4">
          <h3 className="text-lg font-semibold">🏆 Top nhân viên kinh doanh</h3>
          <button
            onClick={() => setOpenTargetModal(true)}
            className="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600"
          >
            Quản lý KPI
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke">
                <th className="px-5 py-3 text-left">Nhân viên</th>

                <th className="px-5 py-3 text-left">Sản phẩm</th>

                <th className="px-5 py-3 text-center">Doanh thu</th>

                <th className="px-5 py-3 text-center">KPI</th>

                <th className="px-5 py-3 text-center">Hoàn thành</th>

                <th className="px-5 py-3 text-center">Khách</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((item: any, index: number) => (
                  <tr
                    className={`border-b transition hover:bg-gray-50 ${
                      index === 0 ? "bg-yellow-50" : ""
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

                          <p className="font-semibold text-dark">
                            {item.user?.fullName}
                          </p>

                          <p className="text-sm text-gray-500">
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
                      <div className="text-center font-semibold text-green-600">
                        {Number(item.revenue || 0).toLocaleString("vi-VN")}₫
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
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

                    <td className="text-center font-semibold">
                      {item.targetRevenue
                        ? `${Number(item.targetRevenue).toLocaleString(
                            "vi-VN",
                          )}₫`
                        : "-"}
                    </td>

                    {/* ================== PERCENT ================== */}

                    <td className="px-5 py-4 text-center">
                      <span className="font-semibold text-brand-600">
                        {item.targetRevenue > 0
                          ? `${Number(item.percent || 0).toFixed(1)}%`
                          : "-"}
                      </span>
                    </td>

                    {/* ================== CUSTOMER ================== */}

                    <td className="px-5 py-4 text-center">
                      <span className="rounded-lg bg-blue-50 px-3 py-1 font-semibold text-blue-600">
                        {item.customers}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-500">
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
