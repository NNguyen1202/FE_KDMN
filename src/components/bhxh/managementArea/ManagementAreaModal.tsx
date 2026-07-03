/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Modal } from "../../ui/modal";
import ManagementAreaForm from "./ManagementAreaForm";

import {
  createManagementArea,
  updateManagementArea,
  getAllProvince,
  getAllAgency,
} from "../../../services/bhxhService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  managementArea?: any;
  onSuccess: () => void | Promise<void>;
}

const defaultForm = {
  wardCode: "",
  wardName: "",
  provinceId: "",
  agencyId: "",
};

export default function ManagementAreaModal({
  isOpen,
  onClose,
  managementArea,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(defaultForm);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [agencies, setAgencies] = useState<any[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    loadMasterData();

    if (managementArea) {
      setForm({
        wardCode: managementArea.wardCode || "",
        wardName: managementArea.wardName || "",
        provinceId:
          managementArea.provinceId?._id || managementArea.provinceId || "",
        agencyId: managementArea.agencyId?._id || managementArea.agencyId || "",
      });
    } else {
      setForm(defaultForm);
    }
  }, [isOpen, managementArea]);

  const loadMasterData = async () => {
    try {
      setLoading(true);

      const [provinceRes, agencyRes]: any = await Promise.all([
        getAllProvince(),
        getAllAgency(),
      ]);

      setProvinces(
        Array.isArray(provinceRes.data)
          ? provinceRes.data
          : provinceRes.data?.data ?? [],
      );

      setAgencies(
        Array.isArray(agencyRes.data)
          ? agencyRes.data
          : agencyRes.data?.data ?? [],
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.wardCode.trim()) {
      alert("Vui lòng nhập mã xã/phường.");
      return;
    }

    if (!form.wardName.trim()) {
      alert("Vui lòng nhập tên xã/phường.");
      return;
    }

    if (!form.provinceId) {
      alert("Vui lòng chọn tỉnh.");
      return;
    }

    if (!form.agencyId) {
      alert("Vui lòng chọn cơ quan BHXH.");
      return;
    }

    try {
      setSaving(true);

      let res;

      if (managementArea?._id) {
        res = await updateManagementArea(managementArea._id, form);
      } else {
        res = await createManagementArea(form);
      }

      console.log("Create success:", res.data);

      try {
        await onSuccess();
      } catch (reloadError) {
        console.error("Reload error:", reloadError);
      }

      onClose();
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err);
      alert(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold">
          {managementArea ? "Cập nhật xã / phường" : "Thêm xã / phường"}
        </h2>
      </div>

      <div className="py-6">
        <ManagementAreaForm
          form={form}
          setForm={setForm}
          provinces={provinces}
          agencies={agencies}
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
