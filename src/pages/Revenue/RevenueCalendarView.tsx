/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { EventInput } from "@fullcalendar/core";

import PageMeta from "../../components/common/PageMeta";

import { getCalendarRevenue } from "../../services/revenueService";

interface RevenueEvent extends EventInput {
  extendedProps: {
    totalRevenue: number;
    totalCustomers: number;
    totalProducts: number;
    totalRecords: number;
  };
}

const RevenueCalendarView: React.FC = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<RevenueEvent[]>([]);

  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const today = new Date();

    loadRevenueCalendar(today.getMonth() + 1, today.getFullYear());
  }, []);

  const loadRevenueCalendar = async (month: number, year: number) => {
    try {
      const res = await getCalendarRevenue(month, year);

      const revenueEvents = res.data.data.map((item: any) => ({
        id: item._id,
        title: "",
        start: item._id,
        allDay: true,
        extendedProps: {
          totalRevenue: item.totalRevenue,
          totalCustomers: item.totalCustomers,
          totalProducts: item.totalProducts,
          totalRecords: item.totalRecords,
        },
      }));

      setEvents(revenueEvents);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDateClick = (info: any) => {
    navigate(`/revenue-report/day/${info.dateStr}`);
  };

  return (
    <>
      <PageMeta
        title="KDMN Calendar Dashboard"
        description="This is Calendar Dashboard page for KDMN"
      />
      <div
        className="
overflow-hidden
rounded-2xl
border
border-gray-200
bg-white
shadow-sm
transition-colors
dark:border-gray-700
dark:bg-gray-900
"
      >
        <div className="custom-calendar p-4">
          <FullCalendar
            dayMaxEvents={2}
            nowIndicator
            fixedWeekCount={false}
            stickyHeaderDates
            selectMirror
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height="auto"
            contentHeight={700}
            events={events}
            datesSet={(info) => {
              const d = info.view.currentStart;

              loadRevenueCalendar(d.getMonth() + 1, d.getFullYear());
            }}
            dateClick={handleDateClick}
            eventContent={renderRevenueContent}
          />
        </div>
      </div>
    </>
  );
};

const renderRevenueContent = (eventInfo: any) => {
  const { totalRevenue, totalCustomers } = eventInfo.event.extendedProps;

  return (
    <div
      className="
rounded-lg
border
border-green-200
bg-green-50
p-2
text-xs
transition
dark:border-green-800
dark:bg-green-900/20
"
    >
      <div className="font-semibold text-green-700 dark:text-green-300">
        💰 {Number(totalRevenue).toLocaleString("vi-VN")} ₫
      </div>

      <div className="text-gray-700 dark:text-gray-300">
        👥 {totalCustomers} khách
      </div>
    </div>
  );
};

export default RevenueCalendarView;
