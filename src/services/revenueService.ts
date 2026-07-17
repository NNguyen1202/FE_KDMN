/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/axios";

export const createRevenue = (data: any) => {
  return api.post("/sales-record/create", data);
};

export const getDashboard = () => api.get("/sales-record/dashboard");

export const getAllSales = (params?: any) =>
  api.get("/sales-record/all", {
    params,
  });

export const getSalesByUser = (userId: string, month?: number, year?: number) =>
  api.get(`/sales-record/user/${userId}`, {
    params: {
      month,
      year,
    },
  });

export const searchSales = (params: any) =>
  api.get("/sales-record/search", { params });

export const getSalesRecordById = (id: string) => {
  return api.get(`/sales-record/${id}`);
};

export const getCalendarRevenue = (month: number, year: number) => {
  return api.get(`/sales-record/calendar?month=${month}&year=${year}`);
};

export const getRevenueByDay = (date: string) => {
  return api.get(`/sales-record/day?date=${date}`);
};

export const getRangeSummary = (from: string, to: string) =>
  api.get(`/sales-record/range-summary?from=${from}&to=${to}`);

export const getDashboardRevenue = () => api.get("/sales-record/dashboard");

export const updateRevenue = (id: string, data: any) =>
  api.put(`/sales-record/${id}`, data);

export const deleteRevenue = (id: string) => api.delete(`/sales-record/${id}`);
