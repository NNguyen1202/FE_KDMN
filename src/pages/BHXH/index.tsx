/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import AgencyTable from "../../components/bhxh/agency/AgencyTable";
import ProvinceTable from "../../components/bhxh/province/ProvinceTable";
import ManagementAreaTable from "../../components/bhxh/managementArea/ManagementAreaTable";
import AgencyContactTable from "../../components/bhxh/agencyContact/AgencyContactTable";

import {
  getAllAgency,
  getAllProvince,
  searchAgency,
  searchProvince,
  getAllManagementArea,
  searchManagementArea,
  getAllAgencyContact,
  searchAgencyContact,
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
    title: "Online",
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

  const loadAgency = async () => {
    try {
      setLoading(true);

      const res: any =
        keyword.trim() === ""
          ? await getAllAgency()
          : await searchAgency({ keyword });

      setAgencyData(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const loadProvince = async () => {
    try {
      setLoading(true);

      const res: any =
        keyword.trim() === ""
          ? await getAllProvince()
          : await searchProvince({ keyword });

      setProvinceData(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const loadManagementArea = async () => {
    try {
      setLoading(true);

      const res: any =
        keyword.trim() === ""
          ? await getAllManagementArea()
          : await searchManagementArea({ keyword });

      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];

      setManagementAreaData(data);
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

      default:
        break;
    }
  };

  useEffect(() => {
  setKeyword("");
  loadCurrentTab();
}, [activeTab]);

  const handleSearch = () => {
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
      loadAgencyContact(keyword);
      break;

    default:
      break;
  }
};

  const handleRefresh = () => {
    setKeyword("");

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

      default:
        break;
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
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Nhập từ khóa..."
            className="w-96 rounded-lg border px-4 py-2"
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
      </div>
    </div>
  );
}
