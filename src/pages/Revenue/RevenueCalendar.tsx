import { useState } from "react";

import PageMeta from "../../components/common/PageMeta";

import RevenueCalendarView from "./RevenueCalendarView";
import RevenueListView from "./RevenueListView";

const RevenueCalendar = () => {
  const [view, setView] = useState<"calendar" | "list">("calendar");

  return (
    <>
      <PageMeta title="Báo cáo doanh thu" description="Revenue Report" />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Báo cáo doanh thu
        </h2>

        <div
          className="
inline-flex
overflow-hidden
rounded-xl
border
border-gray-200
bg-white
shadow-sm
dark:border-gray-700
dark:bg-gray-900
"
        >
          <button
            onClick={() => setView("calendar")}
            className={`
px-5
py-2.5
font-medium
transition-all
duration-200

${
  view === "calendar"
    ? "bg-brand-500 text-white shadow-md"
    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
}
`}
          >
            📅 Lịch
          </button>

          <button
            onClick={() => setView("list")}
            className={`
px-5
py-2.5
font-medium
transition-all
duration-200

${
  view === "list"
    ? "bg-brand-500 text-white shadow-md"
    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
}
`}
          >
            📋 Danh sách
          </button>
        </div>
      </div>

      <div key={view} className="animate-fade-in">
        {view === "calendar" ? <RevenueCalendarView /> : <RevenueListView />}
      </div>
    </>
  );
};

export default RevenueCalendar;
