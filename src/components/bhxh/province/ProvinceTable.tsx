/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { deleteProvince } from "../../../services/bhxhService";
import ProvinceModal from "./ProvinceModal";

interface Province {
  _id: string;
  provinceCode: string;
  provinceName: string;
}

interface Props {
  data: Province[];
  loading: boolean;
  reload: () => void | Promise<void>;
}

export default function ProvinceTable({
  data,
  loading,
  reload,
}: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa tỉnh này?")) return;

    try {
      await deleteProvince(id);
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
            setSelectedProvince(null);
            setOpenModal(true);
          }}
          className="rounded-lg bg-green-600 px-5 py-2 text-white"
        >
          + Thêm tỉnh / thành
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 w-20">STT</th>
              <th className="px-4 py-3 text-left">Mã tỉnh</th>
              <th className="px-4 py-3 text-left">Tên tỉnh / thành phố</th>
              <th className="px-4 py-3 w-40 text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="py-10 text-center">
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
                    {item.provinceCode}
                  </td>

                  <td className="px-4 py-3">
                    {item.provinceName}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => {
                          setSelectedProvince(item);
                          setOpenModal(true);
                        }}
                        className="rounded bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                      >
                        <Pencil />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="rounded bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      >
                        <Trash2 />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

            {!loading && data.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-gray-500"
                >
                  Chưa có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProvinceModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        province={selectedProvince}
        onSuccess={reload}
      />
    </>
  );
}