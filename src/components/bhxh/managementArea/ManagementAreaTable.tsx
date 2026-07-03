/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteManagementArea } from "../../../services/bhxhService";
import ManagementAreaModal from "./ManagementAreaModal";

interface ManagementArea {
  _id: string;
  wardCode: string;
  wardName: string;
  agencyId?: {
    _id: string;
    agencyName: string;
  };
  provinceId?: {
    _id: string;
    provinceName: string;
  };
}

interface Props {
  data: ManagementArea[];
  loading: boolean;
  reload: () => void | Promise<void>;
}

export default function ManagementAreaTable({ data, loading, reload }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    try {
      await deleteManagementArea(id);
      await reload();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại.");
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => {
            setSelectedItem(null);
            setOpenModal(true);
          }}
          className="rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          + Thêm xã / phường
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">STT</th>
              <th className="px-4 py-3 text-left">Mã</th>
              <th className="px-4 py-3 text-left">Tên xã / phường</th>
              <th className="px-4 py-3 text-left">Tỉnh / Thành</th>
              <th className="px-4 py-3 text-left">Cơ quan BHXH</th>
              <th className="px-4 py-3">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="py-10 text-center">
                  Đang tải dữ liệu...
                </td>
              </tr>
            )}

            {!loading &&
              data.map((item, index) => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-3">{index + 1}</td>

                  <td>{item.wardCode}</td>

                  <td>{item.wardName}</td>

                  <td className="px-4 py-3">
                    {item.provinceId?.provinceName ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    {item.agencyId?.agencyName ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setOpenModal(true);
                        }}
                        className="rounded bg-blue-100 p-2 text-blue-600"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded bg-red-100 p-2 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ManagementAreaModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        managementArea={selectedItem}
        onSuccess={reload}
      />
    </>
  );
}
