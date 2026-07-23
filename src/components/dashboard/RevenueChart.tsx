/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactApexChart from "react-apexcharts";
import { useDashboard } from "../../context/DashboardContext";
import { useTheme } from "../../context/ThemeContext";

export default function RevenueChart() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

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
      background: "transparent",

      toolbar: {
        show: false,
      },

      animations: {
        enabled: true,
        speed: 800,
      },
    },

    stroke: {
      curve: "smooth",
      width: 4,
    },

    dataLabels: {
      enabled: true,

      style: {
        colors: [isDark ? "#374151" : "#E5E7EB"],
      },

      formatter: (value: number) =>
        value > 0 ? new Intl.NumberFormat("vi-VN").format(value) + " ₫" : "",
    },

    xaxis: {
      categories: months,

      labels: {
        style: {
          colors: isDark
            ? Array(12).fill("#D1D5DB")
            : Array(12).fill("#6B7280"),
        },
      },

      axisBorder: {
        color: isDark ? "#374151" : "#E5E7EB",
      },

      axisTicks: {
        color: isDark ? "#374151" : "#E5E7EB",
      },
    },

    yaxis: {
      labels: {
        formatter: (value) => `${(value / 1000000).toFixed(1)} triệu`,

        style: {
          colors: isDark ? ["#D1D5DB"] : ["#6B7280"],
        },
      },
    },

    tooltip: {
      y: {
        formatter: (value) =>
          new Intl.NumberFormat("vi-VN").format(value) + " ₫",
      },
    },

    theme: {
      mode: isDark ? "dark" : "light",
    },

    fill: {
      type: "gradient",

      gradient: {
        shade: isDark ? "dark" : "light",

        opacityFrom: 0.55,

        opacityTo: 0.08,
      },
    },

    markers: {
      size: 5,

      hover: {
        size: 8,
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
        Doanh thu theo tháng
      </h3>

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
