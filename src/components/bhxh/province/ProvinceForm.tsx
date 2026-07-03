/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProvinceForm({
  form,
  setForm,
}: Props) {
  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-5">

      {/* Province Code */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
          Mã tỉnh / thành phố <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          value={form.provinceCode}
          onChange={(e) =>
            handleChange("provinceCode", e.target.value)
          }
          placeholder="Ví dụ: 66"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

      {/* Province Name */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
          Tên tỉnh / thành phố <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          value={form.provinceName}
          onChange={(e) =>
            handleChange("provinceName", e.target.value)
          }
          placeholder="Ví dụ: Đắk Lắk"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />
      </div>

    </div>
  );
}