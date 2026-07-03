/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import AgencyContactForm from "./AgencyContactForm";

import {
  createAgencyContact,
  updateAgencyContact,
  getAllAgency,
} from "../../../services/bhxhService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  agencyContact?: any;
  onSuccess: () => void | Promise<void>;
}

const defaultForm = {
  agencyId: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  workingTime: "",
  status: true,
};

export default function AgencyContactModal({
  isOpen,
  onClose,
  agencyContact,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [agencies, setAgencies] = useState<any[]>([]);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!isOpen) return;

    loadAgency();

    if (agencyContact) {
      setForm({
        agencyId: agencyContact.agencyId?._id || agencyContact.agencyId || "",

        address: agencyContact.address || "",
        phone: agencyContact.phone || "",
        email: agencyContact.email || "",
        website: agencyContact.website || "",
        workingTime: agencyContact.workingTime || "",
        status: agencyContact.status ?? true,
      });
    } else {
      setForm(defaultForm);
    }
  }, [isOpen, agencyContact]);

  const loadAgency = async () => {
    try {
      setLoading(true);

      const res: any = await getAllAgency();

      setAgencies(Array.isArray(res.data) ? res.data : res.data?.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.agencyId) {
      return alert("Vui lòng chọn cơ quan.");
    }

    try {
      setSaving(true);

      if (agencyContact?._id) {
        await updateAgencyContact(agencyContact._id, form);
      } else {
        await createAgencyContact(form);
      }

      await onSuccess();

      onClose();
    } catch (err: any) {
      console.error(err);

      alert(err.response?.data?.message ?? "Có lỗi xảy ra.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl p-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {agencyContact ? "Cập nhật liên hệ cơ quan" : "Thêm liên hệ cơ quan"}
        </h2>
      </div>

      <div className="py-6">
        <AgencyContactForm
          form={form}
          setForm={setForm}
          agencies={agencies}
          loading={loading}
        />
      </div>

      <div className="flex justify-end gap-3 border-t pt-4">
        <button onClick={onClose} className="rounded-lg border px-5 py-2">
          Hủy
        </button>

        <button
          disabled={saving}
          onClick={handleSubmit}
          className="rounded-lg bg-brand-500 px-5 py-2 text-white"
        >
          {saving ? "Đang lưu..." : "Lưu"}
        </button>
      </div>
    </Modal>
  );
}
