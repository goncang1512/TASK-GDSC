import { Link, useLocation, useParams } from "react-router-dom";
import { TimeClock } from "../../lib/utils/parseTime";
import { useContext } from "react";
import { TugasContext } from "../../lib/Context/TugasContext";

export default function SideBar() {
  const { seeNavbar } = useContext(TugasContext);
  const params = useParams();
  const pathname = useLocation();

  console.log(params);
  console.log("pathname", pathname);

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
            className={`${
              pathname.pathname === "/tugas" && "bg-blue-700"
            } w-full py-3 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700`}
          >
            Tugas Baru
          </Link>
        </div>
        <div className="flex flex-col w-full gap-3 p-3 justiyf-center">
          <Link
            to={"/"}
            className={`text-Start px-3 py-2 rounded-lg hover:bg-gray-800 ${
              pathname.pathname === `/` && "bg-gray-800"
            }`}
          >
            All tasks
          </Link>
          <Link
            to={"/mytask/important"}
            className={`text-Start px-3 py-2 rounded-lg hover:bg-gray-800 ${
              pathname.pathname === `/mytask/important` && "bg-gray-800"
            }`}
          >
            Important tasks
          </Link>
          <Link
            to={"/mytask/completed"}
            className={`text-Start px-3 py-2 rounded-lg hover:bg-gray-800 ${
              pathname.pathname === `/mytask/completed` && "bg-gray-800"
            }`}
          >
            Completed tasks
          </Link>
          <Link
            to={"/mytask/uncompleted"}
            className={`text-Start px-3 py-2 rounded-lg hover:bg-gray-800 ${
              pathname.pathname === `/mytask/uncompleted` && "bg-gray-800"
            }`}
          >
            Uncompleted tasks
          </Link>
          <Link
            to={"/mytask/process"}
            className={`text-Start px-3 py-2 rounded-lg hover:bg-gray-800 ${
              pathname.pathname === `/mytask/process` && "bg-gray-800"
            }`}
          >
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
