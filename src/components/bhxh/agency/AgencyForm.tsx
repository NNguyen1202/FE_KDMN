/* eslint-disable @typescript-eslint/no-explicit-any */

interface Province {
  _id: string;
  provinceCode: string;
  provinceName: string;
}

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  provinces: Province[];
  loading: boolean;
}

export default function AgencyForm({
  form,
  setForm,
  provinces,
  loading,
}: Props) {
  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-5">
      {/* Agency Code */}

      <div>
        <label className="mb-2 block text-sm font-medium">Mã cơ quan</label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.agencyCode}
          onChange={(e) => handleChange("agencyCode", e.target.value)}
        />
      </div>

      {/* Agency Name */}

      <div>
        <label className="mb-2 block text-sm font-medium">Tên cơ quan</label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.agencyName}
          onChange={(e) => handleChange("agencyName", e.target.value)}
        />
      </div>

      {/* Province */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Tỉnh / Thành phố
        </label>

        <select
          className="w-full rounded-lg border px-4 py-2"
          value={form.provinceId}
          onChange={(e) => handleChange("provinceId", e.target.value)}
        >
          <option value="">-- Chọn tỉnh / thành phố --</option>

          {provinces.map((province) => (
            <option key={province._id} value={province._id}>
              {province.provinceCode} - {province.provinceName}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}

      <div>
        <label className="mb-2 block text-sm font-medium">Trạng thái</label>

        <select
          className="w-full rounded-lg border px-4 py-2"
          value={String(form.status)}
          onChange={(e) => handleChange("status", e.target.value === "true")}
        >
          <option value="true">Hoạt động</option>

          <option value="false">Ngừng hoạt động</option>
        </select>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">Đang tải dữ liệu...</div>
      )}
    </div>
  );
}
