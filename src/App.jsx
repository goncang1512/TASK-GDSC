import { Outlet, useLocation } from "react-router-dom";
import TugasContextProvider from "./lib/Context/TugasContext";
import SideBar from "./components/layouts/SideBar";
import Navbar from "./components/layouts/Navbar";
import "./App.css";

function App() {
  const location = useLocation();
  let classUrl = "";
  if (location.pathname === "/tugas") {
    classUrl = "overflow-hidden";
  } else {
    classUrl = "overflow-auto";
  }

  return (
    <>
      <TugasContextProvider>
        <SideBar />
        <Navbar />
        <div
          className={`md:ml-60 ml-0 md:pr-[20rem] pr-0 h-screen bg-gray-800 ${classUrl} md:pt-0 pt-14`}
        >
          <Outlet />
        </div>
      </TugasContextProvider>
    </>
  );
}

export default App;
