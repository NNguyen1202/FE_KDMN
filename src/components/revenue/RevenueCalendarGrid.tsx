/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
  data: any[];
  month: number;
  year: number;
  onClickDate: (
    date: string
  ) => void;
}

export default function RevenueCalendarGrid({
  data,
  month,
  year,
  onClickDate,
}: Props) {

  const lastDay = new Date(
    year,
    month,
    0
  );

  const daysInMonth =
    lastDay.getDate();

  const dataMap = new Map();

  data.forEach((item) => {
    dataMap.set(item._id, item);
  });

  const cells = [];

  for (
    let i = 1;
    i <= daysInMonth;
    i++
  ) {
    const date = `${year}-${String(
      month
    ).padStart(2, "0")}-${String(
      i
    ).padStart(2, "0")}`;

    const revenue =
      dataMap.get(date);

    cells.push(
      <div
        key={date}
        className="border rounded-lg p-3 h-[140px] cursor-pointer hover:shadow"
        onClick={() =>
          onClickDate(date)
        }
      >
        <div className="font-bold">
          {i}
        </div>

        <div className="mt-3 text-sm">
          {revenue
            ? revenue.totalRevenue.toLocaleString()
            : 0}
          đ
        </div>

        <div className="text-xs mt-2">
          {revenue
            ? revenue.totalRecords
            : 0}{" "}
          giao dịch
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-7 gap-3 mb-3 font-bold">
        <div>T2</div>
        <div>T3</div>
        <div>T4</div>
        <div>T5</div>
        <div>T6</div>
        <div>T7</div>
        <div>CN</div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {cells}
      </div>
    </>
  );
}