/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getDashboard } from "../../services/revenueService";

export default function RevenueCards() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getDashboard();
    setData(res.data);
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="rounded-xl border p-5">
        <h3>Tổng doanh thu</h3>
        <p>{data?.totalRevenue?.toLocaleString()} đ</p>
      </div>

      <div className="rounded-xl border p-5">
        <h3>Tổng khách hàng</h3>
        <p>{data?.totalCustomers}</p>
      </div>

      <div className="rounded-xl border p-5">
        <h3>Tổng sản phẩm</h3>
        <p>{data?.totalProducts}</p>
      </div>

      <div className="rounded-xl border p-5">
        <h3>Số bản ghi</h3>
        <p>{data?.totalRecords}</p>
      </div>
    </div>
  );
}