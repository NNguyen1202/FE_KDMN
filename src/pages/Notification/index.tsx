/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo, useState } from "react";

import NotificationSummary from "../../components/notification/NotificationSummary";
import NotificationFilter from "../../components/notification/NotificationFilter";
import NotificationTable from "../../components/notification/NotificationTable";
import NotificationEmpty from "../../components/notification/NotificationEmpty";
import { deleteAllNotifications } from "../../services/notificationService";

import { useNotification } from "../../context/NotificationContext";

export default function NotificationPage() {
  const { notifications, unreadCount, loading, markRead, markReadAll, remove } =
    useNotification();

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("ALL");
  const [module, setModule] = useState("ALL");

  const handleSearch = () => {};

  const handleDeleteAll = async () => {
    if (!window.confirm("Bạn có chắc muốn xóa toàn bộ thông báo?")) return;

    await deleteAllNotifications();
    window.location.reload();
  };

  const filteredData = useMemo(() => {
    return notifications.filter((item: any) => {
      const matchKeyword =
        item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        item.message?.toLowerCase().includes(keyword.toLowerCase()) ||
        item.actorName?.toLowerCase().includes(keyword.toLowerCase());

      const matchStatus =
        status === "ALL"
          ? true
          : status === "UNREAD"
          ? !item.isRead
          : item.isRead;

      const matchModule = module === "ALL" ? true : item.module === module;

      return matchKeyword && matchStatus && matchModule;
    });
  }, [notifications, keyword, status]);

  return (
    <div className="space-y-6">
      <NotificationSummary total={notifications.length} unread={unreadCount} />

      <NotificationFilter
        keyword={keyword}
        setKeyword={setKeyword}
        status={status}
        setStatus={setStatus}
        module={module}
        setModule={setModule}
        onSearch={handleSearch}
        onReadAll={markReadAll}
        onDeleteAll={handleDeleteAll}
      />

      {filteredData.length === 0 ? (
        <NotificationEmpty />
      ) : (
        <NotificationTable
          data={filteredData}
          loading={loading}
          onRead={markRead}
          onDelete={remove}
        />
      )}
    </div>
  );
}
