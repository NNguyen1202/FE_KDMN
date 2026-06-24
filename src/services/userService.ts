/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../api/axios";

export const getUsers = () =>
  api.get("/user/all-users");
export const getUserById = (id: string) =>
  api.get(`/user/${id}`);
export const updateUser = (
  id: string,
  payload: any
) => api.put(`/user/edit-user/${id}`, payload);
export const deleteUser = (id: string) =>
  api.delete(`/user/${id}`);
export const getSalesByUser = (id: string) =>
  api.get(`/sales-record/user/${id}`);
export const getRoleById = (id: string) =>
  api.get(`/role/${id}`);