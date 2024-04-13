import { useContext, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { JadwalContext } from "../../lib/Context/JadwalContext";
import { FaTrash } from "react-icons/fa6";

export default function Jadwal() {
  const { getJadwal, listJadwal, deleteRoster } = useContext(JadwalContext);

  useEffect(() => {
    getJadwal();
  }, []);

  return (
    <div className="h-auto text-white ">
      <div className="absolute z-40 flex items-center justify-center bg-blue-500 rounded-full right-10 bottom-10 size-14">
        <button
          className="flex items-center justify-center text-5xl"
          onClick={() =>
            document.getElementById("modal-add-jadwal").showModal()
          }
        >
          <FaPlus size={30} />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {listJadwal &&
          listJadwal.map((jadwal) => {
            return (
              <table className="table md:w-[30.7%] w-full" key={jadwal.id}>
                <thead>
                  <tr className="text-white">
                    <th className="text-center bg-gray-500 border" colSpan={2}>
                      <div className="flex items-center justify-center">
                        <p className="w-full text-xl text-end">{jadwal.hari}</p>
                        <button
                          type="button"
                          className="flex justify-end w-[70%]"
                          onClick={() => deleteRoster(jadwal.id)}
                        >
                          <FaTrash size={15} />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="border">
                  {jadwal.waktu.map((time, index) => {
                    return (
                      <tr key={index + 1} className="h-14">
                        <th>{time.jam}</th>
                        <td>{time.matkul}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
      </div>
      <ModalAddJadwal />
    </div>
  );
}

const ModalAddJadwal = () => {
  const { dataJadwal, setDataJadwal, dataWaktu, setDatawaktu, uploadJadwal } =
    useContext(JadwalContext);

  const handleAddMatakuliah = () => {
    setDataJadwal((prevState) => ({
      ...prevState,
      id: uuidv4(),
      waktu: [
        ...prevState.waktu,
        { id: uuidv4(), matkul: dataWaktu.matkul, jam: dataWaktu.jam },
      ],
    }));

    setDatawaktu({ jam: "", matkul: "" });
  };

  const deleteJadwal = async (id) => {
    console.log(id);
    const newDataJadwal = {
      ...dataJadwal,
      waktu: dataJadwal.waktu.filter((data) => data.id !== id),
    };

    setDataJadwal(newDataJadwal);
  };

  return (
    <dialog id="modal-add-jadwal" className="text-black modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
            ✕
          </button>
        </form>
        <div>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              uploadJadwal(dataJadwal);
            }}
          >
            <select
              className="w-full select select-bordered"
              value={dataJadwal.hari}
              onChange={(e) =>
                setDataJadwal({ ...dataJadwal, hari: e.target.value })
              }
              required
            >
              <option disabled value="">
                Pilih hari jadwal
              </option>
              <option>Senin</option>
              <option>Selasa</option>
              <option>Rabu</option>
              <option>Kamis</option>
              <option>Jumat</option>
              <option>Sabtu</option>
              <option>Minggu</option>
            </select>
            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="mata kuliah"
                  className="w-full px-2 py-3 border"
                  value={dataWaktu.matkul}
                  onChange={(e) =>
                    setDatawaktu({ ...dataWaktu, matkul: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="jam"
                  className="w-full px-2 py-3 border"
                  value={dataWaktu.jam}
                  onChange={(e) =>
                    setDatawaktu({ ...dataWaktu, jam: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                className="py-3 border rounded-lg"
                onClick={() => {
                  handleAddMatakuliah();
                }}
              >
                Tambah Matakuliah
              </button>
            </div>
            <button type="submit" className="py-3 bg-blue-500 rounded-lg">
              Add Jadwal
            </button>
          </form>
          <div className="flex flex-wrap gap-2 pt-2">
            {dataJadwal.waktu &&
              dataJadwal.waktu.map((data, index) => {
                return (
                  <div
                    key={index + 1}
                    className="flex items-center gap-2 px-2 py-3 border w-max"
                  >
                    <p>{data.jam}</p>
                    <p>{data.matkul}</p>
                    <button type="button" onClick={() => deleteJadwal(data.id)}>
                      <FaTrash size={15} />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </dialog>
  );
};
