/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useContext, useEffect, useState } from "react";

import {
  getDashboard,
  getMonthlyRevenue,
  getYearRevenue,
} from "../services/dashboardService";

interface ProductRevenue {
  _id: string;
  customers: number;
  revenue: number;
}

interface RevenueSummary {
  month: number;
  year: number;
  totalRevenue: number;
  products: ProductRevenue[];
  sourceCustomers: SourceCustomer[];
}

interface SourceCustomer {
  _id: {
    sourceType: string;
    productType: string;
  };
  customers: number;
  revenue: number;
  quantity: number;
  records: number;
}

interface EmployeeProduct {
  productType: string;
  quantity: number;
  revenue: number;
  customers: number;
}

interface EmployeeRevenue {
  _id: string;

  revenue: number;
  customers: number;
  quantity: number;

  user: {
    _id: string;
    fullName: string;
    email: string;
    avatarUrl: string;
  };

  products: EmployeeProduct[];

  // KPI
  targetRevenue?: number;

  // %
  percent?: number;
}

interface EmployeeTarget {
  _id: string;
  userId: string;
  month: number;
  year: number;
  targetRevenue: number;
}

interface DashboardData {
  summary: any;

  monthlyRevenue: any[];

  productRevenue: any[];

  employeeRevenue: EmployeeRevenue[];
}

interface DashboardContextType {
  dashboard: DashboardData | null;

  month: number;
  year: number;

  setMonth: (month: number) => void;
  setYear: (year: number) => void;

  monthlyRevenue: RevenueSummary;

  revenueYear: number;
  setRevenueYear: (year: number) => void;

  yearRevenue: RevenueSummary;

  employeeTargets: EmployeeTarget[];

  reloadDashboard: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType,
);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const today = new Date();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [employeeTargets, setEmployeeTargets] = useState<EmployeeTarget[]>([]);

  const [month, setMonth] = useState(today.getMonth() + 1);

  const [year, setYear] = useState(today.getFullYear());

  const [revenueYear, setRevenueYear] = useState(today.getFullYear());

  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueSummary>({
    month,
    year,
    totalRevenue: 0,
    products: [],
    sourceCustomers: [],
  });

  const [yearRevenue, setYearRevenue] = useState<RevenueSummary>({
    month: 0,
    year: revenueYear,
    totalRevenue: 0,
    products: [],
    sourceCustomers: [],
  });

  useEffect(() => {
    loadDashboard();
  }, [month, year]);

  useEffect(() => {
    loadYearRevenue();
  }, [revenueYear]);

  const loadDashboard = async () => {
    try {
      const dashboardData = await getDashboard(month, year);

      setDashboard(dashboardData);

      setEmployeeTargets(dashboardData.employeeTargets || []);

      const revenue = await getMonthlyRevenue(month, year);

      setMonthlyRevenue(revenue);
    } catch (error) {
      console.error(error);
    }
  };

  const loadYearRevenue = async () => {
    try {
      const revenue = await getYearRevenue(revenueYear);

      setYearRevenue(revenue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        dashboard,

        month,
        year,

        setMonth,
        setYear,

        monthlyRevenue,

        revenueYear,
        setRevenueYear,

        yearRevenue,

        employeeTargets,

        reloadDashboard: loadDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
