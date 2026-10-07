/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import RevenueSearchFilter from "../../components/revenueSeach/RevenueSearchFilter";

import RevenueSearchSummary from "../../components/revenueSeach/RevenueSearchSummary";

import RevenueSearchProduct from "../../components/revenueSeach/RevenueSearchProduct";

import RevenueSearchTable from "../../components/revenueSeach/RevenueSearchTable";

import { searchRevenueByPeriod } from "../../services/revenueService";
import { getUserById } from "../../services/userService";
import { getPayrollPeriod } from "../../utils/revenuePeriod";

export default function RevenueSearchPage() {
  const [user, setCurrentUser] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),

    month: new Date().getMonth() + 1,

    userId: "",

    productType: "",

    sourceType: "",
  });

  const [data, setData] = useState({
    summary: {},

    productRevenue: [],

    records: [],
  });

  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!user) {
      console.log("Chưa có thông tin user, chưa tìm kiếm doanh thu.");
      return;
    }
    try {
      setLoading(true);

      const period = getPayrollPeriod(filters.month, filters.year);

      let searchUserId;

      const role = user?.roleID;

      /**
       * Sales chỉ được xem doanh thu của chính mình
       */
      if (
        role === "6a3a31285b1107c9a166df56" ||
        role === "6a3a31395b1107c9a166df5a"
      ) {
        searchUserId = user?._id;
      } else {
        /**
         * Admin / Manager
         * Có thể chọn nhân viên
         * Không chọn = xem tất cả
         */
        searchUserId = filters.userId || undefined;
      }

      const params = {
        from: period.from,

        to: period.to,

        userId: searchUserId,

        productType: filters.productType || undefined,

        sourceType: filters.sourceType || undefined,
      };

      const res = await searchRevenueByPeriod(params);

      setData(
        res.data?.data ||
          res.data || {
            summary: {},
            productRevenue: [],
            records: [],
          },
      );
    } catch (err) {
      console.error("Search revenue error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoaded || !user) return;

    handleSearch();
  }, [userLoaded, user]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user") || "null");

        if (!currentUser?._id) {
          setUserLoaded(true);
          return;
        }

        const userRes = await getUserById(currentUser._id);

        const fullUser = userRes.data.getUser;

        setCurrentUser(fullUser);
      } catch (err) {
        console.error("Load current user error:", err);
      } finally {
        setUserLoaded(true);
      }
    };

    loadCurrentUser();
  }, []);

  return (
    <div className="space-y-5">
      <RevenueSearchFilter
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        currentUser={user}
      />

      <RevenueSearchSummary summary={data.summary} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        <div className="xl:col-span-9">
          <RevenueSearchTable records={data.records} loading={loading} />
        </div>
        <div className="xl:col-span-3">
          <RevenueSearchProduct
            products={data.productRevenue}
            summary={data.summary}
          />
        </div>
      </div>
    </div>
  );
}
