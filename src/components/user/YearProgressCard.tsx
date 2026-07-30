interface Props {
  totalRevenue: number;
  targetRevenue: number;
}

const formatMoney = (value: number) =>
  value.toLocaleString("vi-VN") + "đ";

export default function YearProgressCard({
  totalRevenue,
  targetRevenue,
}: Props) {
  const percent =
    targetRevenue === 0
      ? 0
      : Math.min((totalRevenue / targetRevenue) * 100, 100);

  const remain = Math.max(
    targetRevenue - totalRevenue,
    0
  );

  return (
    <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tiến độ KPI năm
          </h3>

          <p className="text-sm text-gray-500">
            Theo doanh thu năm hiện tại
          </p>
        </div>

        <span className="text-2xl font-bold text-brand-500">
          {percent.toFixed(1)}%
        </span>

      </div>

      <div className="mb-6 h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full rounded-full bg-brand-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">

        <Item
          title="Doanh thu"
          value={formatMoney(totalRevenue)}
          color="text-green-600"
        />

        <Item
          title="KPI năm"
          value={formatMoney(targetRevenue)}
          color="text-blue-600"
        />

        <Item
          title="Còn thiếu"
          value={formatMoney(remain)}
          color="text-orange-500"
        />

      </div>

    </div>
  );
}

function Item({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-800">
      <p className="text-sm text-gray-500">{title}</p>

      <h3 className={`mt-2 text-lg font-bold ${color}`}>
        {value}
      </h3>
    </div>
  );
}