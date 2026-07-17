/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MegaphoneIcon,
  UserIcon,
  UserCheck,
} from "lucide-react";

interface ProductRevenue {
  _id: string;
  customers: number;
  revenue: number;
}

interface SourceCustomer {
  _id: {
    sourceType: string;
    productType: string;
  };
  customers: number;
  revenue: number;
  quantity: number;
  records: number;
}

interface MonthlyRevenue {
  month: number;
  year: number;
  totalRevenue: number;
  products: ProductRevenue[];
  sourceCustomers: SourceCustomer[];
}

interface DashboardFilterProps {
  month: number;
  year: number;
  monthlyRevenue: MonthlyRevenue;
  setMonth: (m: number) => void;
  setYear: (y: number) => void;
}

export default function DashboardFilter({
  month,
  year,
  monthlyRevenue,
  setMonth,
  setYear,
}: DashboardFilterProps) {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const years = [];

  for (let i = currentYear - 3; i <= currentYear + 1; i++) {
    years.push(i);
  }

  const allProducts = [
    "EasyHRM MASS",
    "EasyHRM PROJECT",
    "EasyDocs",
    "iCare HKD",
    "iCare DN",
  ];

  const groupedSources = monthlyRevenue.sourceCustomers.reduce(
    (acc: Record<string, SourceCustomer[]>, item) => {
      const source = item._id.sourceType;

      if (!acc[source]) {
        acc[source] = [];
      }

      acc[source].push(item);

      return acc;
    },
    {},
  );

  Object.keys(groupedSources).forEach((source) => {
    allProducts.forEach((product) => {
      if (!groupedSources[source].find((x) => x._id.productType === product)) {
        groupedSources[source].push({
          _id: {
            sourceType: source,
            productType: product,
          },
          customers: 0,
          revenue: 0,
          quantity: 0,
          records: 0,
        });
      }
    });

    groupedSources[source].sort(
      (a, b) =>
        allProducts.indexOf(a._id.productType) -
        allProducts.indexOf(b._id.productType),
    );
  });

  const [openSource, setOpenSource] = useState<string>(
    Object.keys(groupedSources)[0] || "",
  );

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Marketing":
        return <MegaphoneIcon className="h-6 w-6 text-orange-500" />;

      case "ChuDong":
        return <UserIcon className="h-6 w-6 text-green-600" />;

      case "CTV_DaiLy":
        return <UserCheck className="h-6 w-6 text-blue-600" />;

      default:
        return <UserCheck className="h-6 w-6 text-gray-500" />;
    }
  };

  const getSourceName = (source: string) => {
    switch (source) {
      case "CTV_DaiLy":
        return "CTV / Đại lý";
      case "ChuDong":
        return "Chủ động";
      case "Marketing":
        return "Marketing";
      default:
        return source;
    }
  };

  return (
    <div className="rounded-2xl border border-stroke bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Tháng</label>

          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="rounded-lg border border-stroke px-3 py-2"
          >
            {months.map((item) => (
              <option key={item} value={item}>
                Tháng {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Năm</label>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="rounded-lg border border-stroke px-3 py-2"
          >
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setMonth(currentMonth);
            setYear(currentYear);
          }}
          className="rounded-lg border border-stroke px-4 py-2 hover:bg-gray-50"
        >
          Tháng hiện tại
        </button>
      </div>
      <div className="mt-6 rounded-2xl border border-brand-200 bg-gradient-to-r from-blue-50 to-white p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Tổng doanh thu tháng {month}/{year}
            </p>

            <h2 className="mt-2 text-4xl font-bold text-brand-500">
              {formatCurrency(monthlyRevenue.totalRevenue)}
            </h2>
          </div>

          <div className="rounded-xl bg-brand-500 px-5 py-3 text-white">
            <p className="text-xs opacity-80">Tổng sản phẩm</p>

            <p className="mt-1 text-3xl font-bold">
              {monthlyRevenue.products.length}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[...(monthlyRevenue.products || [])]
            .sort((a: any, b: any) => b.revenue - a.revenue)
            .map((item: any) => (
              <div
                key={item._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold">{item._id}</h3>

                  <div className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-600">
                    🖤
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Khách hàng
                    </p>

                    <p className="mt-1 text-3xl font-bold text-gray-800">
                      {item.customers}
                    </p>
                  </div>

                  <div className="h-10 w-px bg-gray-200" />

                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Doanh thu
                    </p>

                    <p className="mt-1 text-lg font-bold text-green-600">
                      {formatCurrency(item.revenue)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-5">
          <div className="space-y-5 mt-6">
            {Object.entries(groupedSources).map(([source, products]) => {
              const isOpen = openSource === source;

              const totalCustomer = products.reduce(
                (sum, item) => sum + item.customers,
                0,
              );

              const totalRevenue = products.reduce(
                (sum, item) => sum + item.revenue,
                0,
              );

              return (
                <div
                  key={source}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition"
                >
                  <button
                    onClick={() => setOpenSource(isOpen ? "" : source)}
                    className="flex w-full items-center justify-between bg-slate-50 px-6 py-5 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        {getSourceIcon(source)}
                      </div>

                      <div className="text-left">
                        <h3 className="text-lg font-semibold">
                          {getSourceName(source)}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                            👥 {totalCustomer} khách
                          </span>

                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            💰 {formatCurrency(totalRevenue)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isOpen ? (
                        <ChevronUpIcon className="h-6 w-6 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="h-6 w-6 text-gray-500" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm">
                              Sản phẩm
                            </th>

                            <th className="px-6 py-4 text-center text-sm">
                              Khách hàng
                            </th>

                            <th className="px-6 py-4 text-right text-sm">
                              Doanh thu
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {products.map((item) => (
                            <tr
                              key={item._id.productType}
                              className="border-b last:border-none hover:bg-gray-50"
                            >
                              <td className="px-6 py-4">
                                {item._id.productType}
                              </td>

                              <td className="px-6 py-4 text-center font-semibold text-blue-600">
                                {item.customers}
                              </td>

                              <td className="px-6 py-4 text-right font-semibold text-green-600">
                                {formatCurrency(item.revenue)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
