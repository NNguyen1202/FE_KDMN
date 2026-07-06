/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import PaymentAccountForm from "./PaymentAccountForm";

import {
  createPaymentAccount,
  updatePaymentAccount,
  getAllAgency,
} from "../../../services/bhxhService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  paymentAccount?: any;
  onSuccess: () => void | Promise<void>;
}

const defaultForm = {
  agencyId: "",
  bankName: "",
  accountName: "",
  accountNumber: "",
  transferContent: "",
  note: "",
  status: true,
};

export default function PaymentAccountModal({
  isOpen,
  onClose,
  paymentAccount,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [agencies, setAgencies] = useState<any[]>([]);

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (!isOpen) return;

    loadAgency();

    if (paymentAccount) {
      setForm({
        agencyId:
          paymentAccount.agencyId?._id ||
          paymentAccount.agencyId ||
          "",

        bankName:
          paymentAccount.bankName || "",

        accountName:
          paymentAccount.accountName || "",

        accountNumber:
          paymentAccount.accountNumber || "",

        transferContent:
          paymentAccount.transferContent || "",

        note:
          paymentAccount.note || "",

        status:
          paymentAccount.status ?? true,
      });
    } else {
      setForm(defaultForm);
    }
  }, [isOpen, paymentAccount]);

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
      return alert("Vui lòng chọn cơ quan.");
    }

    if (!form.bankName.trim()) {
      return alert("Vui lòng nhập tên ngân hàng.");
    }

    if (!form.accountName.trim()) {
      return alert("Vui lòng nhập tên tài khoản.");
    }

    if (!form.accountNumber.trim()) {
      return alert("Vui lòng nhập số tài khoản.");
    }

    try {
      setSaving(true);

      if (paymentAccount?._id) {
        await updatePaymentAccount(
          paymentAccount._id,
          form,
        );
      } else {
        await createPaymentAccount(form);
      }

      await onSuccess();

      onClose();
    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.message ??
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
      className="max-w-3xl p-6"
    >
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {paymentAccount
            ? "Cập nhật tài khoản đóng tiền"
            : "Thêm tài khoản đóng tiền"}
        </h2>
      </div>

      <div className="py-6">
        <PaymentAccountForm
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