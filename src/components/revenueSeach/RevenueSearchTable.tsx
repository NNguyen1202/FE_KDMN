/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  records: any[];

  loading: boolean;
}

export default function RevenueSearchTable({ records, loading }: Props) {
  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("vi-VN");
  };
  if (loading) {
    return (
      <div className=" rounded-xl bg-white dark:bg-gray-900 p-5 dark:text-white ">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className=" overflow-x-auto rounded-2xl border border-stroke dark:border-gray-700 bg-white dark:bg-gray-900 ">
      <table className="w-full">
        <thead>
          <tr className=" bg-gray-100 dark:bg-gray-800 dark:text-gray-200 ">
            <th className="p-4 text-center">Nhân viên</th>

            <th className="p-4 text-center">Sản phẩm</th>

            <th className="p-4 text-center">Doanh thu</th>

            <th className="p-4 text-center">Ngày</th>

            <th className="p-4 text-center">Ghi chú</th>
          </tr>
        </thead>

        <tbody>
          {records?.map((item, index) => (
            <tr
              key={index}
              className=" border-t transition dark:border-gray-700 dark:text-gray-200 "
            >
              <td className="px-5">
                <div className="flex items-center gap-2 px-10">
                  <img
                    src={
                      item.userId?.avatarUrl ||
                      "/images/user/default-avatar.png"
                    }
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.userId?.fullName || "-"}
                  </p>
                </div>
              </td>

              <td className="p-5 text-center">{item.productType}</td>

              <td className="p-5 text-center">
                {item.revenue?.toLocaleString()}
              </td>

              <td className="p-5 text-center">{formatDate(item.reportDate)}</td>

              <td className="px-4 py-3 max-w-lg text-center">
                <div className="line-clamp-5 break-words" title={item.note}>
                  {item.note || "-"}
                </div>
              </td>
            </tr>
          ))}

          {!records?.length && (
            <tr>
              <td
                colSpan={4}
                className="
p-5
text-center
dark:text-gray-400
"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
