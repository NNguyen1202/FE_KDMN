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

const Calendar: React.FC = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<RevenueEvent[]>([]);

  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    loadRevenueCalendar();
  }, []);

  const loadRevenueCalendar = async () => {
    try {
      const today = new Date();

      const month = today.getMonth() + 1;

      const year = today.getFullYear();

      const res = await getCalendarRevenue(month, year);

      const revenueEvents = res.data.data.map((item: any) => ({
        id: item._id,

        title: item.totalRevenue.toLocaleString() + "đ",

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
    } catch (error) {
      console.error(error);
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
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
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
            dateClick={handleDateClick}
            eventContent={renderRevenueContent}
          />
        </div>
      </div>
    </>
  );
};

const renderRevenueContent = (eventInfo: any) => {
  const { totalRevenue, totalCustomers, totalRecords } =
    eventInfo.event.extendedProps;

  return (
    <div className="rounded-lg bg-green-50 p-2 text-xs">
      <div className="font-semibold text-black">
        {totalRevenue.toLocaleString()}đ
      </div>

      <div className="font-semibold text-black">{totalRecords} giao dịch</div>

      <div className="font-semibold text-black">{totalCustomers} khách</div>
    </div>
  );
};

export default Calendar;
