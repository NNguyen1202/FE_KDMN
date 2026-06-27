/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "../../components/ui/modal";
import RevenueForm from "./RevenueForm";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  reportDate: string;
  record?: any;
  onSuccess: () => void;
}

export default function RevenueModal({
  isOpen,
  closeModal,
  reportDate,
  record,
  onSuccess,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-3xl"
    >
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              {record ? "Cập nhật doanh thu" : "Thêm doanh thu"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Ngày báo cáo:{" "}
              {new Date(reportDate).toLocaleDateString("vi-VN")}
            </p>
          </div>

          <button
            onClick={closeModal}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <RevenueForm
          reportDate={reportDate}
          record={record}
          onSuccess={() => {
            onSuccess();
            closeModal();
          }}
        />
      </div>
    </Modal>
  );
}