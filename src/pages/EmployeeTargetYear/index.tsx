import PageMeta from "../../components/common/PageMeta";
import EmployeeTargetYearTable from "../../components/employeeTargetYear/EmployeeTargetYearTable";

export default function EmployeeTargetYearPage() {
  return (
    <>
      <PageMeta title="Doanh thu dự kiến năm" description="Employee Target Year" />

      <div className="space-y-6">
        <EmployeeTargetYearTable />
      </div>
    </>
  );
}
