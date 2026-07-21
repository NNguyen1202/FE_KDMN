/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/axios";

const API = "/employee-target";

/**
 * Lấy KPI theo tháng
 */
export const getEmployeeTargets = (month: number, year: number) => {
  return api.get(`${API}/all`, {
    params: {
      month,
      year,
    },
  });
};

/**
 * Lấy KPI của 1 nhân viên
 */
export const getEmployeeTargetByUser = (
  userId: string,
  month: number,
  year: number,
) => {
  return api.get(`${API}/user/${userId}`, {
    params: {
      month,
      year,
    },
  });
};

/**
 * Lưu nhiều KPI cùng lúc
 */
export const saveEmployeeTargets = (data: {
  month: number;
  year: number;
  targets: {
    userId: string;
    targetRevenue: number;
  }[];
}) => {
  return api.post(`${API}/bulk`, data);
};

/**
 * Tạo 1 KPI
 */
export const createEmployeeTarget = (data: any) => {
  return api.post(`${API}/create`, data);
};

/**
 * Cập nhật KPI
 */
export const updateEmployeeTarget = (id: string, data: any) => {
  return api.put(`${API}/${id}`, data);
};

/**
 * Chi tiết KPI
 */
export const getEmployeeTarget = (id: string) => {
  return api.get(`${API}/${id}`);
};

/**
 * Xóa KPI
 */
export const deleteEmployeeTarget = (id: string) => {
  return api.delete(`${API}/${id}`);
};
