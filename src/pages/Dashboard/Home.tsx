import RevenueCards from "../../components/dashboard/RevenueCards";
import RevenueChart from "../../components/dashboard/RevenueChart";
import ProductDonutChart from "../../components/dashboard/ProductDonutChart";
import EmployeeRevenueChart from "../../components/dashboard/EmployeeRevenueChart";
import TopEmployeesTable from "../../components/dashboard/TopEmployeesTable";
import DashboardFilter from "../../components/dashboard/DashboardFilter";

import {
  DashboardProvider,
  useDashboard,
} from "../../context/DashboardContext";
import PageMeta from "../../components/common/PageMeta";

function DashboardContent() {
  const { month, year, setMonth, setYear, monthlyRevenue } = useDashboard();

  return (
    <>
      <PageMeta title="Dashboard" description="KDMN | Dashboard" />
      <div className="space-y-8">
        {/* ================= THÁNG ================= */}

        <DashboardFilter
          month={month}
          year={year}
          monthlyRevenue={monthlyRevenue}
          setMonth={setMonth}
          setYear={setYear}
        />

        {/* ================= NĂM + KPI ================= */}

        <RevenueCards />

        {/* ================= BIỂU ĐỒ DOANH THU ================= */}

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-8">
            <RevenueChart />
          </div>

          <div className="col-span-12 xl:col-span-4">
            <ProductDonutChart />
          </div>
        </div>

        {/* ================= NHÂN VIÊN ================= */}

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-8">
            <EmployeeRevenueChart />
          </div>

          <div className="col-span-12 xl:col-span-4">
            <TopEmployeesTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
