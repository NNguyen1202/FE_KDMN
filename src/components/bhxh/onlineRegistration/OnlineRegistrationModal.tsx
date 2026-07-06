/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import OnlineRegistrationForm from "./OnlineRegistrationForm";

import {
  createOnlineRegistration,
  updateOnlineRegistration,
  getAllAgency,
} from "../../../services/bhxhService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onlineRegistration?: any;
  onSuccess: () => void | Promise<void>;
}

const defaultForm = {
  agencyId: "",
  supportOnline: false,
  registerUrl: "",
  guide: "",
  note: "",
  status: true,
};

export default function OnlineRegistrationModal({
  isOpen,
  onClose,
  onlineRegistration,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [agencies, setAgencies] = useState<any[]>([]);

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!isOpen) return;

    loadAgency();

    if (onlineRegistration) {
      setForm({
        agencyId:
          onlineRegistration.agencyId?._id ||
          onlineRegistration.agencyId ||
          "",

        supportOnline:
          onlineRegistration.supportOnline ?? false,

        registerUrl:
          onlineRegistration.registerUrl || "",

        guide:
          onlineRegistration.guide || "",

        note:
          onlineRegistration.note || "",

        status:
          onlineRegistration.status ?? true,
      });
    } else {
      setForm(defaultForm);
    }
  }, [isOpen, onlineRegistration]);

  const loadAgency = async () => {
    try {
      setLoading(true);

      const res: any = await getAllAgency();

      setAgencies(
        Array.isArray(res.data)
          ? res.data
          : res.data?.data ?? [],
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.agencyId) {
      return alert("Vui lòng chọn cơ quan BHXH.");
    }

    try {
      setSaving(true);

      if (onlineRegistration?._id) {
        await updateOnlineRegistration(
          onlineRegistration._id,
          form,
        );
      } else {
        await createOnlineRegistration(form);
      }

      await onSuccess();

      onClose();
    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.message ??
          "Có lỗi xảy ra.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-3xl p-6"
    >
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {onlineRegistration
            ? "Cập nhật đăng ký online"
            : "Thêm đăng ký online"}
        </h2>
      </div>

      <div className="py-6">
        <OnlineRegistrationForm
          form={form}
          setForm={setForm}
          agencies={agencies}
          loading={loading}
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