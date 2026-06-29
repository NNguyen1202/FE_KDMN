import api from "../api/axios";

export const getDashboard = async (month: number, year: number) => {
  const res = await api.get(
    `/sales-record/dashboard?month=${month}&year=${year}`,
  );

  return res.data.data;
};

export const getMonthlyRevenue = async (month: number, year: number) => {
  const res = await api.get(`/sales-record/dashboard/monthly-revenue`, {
    params: {
      month,
      year,
    },
  });

  return res.data.data;
};

export const getYearRevenue = async (year: number) => {
  const res = await api.get(`/sales-record/dashboard/year-revenue`, {
    params: {
      year,
    },
  });

  return res.data.data;
};

export const getUserDashboard = async (
  userId: string,
  month: number,
  year: number,
) => {
  const res = await api.get(
    `/sales-record/user/${userId}/dashboard?month=${month}&year=${year}`,
  );

  return res.data.data;
};
