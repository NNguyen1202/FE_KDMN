/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getAllSales } from "../services/revenueService";

export default function RevenueReport() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getAllSales();
    setData(res.data.data || []);
  };

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
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Báo cáo doanh thu
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th>Ngày</th>
              <th>Sản phẩm</th>
              <th>Nguồn</th>
              <th>Khách</th>
              <th>SL</th>
              <th>Doanh thu</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>

                <td>{item.productType}</td>

                <td>{item.sourceType}</td>

                <td>{item.customerCount}</td>

                <td>{item.productQuantity}</td>

                <td>{item.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
