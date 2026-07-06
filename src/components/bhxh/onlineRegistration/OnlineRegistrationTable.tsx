/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import OnlineRegistrationModal from "./OnlineRegistrationModal";

import { deleteOnlineRegistration } from "../../../services/bhxhService";

interface Props {
  data: any[];
  loading: boolean;
  reload: () => void | Promise<void>;
}

export default function OnlineRegistrationTable({
  data,
  loading,
  reload,
}: Props) {
  const [openModal, setOpenModal] = useState(false);

  const [selectedData, setSelectedData] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    try {
      await deleteOnlineRegistration(id);

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
            setSelectedData(null);
            setOpenModal(true);
          }}
          className="rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          + Thêm đăng ký Online
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 w-20">STT</th>

              <th className="px-4 py-3 text-left">
                Cơ quan
              </th>

              <th className="px-4 py-3 text-center">
                Online
              </th>

              <th className="px-4 py-3 text-left">
                URL
              </th>

              <th className="px-4 py-3 text-center">
                Trạng thái
              </th>

              <th className="px-4 py-3 text-center">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center"
                >
                  Đang tải dữ liệu...
                </td>
              </tr>
            )}

            {!loading &&
              data.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-t dark:border-gray-700"
                >
                  <td className="px-4 py-3 text-center">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3">
                    {item.agencyId?.agencyName ??
                      "-"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {item.supportOnline ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                        Có
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600">
                        Không
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {item.registerUrl || "-"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {item.status ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                        Hoạt động
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-600">
                        Ngừng
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedData(item);
                          setOpenModal(true);
                        }}
                        className="rounded bg-blue-100 p-2 text-blue-600"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
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
                <td
                  colSpan={6}
                  className="py-8 text-center text-gray-500"
                >
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <OnlineRegistrationModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onlineRegistration={selectedData}
        onSuccess={reload}
      />
    </>
  );
}