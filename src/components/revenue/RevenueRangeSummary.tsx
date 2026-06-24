/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  data: any;
}

export default function RevenueRangeSummary({
  data,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm text-gray-500">
          Doanh thu EasyHRM
        </div>

        <div className="mt-2 text-2xl font-bold">
          {(data.easyHRMRevenue || 0).toLocaleString()}đ
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm text-gray-500">
          Doanh thu iCare
        </div>

        <div className="mt-2 text-2xl font-bold">
          {(data.iCareRevenue || 0).toLocaleString()}đ
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm text-gray-500">
          Khách EasyHRM
        </div>

        <div className="mt-2 text-2xl font-bold">
          {data.easyHRMCustomers || 0}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <div className="text-sm text-gray-500">
          Khách iCare
        </div>

        <div className="mt-2 text-2xl font-bold">
          {data.iCareCustomers || 0}
        </div>
      </div>

    </div>
  );
}