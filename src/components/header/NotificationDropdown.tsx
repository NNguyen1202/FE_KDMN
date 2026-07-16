/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useNotification } from "../../context/NotificationContext";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    notifications,
    unreadCount,
    markRead,
    markReadAll,
    remove,
  } = useNotification();

  const notifying = unreadCount > 0;

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={toggleDropdown}
      >
        {notifying && (
          <span className="absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
          </span>
        )}

        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0"
      >
        <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Thông báo
          </h5>

          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markReadAll}
                className="text-sm text-brand-500 hover:underline"
              >
                Đọc tất cả
              </button>
            )}

            <button
              onClick={toggleDropdown}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        <ul className="flex flex-col overflow-y-auto custom-scrollbar">
          {notifications.length === 0 && (
            <li className="py-10 text-center text-gray-500">
              Chưa có thông báo
            </li>
          )}

          {notifications.map((item: any) => (
            <li key={item._id}>
              <DropdownItem
                onItemClick={() => {
                  markRead(item._id);
                  closeDropdown();
                }}
                className={`flex gap-3 rounded-lg border-b border-gray-100 p-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5 ${
                  !item.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-600">
                  {item.actorName?.charAt(0) || "U"}
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </div>

                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {item.message}
                  </div>

                  <div className="mt-2 text-xs text-gray-400">
                    {item.createdAt}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(item._id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </DropdownItem>
            </li>
          ))}
        </ul>

        <Link
          to="/notifications"
          onClick={closeDropdown}
          className="mt-3 block rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Xem tất cả thông báo
        </Link>
      </Dropdown>
    </div>
  );
}