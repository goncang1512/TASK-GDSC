import { useContext } from "react";
import InputTugas, { AreaInput } from "../elements/InputTugas";
import { TugasContext } from "../../lib/Context/TugasContext";

export default function Tugas() {
  const { dataTugas, setDataTugas, addTugas } = useContext(TugasContext);
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <form
        className="flex flex-col gap-2 p-5 bg-white border rounded-md shadow-[35px_60px_15px_rgba(5,5,5,0.3)]"
        onSubmit={(e) => {
          e.preventDefault();
          addTugas(dataTugas);
        }}
      >
        <InputTugas
          placeholder="mata kuliah"
          type="text"
          value={dataTugas.mataKuliah}
          htmlFor="matakuliah"
          onChange={(e) =>
            setDataTugas({ ...dataTugas, mataKuliah: e.target.value })
          }
        >
          Mata Kuliah
        </InputTugas>
        <InputTugas
          placeholder="deadline"
          type="date"
          htmlFor="deadline"
          value={dataTugas.deadLine}
          onChange={(e) =>
            setDataTugas({ ...dataTugas, deadLine: e.target.value })
          }
        >
          Deadline
        </InputTugas>
        <AreaInput
          placeholder="deskripsi"
          type="text"
          htmlFor="deskripsi"
          value={dataTugas.deskripsi}
          onChange={(e) =>
            setDataTugas({ ...dataTugas, deskripsi: e.target.value })
          }
        >
          Deskripsi
        </AreaInput>
        <button type="submit" className="py-2 border rounded-lg">
          Tambah Tugas
        </button>
      </form>
    </main>
  );
}
