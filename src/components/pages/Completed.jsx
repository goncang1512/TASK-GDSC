import { useContext, useEffect } from "react";
import { TugasContext } from "../../lib/Context/TugasContext";
import { timeIDN } from "../../lib/utils/parseTime";
import { FaTrash, FaStar } from "react-icons/fa";
import { IoMdBrush } from "react-icons/io";
import ModalEditTugas from "../layouts/ModalEdit";
import { useParams } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { DropDown } from "./Home";
import ReadMoreLess from "../elements/ReadMore";

export default function Completed() {
  const params = useParams();
  const {
    myTask,
    getTugas,
    deleteTugas,
    selectTugas,
    setSelectTugas,
    udpateTugasImportant,
    byContent,
    setKeyword,
    keyword,
  } = useContext(TugasContext);

  useEffect(() => {
    getTugas();
  }, []);

  let penting;
  let task;
  if (params.status === "important") {
    penting = myTask.filter((task) => task.important);
    task = "important";
  } else {
    penting = myTask.filter((task) => task.status === `${params.status}`);
    task = params.status;
  }

  return (
    <main>
      <div className="px-3 pt-3">
        <form
          className="flex items-center w-full px-3 py-2 bg-gray-900 rounded-lg outline-none md:w-max"
          onSubmit={(e) => {
            e.preventDefault();
            byContent(keyword, params.status);
          }}
        >
          <input
            type="text"
            placeholder="search..."
            className="w-full text-white bg-transparent outline-none md:w-96"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              byContent(keyword, params.status);
            }}
          />
          <button type="submit">
            <IoSearchSharp size={20} className="text-white" />
          </button>
        </form>
      </div>
      <div className="w-full px-3 pt-3 text-start">
        <h1 className="text-2xl font-bold text-white">
          {task} task ({penting.length} tugas)
        </h1>
      </div>
      <section className="flex flex-col gap-3 p-3">
        {penting.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full overflow-hidden">
            <p className="text-red-500">Tidak ada content</p>
          </div>
        ) : (
          penting &&
          penting.map((task) => {
            let statusTask = "";
            let classStatus = "";
            switch (task.status) {
              case "uncompleted":
                statusTask = "uncompleted";
                classStatus = "bg-red-500";
                break;
              case "completed":
                statusTask = "completed";
                classStatus = "bg-green-500";
                break;
              case "process":
                statusTask = "process";
                classStatus = "bg-gray-400";
                break;
            }
            return (
              <div
                className={`flex items-center justify-between w-full p-3 text-white ${
                  task.important ? "bg-blue-500" : "bg-gray-900"
                } rounded-lg`}
                key={task.id}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="gap-2">
                    <h2 className="font-bold">{task.mataKuliah}</h2>
                    <ReadMoreLess text={task.deskripsi} maxLength={[90, 150]} />
                  </div>
                  <p>{timeIDN(task.deadLine)}</p>
                </div>
                <div className="items-center hidden gap-2 md:flex">
                  <p
                    className={`${classStatus} flex items-center py-1 px-2 rounded-lg text-center`}
                  >
                    {statusTask}
                  </p>
                  <button
                    onClick={() =>
                      udpateTugasImportant(task.id, !task.important)
                    }
                  >
                    <FaStar
                      size={18}
                      className={
                        task.important ? "text-yellow-500" : "text-white"
                      }
                    />
                  </button>
                  <button onClick={() => deleteTugas(task.id)}>
                    <FaTrash size={18} />
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("edit_tugas").showModal();
                      setSelectTugas(task.id);
                    }}
                  >
                    <IoMdBrush size={25} />
                  </button>
                </div>
                <div className="flex md:hidden">
                  <DropDown
                    classStatus={classStatus}
                    statusTask={statusTask}
                    task={task}
                  />
                </div>
              </div>
            );
          })
        )}
      </section>
      <ModalEditTugas idTugas={selectTugas} />
    </main>
  );
}
