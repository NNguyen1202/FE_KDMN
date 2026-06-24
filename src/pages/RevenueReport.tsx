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
    <div className="rounded-xl border bg-white p-5">
      <h2 className="mb-4 text-xl font-bold">
        Báo cáo doanh thu
      </h2>

      <table className="w-full">
        <thead>
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
              <td>
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </td>

              <td>{item.productType}</td>

              <td>{item.sourceType}</td>

              <td>{item.customerCount}</td>

              <td>{item.productQuantity}</td>

              <td>
                {item.revenue.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}