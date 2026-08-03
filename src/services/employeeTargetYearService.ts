/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/axios";

const API = "/employee-target-year";

/**
 * Lấy KPI theo năm
 */
export const getEmployeeTargetYears = (year: number) => {
  return api.get(`${API}/all`, {
    params: {
      year,
    },
  });
};

/**
 * Lấy KPI của 1 nhân viên theo năm
 */
export const getEmployeeTargetYearByUser = (userId: string, year: number) => {
  return api.get(`${API}/user/${userId}`, {
    params: {
      year,
    },
  });
};

/**
 * Lưu nhiều KPI năm cùng lúc
 */
export const saveEmployeeTargetYears = (data: {
  year: number;
  targets: {
    userId: string;
    targetRevenue: number;
  }[];
}) => {
  return api.post(`${API}/bulk`, data);
};

/**
 * Tạo KPI năm
 */
export const createEmployeeTargetYear = (data: any) => {
  return api.post(`${API}/create`, data);
};

/**
 * Cập nhật KPI năm
 */
export const updateEmployeeTargetYear = (id: string, data: any) => {
  return api.put(`${API}/${id}`, data);
};

/**
 * Chi tiết KPI năm
 */
export const getEmployeeTargetYear = (id: string) => {
  return api.get(`${API}/${id}`);
};

/**
 * Xóa KPI năm
 */
export const deleteEmployeeTargetYear = (id: string) => {
  return api.delete(`${API}/${id}`);
};

/**
 * Tìm kiếm KPI năm theo nhân viên
 */
export const searchEmployeeTargetYears = (keyword: string, year?: number) => {
  return api.get(`${API}/search`, {
    params: {
      keyword,
      year,
    },
  });
};
