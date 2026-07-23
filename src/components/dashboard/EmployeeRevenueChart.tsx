/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactApexChart from "react-apexcharts";
import { useDashboard } from "../../context/DashboardContext";
import { useTheme } from "../../context/ThemeContext";

export default function EmployeeRevenueChart() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const { dashboard } = useDashboard();

  const employeeRevenue = dashboard?.employeeRevenue || [];

  const categories = employeeRevenue.map(
    (item: any) => item.user?.fullName || "N/A",
  );

  const seriesData = employeeRevenue.map((item: any) => item.revenue || 0);

  const options: ApexCharts.ApexOptions = {
    theme: {
      mode: isDark ? "dark" : "light",
    },

    chart: {
      background: "transparent",

      toolbar: {
        show: false,
      },
    },

    grid: {
      borderColor: isDark ? "#374151" : "#E5E7EB",
      strokeDashArray: 4,
    },

    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
      },
    },

    dataLabels: {
      formatter: (val: number) =>
        new Intl.NumberFormat("vi-VN").format(val) + " ₫",
      style: {
        colors: [isDark ? "#FFFFFF" : "#111827"],
      },
    },

    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: (value) =>
          new Intl.NumberFormat("vi-VN").format(value) + " ₫",
      },
    },

    xaxis: {
      categories,

      labels: {
        formatter: (value) => `${(Number(value) / 1000000).toFixed(1)} triệu`,
        style: {
          colors: isDark
            ? Array(categories.length).fill("#D1D5DB")
            : Array(categories.length).fill("#6B7280"),
        },
      },
    },

    noData: {
      text: "Không có dữ liệu",
    },
  };

  return (
    <div
      className="
rounded-2xl
border
border-gray-200
bg-white
p-5
shadow-sm
transition-colors
dark:border-gray-800
dark:bg-gray-900
"
    >
      <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
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
