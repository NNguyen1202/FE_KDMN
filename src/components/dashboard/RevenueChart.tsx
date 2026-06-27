/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactApexChart from "react-apexcharts";
import { useDashboard } from "../../context/DashboardContext";

export default function RevenueChart() {
  const { dashboard } = useDashboard();

  const monthlyRevenue = dashboard?.monthlyRevenue || [];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenueMap: Record<number, number> = {};

  monthlyRevenue.forEach((item: any) => {
    revenueMap[item._id.month] = item.revenue;
  });

  const seriesData = Array.from(
    { length: 12 },
    (_, index) => revenueMap[index + 1] || 0,
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    dataLabels: {
      enabled: true,
      formatter: (value: number) =>
        value > 0 ? new Intl.NumberFormat("vi-VN").format(value)+ " ₫" : "",
    },

    xaxis: {
      categories: months,
    },

    yaxis: {
      labels: {
        formatter: (value) => `${(value / 1000000).toFixed(1)} triệu`,
      },
    },

    tooltip: {
      y: {
        formatter: (value) =>
          new Intl.NumberFormat("vi-VN").format(value) + " ₫",
      },
    },

    noData: {
      text: "Không có dữ liệu",
    },
  };

  return (
    <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Doanh thu theo tháng</h3>

      <ReactApexChart
        options={options}
        series={[
          {
            name: "Doanh thu",
            data: seriesData,
          },
        ]}
        type="area"
        height={280}
      />
    </div>
  );
}
