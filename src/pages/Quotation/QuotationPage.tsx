import { useEffect, useMemo, useRef, useState } from "react";

type DeploymentType = "mass" | "onpremise";
type CustomerSegment = "1-10" | "11-20" | "21-50" | "50+";

interface QuotationForm {
  customerName: string;
  taxCode: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;

  showOnpremiseQuotation: boolean;
  onpremDiscount: number;

  customerSegment: CustomerSegment;

  city: string;
  quotationDate: string;

  deployment: DeploymentType;

  mainUsers: number;
  seasonalUsers: number;

  mainPrice: number;
  seasonalPrice: number;

  implementationFee: number;

  duration: 1 | 2 | 3;
  discounts: [number, number, number];

  onpremLicenseMultiplier: number;
  onpremImplementationFee: number;
  onpremServerApp: number;
  onpremServerDatabase: number;
  onpremMaintenanceRate: number;

  consultantName: string;
  consultantPhone: string;
  consultantEmail: string;

  selectedModules: string[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(Math.round(value)) + " VNĐ";

const formatDate = (date: string) => {
  if (!date) return "";

  const d = new Date(date);

  return `ngày ${String(d.getDate()).padStart(2, "0")} tháng ${String(
    d.getMonth() + 1,
  ).padStart(2, "0")} năm ${d.getFullYear()}`;
};

const EASYHRM_MODULES = [
  "Tuyển dụng",
  "Thông tin nhân sự",
  "Quản lý hợp đồng",
  "Chấm công",
  "Tính lương",
  "Booking",
  "Kê khai BHXH",
  "Quản lý tài sản",
  "Đánh giá nhân sự",
  "Quản lý đào tạo",
  "Mạng nội bộ",
  "Đảng uỷ",
];

const CUSTOMER_SEGMENTS = [
  {
    value: "1-10" as CustomerSegment,
    label: "1 - 10 nhân sự",
    price: 1690000,
    setupFee: 1000000,
  },
  {
    value: "11-20" as CustomerSegment,
    label: "11 - 20 nhân sự",
    price: 2690000,
    setupFee: 1000000,
  },
  {
    value: "21-50" as CustomerSegment,
    label: "21 - 50 nhân sự",
    price: 5590000,
    setupFee: 1000000,
  },
  {
    value: "50+" as CustomerSegment,
    label: "Trên 50 nhân sự",
    price: 0,
    setupFee: 4500000,
  },
];

const getMassAnnualPrice = (form: QuotationForm) => {
  if (form.customerSegment !== "50+") {
    return (
      CUSTOMER_SEGMENTS.find((item) => item.value === form.customerSegment)
        ?.price ?? 0
    );
  }

  return (
    form.mainUsers * form.mainPrice * 12 +
    form.seasonalUsers * form.seasonalPrice * 12
  );
};

export default function QuotationPage() {
  const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false);

  const moduleDropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<QuotationForm>({
    customerName: "",
    taxCode: "",
    customerAddress: "",
    customerPhone: "",
    customerEmail: "",

    city: "TP HCM",
    quotationDate: new Date().toISOString().split("T")[0],

    deployment: "mass",

    showOnpremiseQuotation: false,
    onpremDiscount: 0,

    customerSegment: "50+",

    mainUsers: 0,
    seasonalUsers: 0,

    mainPrice: 13000,
    seasonalPrice: 0,

    implementationFee: 4500000,

    duration: 1,
    discounts: [0, 0, 0],

    onpremLicenseMultiplier: 3.5,
    onpremImplementationFee: 15000000,
    onpremServerApp: 0,
    onpremServerDatabase: 0,
    onpremMaintenanceRate: 15,

    consultantName: "Nguyễn Hoàng Nguyên",
    consultantPhone: "0948 813 064",
    consultantEmail: "nguyennh@icarevietnam.vn",

    selectedModules: [],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moduleDropdownRef.current &&
        !moduleDropdownRef.current.contains(event.target as Node)
      ) {
        setModuleDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const update = <K extends keyof QuotationForm>(
    key: K,
    value: QuotationForm[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const massCalculation = useMemo(() => {
    const selectedSegment = CUSTOMER_SEGMENTS.find(
      (segment) => segment.value === form.customerSegment,
    );

    const isFixedPackage = form.customerSegment !== "50+";

    // ============================
    // GÓI CỐ ĐỊNH <= 50 NHÂN SỰ
    // ============================
    if (isFixedPackage && selectedSegment) {
      const packagePrice = selectedSegment.price;

      // Giá phần mềm 1 năm
      const softwareYear = packagePrice;

      // Mức giảm phụ thuộc vào THỜI HẠN ĐĂNG KÝ
      // 1 năm -> discounts[0]
      // 2 năm -> discounts[1]
      // 3 năm -> discounts[2]
      const discountRate = form.discounts[form.duration - 1] ?? 0;

      // Tổng phần mềm trước giảm
      const softwareBeforeDiscount = softwareYear * form.duration;

      // Giảm trên TOÀN BỘ giá phần mềm của thời hạn đăng ký
      const discountAmount = softwareBeforeDiscount * (discountRate / 100);

      // Phần mềm sau giảm
      const softwareTotal = softwareBeforeDiscount - discountAmount;

      // Phí khởi tạo luôn tính 100%, không giảm
      const total = softwareTotal + form.implementationFee;

      return {
        mainYear: packagePrice,
        seasonalYear: 0,
        softwareYear,
        discountAmount,
        softwareTotal,
        total,
        isFixedPackage: true,
        packagePrice,
      };
    }

    // ============================
    // TRÊN 50 NHÂN SỰ
    // ============================
    const mainYear = form.mainUsers * form.mainPrice * 12;

    const seasonalYear = form.seasonalUsers * form.seasonalPrice * 12;

    // Tổng giá phần mềm 1 năm
    const softwareYear = mainYear + seasonalYear;

    // Mức giảm phụ thuộc vào THỜI HẠN ĐĂNG KÝ
    // 1 năm -> discounts[0]
    // 2 năm -> discounts[1]
    // 3 năm -> discounts[2]
    const discountRate = form.discounts[form.duration - 1] ?? 0;

    // Tổng phần mềm trước giảm
    const softwareBeforeDiscount = softwareYear * form.duration;

    // Giảm giá trên toàn bộ phần mềm
    const discountAmount = softwareBeforeDiscount * (discountRate / 100);

    // Phần mềm sau giảm
    const softwareTotal = softwareBeforeDiscount - discountAmount;

    // Phí khởi tạo không giảm
    const total = softwareTotal + form.implementationFee;

    return {
      mainYear,
      seasonalYear,
      softwareYear,
      discountAmount,
      softwareTotal,
      total,
      isFixedPackage: false,
      packagePrice: 0,
    };
  }, [
    form.customerSegment,
    form.mainUsers,
    form.mainPrice,
    form.seasonalUsers,
    form.seasonalPrice,
    form.duration,
    form.discounts,
    form.implementationFee,
  ]);

  const onpremCalculation = useMemo(() => {
    const license = massCalculation.softwareYear * form.onpremLicenseMultiplier;

    const licenseAfterDiscount = license * (1 - form.onpremDiscount / 100);

    const discountAmount = license * (form.onpremDiscount / 100);

    const maintenance =
      licenseAfterDiscount * (form.onpremMaintenanceRate / 100);

    const firstYear =
      licenseAfterDiscount +
      form.onpremImplementationFee +
      form.onpremServerApp +
      form.onpremServerDatabase;

    return {
      license,
      licenseAfterDiscount,
      discountAmount,
      maintenance,
      firstYear,
    };
  }, [
    massCalculation.softwareYear,
    form.onpremLicenseMultiplier,
    form.onpremDiscount,
    form.onpremMaintenanceRate,
    form.onpremImplementationFee,
    form.onpremServerApp,
    form.onpremServerDatabase,
  ]);

  const total = useMemo(() => {
    if (form.deployment === "mass") {
      return massCalculation.total;
    }

    return onpremCalculation.firstYear;
  }, [form.deployment, massCalculation.total, onpremCalculation.firstYear]);

  const printQuotation = () => {
    window.print();
  };

  const resetForm = () => {
    setForm({
      customerName: "",
      taxCode: "",
      customerAddress: "",
      customerPhone: "",
      customerEmail: "",

      city: "TP HCM",
      quotationDate: new Date().toISOString().split("T")[0],

      deployment: "mass",

      showOnpremiseQuotation: true,
      onpremDiscount: 0,

      mainUsers: 80,
      seasonalUsers: 0,

      mainPrice: 13000,
      seasonalPrice: 0,

      customerSegment: "50+",

      implementationFee: 4500000,

      duration: 1,
      discounts: [0, 0, 0],

      onpremLicenseMultiplier: 3.5,
      onpremImplementationFee: 15000000,
      onpremServerApp: 0,
      onpremServerDatabase: 0,
      onpremMaintenanceRate: 15,

      consultantName: "Nguyễn Hoàng Nguyên",
      consultantPhone: "0948 813 064",
      consultantEmail: "nguyennh@icarevietnam.vn",

      selectedModules: [
        "Tuyển dụng",
        "Thông tin nhân sự",
        "Quản lý hợp đồng",
        "Chấm công",
        "Tính lương",
        "Booking",
        "Kê khai BHXH",
        "Quản lý tài sản",
        "Đánh giá nhân sự",
        "Quản lý đào tạo",
        "Mạng nội bộ",
        "Đảng uỷ",
      ],
    });
  };

  const massAnnualPrice = useMemo(() => getMassAnnualPrice(form), [form]);

  return (
    <>
      <div className="min-h-screen">
        {/* HEADER */}
        <div className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 px-6 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/95 print:hidden">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Báo giá
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Tạo báo giá dịch vụ EasyHRM
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetForm}
                className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Làm mới
              </button>

              <button
                onClick={printQuotation}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
              >
                🖨️ Xuất báo giá / PDF
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          {/* FORM */}
          <div className="space-y-5 print:hidden">
            {/* KHÁCH HÀNG */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                1. Thông tin khách hàng
              </h2>

              <div className="space-y-4">
                <Field
                  label="Tên khách hàng / Công ty"
                  value={form.customerName}
                  onChange={(v) => update("customerName", v)}
                  placeholder="VD: Công ty TNHH ABC"
                />

                <Field
                  label="Mã số thuế"
                  value={form.taxCode}
                  onChange={(v) => update("taxCode", v)}
                  placeholder="Mã số thuế"
                />

                <Field
                  label="Địa chỉ"
                  value={form.customerAddress}
                  onChange={(v) => update("customerAddress", v)}
                  placeholder="Địa chỉ khách hàng"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Điện thoại"
                    value={form.customerPhone}
                    onChange={(v) => update("customerPhone", v)}
                  />

                  <Field
                    label="Email"
                    value={form.customerEmail}
                    onChange={(v) => update("customerEmail", v)}
                  />
                </div>
              </div>
            </section>

            {/* PHƯƠNG ÁN */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                2. Phương án triển khai
              </h2>

              <div className="space-y-3">
                {/* MASS */}
                <div className="rounded-xl border border-orange-500 bg-orange-50 p-4 dark:bg-orange-950/20">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked
                      disabled
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500"
                    />

                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        MASS
                      </div>

                      <div className="mt-1 text-xs text-gray-500">
                        Server nhà cung cấp — luôn hiển thị trong báo giá
                      </div>
                    </div>
                  </div>
                </div>

                {/* ON-PREMISE */}
                <label
                  className={`block cursor-pointer rounded-xl border p-4 transition ${
                    form.showOnpremiseQuotation
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                      : "border-gray-200 hover:border-orange-300 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={form.showOnpremiseQuotation}
                      onChange={(e) =>
                        update("showOnpremiseQuotation", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                    />

                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Hiện báo giá On-premise
                      </div>

                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Phương án On-premise sẽ được hiển thị ở trang 2
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            {/* MASS */}
            {form.deployment === "mass" && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                  3. Cấu hình EasyHRM
                </h2>

                <div className="space-y-4">
                  {/* PHÂN KHÚC KHÁCH HÀNG */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Phân khúc khách hàng
                    </label>

                    <div className="space-y-2">
                      {CUSTOMER_SEGMENTS.map((segment) => {
                        const checked = form.customerSegment === segment.value;

                        return (
                          <label
                            key={segment.value}
                            className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                              checked
                                ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                                : "border-gray-200 hover:border-orange-300 dark:border-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  update("customerSegment", segment.value);

                                  // Các nhóm <= 50 dùng giá gói cố định
                                  // và phí khởi tạo mặc định 1 triệu.
                                  if (segment.value !== "50+") {
                                    update(
                                      "implementationFee",
                                      segment.setupFee,
                                    );
                                  } else {
                                    update("implementationFee", 4500000);
                                  }
                                }}
                                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                              />

                              <div>
                                <div
                                  className={`text-sm font-semibold ${
                                    checked
                                      ? "text-orange-700 dark:text-orange-400"
                                      : "text-gray-700 dark:text-gray-200"
                                  }`}
                                >
                                  {segment.label}
                                </div>

                                {segment.value !== "50+" ? (
                                  <div className="mt-0.5 text-xs text-gray-500">
                                    Gói: {formatCurrency(segment.price)} / năm
                                  </div>
                                ) : (
                                  <div className="mt-0.5 text-xs text-gray-500">
                                    Tính theo số lượng nhân sự
                                  </div>
                                )}
                              </div>
                            </div>

                            {checked && (
                              <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-semibold text-white">
                                Đang chọn
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>

                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Chỉ được chọn một phân khúc khách hàng.
                    </p>
                  </div>

                  {/* SỐ NHÂN SỰ */}
                  <NumberField
                    label="Số nhân sự chính"
                    value={form.mainUsers}
                    onChange={(v) => update("mainUsers", v)}
                  />

                  <NumberField
                    label="Đơn giá / nhân sự / tháng"
                    value={form.mainPrice}
                    onChange={(v) => update("mainPrice", v)}
                  />

                  <NumberField
                    label="Số nhân sự thời vụ"
                    value={form.seasonalUsers}
                    onChange={(v) => update("seasonalUsers", v)}
                  />

                  <NumberField
                    label="Đơn giá thời vụ / tháng"
                    value={form.seasonalPrice}
                    onChange={(v) => update("seasonalPrice", v)}
                  />

                  {form.customerSegment !== "50+" ? (
                    <NumberField
                      label="Phí cài đặt & triển khai"
                      value={form.implementationFee}
                      onChange={(v) => update("implementationFee", v)}
                    />
                  ) : (
                    <NumberField
                      label="Phí cài đặt & triển khai"
                      value={form.implementationFee}
                      onChange={(v) => update("implementationFee", v)}
                    />
                  )}

                  <div className="mb-5" ref={moduleDropdownRef}>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Phân hệ sử dụng
                    </label>

                    <div className="relative">
                      {/* SELECT */}
                      <button
                        type="button"
                        onClick={() => setModuleDropdownOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-left text-sm outline-none transition hover:border-orange-400 focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800"
                      >
                        <div className="min-w-0 flex-1">
                          {form.selectedModules.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {form.selectedModules
                                .slice(0, 3)
                                .map((module) => (
                                  <span
                                    key={module}
                                    className="rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-950/40 dark:text-orange-400"
                                  >
                                    {module}
                                  </span>
                                ))}

                              {form.selectedModules.length > 3 && (
                                <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                  +{form.selectedModules.length - 3}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">
                              Chọn phân hệ...
                            </span>
                          )}
                        </div>

                        <svg
                          className={`ml-3 h-4 w-4 shrink-0 text-gray-500 transition-transform ${
                            moduleDropdownOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* DROPDOWN */}
                      {moduleDropdownOpen && (
                        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                          {/* HEADER */}
                          <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2.5 dark:border-gray-700">
                            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                              Chọn phân hệ
                            </span>

                            <span className="text-xs text-gray-400">
                              {form.selectedModules.length} đã chọn
                            </span>
                          </div>

                          {/* LIST */}
                          <div className="max-h-64 overflow-y-auto p-2">
                            {EASYHRM_MODULES.map((module) => {
                              const checked =
                                form.selectedModules.includes(module);

                              return (
                                <label
                                  key={module}
                                  className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition ${
                                    checked
                                      ? "bg-orange-50 dark:bg-orange-950/20"
                                      : "hover:bg-gray-50 dark:hover:bg-gray-700"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        update("selectedModules", [
                                          ...form.selectedModules,
                                          module,
                                        ]);
                                      } else {
                                        update(
                                          "selectedModules",
                                          form.selectedModules.filter(
                                            (item) => item !== module,
                                          ),
                                        );
                                      }
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                  />

                                  <span
                                    className={`text-sm ${
                                      checked
                                        ? "font-medium text-orange-700 dark:text-orange-400"
                                        : "text-gray-700 dark:text-gray-200"
                                    }`}
                                  >
                                    {module}
                                  </span>
                                </label>
                              );
                            })}
                          </div>

                          {/* FOOTER */}
                          <div className="flex items-center justify-between border-t border-gray-200 px-3 py-2 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  update("selectedModules", [
                                    ...EASYHRM_MODULES,
                                  ])
                                }
                                disabled={
                                  form.selectedModules.length ===
                                  EASYHRM_MODULES.length
                                }
                                className="text-xs font-medium text-orange-600 hover:text-orange-700 disabled:cursor-not-allowed disabled:text-gray-400"
                              >
                                Chọn tất cả
                              </button>

                              <span className="text-gray-300 dark:text-gray-600">
                                |
                              </span>

                              <button
                                type="button"
                                onClick={() => update("selectedModules", [])}
                                disabled={form.selectedModules.length === 0}
                                className="text-xs font-medium text-gray-500 hover:text-red-500 disabled:cursor-not-allowed disabled:text-gray-400"
                              >
                                Bỏ chọn tất cả
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => setModuleDropdownOpen(false)}
                              className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
                            >
                              Xong
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                      Đã chọn {form.selectedModules.length} phân hệ
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium dark:text-white">
                        Thời hạn báo giá
                      </label>

                      <select
                        value={form.duration}
                        onChange={(e) =>
                          update(
                            "duration",
                            Number(e.target.value) as 1 | 2 | 3,
                          )
                        }
                        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      >
                        <option className="dark:text-white" value={1}>
                          1 năm
                        </option>
                        <option className="dark:text-white" value={2}>
                          2 năm
                        </option>
                        <option className="dark:text-white" value={3}>
                          3 năm
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Mức giảm giá theo từng năm
                      </label>

                      <div className="space-y-2">
                        {Array.from({ length: form.duration }).map(
                          (_, index) => {
                            const year = index + 1;

                            return (
                              <div
                                key={year}
                                className="flex items-center gap-3"
                              >
                                <div className="w-20 shrink-0 text-sm font-medium text-gray-700 dark:text-gray-200">
                                  Năm {year}
                                </div>

                                <select
                                  value={form.discounts[index]}
                                  onChange={(e) => {
                                    const newDiscounts: [
                                      number,
                                      number,
                                      number,
                                    ] = [...form.discounts];

                                    newDiscounts[index] = Number(
                                      e.target.value,
                                    );

                                    update("discounts", newDiscounts);
                                  }}
                                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                >
                                  <option value={0}>Không giảm giá</option>
                                  <option value={5}>Giảm 5%</option>
                                  <option value={10}>Giảm 10%</option>
                                  <option value={15}>Giảm 15%</option>
                                  <option value={20}>Giảm 20%</option>
                                  <option value={25}>Giảm 25%</option>
                                  <option value={30}>Giảm 30%</option>
                                  <option value={35}>Giảm 35%</option>
                                  <option value={40}>Giảm 40%</option>
                                  <option value={45}>Giảm 45%</option>
                                  <option value={50}>Giảm 50%</option>
                                </select>
                              </div>
                            );
                          },
                        )}
                      </div>

                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Mỗi năm có thể áp dụng một mức giảm giá khác nhau.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-gray-800 dark:text-white">
                  <div className="flex justify-between text-sm">
                    <span>
                      {massCalculation.isFixedPackage
                        ? "Giá gói / năm"
                        : "Phần mềm / năm"}
                    </span>

                    <strong>
                      {formatCurrency(massCalculation.softwareYear)}
                    </strong>
                  </div>

                  <div className="mt-2 flex justify-between text-sm">
                    <span>Số năm</span>
                    <strong>{form.duration} năm</strong>
                  </div>

                  <div className="mt-2 space-y-1 text-sm">
                    <div className="font-medium">Giảm giá</div>

                    {Array.from({ length: form.duration }).map((_, index) => (
                      <div key={index} className="flex justify-between pl-3">
                        <span>Năm {index + 1}</span>

                        <strong className="text-green-600">
                          {form.discounts[index]}%
                        </strong>
                      </div>
                    ))}
                  </div>

                  {massCalculation.discountAmount > 0 && (
                    <div className="mt-2 flex justify-between text-sm">
                      <span>Tổng tiền giảm</span>

                      <strong className="text-green-600">
                        -{formatCurrency(massCalculation.discountAmount)}
                      </strong>
                    </div>
                  )}

                  <div className="mt-2 flex justify-between text-sm">
                    <span>Phí triển khai</span>
                    <strong>{formatCurrency(form.implementationFee)}</strong>
                  </div>

                  <div className="mt-3 border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Tổng báo giá</span>

                      <strong className="text-lg text-orange-600">
                        {formatCurrency(total)}
                      </strong>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ONPREMISE */}
            {form.showOnpremiseQuotation && (
              <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                  3. Cấu hình On-premise
                </h2>

                <div className="space-y-4">
                  <NumberField
                    label="Hệ số License"
                    value={form.onpremLicenseMultiplier}
                    onChange={(v) => update("onpremLicenseMultiplier", v)}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Mức giảm giá On-premise
                    </label>

                    <select
                      value={form.onpremDiscount}
                      onChange={(e) =>
                        update("onpremDiscount", Number(e.target.value))
                      }
                      className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    >
                      <option value={0}>Không giảm giá</option>
                      <option value={5}>Giảm 5%</option>
                      <option value={10}>Giảm 10%</option>
                      <option value={15}>Giảm 15%</option>
                      <option value={20}>Giảm 20%</option>
                      <option value={25}>Giảm 25%</option>
                      <option value={30}>Giảm 30%</option>
                      <option value={35}>Giảm 35%</option>
                      <option value={40}>Giảm 40%</option>
                      <option value={45}>Giảm 45%</option>
                      <option value={50}>Giảm 50%</option>
                    </select>
                  </div>

                  <NumberField
                    label="Phí triển khai"
                    value={form.onpremImplementationFee}
                    onChange={(v) => update("onpremImplementationFee", v)}
                  />

                  <NumberField
                    label="Server ứng dụng"
                    value={form.onpremServerApp}
                    onChange={(v) => update("onpremServerApp", v)}
                  />

                  <NumberField
                    label="Server cơ sở dữ liệu"
                    value={form.onpremServerDatabase}
                    onChange={(v) => update("onpremServerDatabase", v)}
                  />

                  <NumberField
                    label="Phí bảo trì hàng năm (%)"
                    value={form.onpremMaintenanceRate}
                    onChange={(v) => update("onpremMaintenanceRate", v)}
                  />
                </div>

                <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="flex justify-between text-sm dark:text-white">
                    <span>License</span>

                    <strong>{formatCurrency(onpremCalculation.license)}</strong>
                  </div>

                  {form.onpremDiscount > 0 && (
                    <>
                      <div className="mt-2 flex justify-between text-sm dark:text-white">
                        <span>Giảm giá</span>

                        <strong className="text-green-600">
                          {form.onpremDiscount}%
                        </strong>
                      </div>

                      <div className="mt-2 flex justify-between text-sm dark:text-white">
                        <span>Số tiền giảm</span>

                        <strong className="text-green-600">
                          -{formatCurrency(onpremCalculation.discountAmount)}
                        </strong>
                      </div>
                    </>
                  )}

                  <div className="mt-2 flex justify-between text-sm dark:text-white">
                    <span>Phí triển khai</span>

                    <strong>
                      {formatCurrency(form.onpremImplementationFee)}
                    </strong>
                  </div>
                  {form.onpremServerApp > 0 && (
                    <>
                      <div className="mt-2 flex justify-between text-sm dark:text-white">
                        <span>Server App</span>

                        <strong>{formatCurrency(form.onpremServerApp)}</strong>
                      </div>
                    </>
                  )}

                  {form.onpremServerDatabase > 0 && (
                    <>
                      <div className="mt-2 flex justify-between text-sm dark:text-white">
                        <span>Server Database</span>

                        <strong>
                          {formatCurrency(form.onpremServerDatabase)}
                        </strong>
                      </div>
                    </>
                  )}

                  <div className="mt-3 border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold dark:text-white">
                        Tổng năm đầu
                      </span>

                      <strong className="text-lg text-orange-600">
                        {formatCurrency(onpremCalculation.firstYear)}
                      </strong>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* NGƯỜI TƯ VẤN */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-base font-bold text-gray-900 dark:text-white">
                4. Người phụ trách
              </h2>

              <div className="space-y-4">
                <Field
                  label="Họ tên"
                  value={form.consultantName}
                  onChange={(v) => update("consultantName", v)}
                />

                <Field
                  label="Điện thoại"
                  value={form.consultantPhone}
                  onChange={(v) => update("consultantPhone", v)}
                />

                <Field
                  label="Email"
                  value={form.consultantEmail}
                  onChange={(v) => update("consultantEmail", v)}
                />
              </div>
            </section>
          </div>

          {/* PREVIEW */}
          <div id="quotation-print-wrapper" className="flex justify-center">
            <div id="quotation-print" className="quotation-document">
              <div className="quotation-page quotation-page-1">
                {/* LOGO */}
                <div className="quotation-logo">
                  <img
                    src="https://i.ibb.co/21DLSLk0/Logo-1.jpg"
                    alt="SoftDreams"
                    className="mx-auto h-auto w-auto object-contain mt-0"
                  />
                </div>
                {/* HEADER */}
                <div className="quotation-header border-b border-orange-500 pb-4">
                  <div className="flex items-start justify-between gap-8">
                    <div className="min-w-0">
                      <div className="mt-1 text-[13px] font-medium uppercase tracking-wide text-gray-900">
                        CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ
                        <br />
                        VÀ THƯƠNG MẠI SOFTDREAMS
                      </div>

                      <div className="mt-2 text-[13px] leading-4 text-gray-600">
                        Số 7, Ngách 97/1, Ngõ 97 Chính Kinh, Phường Thanh Xuân,
                        TP Hà Nội, Việt Nam
                        <br />
                        Điện thoại: 0948 813 064
                        <br />
                        Email: nguyennh@icarevietnam.vn
                      </div>
                    </div>

                    <div className="shrink-0 pt-1 text-right text-[13px] leading-4 text-gray-500">
                      {form.city}, {formatDate(form.quotationDate)}
                    </div>
                  </div>
                </div>

                {/* TITLE */}
                <div className="py-2 text-center">
                  <h1 className="text-xl font-bold uppercase tracking-wide">
                    BÁO GIÁ DỊCH VỤ
                  </h1>

                  <h2 className="mt-1 text-xl font-bold text-orange-600">
                    QUẢN LÝ NHÂN SỰ EASYHRM
                  </h2>
                </div>

                {/* CUSTOMER */}
                <div className="mb-7 space-y-2 quotation-customer">
                  <div className="text-[14px] leading-6 text-gray-900">
                    <span className="font-bold">Kính gửi:</span>{" "}
                    <span className="font-bold italic">
                      {form.customerName ||
                        "........................................................"}
                    </span>
                  </div>

                  <div className="text-[14px] leading-6 text-gray-900">
                    <span className="font-bold">Mã số thuế:</span>{" "}
                    <span className="font-bold italic">
                      {form.taxCode ||
                        "........................................................"}
                    </span>
                  </div>

                  {form.customerAddress && (
                    <div className="text-[14px] leading-6 text-gray-900">
                      <span className="font-bold">Địa chỉ:</span>{" "}
                      <span>{form.customerAddress}</span>
                    </div>
                  )}
                </div>

                {/* INTRO */}
                <p className="mb-6 text-sm leading-6 text-gray-700">
                  Lời đầu tiên, SoftDreams xin chân thành cảm ơn Quý Khách hàng
                  đã tin tưởng, đồng hành và quan tâm sử dụng giải pháp Quản lý
                  Nhân sự EasyHRM của chúng tôi.
                  <br />
                  Trên cơ sở khảo sát nhu cầu ứng dụng phần mềm quản lý nhân sự
                  của Quý đơn vị, chúng tôi xin gửi danh mục chức năng phần mềm
                  và dự toán chi phí cụ thể như sau:
                </p>

                {/* MASS */}
                <SectionTitle>PHƯƠNG ÁN TRIỂN KHAI MASS</SectionTitle>

                <p className="mb-2 text-sm">
                  <strong>Giải pháp Server nhà cung cấp</strong>
                </p>

                <div className="mb-5 rounded-lg bg-orange-50 p-4 text-sm">
                  <strong>Bộ giải pháp EasyHRM - Premium</strong>

                  {form.selectedModules.length > 0 ? (
                    <div className="mt-2 leading-6 text-gray-600">
                      <strong>
                        Bộ giải pháp bao gồm {form.selectedModules.length} phân
                        hệ:
                      </strong>{" "}
                      {form.selectedModules.join(", ")}.
                    </div>
                  ) : (
                    <div className="mt-2 italic text-gray-500">
                      Chưa lựa chọn phân hệ.
                    </div>
                  )}
                </div>

                <table className="quotation-table w-full border-collapse text-sm">
                  <colgroup>
                    {/* STT */}
                    <col className="col-stt" />

                    {/* Gói dịch vụ */}
                    <col className="col-service" />

                    {/* Đơn vị */}
                    <col className="col-unit" />

                    {/* SL */}
                    <col className="col-quantity" />

                    {/* Đơn giá */}
                    <col className="col-price" />

                    {/* Giảm giá */}
                    <col className="col-discount" />

                    {/* Thành tiền */}
                    <col className="col-total" />
                  </colgroup>

                  <thead>
                    <tr className="bg-orange-500 text-white">
                      <th className="border border-gray-300 px-2 py-1 text-center">
                        STT
                      </th>

                      <th className="border border-gray-300 px-2 py-1 text-center">
                        Gói dịch vụ
                      </th>

                      <th className="border border-gray-300 px-2 py-1 text-center">
                        Đơn vị
                      </th>

                      <th className="border border-gray-300 px-2 py-1 text-center">
                        SL
                      </th>

                      <th className="border border-gray-300 px-2 py-1 text-center">
                        Đơn giá
                      </th>

                      <th className="border border-gray-300 px-2 py-1 text-center whitespace-nowrap">
                        Giảm giá
                      </th>

                      <th className="border border-gray-300 px-2 py-1 text-center">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* GÓI CỐ ĐỊNH */}
                    {massCalculation.isFixedPackage ? (
                      <>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            1
                          </td>

                          <td className="service-cell border border-gray-300 px-2 py-1 text-left">
                            <div>Phần mềm nhân sự EasyHRM</div>

                            <div>
                              Gói Premium (
                              {
                                CUSTOMER_SEGMENTS.find(
                                  (item) => item.value === form.customerSegment,
                                )?.label
                              }
                              )
                            </div>
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            Gói/năm
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            1
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                            {formatCurrency(massCalculation.softwareYear)}
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center whitespace-nowrap">
                            {form.discounts[0] > 0
                              ? `${form.discounts[0]}%`
                              : "-"}
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                            {formatCurrency(
                              massCalculation.softwareYear *
                                (1 - (form.discounts[0] ?? 0) / 100),
                            )}
                          </td>
                        </tr>

                        {/* PHÍ KHỞI TẠO */}
                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            2
                          </td>

                          <td className="service-cell border border-gray-300 px-2 py-1 text-left">
                            Phí khởi tạo và triển khai
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            VNĐ
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {form.implementationFee > 0 ? 1 : 0}
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                            {formatCurrency(form.implementationFee)}
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            -
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                            {formatCurrency(form.implementationFee)}
                          </td>
                        </tr>
                      </>
                    ) : (
                      <>
                        {/* ================================
                              LOGIC CŨ - TRÊN 50 NHÂN SỰ
                          ================================= */}

                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            1
                          </td>

                          <td className="service-cell border border-gray-300 px-2 py-1 text-left">
                            <div>Phần mềm nhân sự EasyHRM</div>
                            <div>Gói Premium - 1 năm</div>
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            Gói/năm
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {form.mainUsers}
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                            {formatCurrency(form.mainPrice)}
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center whitespace-nowrap">
                            {form.discounts[0] > 0
                              ? `${form.discounts[0]}%`
                              : "-"}
                          </td>
                          <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                            {formatCurrency(
                              form.mainUsers *
                                form.mainPrice *
                                12 *
                                (1 - (form.discounts[0] ?? 0) / 100),
                            )}
                          </td>
                        </tr>

                        {form.seasonalUsers > 0 && (
                          <tr className="quotation-table-row">
                            <td className="border border-gray-300 px-2 py-1 text-center">
                              2
                            </td>

                            <td className="service-cell border border-gray-300 px-2 py-1 text-left">
                              Nhân sự thời vụ
                            </td>

                            <td className="border border-gray-300 px-2 py-1 text-center">
                              Gói/năm
                            </td>

                            <td className="border border-gray-300 px-2 py-1 text-center">
                              {form.seasonalUsers}
                            </td>

                            <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                              {formatCurrency(form.seasonalPrice)}
                            </td>

                            <td className="border border-gray-300 px-2 py-1 text-center">
                              {form.discounts[0] > 0
                                ? `${form.discounts[0]}%`
                                : "-"}
                            </td>

                            <td className="border border-gray-300 px-2 py-1 text-center">
                              {formatCurrency(
                                form.seasonalUsers *
                                  form.seasonalPrice *
                                  12 *
                                  (1 - (form.discounts[0] ?? 0) / 100),
                              )}
                            </td>
                          </tr>
                        )}

                        <tr>
                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {form.seasonalUsers > 0 ? 3 : 2}
                          </td>

                          <td className="service-cell border border-gray-300 px-2 py-1 text-left">
                            Phí cài đặt và triển khai
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            VNĐ
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            {form.implementationFee > 0 ? 1 : 0}
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                            {formatCurrency(form.implementationFee)}
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-center">
                            -
                          </td>

                          <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                            {formatCurrency(form.implementationFee)}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>

                  <tfoot>
                    <tr>
                      <td
                        colSpan={6}
                        className="border border-gray-300 px-2 py-1 text-right font-bold"
                      >
                        TỔNG CHI PHÍ
                      </td>

                      <td className="border border-gray-300 px-2 py-1 text-right font-bold text-orange-600 whitespace-nowrap">
                        {formatCurrency(
                          (form.customerSegment !== "50+"
                            ? CUSTOMER_SEGMENTS.find(
                                (segment) =>
                                  segment.value === form.customerSegment,
                              )?.price ?? 0
                            : form.mainUsers * form.mainPrice * 12 +
                              form.seasonalUsers * form.seasonalPrice * 12) *
                            (1 - (form.discounts[0] ?? 0) / 100) +
                            form.implementationFee,
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                {/* BẢNG GIÁ THEO THỜI HẠN */}
                <div className="mt-2">
                  <div className="mb-2 text-sm font-bold text-gray-900">
                    Bảng giá theo thời hạn đăng ký
                  </div>

                  <table className="quotation-table w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-orange-500 text-white">
                        <th className="border border-gray-300 px-2 py-1 text-center">
                          Thời hạn
                        </th>

                        <th className="border border-gray-300 px-2 py-1 text-center">
                          Giá phần mềm
                        </th>

                        <th className="border border-gray-300 px-2 py-1 text-center">
                          Giảm giá
                        </th>

                        <th className="border border-gray-300 px-2 py-1 text-center">
                          Phí khởi tạo
                        </th>

                        <th className="border border-gray-300 px-2 py-1 text-right">
                          Tổng thanh toán
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {[1, 2, 3].map((year) => {
                        // Giá phần mềm của toàn bộ thời hạn
                        const softwareBeforeDiscount = massAnnualPrice * year;

                        // Mỗi thời hạn có MỘT mức giảm riêng
                        // 1 năm -> discounts[0]
                        // 2 năm -> discounts[1]
                        // 3 năm -> discounts[2]
                        const discountRate = form.discounts[year - 1] ?? 0;

                        // Tiền giảm của chính thời hạn này
                        const discountAmount =
                          softwareBeforeDiscount * (discountRate / 100);

                        // Tiền phần mềm sau giảm
                        const softwareAfterDiscount =
                          softwareBeforeDiscount - discountAmount;

                        // Phí khởi tạo luôn cộng 100%, không giảm
                        const total =
                          softwareAfterDiscount + form.implementationFee;

                        return (
                          <tr key={year}>
                            {/* THỜI HẠN */}
                            <td className="border border-gray-300 px-2 py-1 text-center">
                              {year} năm
                            </td>

                            {/* GIÁ PHẦN MỀM */}
                            <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                              {formatCurrency(softwareBeforeDiscount)}
                            </td>

                            {/* GIẢM GIÁ CỦA CHÍNH THỜI HẠN NÀY */}
                            <td className="border border-gray-300 px-2 py-1 text-center">
                              {discountRate > 0 ? `${discountRate}%` : "-"}
                            </td>

                            {/* PHÍ KHỞI TẠO */}
                            <td className="border border-gray-300 px-2 py-1 text-right whitespace-nowrap">
                              {formatCurrency(form.implementationFee)}
                            </td>

                            {/* TỔNG THANH TOÁN */}
                            <td className="border border-gray-300 px-2 py-1 text-right font-bold whitespace-nowrap">
                              {formatCurrency(total)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="mt-2 text-xs italic text-gray-500">
                    Giá trên đã áp dụng mức giảm giá theo từng năm đăng ký:{" "}
                    {form.discounts
                      .slice(0, form.duration)
                      .map((discount, index) => (
                        <span key={index}>
                          {index > 0 ? ", " : ""}
                          <strong>
                            Năm {index + 1}: {discount}%
                          </strong>
                        </span>
                      ))}{" "}
                    theo chính sách thương mại được lựa chọn.
                  </div>
                </div>

                {/* {form.discounts
                  .slice(0, form.duration)
                  .some((discount) => discount > 0) && (
                  <div className="mt-3 text-xs italic text-gray-600">
                    Áp dụng mức giảm giá riêng cho từng năm:{" "}
                    {form.discounts
                      .slice(0, form.duration)
                      .map((discount, index) => (
                        <span key={index}>
                          {index > 0 ? ", " : ""}
                          Năm {index + 1}: {discount}%
                        </span>
                      ))}
                    .
                  </div>
                )} */}

                {/* NOTE */}
                <div className="quotation-section mt-8 rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-300">
                  <strong>Ghi chú:</strong>

                  <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
                    <li>
                      Phí cài đặt và triển khai chỉ 1 lần duy nhất (phí hỗ trợ
                      triển khai, đào tạo, lưu trữ dữ liệu trên cloud của nhà
                      cung cấp).
                    </li>

                    <li>
                      Sau thời gian đăng ký lần đầu, phí gia hạn phần mềm sẽ là{" "}
                      {""}
                      <p className="inline italic font-bold">
                        {formatCurrency(massAnnualPrice)} {""}
                      </p>
                      <p className="inline">
                        cho năm tiếp theo dựa trên số lượng nhân sự tại thời
                        điểm gia hạn hoặc theo thoả thuận từ khách hàng và đầu
                        mối bán hàng.
                      </p>
                    </li>

                    <li>
                      Báo giá được áp dụng theo phân khúc khách hàng:{" "}
                      <p className="inline italic font-bold">
                        {
                          CUSTOMER_SEGMENTS.find(
                            (item) => item.value === form.customerSegment,
                          )?.label
                        }
                      </p>
                      .
                    </li>

                    {form.customerSegment === "50+" && (
                      <li>
                        Báo giá được tính theo số lượng nhân sự sử dụng phần mềm
                        cụ thể:{" "}
                        <p className="inline italic font-bold">
                          {form.mainUsers} người dùng
                        </p>
                      </li>
                    )}

                    <li>
                      Phí tích hợp/phát triển tính năng phát sinh sẽ được đánh
                      giá và báo giá riêng theo yêu cầu.
                    </li>

                    <li>
                      Giá trên áp dụng theo chính sách thương mại tại thời điểm
                      báo giá.
                    </li>

                    <li>
                      Đặc biệt phần mềm không thuộc sản phẩm chịu thuế GTGT.
                    </li>
                  </ul>
                </div>

                <div className="quotation-footer">
                  {/* LEFT - CONTACT */}
                  <div className="quotation-footer-contact">
                    <p className="text-sm leading-5">
                      Mọi thắc mắc, Quý khách vui lòng liên hệ:
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {form.consultantName} - Chuyên viên tư vấn
                    </p>

                    <p className="text-sm">TEL/Zalo: {form.consultantPhone}</p>

                    <p className="text-sm">Email: {form.consultantEmail}</p>
                  </div>

                  {/* RIGHT - COPYRIGHT */}
                  <div className="quotation-footer-copyright">
                    <div>COPYRIGHT © 2026</div>

                    <div>Created by NNguyen1202</div>

                    <div>All rights Reserved</div>
                  </div>
                </div>
              </div>

              {form.showOnpremiseQuotation && (
                <div className="quotation-page quotation-page-2">
                  {/* LOGO PAGE 2 */}
                  <div className="quotation-logo">
                    <img
                      src="https://i.ibb.co/21DLSLk0/Logo-1.jpg"
                      alt="SoftDreams"
                      className="mx-auto h-auto w-auto object-contain mt-0"
                    />
                  </div>
                  {/* HEADER PAGE 2 */}
                  <div className="quotation-header border-b border-orange-500 pb-4">
                    <div className="flex items-start justify-between gap-8">
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium uppercase tracking-wide text-gray-900">
                          CÔNG TY CỔ PHẦN ĐẦU TƯ CÔNG NGHỆ
                          <br />
                          VÀ THƯƠNG MẠI SOFTDREAMS
                        </div>

                        <div className="mt-2 text-[13px] leading-4 text-gray-600">
                          Số 7, Ngách 97/1, Ngõ 97 Chính Kinh, Phường Thanh
                          Xuân, TP Hà Nội, Việt Nam
                          <br />
                          Điện thoại: 0948 813 064
                          <br />
                          Email: nguyennh@icarevietnam.vn
                        </div>
                      </div>

                      <div className="shrink-0 text-right text-[13px] text-gray-500">
                        {form.city}, {formatDate(form.quotationDate)}
                      </div>
                    </div>
                  </div>

                  {/* TITLE */}
                  <div className="py-8 text-center">
                    <h1 className="text-xl font-bold uppercase tracking-wide">
                      BÁO GIÁ DỊCH VỤ
                    </h1>

                    <h2 className="mt-2 text-xl font-bold text-orange-600">
                      PHƯƠNG ÁN TRIỂN KHAI ON-PREMISE
                    </h2>
                  </div>

                  <SectionTitle>PHƯƠNG ÁN TRIỂN KHAI ON-PREMISE</SectionTitle>
                  <p className="mb-4 text-sm">
                    <strong>Giải pháp Server hạ tầng bên đơn vị</strong>
                  </p>

                  {/* INTRO */}
                  <p className="mb-6 text-sm leading-6 text-gray-700">
                    Trên cơ sở nhu cầu triển khai hệ thống Quản lý Nhân sự
                    EasyHRM trên hạ tầng của Quý khách hàng, SoftDreams xin gửi
                    phương án và dự toán chi phí triển khai On-premise như sau:
                  </p>

                  {/* ONPREMISE TABLE */}
                  <table className="quotation-table w-full border-collapse text-[11px]">
                    <colgroup>
                      <col className="col-stt" />
                      <col className="col-service" />
                      <col className="col-unit" />
                      <col className="col-total" />
                    </colgroup>

                    <thead>
                      <tr className="bg-orange-500 text-white">
                        <th className="border border-gray-300 p-2 text-center">
                          STT
                        </th>

                        <th className="border border-gray-300 p-2 text-left">
                          Hạng mục
                        </th>

                        <th className="border border-gray-300 p-2 text-center">
                          ĐVT
                        </th>

                        <th className="border border-gray-300 p-2 text-right">
                          Thành tiền
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2 text-center">
                          1
                        </td>

                        <td className="border border-gray-300 p-2">
                          Gói License giải pháp Quản lý Nhân sự EasyHRM
                        </td>

                        <td className="border border-gray-300 p-2 text-center">
                          Gói
                        </td>

                        <td className="border border-gray-300 p-2 text-right">
                          {formatCurrency(onpremCalculation.license)}
                        </td>
                      </tr>

                      {form.onpremDiscount > 0 && (
                        <tr>
                          <td className="border border-gray-300 p-2 text-center">
                            2
                          </td>

                          <td className="border border-gray-300 p-2">
                            Chiết khấu License
                          </td>

                          <td className="border border-gray-300 p-2 text-center">
                            %
                          </td>

                          <td className="border border-gray-300 p-2 text-right text-green-600">
                            -{formatCurrency(onpremCalculation.discountAmount)}
                          </td>
                        </tr>
                      )}

                      <tr>
                        <td className="border border-gray-300 p-2 text-center">
                          {form.onpremDiscount > 0 ? 3 : 2}
                        </td>

                        <td className="border border-gray-300 p-2">
                          Phí cài đặt và triển khai
                        </td>

                        <td className="border border-gray-300 p-2 text-center">
                          Gói
                        </td>

                        <td className="border border-gray-300 p-2 text-right">
                          {formatCurrency(form.onpremImplementationFee)}
                        </td>
                      </tr>

                      <tr>
                        <td className="border border-gray-300 p-2 text-center">
                          {form.onpremDiscount > 0 ? 4 : 3}
                        </td>

                        <td className="border border-gray-300 p-2">
                          Phí tích hợp và phát triển tính năng
                        </td>

                        <td className="border border-gray-300 p-2 text-center">
                          Manday
                        </td>

                        <td className="border border-gray-300 p-2 text-right">
                          Theo thực tế
                        </td>
                      </tr>

                      {/* Server ứng dụng App */}
                      {form.onpremServerApp > 0 && (
                        <tr>
                          <td className="border border-gray-300 p-2 text-center">
                            {form.onpremDiscount > 0 ? 5 : 4}
                          </td>

                          <td className="border border-gray-300 p-2">
                            Server ứng dụng App
                          </td>

                          <td className="border border-gray-300 p-2 text-center">
                            Cái
                          </td>

                          <td className="border border-gray-300 p-2 text-right">
                            {formatCurrency(form.onpremServerApp)}
                          </td>
                        </tr>
                      )}

                      {/* Server cơ sở dữ liệu */}
                      {form.onpremServerDatabase > 0 && (
                        <tr>
                          <td className="border border-gray-300 p-2 text-center">
                            {form.onpremDiscount > 0
                              ? form.onpremServerApp > 0
                                ? 6
                                : 5
                              : form.onpremServerApp > 0
                              ? 5
                              : 4}
                          </td>

                          <td className="border border-gray-300 p-2">
                            Server cơ sở dữ liệu
                          </td>

                          <td className="border border-gray-300 p-2 text-center">
                            Cái
                          </td>

                          <td className="border border-gray-300 p-2 text-right">
                            {formatCurrency(form.onpremServerDatabase)}
                          </td>
                        </tr>
                      )}

                      {/* Phí bảo trì */}
                      <tr>
                        <td className="border border-gray-300 p-2 text-center">
                          {form.onpremDiscount > 0
                            ? 7
                            : form.onpremServerApp > 0 &&
                              form.onpremServerDatabase > 0
                            ? 6
                            : form.onpremServerApp > 0 ||
                              form.onpremServerDatabase > 0
                            ? 5
                            : 4}
                        </td>

                        <td className="border border-gray-300 p-2">
                          Phí bảo trì hệ thống hàng năm
                        </td>

                        <td className="border border-gray-300 p-2 text-center">
                          Phí
                        </td>

                        <td className="border border-gray-300 p-2 text-right">
                          {formatCurrency(onpremCalculation.maintenance)}
                        </td>
                      </tr>
                    </tbody>

                    <tfoot>
                      <tr>
                        <td
                          colSpan={3}
                          className="border border-gray-300 p-3 text-right font-bold"
                        >
                          TỔNG CHI PHÍ NĂM ĐẦU
                        </td>

                        <td className="border border-gray-300 p-3 text-right font-bold text-orange-600">
                          {formatCurrency(onpremCalculation.firstYear)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  {/* ONPREMISE NOTE */}
                  <div className="quotation-section mt-8 rounded-lg border border-gray-200 p-4 text-sm">
                    <strong>Ghi chú riêng cho phương án On-premise:</strong>

                    <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">
                      <li>
                        Phương án On-premise được triển khai trên hệ thống
                        Server do Quý khách hàng quản lý và vận hành.
                      </li>

                      <li>
                        Chi phí License đã áp dụng mức giảm giá{" "}
                        <strong className="text-green-600">
                          {form.onpremDiscount}%
                        </strong>
                        {form.onpremDiscount > 0
                          ? " theo chính sách thương mại tại thời điểm báo giá."
                          : " hiện chưa áp dụng chiết khấu."}
                      </li>

                      <li>
                        Phí cài đặt và triển khai được tính một lần cho quá
                        trình triển khai hệ thống.
                      </li>

                      <li>
                        Phí tích hợp và phát triển tính năng phát sinh được đánh
                        giá và báo giá riêng theo yêu cầu thực tế.
                      </li>

                      <li>Phí bảo trì hệ thống được áp dụng từ năm thứ 2.</li>

                      <li>
                        Chi phí Server trong báo giá được tính theo cấu hình dự
                        kiến và có thể điều chỉnh theo nhu cầu thực tế của hệ
                        thống.
                      </li>

                      <li>
                        Chi phí trên chưa bao gồm các chi phí phát sinh ngoài
                        phạm vi triển khai nêu trên.
                      </li>
                    </ul>
                  </div>

                  {/* FOOTER PAGE 2 */}
                  <div className="quotation-footer">
                    <div className="quotation-footer-contact">
                      <p className="text-sm leading-5">
                        Mọi thắc mắc, Quý khách vui lòng liên hệ:
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {form.consultantName} - Chuyên viên tư vấn
                      </p>

                      <p className="text-sm">
                        TEL/Zalo: {form.consultantPhone}
                      </p>

                      <p className="text-sm">Email: {form.consultantEmail}</p>
                    </div>

                    <div className="quotation-footer-copyright">
                      <div>COPYRIGHT © 2026</div>
                      <div>Created by NNguyen1202</div>
                      <div>All rights Reserved</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= COMPONENTS ================= */

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="quotation-section mb-4 border-l-[3px] border-orange-500 pl-3">
      <h3 className="text-[14px] font-bold leading-5 text-gray-900">
        {children}
      </h3>
    </div>
  );
}
