/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  records: any[];
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

export default function RevenueTable({ records }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stroke bg-white">
      <div className="border-b border-stroke px-6 py-4">
        <h3 className="font-semibold">Danh sách doanh thu</h3>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-center">Nhân viên</th>

            <th className="p-3 text-center">Sản phẩm</th>

            <th className="p-3 text-center">Nguồn</th>

            <th className="p-3 text-center">Khách</th>

            <th className="p-3 text-center">SL</th>

            <th className="p-3 text-center">Doanh thu</th>

            <th className="p-3 text-center">Ngày</th>
          </tr>
        </thead>

        <tbody>
          {records.map((item: any) => (
            <tr key={item._id} className="border-b">
              <td className="p-3 text-center">{item.userId?.fullName}</td>

              <td className="p-3 text-center">{item.productType}</td>

              <td className="p-3 text-center">{item.sourceType}</td>

              <td className="p-3 text-center">{item.customerCount}</td>

              <td className="p-3 text-center">{item.productQuantity}</td>

              <td className="p-3 text-center">{item.revenue}đ</td>

              <td className="p-3 text-center">{formatDate(item.reportDate.toLocaleString())}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
