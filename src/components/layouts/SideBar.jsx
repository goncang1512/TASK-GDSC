import { Link } from "react-router-dom";
import { TimeClock } from "../../lib/utils/parseTime";
import { useContext } from "react";
import { TugasContext } from "../../lib/Context/TugasContext";

export default function SideBar() {
  const { seeNavbar } = useContext(TugasContext);
  return (
    <div
      className={`fixed left-0 flex flex-col justify-between h-screen text-white bg-gray-900 border-r border-gray-800 w-60 duration-300 ease-in-out ${
        seeNavbar ? "translate-x-[0]" : "translate-x-[-100%] md:translate-x-[0]"
      } `}
    >
      <div className="flex flex-col items-center justify-center w-full gap-5 pt-5">
        <h1 className="font-semibold text-white">MY TASK</h1>
        <div className="flex items-center justify-center w-full p-3">
          <Link
            to={"/tugas"}
            className="w-full py-3 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Tugas Baru
          </Link>
        </div>
        <div className="flex flex-col w-full gap-3 p-3 justiyf-center">
          <Link to={"/"} className="text-Start">
            All tasks
          </Link>
          <Link to={"/mytask/important"} className="text-Start">
            Important tasks
          </Link>
          <Link to={"/mytask/completed"} className="text-Start">
            Completed tasks
          </Link>
          <Link to={"/mytask/uncompleted"} className="text-Start">
            Uncompleted tasks
          </Link>
          <Link to={"/mytask/process"} className="text-Start">
            Works
          </Link>
        </div>
      </div>
      <div>
        <TimeClock />
      </div>
    </div>
  );
}
