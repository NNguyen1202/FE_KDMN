/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import {
  createAgency,
  updateAgency,
  getAllProvince,
} from "../../../services/bhxhService";
import AgencyForm from "./AgencyForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  agency?: any;
  onSuccess: () => void;
}

interface Province {
  _id: string;
  provinceCode: string;
  provinceName: string;
  
}

const defaultForm = {
  agencyCode: "",
  agencyName: "",
  provinceId: "",
  status: true,
};

export default function AgencyModal({
  isOpen,
  onClose,
  agency,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [provinces, setProvinces] = useState<Province[]>([]);

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!isOpen) return;

    loadProvince();

    if (agency) {
      setForm({
        agencyCode: agency.agencyCode || "",
        agencyName: agency.agencyName || "",
        provinceId: agency.provinceId?._id || agency.provinceId || "",
        status: agency.status,
      });
    } else {
      setForm(defaultForm);
    }
  }, [isOpen, agency]);

  const loadProvince = async () => {
    try {
      setLoading(true);

      const res: any = await getAllProvince();

      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];

      setProvinces(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.agencyCode.trim()) {
      alert("Vui lòng nhập mã cơ quan.");
      return;
    }

    if (!form.agencyName.trim()) {
      alert("Vui lòng nhập tên cơ quan.");
      return;
    }

    if (!form.provinceId) {
      alert("Vui lòng chọn tỉnh.");
      return;
    }

    try {
      setSaving(true);

      if (agency?._id) {
        await updateAgency(agency._id, form);
      } else {
        await createAgency(form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);
      alert("Có lỗi xảy ra.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {agency ? "Cập nhật cơ quan BHXH" : "Thêm cơ quan BHXH"}
        </h2>
      </div>

      <div className="py-6">
        <AgencyForm
          form={form}
          setForm={setForm}
          provinces={provinces}
          loading={loading}
        />
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
        <button onClick={onClose} className="rounded-lg border px-5 py-2">
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
