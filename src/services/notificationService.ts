import api from "../api/axios";

const URL = "/noti-app";

export const getNotifications = (page = 1, limit = 20) =>
  api.get(URL, {
    params: {
      page,
      limit,
    },
  });

export const getLatestNotifications = () =>
  api.get(`${URL}/latest`);

export const getUnreadCount = () =>
  api.get(`${URL}/unread-count`);

export const readNotification = (id: string) =>
  api.put(`${URL}/read/${id}`);

export const readAllNotifications = () =>
  api.put(`${URL}/read-all`);

export const deleteNotification = (id: string) =>
  api.delete(`${URL}/${id}`);

export const deleteAllNotifications = () =>
  api.delete(`${URL}/all`);