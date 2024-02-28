import { useContext, useEffect } from "react";
import { TugasContext } from "../../lib/Context/TugasContext";
import InputTugas, { AreaInput, SelectInput } from "../elements/InputTugas";

const ModalEditTugas = ({ idTugas }) => {
  const { getDataById, dataById, updateTugas, setUpdateTugas, udpateTugasId } =
    useContext(TugasContext);
  useEffect(() => {
    getDataById(idTugas);
  }, [idTugas]);

  useEffect(() => {
    if (dataById) {
      setUpdateTugas({
        id: dataById.id || "",
        mataKuliah: dataById.mataKuliah || "",
        deadLine: dataById.deadLine || "",
        deskripsi: dataById.deskripsi || "",
        status: dataById.status || "",
        important: dataById.important,
      });
    }
  }, [dataById]);

  return (
    <dialog id="edit_tugas" className="modal">
      <div className="modal-box">
        <form
          className="flex flex-col gap-2 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            udpateTugasId(idTugas, updateTugas);
          }}
        >
          <InputTugas
            width={true}
            placeholder="mata kuliah"
            type="text"
            value={updateTugas?.mataKuliah}
            onChange={(e) =>
              setUpdateTugas({ ...updateTugas, mataKuliah: e.target.value })
            }
          >
            Mata Kuliah
          </InputTugas>
          <InputTugas
            width={true}
            placeholder="nama tugas"
            type="date"
            value={updateTugas?.deadLine}
            onChange={(e) =>
              setUpdateTugas({ ...updateTugas, deadLine: e.target.value })
            }
          >
            Deadline
          </InputTugas>
          <SelectInput
            value={updateTugas?.status}
            onChange={(e) =>
              setUpdateTugas({ ...updateTugas, status: e.target.value })
            }
          >
            Status
          </SelectInput>
          <AreaInput
            width={true}
            placeholder="deskripsi"
            type="text"
            value={updateTugas?.deskripsi}
            onChange={(e) =>
              setUpdateTugas({ ...updateTugas, deskripsi: e.target.value })
            }
          >
            Deskripsi
          </AreaInput>
          <button type="submit" className="py-2 border rounded-lg">
            Edit
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ModalEditTugas;
