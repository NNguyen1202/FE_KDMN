import ReactApexChart from "react-apexcharts";
import { useDashboard } from "../../context/DashboardContext";

export default function ProductDonutChart() {
  const { monthlyRevenue } = useDashboard();

  const labels = monthlyRevenue.products.map((item) => item._id);

  const series = monthlyRevenue.products.map((item) => item.revenue);

  return (
    <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
      <h3 className="mb-5 text-lg font-semibold">Cơ cấu doanh thu sản phẩm</h3>

      <ReactApexChart
        key={series.join("-")}
        type="donut"
        height={290}
        options={{
          labels,

          legend: {
            position: "bottom",
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
        }}
        series={series}
      />
    </div>
  );
}
