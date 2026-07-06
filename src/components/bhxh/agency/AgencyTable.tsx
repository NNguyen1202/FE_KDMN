/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AgencyModal from "./AgencyModal";
import { deleteAgency } from "../../../services/bhxhService";

interface Agency {
  _id: string;
  agencyCode: string;
  agencyName: string;
  provinceId?: {
    _id: string;
    provinceName: string;
  };
  status?: boolean;
}

interface Props {
  data: Agency[];
  loading: boolean;
  reload: () => void | Promise<void>;
}

export default function AgencyTable({ data, loading, reload }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const [selectedAgency, setSelectedAgency] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    try {
      await deleteAgency(id);

      await reload();
    } catch (err) {
      console.error(err);

      alert("Xóa thất bại.");
    }
  };

  console.log("Data: ",data);
  

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => {
            setSelectedAgency(null);
            setOpenModal(true);
          }}
          className="rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          + Thêm cơ quan
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 w-20">STT</th>

              <th className="px-4 py-3 text-left">Mã cơ quan</th>

              <th className="px-4 py-3 text-left">Tên cơ quan</th>

              <th className="px-4 py-3 text-left">Tỉnh / Thành</th>

              <th className="px-4 py-3">Trạng thái</th>

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
                <tr key={item._id} className="border-t dark:border-gray-700">
                  <td className="px-4 py-3 text-center">{index + 1}</td>

                  <td className="px-4 py-3">{item.agencyCode}</td>

                  <td className="px-4 py-3">{item.agencyName}</td>

                  <td className="px-4 py-3">
                    {item.provinceId?.provinceName ?? "-"}
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
                          setSelectedAgency(item);
                          setOpenModal(true);
                        }}
                        className="rounded bg-blue-100 p-2 text-blue-600"
                      >
                        <Pencil />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded bg-red-100 p-2 text-red-600"
                      >
                        <Trash2 />
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

      <AgencyModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        agency={selectedAgency}
        onSuccess={reload}
      />
    </>
  );
}
