 /* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  data: any;
}

export default function RevenueRangeSummary({
  data,
}: Props) {
  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Báo cáo khoảng thời gian
      </h3>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Doanh thu EasyHRM
          </div>

          <div className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
            {(data.easyHRMRevenue || 0).toLocaleString()}đ
          </div>
        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Doanh thu EasyDocs
          </div>

          <div className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
            {(data.easyDocsRevenue || 0).toLocaleString()}đ
          </div>
        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Doanh thu iCare
          </div>

          <div className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
            {(data.iCareRevenue || 0).toLocaleString()}đ
          </div>
        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Khách EasyHRM
          </div>

          <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {data.easyHRMCustomers || 0}
          </div>
        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Khách EasyDocs
          </div>

          <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {data.easyDocsCustomers || 0}
          </div>
        </div>


        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Khách iCare
          </div>

          <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {data.iCareCustomers || 0}
          </div>
        </div>
      </div>
    </div>
  );
}