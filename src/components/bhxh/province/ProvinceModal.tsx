/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import ProvinceForm from "./ProvinceForm";
import {
  createProvince,
  updateProvince,
} from "../../../services/bhxhService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  province?: any;
  onSuccess: () => void | Promise<void>;
}

const defaultForm = {
  provinceCode: "",
  provinceName: "",
};

export default function ProvinceModal({
  isOpen,
  onClose,
  province,
  onSuccess,
}: Props) {
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!isOpen) return;

    if (province) {
      setForm({
        provinceCode: province.provinceCode || "",
        provinceName: province.provinceName || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [isOpen, province]);

  const handleSubmit = async () => {
    if (!form.provinceCode.trim()) {
      alert("Vui lòng nhập mã tỉnh.");
      return;
    }

    if (!form.provinceName.trim()) {
      alert("Vui lòng nhập tên tỉnh.");
      return;
    }

    try {
      setSaving(true);

      if (province?._id) {
        await updateProvince(province._id, form);
      } else {
        await createProvince(form);
      }

      await onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Có lỗi xảy ra."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-2xl p-6"
    >
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {province
            ? "Cập nhật tỉnh / thành phố"
            : "Thêm tỉnh / thành phố"}
        </h2>
      </div>

      <div className="py-6">
        <ProvinceForm
          form={form}
          setForm={setForm}
        />
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          onClick={onClose}
          className="rounded-lg border px-5 py-2"
        >
          Hủy
        </button>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="rounded-lg bg-brand-500 px-5 py-2 text-white"
        >
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </Modal>
  );
}