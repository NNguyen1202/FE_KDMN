/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
  agencies: any[];
  loading: boolean;
}

export default function PaymentAccountForm({
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

      {/* Bank */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Ngân hàng
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.bankName}
          onChange={(e) =>
            handleChange("bankName", e.target.value)
          }
          placeholder="VD: Vietcombank"
        />
      </div>

      {/* Account Name */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Tên tài khoản
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.accountName}
          onChange={(e) =>
            handleChange("accountName", e.target.value)
          }
          placeholder="Tên chủ tài khoản"
        />
      </div>

      {/* Account Number */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Số tài khoản
        </label>

        <input
          className="w-full rounded-lg border px-4 py-2"
          value={form.accountNumber}
          onChange={(e) =>
            handleChange("accountNumber", e.target.value)
          }
          placeholder="Nhập số tài khoản"
        />
      </div>

      {/* Transfer Content */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Nội dung chuyển khoản
        </label>

        <textarea
          rows={3}
          className="w-full rounded-lg border px-4 py-2"
          value={form.transferContent}
          onChange={(e) =>
            handleChange(
              "transferContent",
              e.target.value
            )
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
              e.target.value === "true"
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