import Logout from "../../features/auth/Logout";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faChartBar,
  faHouseChimney,
  faQrcode,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
const ClientDashHeader = () => {
  const [open, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(!open);
    return setIsOpen(false);
  }, [location]);

  return (
    <nav className="text-color4 z-20 sticky w-full p-4 flex items-center justify-between bg-color4 font-pixel-emulator tracking-tighter ">
      <div
        className={` ${
          open ? "w-[250px]" : "w-0"
        } fixed h-full z-10 top-0 left-0 bg-color2 overflow-x-hidden transition-all py-3 flex flex-col`}
      >
        <div className="flex justify-between">
          <Link to={"profile"}>
            <button className="text-color1 border bg-color4 ml-2 px-2 rounded-md text-3xl">
              {localStorage.getItem("email").charAt(0)}
            </button>
          </Link>
          <button
            className="group text-end px-2"
            onClick={() => setIsOpen(!open)}
          >
            <span className="group-hover:border-color1 group-hover:text-color1 transition-colors border p-1">
              X
            </span>
          </button>
        </div>
        <ul className="p-3 *:h-8 flex flex-col justify-center gap-6 overflow-hidden">
          <Link to="/clientdash">
            <li className="hover:border-color1 hover:rounded-none rounded-lg hover:text-color1 border p-1 transition-all w-full">
              <FontAwesomeIcon icon={faHouseChimney} /> Home
            </li>
          </Link>
          <Link to="transactions">
            <li className="hover:border-color1 hover:rounded-none rounded-lg hover:text-color1 border p-1 transition-all w-full">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} /> Transactions
            </li>
          </Link>
          <Link to="recoverqr">
            <li className="hover:border-color1 hover:rounded-none rounded-lg hover:text-color1 border p-1 transition-all w-full">
              <FontAwesomeIcon icon={faQrcode} /> Recover QR
            </li>
          </Link>
          <Link to="generate">
            <li className="hover:border-color1 hover:rounded-none rounded-lg hover:text-color1 border p-1 transition-all w-full">
              <FontAwesomeIcon icon={faQrcode} /> Generate QR
            </li>
          </Link>
          <Link to="sessions">
            <li className="hover:border-color1 hover:rounded-none rounded-lg hover:text-color1 border p-1 transition-all w-full">
              <FontAwesomeIcon icon={faChartBar} /> Sessions
            </li>
          </Link>
          <Link to="statistics">
            <li className="hover:border-color1 hover:rounded-none rounded-lg hover:text-color1 border p-1 transition-all w-full">
              <FontAwesomeIcon icon={faChartBar} /> Statistics
            </li>
          </Link>
          <Link to="qrcodes">
            <li className="hover:border-color1 hover:rounded-none rounded-lg hover:text-color1 border p-1 transition-all w-full">
              <FontAwesomeIcon icon={faQrcode} /> QR Codes
            </li>
          </Link>
          <Link to="support">
            <li className="hover:border-color1 hover:rounded-none rounded-lg hover:text-color1 border p-1 transition-all w-full">
              <FontAwesomeIcon icon={faWrench} /> Support
            </li>
          </Link>
        </ul>
      </div>
      <button
        className="text-color2 flex gap-2"
        onClick={() => setIsOpen(true)}
      >
        <img
          className="h-6 w-6"
          src="/assets/icons/joystick.png"
          alt="Menu icon"
        />
        Menu
      </button>
      <h1 className="text-color1">
        <Logout />
      </h1>
    </nav>
  );
};

export default ClientDashHeader;
