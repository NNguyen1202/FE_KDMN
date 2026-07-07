/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";

import { toast } from "react-toastify";

import RevenueTable from "./RevenueTable";
import RevenueSummary from "./RevenueSummary";
import RevenueModal from "./RevenueModal";

import { useModal } from "../../hooks/useModal";

import { getAllSales, deleteRevenue } from "../../services/revenueService";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PageMeta from "../../components/common/PageMeta";

export default function RevenueListView() {
  const [records, setRecords] = useState<any[]>([]);

  const [summary, setSummary] = useState<any>({});

  const { isOpen, openModal, closeModal } = useModal();

  const [editingRecord, setEditingRecord] = useState<any>(null);

  const today = new Date();

  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);

  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [fromDate, setFromDate] = useState(firstDay);

  const [toDate, setToDate] = useState(lastDay);

  const loadData = useCallback(async () => {
    try {
      const res = await getAllSales({
        fromDate: fromDate.toISOString().split("T")[0],
        toDate: toDate.toISOString().split("T")[0],
      });

      setRecords(res.data.records || []);
      setSummary(res.data.summary || {});
    } catch (err) {
      console.error(err);
      toast.error("Không tải được dữ liệu");
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    openModal();
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa bản ghi này?")) return;

    try {
      await deleteRevenue(id);

      toast.success("Đã xóa thành công");

      loadData();
    } catch {
      toast.error("Xóa thất bại");
    }
  };

  return (
    <>
      <PageMeta
        title="KDMN Revenue List View"
        description="Revenue List View"
      />
      <div className="space-y-6">
        {/* Header */}
        <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Danh sách doanh thu
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Quản lý toàn bộ doanh thu đã nhập trong hệ thống
              </p>
            </div>

            <button
              onClick={() => {
                setEditingRecord(null);
                openModal();
              }}
              className="inline-flex items-center justify-center rounded-lg bg-brand-500 px-5 py-3 font-medium text-white transition hover:bg-brand-600"
            >
              + Thêm doanh thu
            </button>
          </div>

          {/* Filter */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
            <div>
              <label className="mb-2 block text-sm font-medium">Từ ngày</label>

              <DatePicker
                selected={fromDate}
                onChange={(date: Date | null) => {
                  if (date) setFromDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                className="w-full rounded-lg border border-stroke px-4 py-2.5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Đến ngày</label>

              <DatePicker
                selected={toDate}
                onChange={(date: Date | null) => {
                  if (date) setToDate(date);
                }}
                dateFormat="dd/MM/yyyy"
                className="w-full rounded-lg border border-stroke px-4 py-2.5"
              />
            </div>

            <div className="flex items-end gap-3 lg:col-span-2">
              {/* <button
              onClick={loadData}
              className="rounded-lg bg-brand-500 px-5 py-2.5 text-white transition hover:bg-brand-600"
            >
              Lọc
            </button> */}

              <button
                onClick={() => {
                  setFromDate(firstDay);
                  setToDate(lastDay);
                }}
                className="rounded-lg border border-stroke px-5 py-2.5 hover:bg-gray-50"
              >
                Đặt lại
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
          <RevenueSummary
            summary={summary}
            title="Tổng doanh thu"
            totalRevenue={0}
            products={[]}
          />

          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Tổng khách hàng</p>

            <h2 className="mt-3 text-3xl font-bold text-blue-600">
              {summary?.totalCustomers || 0}
            </h2>
          </div>

          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Tổng sản phẩm</p>

            <h2 className="mt-3 text-3xl font-bold text-green-600">
              {summary?.totalProducts || 0}
            </h2>
          </div>

          <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Tổng bản ghi</p>

            <h2 className="mt-3 text-3xl font-bold text-orange-500">
              {records.length}
            </h2>
          </div>
        </div>

        {/* Table */}
        <RevenueTable
          records={records}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <RevenueModal
          isOpen={isOpen}
          closeModal={() => {
            setEditingRecord(null);
            closeModal();
          }}
          reportDate={new Date().toISOString().split("T")[0]}
          record={editingRecord}
          onSuccess={loadData}
        />
      </div>
    </>
  );
}
