import { createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const TugasContext = createContext();

export default function TugasContextProvider({ children }) {
  const navigate = useNavigate();
  const [dataTugas, setDataTugas] = useState({
    mataKuliah: "",
    namaTugas: "",
    deadLine: "",
    deskripsi: "",
  });
  const [updateTugas, setUpdateTugas] = useState({
    id: "",
    mataKuliah: "",
    namaTugas: "",
    deadLine: "",
    deskripsi: "",
    status: "",
    important: null,
  });
  const [myTask, setMyTask] = useState([]);
  const [dataById, setDataById] = useState();
  const [selectTugas, setSelectTugas] = useState("");
  const [seeNavbar, setSeeNavbar] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [lineClamp, setLineClamp] = useState(false);
  const [idClamp, setIdClamp] = useState("");

  const addTugas = useCallback(
    async (body) => {
      try {
        const existingData = JSON.parse(localStorage.getItem("listTugas"));

        const newData =
          existingData && Array.isArray(existingData) ? existingData : [];

        const formData = {
          id: uuidv4(),
          mataKuliah: body.mataKuliah,
          deadLine: body.deadLine,
          deskripsi: body.deskripsi,
          status: "uncompleted",
          important: false,
        };

        newData.push(formData);

        localStorage.setItem("listTugas", JSON.stringify(newData));
        setDataTugas({
          ...dataTugas,
          mataKuliah: "",
          deadLine: "",
          deskripsi: "",
        });

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    },
    [dataTugas]
  );

  const getTugas = useCallback(() => {
    try {
      const response = JSON.parse(localStorage.getItem("listTugas"));
      const sortedTasks = response.sort((a, b) => {
        if (a.status === "completed" && b.status !== "completed") {
          return 1;
        }
        if (b.status === "completed" && a.status !== "completed") {
          return -1;
        }
        return new Date(a.deadLine) - new Date(b.deadLine);
      });

      const completedTasks = sortedTasks.filter(
        (task) => task.status === "completed"
      );
      const incompletedTasks = sortedTasks.filter(
        (task) => task.status !== "completed"
      );

      const result = [...incompletedTasks, ...completedTasks];
      setMyTask(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteTugas = useCallback(
    (id) => {
      try {
        const updatedTasks = myTask && myTask.filter((task) => task.id !== id);
        setMyTask(updatedTasks);
        localStorage.setItem("listTugas", JSON.stringify(updatedTasks));
      } catch (error) {
        console.log(error);
      }
    },
    [myTask]
  );

  const getDataById = useCallback((id) => {
    try {
      const data = JSON.parse(localStorage.getItem("listTugas"));

      const result = data.find((item) => item.id === id);
      setDataById(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const udpateTugasId = useCallback((id, body) => {
    try {
      const tasks = JSON.parse(localStorage.getItem("listTugas"));
      const result = tasks.sort(
        (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
      );
      const index = tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        tasks[index] = body;
        localStorage.setItem("listTugas", JSON.stringify(result));

        setMyTask(tasks);
        document.getElementById("edit_tugas").close();
      } else {
        console.log("Tugas dengan ID yang diberikan tidak ditemukan.");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const udpateTugasImportant = useCallback((id, important) => {
    try {
      const tasks = JSON.parse(localStorage.getItem("listTugas"));
      const index = tasks.findIndex((task) => task.id === id);
      const result = tasks.sort(
        (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
      );

      if (index !== -1) {
        tasks[index].important = important;
        localStorage.setItem("listTugas", JSON.stringify(result));
        setMyTask(tasks);
      } else {
        console.log("Tugas dengan ID yang diberikan tidak ditemukan.");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const searchTugas = useCallback((keyword) => {
    try {
      const response = JSON.parse(localStorage.getItem("listTugas"));
      const filteredResult = response.filter(
        (task) =>
          task.mataKuliah.toLowerCase().includes(keyword.toLowerCase()) ||
          task.deskripsi.toLowerCase().includes(keyword.toLowerCase())
      );
      const sortedResult = filteredResult.sort(
        (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
      );
      setMyTask(sortedResult);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const byContent = useCallback((keyword, params) => {
    try {
      const response = JSON.parse(localStorage.getItem("listTugas"));
      let penting;
      if (params === "important") {
        penting = response.filter((task) => task.important);
      } else {
        penting = response.filter((task) => task.status === `${params}`);
      }
      const filteredResult = penting.filter(
        (task) =>
          task.mataKuliah.toLowerCase().includes(keyword.toLowerCase()) ||
          task.deskripsi.toLowerCase().includes(keyword.toLowerCase())
      );
      const sortedResult = filteredResult.sort(
        (a, b) => new Date(a.deadLine) - new Date(b.deadLine)
      );
      setMyTask(sortedResult);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <TugasContext.Provider
      value={{
        dataTugas,
        setDataTugas,
        addTugas,
        getTugas,
        myTask,
        deleteTugas,
        getDataById,
        dataById,
        updateTugas,
        setUpdateTugas,
        udpateTugasId,
        selectTugas,
        setSelectTugas,
        udpateTugasImportant,
        seeNavbar,
        setSeeNavbar,
        searchTugas,
        keyword,
        setKeyword,
        byContent,
        lineClamp,
        setLineClamp,
        idClamp,
        setIdClamp,
      }}
    >
      {children}
    </TugasContext.Provider>
  );
}
