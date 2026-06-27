/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDashboard } from "../../context/DashboardContext";

export default function TopEmployeesTable() {
  const { dashboard } = useDashboard();

  const employees = dashboard?.employeeRevenue || [];

  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm">
      <div className="border-b border-stroke px-6 py-4">
        <h3 className="text-lg font-semibold">Top nhân viên</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stroke">
              <th className="px-5 py-3 text-left">Nhân viên</th>

              <th className="px-5 py-3 text-center">Doanh thu</th>

              <th className="px-5 py-3 text-center">Khách hàng</th>

              <th className="px-5 py-3 text-center">Sản phẩm</th>
            </tr>
          </thead>

          <tbody>
            {employees.length > 0 ? (
              employees.map((item: any) => (
                <tr
                  key={item._id}
                  className="border-b border-stroke hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.user?.avatarUrl}
                        alt={item.user?.fullName}
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="font-medium text-dark">
                          {item.user?.fullName}
                        </p>

                        <p className="text-sm text-gray-500">
                          {item.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center font-semibold text-success-600">
                    {Number(item.revenue || 0).toLocaleString("vi-VN")}₫
                  </td>

                  <td className="px-5 py-4 text-center">
                    {item.customers || 0}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {item.quantity || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
