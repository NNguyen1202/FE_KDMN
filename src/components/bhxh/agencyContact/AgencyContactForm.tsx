/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  agencies: any[];
  loading: boolean;
}

export default function AgencyContactForm({
  form,
  setForm,
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

      {/* Address */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Địa chỉ
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.address}
          onChange={(e) =>
            handleChange("address", e.target.value)
          }
        />
      </div>

      {/* Phone */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Số điện thoại
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.phone}
          onChange={(e) =>
            handleChange("phone", e.target.value)
          }
        />
      </div>

      {/* Email */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          className="w-full rounded-lg border px-4 py-2"
          value={form.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
        />
      </div>

      {/* Website */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Website
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.website}
          onChange={(e) =>
            handleChange("website", e.target.value)
          }
        />
      </div>

      {/* Working Time */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Giờ làm việc
        </label>

        <textarea
          rows={3}
          className="w-full rounded-lg border px-4 py-2"
          value={form.workingTime}
          onChange={(e) =>
            handleChange("workingTime", e.target.value)
          }
        />
      </div>

      {/* Status */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Trạng thái
        </label>

        <select
          className="w-full rounded-lg border px-4 py-2"
          value={String(form.status)}
          onChange={(e) =>
            handleChange(
              "status",
              e.target.value === "true"
            )
          }
        >
          <option value="true">Hoạt động</option>
          <option value="false">Ngừng hoạt động</option>
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