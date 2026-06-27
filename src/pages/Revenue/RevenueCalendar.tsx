import { useState } from "react";

import PageMeta from "../../components/common/PageMeta";

import RevenueCalendarView from "./RevenueCalendarView";
import RevenueListView from "./RevenueListView";

const RevenueCalendar = () => {
  const [view, setView] = useState<"calendar" | "list">("calendar");

  return (
    <>
      <PageMeta
        title="Báo cáo doanh thu"
        description="Revenue Report"
      />

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Báo cáo doanh thu
        </h2>

        <div className="flex rounded-lg border overflow-hidden">
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 transition ${
              view === "calendar"
                ? "bg-brand-500 text-white"
                : "bg-white"
            }`}
          >
            📅 Lịch
          </button>

          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 transition ${
              view === "list"
                ? "bg-brand-500 text-white"
                : "bg-white"
            }`}
          >
            📋 Danh sách
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <RevenueCalendarView />
      ) : (
        <RevenueListView />
      )}
    </>
  );
};

export default RevenueCalendar;