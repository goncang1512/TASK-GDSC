import { useContext } from "react";
import { TugasContext } from "../../lib/Context/TugasContext";

export default function Navbar() {
  const { seeNavbar, setSeeNavbar } = useContext(TugasContext);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setSeeNavbar(isChecked);
  };

  return (
    <div className="fixed z-50 top-0 right-0 flex items-center justify-between w-full px-3 text-white bg-gray-900 h-14 md:hidden">
      <h1 className="font-semibold">MY TASK</h1>
      <div className={`${seeNavbar === true && "text-red-500"}`}>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={seeNavbar}
            onChange={handleCheckboxChange}
          />
          <svg
            className="fill-current swap-off"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <svg
            className="fill-current swap-on"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>
    </div>
  );
}
