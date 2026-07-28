/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  getRangeSummary,
  getRevenueByDay,
  deleteRevenue,
} from "../../services/revenueService";

import { useNavigate } from "react-router";

import RevenueTable from "./RevenueTable";
import RevenueRangeSummary from "./RevenueRangeSummary";
import RevenueSummary from "./RevenueSummary";
import { useModal } from "../../hooks/useModal";
import RevenueModal from "./RevenueModal";
import PageMeta from "../../components/common/PageMeta";
import { formatLocalDate } from "../../utils/formatLocalDate";

export default function RevenueDayDetail() {
  const { date } = useParams();

  const [records, setRecords] = useState([]);

  const [summary, setSummary] = useState<any>({});

  const currentDate = date ?? "";

  const firstDayOfMonth = currentDate.substring(0, 8) + "01";

  const [fromDate, setFromDate] = useState(firstDayOfMonth);

  const [toDate, setToDate] = useState(currentDate);

  const [rangeSummary, setRangeSummary] = useState<any>(null);

  const { isOpen, openModal, closeModal } = useModal();

  const [editingRecord, setEditingRecord] = useState<any>(null);

  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await getRevenueByDay(date as string);

      setRecords(res.data.records || []);

      setSummary(res.data.summary || {});
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const loadRangeSummary = async () => {
    const res = await getRangeSummary(fromDate, toDate);

    setRangeSummary(res.data.data);
  };

  const handleView = (record: any) => {
    navigate(`/sales-record/${record._id}`);
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    openModal();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa bản ghi này?")) return;

    try {
      await deleteRevenue(id);

      alert("Đã xóa thành công");

      await loadData(); // load lại danh sách
    } catch (err) {
      alert("Xóa thất bại");
    }
  };

  useEffect(() => {
    const firstDay = currentDate.substring(0, 8) + "01";

    setFromDate(firstDay);
    setToDate(currentDate);

    loadData();
  }, [date]);

  useEffect(() => {
    loadRangeSummary();
  }, [fromDate, toDate]);

  return (
    <>
      <PageMeta
        title="KDMN Revenue Day Detail"
        description="Revenue Day Detail"
      />
      <div className="space-y-5">
        <div
          className="
mb-6
flex
flex-wrap
items-center
justify-between
gap-4
rounded-2xl
border
border-gray-200
bg-white
p-5
shadow-sm
dark:border-gray-700
dark:bg-gray-900
"
        >
          <button
            onClick={() => navigate("/revenue-report")}
            className="
flex
items-center
gap-2
rounded-lg
border
border-gray-300
bg-white
px-4
py-2
transition
hover:bg-gray-50
dark:border-gray-600
dark:bg-gray-800
dark:text-white
dark:hover:bg-gray-700
"
          >
            ← Quay lại
          </button>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Báo cáo doanh thu ngày {formatDate(date!)}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
          {/* Bộ lọc */}
          <div className="xl:col-span-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  📅 Báo cáo khoảng thời gian
                </h3>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Chọn khoảng thời gian để xem thống kê doanh thu
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Từ ngày
                </label>

                <DatePicker
                  selected={fromDate ? new Date(fromDate) : null}
                  onChange={(date: Date | null) =>
                    setFromDate(date ? formatLocalDate(date) : "")
                  }
                  dateFormat="dd/MM/yyyy"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Đến ngày
                </label>

                <DatePicker
                  selected={toDate ? new Date(toDate) : null}
                  onChange={(date: Date | null) =>
                    setToDate(date ? formatLocalDate(date) : "")
                  }
                  dateFormat="dd/MM/yyyy"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={loadRangeSummary}
                  className="w-full rounded-lg bg-brand-500 px-5 py-2.5 font-medium text-white transition hover:bg-brand-600"
                >
                  📊 Xem báo cáo
                </button>
              </div>
            </div>
          </div>

          {/* Nút thêm */}
          <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <button
              onClick={() => {
                setEditingRecord(null);
                openModal();
              }}
              className="w-full rounded-xl bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
            >
              + Thêm doanh thu
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <RevenueSummary
            summary={summary}
            title={"Tổng doanh thu ngày"}
            totalRevenue={0}
            products={[]}
          />
          {rangeSummary && <RevenueRangeSummary data={rangeSummary} />}
          <RevenueTable
            records={records}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <RevenueModal
            isOpen={isOpen}
            closeModal={() => {
              setEditingRecord(null);
              closeModal();
            }}
            reportDate={date!}
            record={editingRecord}
            onSuccess={loadData}
          />
        </div>
      </div>
    </>
  );
}
