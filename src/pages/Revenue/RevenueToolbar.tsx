interface Props {
  keyword: string;
  setKeyword: (value: string) => void;

  month: number;
  setMonth: (value: number) => void;

  year: number;
  setYear: (value: number) => void;

  product: string;
  setProduct: (value: string) => void;
}

export default function RevenueToolbar({
  keyword,
  setKeyword,
  month,
  setMonth,
  year,
  setYear,
  product,
  setProduct,
}: Props) {
  const years = [];

  for (let i = 2024; i <= 2035; i++) {
    years.push(i);
  }

  return (
    <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm khách hàng..."
          className="rounded-xl border border-stroke px-4 py-2"
        />

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="rounded-xl border border-stroke px-4 py-2"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
            <option key={item} value={item}>
              Tháng {item}
            </option>
          ))}
        </select>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="rounded-xl border border-stroke px-4 py-2"
        >
          {years.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="rounded-xl border border-stroke px-4 py-2"
        >
          <option value="">Tất cả sản phẩm</option>
          <option>EasyHRM MASS</option>
          <option>EasyHRM PROJECT</option>
          <option>iCare DN</option>
          <option>iCare HKD</option>
        </select>

        <button className="rounded-xl bg-brand-500 py-2 text-white">
          Xuất Excel
        </button>

      </div>

    </div>
  );
}