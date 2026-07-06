/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import AgencyTable from "../../components/bhxh/agency/AgencyTable";
import ProvinceTable from "../../components/bhxh/province/ProvinceTable";
import ManagementAreaTable from "../../components/bhxh/managementArea/ManagementAreaTable";
import AgencyContactTable from "../../components/bhxh/agencyContact/AgencyContactTable";
import OnlineRegistrationTable from "../../components/bhxh/onlineRegistration/OnlineRegistrationTable";
import PaymentAccountTable from "../../components/bhxh/paymentAccount/PaymentAccountTable";

import {
  getAllAgency,
  getAllProvince,
  searchAgency,
  searchProvince,
  getAllManagementArea,
  searchManagementArea,
  getAllAgencyContact,
  searchAgencyContact,
  getAllOnlineRegistration,
  searchOnlineRegistration,
  getAllPaymentAccount,
  searchPaymentAccount,
} from "../../services/bhxhService";

const tabs = [
  {
    key: "agency",
    title: "Cơ quan",
  },
  {
    key: "province",
    title: "Tỉnh / Thành",
  },
  {
    key: "managementArea",
    title: "Xã / Phường",
  },
  {
    key: "agencyContact",
    title: "Liên hệ",
  },
  {
    key: "onlineRegistration",
    title: "Đăng ký Online",
  },
  {
    key: "paymentAccount",
    title: "Tài khoản",
  },
];

