/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  ArrowLeft,
  Package,
  DollarSign,
  FileText,
  Users,
  Boxes,
} from "lucide-react";

import PageMeta from "../../components/common/PageMeta";
import { getSalesRecordById } from "../../services/revenueService";

export default function RevenueViewDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [record, setRecord] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await getSalesRecordById(id!);

      setRecord(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center text-gray-500 dark:text-gray-400">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex h-80 items-center justify-center text-gray-500 dark:text-gray-400">
        Không tìm thấy dữ liệu.
      </div>
    );
  }

  const actualRevenue =
    record.sourceType === "CTV_DaiLy"
      ? Math.round(record.revenue * (1 - (record.discountPercent || 0) / 100))
      : record.revenue;

  return (
    <>
      <PageMeta title="Revenue Detail" description="Revenue Detail" />

      <div className="space-y-6">
        {/* Header */}

        <div className="overflow-hidden rounded-3xl border border-stroke bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg border border-stroke px-4 py-2 transition hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
          >
            <ArrowLeft size={18} />
            Quay lại
          </button>
          <div className="h-36 bg-gradient-to-r from-brand-500 via-blue-500 to-cyan-500" />

          <div className="-mt-16 flex flex-col items-center px-8 pb-8">
            <img
              src={
                record.userId?.avatarUrl || "/images/user/default-avatar.png"
              }
              alt={record.userId?.fullName}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl dark:border-gray-900"
            />

            <h1 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white">
              {record.userId?.fullName}
            </h1>

            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {record.userId?.email}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                📦 {record.productType}
              </span>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                👥 {record.customerCount} khách
              </span>

              <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                📅 {new Date(record.reportDate).toLocaleDateString("vi-VN")}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <StatCard
            title="Doanh thu"
            value={`${Number(record.revenue).toLocaleString("vi-VN")} ₫`}
            color="green"
            icon={<DollarSign />}
          />

          <StatCard
            title="Khách hàng"
            value={record.customerCount}
            color="blue"
            icon={<Users />}
          />

          <StatCard
            title="Sản phẩm"
            value={record.productQuantity}
            color="orange"
            icon={<Boxes />}
          />
        </div>

        <Card title="Thông tin bán hàng" icon={<Package />}>
          <Info
            label="Sản phẩm"
            value={
              <span className="rounded-full bg-brand-100 px-3 py-1 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                {record.productType}
              </span>
            }
          />

          <Info
            label="Nguồn khách"
            value={
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                {record.sourceType === "Marketing"
                  ? "Marketing"
                  : record.sourceType === "ChuDong"
                  ? "Chủ động"
                  : "CTV / Đại lý"}
              </span>
            }
          />

          <Info label="Khách hàng" value={`${record.customerCount} khách`} />

          <Info
            label="Sản phẩm bán"
            value={`${record.productQuantity} sản phẩm`}
          />
        </Card>

        <Card title="Thông tin doanh thu" icon={<DollarSign />}>
          <div className="rounded-2xl bg-gradient-to-r from-white-500 to-black-600 p-6 text-dark dark:text-white">
            <p className="text-sm opacity-80">Giá trị hợp đồng</p>

            <h1 className="mt-3 text-4xl font-bold">
              {Number(record.revenue).toLocaleString("vi-VN")} ₫
            </h1>
          </div>

          {record.sourceType === "CTV_DaiLy" && (
            <>
              <Info label="Chiết khấu" value={`${record.discountPercent}%`} />

              <Info
                label="Thực nhận"
                value={`${actualRevenue.toLocaleString("vi-VN")} ₫`}
              />
            </>
          )}
        </Card>

        {/* Ghi chú */}

          <Card title="Ghi chú" icon={<FileText size={18} />}>
            <div className="rounded-xl bg-gray-50 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {record.note || "Không có ghi chú"}
            </div>
          </Card>
      </div>
    </>
  );
}

const colorClass = {
  green: "text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-300",
  blue: "text-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-300",
  orange:
    "text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-300",
  purple:
    "text-violet-600 bg-violet-100 dark:bg-violet-900/40 dark:text-violet-300",
} as const;

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
  color: keyof typeof colorClass;
}) {
  return (
    <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className={`inline-flex rounded-xl p-3 ${colorClass[color]}`}>
        {icon}
      </div>

      <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-5 flex items-center gap-2 border-b border-gray-100 pb-3 font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
        {icon}
        {title}
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Info({ label, value, icon }: any) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        {icon}

        <span className="font-medium text-gray-500 dark:text-gray-400">
          {label}
        </span>
      </div>

      <div className="font-semibold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}
