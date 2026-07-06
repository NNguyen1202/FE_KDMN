/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  agencies: any[];
  loading: boolean;
}

export default function OnlineRegistrationForm({
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
          <option value="">
            -- Chọn cơ quan BHXH --
          </option>

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

      {/* Support Online */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Hỗ trợ đăng ký Online
        </label>

        <select
          className="w-full rounded-lg border px-4 py-2"
          value={String(form.supportOnline)}
          onChange={(e) =>
            handleChange(
              "supportOnline",
              e.target.value === "true",
            )
          }
        >
          <option value="true">Có</option>

          <option value="false">Không</option>
        </select>
      </div>

      {/* Register URL */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          URL đăng ký
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.registerUrl}
          onChange={(e) =>
            handleChange(
              "registerUrl",
              e.target.value,
            )
          }
          placeholder="https://..."
        />
      </div>

      {/* Guide */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Hướng dẫn
        </label>

        <textarea
          rows={4}
          className="w-full rounded-lg border px-4 py-2"
          value={form.guide}
          onChange={(e) =>
            handleChange("guide", e.target.value)
          }
        />
      </div>

      {/* Note */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Ghi chú
        </label>

        <textarea
          rows={3}
          className="w-full rounded-lg border px-4 py-2"
          value={form.note}
          onChange={(e) =>
            handleChange("note", e.target.value)
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
              e.target.value === "true",
            )
          }
        >
          <option value="true">
            Hoạt động
          </option>

          <option value="false">
            Ngừng hoạt động
          </option>
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