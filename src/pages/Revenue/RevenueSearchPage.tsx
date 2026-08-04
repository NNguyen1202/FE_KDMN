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
    try {
      setLoading(true);

      const period = getPayrollPeriod(filters.month, filters.year);

      let searchUserId;

      const roleName = user?.roleID?.name || user?.role?.name;

      /**
       * Sales chỉ được xem doanh thu của chính mình
       */
      if (roleName === "Sales" || roleName === "Nhân viên kinh doanh") {
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

      console.log("SEARCH PARAMS", params);

      const res = await searchRevenueByPeriod(params);

      console.log("SEARCH RESULT", res.data);

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
    handleSearch();
  }, []);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user") || "null");
        console.log("Người dùng hiện tại: ", currentUser);

        if (!currentUser?._id) return;

        // Lấy user đầy đủ
        const userRes = await getUserById(currentUser._id);
        console.log("Người dùng lấy ID hiện tại: ", userRes);
        const user = userRes.data.getUser;

        setCurrentUser(user);

        if (!user?.roleID) return;
      } catch (err) {
        console.error(err);
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
