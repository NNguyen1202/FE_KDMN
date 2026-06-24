/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  getRangeSummary,
  getRevenueByDay,
} from "../../services/revenueService";

import { useNavigate } from "react-router";

import RevenueTable from "./RevenueTable";
import RevenueRangeSummary from "./RevenueRangeSummary";
import RevenueForm from "./RevenueForm";
import RevenueSummary from "./RevenueSummary";
import { useModal } from "../../hooks/useModal";
import RevenueModal from "./RevenueModal";

export default function RevenueDayDetail() {
  const { date } = useParams();

  const [records, setRecords] = useState([]);

  const [summary, setSummary] = useState<any>({});

  const currentDate = date || "";

  const firstDayOfMonth = currentDate.substring(0, 8) + "01";

  const [fromDate, setFromDate] = useState(firstDayOfMonth);

  const [toDate, setToDate] = useState(currentDate);
  const [rangeSummary, setRangeSummary] = useState<any>(null);

  const { isOpen, openModal, closeModal } = useModal();

  const navigate = useNavigate();

  const loadData = async () => {
    const res = await getRevenueByDay(date as string);
    console.log(res);

    setRecords(res.data.records);

    setSummary(res.data.summary);
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

  useEffect(() => {
    loadData();

    loadRangeSummary();
  }, []);

  return (
    <div className="space-y-5">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => navigate("/revenue-report")}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          ← Quay lại
        </button>

        <h1 className="text-2xl font-bold">
          Báo cáo doanh thu ngày {formatDate(date!)}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="xl:col-span-3 rounded-xl border border-stroke bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">
            Báo cáo khoảng thời gian
          </h3>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Từ ngày</label>

              <DatePicker
                selected={fromDate ? new Date(fromDate) : null}
                onChange={(date: Date | null) =>
                  setFromDate(date?.toISOString().split("T")[0] || "")
                }
                dateFormat="dd/MM/yyyy"
                className="
    rounded-lg
    border
    border-stroke
    px-4
    py-2
  "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Đến ngày</label>

              <DatePicker
                selected={toDate ? new Date(toDate) : null}
                onChange={(date: Date | null) =>
                  setToDate(date?.toISOString().split("T")[0] || "")
                }
                dateFormat="dd/MM/yyyy"
                className="
    rounded-lg
    border
    border-stroke
    px-4
    py-2
  "
              />
            </div>

            <button
              onClick={loadRangeSummary}
              className="rounded-lg bg-primary px-5 py-2 text-black"
            >
              Xem báo cáo
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-xl border border-stroke bg-white p-5 shadow-sm">
  <button
    onClick={openModal}
    className="rounded-lg bg-primary px-6 py-3 flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600 hover:bg-opacity-90"
  >
    + Thêm doanh thu
  </button>
</div>
      </div>

      <div className="flex justify-end"></div>

      <div className="space-y-6">
        <RevenueSummary summary={summary} />
        {rangeSummary && <RevenueRangeSummary data={rangeSummary} />}
        <RevenueTable records={records} />
        <RevenueModal
          isOpen={isOpen}
          closeModal={closeModal}
          reportDate={date!}
          onSuccess={loadData}
        />
      </div>
    </div>
  );
}
