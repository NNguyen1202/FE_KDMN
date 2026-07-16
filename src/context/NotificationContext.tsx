/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getLatestNotifications,
  getUnreadCount,
  readNotification,
  readAllNotifications,
  deleteNotification,
  deleteAllNotifications,
} from "../services/notificationService";

interface NotificationContextType {
  notifications: any[];
  unreadCount: number;
  loading: boolean;

  reload: () => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markReadAll: () => Promise<void>;
  remove: (id: string) => Promise<void>;
  removeAll: () => Promise<void>;
}

const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const reload = async () => {
  setLoading(true);

  try {
    const latestRes = await getLatestNotifications();

    setNotifications(
      Array.isArray(latestRes.data?.data)
        ? latestRes.data.data
        : []
    );
  } catch (err) {
    console.error("Latest notification:", err);
    setNotifications([]);
  }

  try {
    const unreadRes = await getUnreadCount();

    setUnreadCount(Number(unreadRes.data?.total ?? 0));
  } catch (err) {
    console.error("Unread count:", err);
    setUnreadCount(0);
  }

  setLoading(false);
};

  const markRead = async (id: string) => {
    await readNotification(id);
    reload();
  };

  const markReadAll = async () => {
    await readAllNotifications();
    reload();
  };

  const remove = async (id: string) => {
    await deleteNotification(id);
    reload();
  };

  const removeAll = async () => {
    await deleteAllNotifications();
    reload();
  };

  useEffect(() => {
    reload();

    const timer = setInterval(() => {
      reload();
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  console.log(notifications);
console.log(unreadCount);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,

        reload,
        markRead,
        markReadAll,
        remove,
        removeAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
};