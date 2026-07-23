import ReactApexChart from "react-apexcharts";
import { useDashboard } from "../../context/DashboardContext";
import { useTheme } from "../../context/ThemeContext";

export default function ProductDonutChart() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const { monthlyRevenue } = useDashboard();

  const labels = monthlyRevenue.products.map((item) => item._id);

  const series = monthlyRevenue.products.map((item) => item.revenue);

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
        Cơ cấu doanh thu sản phẩm
      </h3>

      <ReactApexChart
        key={`${theme}-${series.join("-")}`}
        type="donut"
        height={290}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
          },

          chart: {
            background: "transparent",
          },

          labels,

          legend: {
            position: "bottom",

            labels: {
              colors: isDark ? "#D1D5DB" : "#4B5563",
            },
          },

          dataLabels: {
            style: {
              colors: [isDark ? "#FFFFFF" : "#111827"],
            },
          },

          stroke: {
            colors: [isDark ? "#111827" : "#FFFFFF"],
          },

          tooltip: {
            theme: isDark ? "dark" : "light",

            y: {
              formatter: (value) =>
                new Intl.NumberFormat("vi-VN").format(value) + " ₫",
            },
          },

          noData: {
            text: "Không có dữ liệu",
          },
        }}
        series={series}
      />
    </div>
  );
}
