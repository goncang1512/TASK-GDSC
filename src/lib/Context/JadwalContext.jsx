import { createContext, useCallback, useState } from "react";

export const JadwalContext = createContext(null);

export default function JadwalContextProvider({ children }) {
  const [listJadwal, setListJadwal] = useState([]);
  const [dataJadwal, setDataJadwal] = useState({
    id: "",
    hari: "",
    waktu: [],
  });

  const [dataWaktu, setDatawaktu] = useState({
    jam: "",
    matkul: "",
  });

  const getJadwal = useCallback(async () => {
    try {
      const storedData = await JSON.parse(localStorage.getItem("listJadwal"));
      let response;
      if (storedData) {
        const hari = [
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
          "Minggu",
        ];

        response = storedData.sort((a, b) => {
          return hari.indexOf(a.hari) - hari.indexOf(b.hari);
        });
      } else {
        response = [];
      }

      setListJadwal(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const uploadJadwal = useCallback(async (body) => {
    try {
      const existingData = JSON.parse(localStorage.getItem("listJadwal"));

      const newData =
        existingData && Array.isArray(existingData) ? existingData : [];

      newData.push(body);
      localStorage.setItem("listJadwal", JSON.stringify(newData));

      setListJadwal((prev) => [...prev, body]);
      setDataJadwal({ hari: "", waktu: [] });
      document.getElementById("modal-add-jadwal").close();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteRoster = useCallback(
    async (id) => {
      try {
        const updateJadwal =
          listJadwal && listJadwal.filter((data) => data.id !== id);
        setListJadwal(updateJadwal);
        localStorage.setItem("listJadwal", JSON.stringify(updateJadwal));
      } catch (error) {
        console.log(error);
      }
    },
    [listJadwal]
  );

  return (
    <JadwalContext.Provider
      value={{
        getJadwal,
        listJadwal,
        dataJadwal,
        setDataJadwal,
        dataWaktu,
        setDatawaktu,
        uploadJadwal,
        deleteRoster,
      }}
    >
      {children}
    </JadwalContext.Provider>
  );
}
