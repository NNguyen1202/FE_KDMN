/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactApexChart from "react-apexcharts";
import { useDashboard } from "../../context/DashboardContext";

export default function EmployeeRevenueChart() {
  const { dashboard } = useDashboard();

  const employeeRevenue =
    dashboard?.employeeRevenue || [];

  const categories = employeeRevenue.map(
    (item: any) =>
      item.user?.fullName || "N/A"
  );

  const seriesData = employeeRevenue.map(
    (item: any) => item.revenue || 0
  );

  const options: ApexCharts.ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
      },
    },

    dataLabels: {
      formatter: (val: number) =>
        new Intl.NumberFormat("vi-VN").format(val) +
        " ₫",
    },

    tooltip: {
      y: {
        formatter: (value) =>
          new Intl.NumberFormat("vi-VN").format(value) +
          " ₫",
      },
    },

    xaxis: {
      categories,

      labels: {
        formatter: (value) =>
          `${(
            Number(value) / 1000000
          ).toFixed(1)} triệu`,
      },
    },

    noData: {
      text: "Không có dữ liệu",
    },
  };

  return (
    <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">
        Doanh thu theo nhân viên
      </h3>

      <ReactApexChart
        options={options}
        series={[
          {
            name: "Doanh thu",
            data: seriesData,
          },
        ]}
        type="bar"
        height={250}
      />
    </div>
  );
}