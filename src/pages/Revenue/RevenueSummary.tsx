/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  summary: any;
}

export default function RevenueSummary({ summary }: Props) {
  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm">Doanh thu</div>

        <div className="mt-2 text-2xl font-bold">
          {(summary.totalRevenue || 0).toLocaleString()}đ
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm">Khách hàng</div>

        <div className="mt-2 text-2xl font-bold">{summary.totalCustomers}</div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm">Sản phẩm</div>

        <div className="mt-2 text-2xl font-bold">{summary.totalProducts}</div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm">Giao dịch</div>

        <div className="mt-2 text-2xl font-bold">{summary.totalRecords}</div>
      </div>
    </div>
  );
}