export default function BhxhPage() {
  const [activeTab, setActiveTab] = useState("agency");

  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [agencyData, setAgencyData] = useState<any[]>([]);

  const [provinceData, setProvinceData] = useState<any[]>([]);

  const [managementAreaData, setManagementAreaData] = useState<any[]>([]);

  const [agencyContactData, setAgencyContacts] = useState<any[]>([]);

  const [onlineRegistrations, setOnlineRegistrations] = useState<any[]>([]);

  const [paymentAccounts, setPaymentAccounts] = useState<any[]>([]);

  const [searchField, setSearchField] = useState("agencyName");

  const loadAgency = async (search = "") => {
    try {
      setLoading(true);

      const res: any =
        search.trim() === ""
          ? await getAllAgency()
          : await searchAgency({
              field: searchField,
              keyword: search,
            });
            console.log("RES: ", res);
            
      setAgencyData(Array.isArray(res.data) ? res.data : res.data?.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const loadProvince = async (search = "") => {
    try {
      setLoading(true);

      const res: any =
        search.trim() === ""
          ? await getAllProvince()
          : await searchProvince({
              field: searchField,
              keyword: search,
            });

      setProvinceData(
        Array.isArray(res.data) ? res.data : res.data?.data ?? [],
      );
    } finally {
      setLoading(false);
    }
  };

  const loadManagementArea = async (search = "") => {
    try {
      setLoading(true);

      const res: any =
        search.trim() === ""
          ? await getAllManagementArea()
          : await searchManagementArea({
              field: searchField,
              keyword: search,
            });

      setManagementAreaData(
        Array.isArray(res.data) ? res.data : res.data?.data ?? [],
      );
    } finally {
      setLoading(false);
    }
  };

  const loadAgencyContact = async (keyword = "") => {
    try {
      setLoading(true);

      const res: any = keyword
        ? await searchAgencyContact({ keyword })
        : await getAllAgencyContact();

      setAgencyContacts(
        Array.isArray(res.data) ? res.data : res.data?.data ?? [],
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadOnlineRegistration = async (keyword = "") => {
    try {
      setLoading(true);

      const res: any = keyword
        ? await searchOnlineRegistration({ keyword })
        : await getAllOnlineRegistration();

      setOnlineRegistrations(
        Array.isArray(res.data) ? res.data : res.data?.data ?? [],
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPaymentAccount = async (keyword = "") => {
    try {
      setLoading(true);

      const res: any = keyword
        ? await searchPaymentAccount({ keyword })
        : await getAllPaymentAccount();

      setPaymentAccounts(
        Array.isArray(res.data) ? res.data : res.data?.data ?? [],
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCurrentTab = () => {
    switch (activeTab) {
      case "agency":
        loadAgency();
        break;

      case "province":
        loadProvince();
        break;

      case "managementArea":
        loadManagementArea();
        break;

      case "agencyContact":
        loadAgencyContact();
        break;

      case "onlineRegistration":
        loadOnlineRegistration();
        break;

      case "paymentAccount":
        loadPaymentAccount();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setKeyword("");

    switch (activeTab) {
      case "agency":
        setSearchField("agencyName");
        break;

      case "province":
        setSearchField("provinceName");
        break;

      case "managementArea":
        setSearchField("wardName");
        break;

      case "agencyContact":
      case "onlineRegistration":
      case "paymentAccount":
        setSearchField("agencyName");
        break;
    }

    loadCurrentTab();
  }, [activeTab]);

  const handleSearch = () => {
    switch (activeTab) {
      case "agency":
        loadAgency(keyword);
        break;

      case "province":
        loadProvince(keyword);
        break;

      case "managementArea":
        loadManagementArea(keyword);
        break;

      case "agencyContact":
        loadAgencyContact(keyword);
        break;

      case "onlineRegistration":
        loadOnlineRegistration(keyword);
        break;

      case "paymentAccount":
        loadPaymentAccount(keyword);
        break;

      default:
        break;
    }
  };

  const handleRefresh = () => {
    setKeyword("");

    switch (activeTab) {
      case "agency":
        setSearchField("agencyName");
        loadAgency();
        break;

      case "province":
        setSearchField("provinceName");
        loadProvince();
        break;

      case "managementArea":
        setSearchField("wardName");
        loadManagementArea();
        break;

      case "agencyContact":
        loadAgencyContact();
        break;

      case "onlineRegistration":
        loadOnlineRegistration();
        break;

      case "paymentAccount":
        loadPaymentAccount();
        break;

      default:
        break;
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case "agency":
        return searchField === "agencyCode"
          ? "Nhập mã cơ quan..."
          : "Nhập tên cơ quan...";

      case "province":
        return searchField === "provinceCode"
          ? "Nhập mã tỉnh..."
          : "Nhập tên tỉnh...";

      case "managementArea":
        return searchField === "wardCode"
          ? "Nhập mã xã/phường..."
          : "Nhập tên xã/phường...";

      case "agencyContact":
      case "onlineRegistration":
      case "paymentAccount":
        return "Nhập tên cơ quan...";

      default:
        return "Nhập từ khóa...";
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-900">
        <div className="mb-6 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-5 py-2 font-medium transition
                ${
                  activeTab === tab.key
                    ? "bg-brand-500 text-white"
                    : "border hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-3">
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="rounded-lg border px-4 py-2"
          >
            {activeTab === "agency" && (
              <>
                <option value="agencyCode">Mã cơ quan</option>
                <option value="agencyName">Tên cơ quan</option>
              </>
            )}

            {activeTab === "province" && (
              <>
                <option value="provinceCode">Mã tỉnh</option>
                <option value="provinceName">Tên tỉnh</option>
              </>
            )}

            {activeTab === "managementArea" && (
              <>
                <option value="wardCode">Mã xã / Phường</option>
                <option value="wardName">Tên xã / Phường</option>
              </>
            )}

            {(activeTab === "agencyContact" ||
              activeTab === "onlineRegistration" ||
              activeTab === "paymentAccount") && (
              <option value="agencyName">Tên cơ quan</option>
            )}
          </select>

          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-96 rounded-lg border px-4 py-2"
            placeholder={getPlaceholder()}
          />

          <button
            onClick={handleSearch}
            className="rounded-lg bg-brand-500 px-5 py-2 text-white"
          >
            Tìm kiếm
          </button>

          <button
            onClick={handleRefresh}
            className="rounded-lg border px-5 py-2"
          >
            Làm mới
          </button>
        </div>

        {activeTab === "agency" && (
          <AgencyTable
            data={agencyData}
            loading={loading}
            reload={loadAgency}
          />
        )}

        {activeTab === "province" && (
          <ProvinceTable
            data={provinceData}
            loading={loading}
            reload={loadProvince}
          />
        )}

        {activeTab === "managementArea" && (
          <ManagementAreaTable
            data={managementAreaData}
            loading={loading}
            reload={loadManagementArea}
          />
        )}

        {activeTab === "agencyContact" && (
          <AgencyContactTable
            data={agencyContactData}
            loading={loading}
            reload={loadAgencyContact}
          />
        )}

        {activeTab === "onlineRegistration" && (
          <OnlineRegistrationTable
            data={onlineRegistrations}
            loading={loading}
            reload={loadOnlineRegistration}
          />
        )}

        {activeTab === "paymentAccount" && (
          <PaymentAccountTable
            data={paymentAccounts}
            loading={loading}
            reload={loadPaymentAccount}
          />
        )}
      </div>
    </div>
  );
}
