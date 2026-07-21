import PageMeta from "../../components/common/PageMeta";
import EmployeeTargetTable from "../../components/employeeTarget/EmployeeTargetTable";

export default function EmployeeTargetPage() {
  return (
    <>
      <PageMeta title="Doanh thu dự kiến" description="Employee Target" />

      <div className="space-y-6">
        <EmployeeTargetTable />
      </div>
    </>
  );
}
