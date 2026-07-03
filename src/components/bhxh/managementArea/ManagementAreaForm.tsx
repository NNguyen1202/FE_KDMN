/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  provinces: any[];
  agencies: any[];
  loading: boolean;
}

export default function ManagementAreaForm({
  form,
  setForm,
  provinces,
  agencies,
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
      {/* Mã xã/phường */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Mã xã / phường
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.wardCode}
          onChange={(e) =>
            handleChange("wardCode", e.target.value)
          }
        />
      </div>

      {/* Tên xã/phường */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Tên xã / phường
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.wardName}
          onChange={(e) =>
            handleChange("wardName", e.target.value)
          }
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
          onChange={(e) =>
            handleChange("provinceId", e.target.value)
          }
        >
          <option value="">-- Chọn tỉnh / thành phố --</option>

          {provinces.map((province) => (
            <option
              key={province._id}
              value={province._id}
            >
              {province.provinceCode} - {province.provinceName}
            </option>
          ))}
        </select>
      </div>

      {/* Agency */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Cơ quan BHXH
        </label>

        <select
          className="w-full rounded-lg border px-4 py-2"
          value={form.agencyId}
          onChange={(e) =>
            handleChange("agencyId", e.target.value)
          }
        >
          <option value="">-- Chọn cơ quan BHXH --</option>

          {agencies.map((agency) => (
            <option
              key={agency._id}
              value={agency._id}
            >
              {agency.agencyCode} - {agency.agencyName}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="text-sm text-gray-500">
          Đang tải dữ liệu...
        </div>
      )}
    </div>
  );
}