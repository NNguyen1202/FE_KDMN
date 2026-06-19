import Breadcrumb from '../../components/common/PageBreadCrumb';
import BhxhTable from '../../components/tables/BhxhTable'; // Import Bảng vừa làm
import ComponentCard from "../../components/common/ComponentCard";

const BhxhTables = () => {
  return (
    <>
      <Breadcrumb pageTitle="Tra cứu" />

      <div className="flex flex-col gap-10">
        {/* Khối quản lý tra cứu mã cơ quan BHXH 2026 */}
        <div>
          {/* <h4 className="mb-4 text-xl font-bold text-black dark:text-white">
            Danh Mục Mã và Tên Cơ Quan Bảo Hiểm Xã Hội Toàn Diện
          </h4>
          <BhxhTable /> */}
          <ComponentCard title="Danh Mục Mã và Tên Cơ Quan Bảo Hiểm Xã Hội Toàn Diện">
          <BhxhTable />
        </ComponentCard>
        </div>
      </div>
    </>
  );
};

export default BhxhTables;