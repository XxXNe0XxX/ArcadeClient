import Logout from "../../features/auth/Logout";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faCashRegister,
  faChartBar,
  faCoins,
  faGamepad,
  faHouseChimney,
  faMoneyBill,
  faMoneyBillTransfer,
  faPeopleArrows,
  faPerson,
  faPersonCirclePlus,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons/faMoneyCheckDollar";
const DashHeader = () => {
  const [open, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(!open);
    return setIsOpen(false);
  }, [location]);

  return (
    <nav className="text-color4 z-20 sticky w-scree p-1 flex items-center justify-between bg-color4 font-pixel-emulator tracking-tighter ">
      <div
        className={` ${
          open ? "w-[250px]" : "w-0"
        } fixed h-full z-10 top-0 left-0 bg-color2 overflow-x-hidden transition-all py-3 flex flex-col`}
      >
        <div className="flex justify-between">
          <button className="text-color1 border bg-color4  ml-2 px-2 rounded-md text-3xl">
            {localStorage.getItem("email").charAt(0)}
          </button>
          <button
            className=" group text-end px-2 "
            onClick={() => setIsOpen(!open)}
          >
            <span className="group-hover:border-color1 group-hover:text-color1 transition-colors border p-1  ">
              X
            </span>
          </button>
        </div>
        <ul className="p-3  *:h-8 flex flex-col justify-center gap-6 ">
          <Link to="/dash">
            <li className="hover:border-color1 hover:text-color1 border p-1 transition-all">
              <FontAwesomeIcon icon={faHouseChimney} /> Inicio
            </li>
          </Link>
          <Link to="clients">
            <li className="hover:border-color1  hover:text-color1 border p-1 transition-all">
              <FontAwesomeIcon icon={faPeopleArrows} /> Clientes
            </li>
          </Link>
          <Link to="createclient">
            <li className="hover:border-color1  hover:text-color1 border p-1 transition-all">
              <FontAwesomeIcon icon={faPersonCirclePlus} /> Nuevo Cliente
            </li>
          </Link>

          <Link to="createarcade">
            <li className="hover:border-color1  hover:text-color1 border p-1 transition-all">
              <FontAwesomeIcon icon={faCoins} /> Crear Arcade
            </li>
          </Link>
          <Link to="machines">
            <li className="hover:border-color1  hover:text-color1 border p-1 transition-all">
              <FontAwesomeIcon icon={faGamepad} /> Arcades
            </li>
          </Link>
          <Link to="accounting">
            <li className="hover:border-color1  hover:text-color1 border p-1 transition-all">
              <FontAwesomeIcon icon={faCashRegister} /> Contabilidad
            </li>
          </Link>
          <Link to="transactions">
            <li className="hover:border-color1  hover:text-color1 border p-1 transition-all">
              <FontAwesomeIcon icon={faArrowRightArrowLeft} /> Transacciones
            </li>
          </Link>
          <Link to="expense">
            <li className="hover:border-color1  hover:text-color1 border p-1 transition-all">
              <FontAwesomeIcon icon={faMoneyBillTransfer} /> Generar Gasto
            </li>
          </Link>

          {/* <Link to="generate">
            <li className="hover:border-color1 hover:text-color1 border p-1 transition-all ">
              <FontAwesomeIcon icon={faQrcode} /> Generar QR
            </li>
          </Link>
          <Link to="sessions">
            <li className="hover:border-color1 hover:text-color1 border p-1 transition-all ">
              <FontAwesomeIcon icon={faChartBar} /> Sesiones
            </li>
          </Link>
          <Link to="statistics">
            <li className="hover:border-color1 hover:text-color1 border p-1 transition-all ">
              <FontAwesomeIcon icon={faChartBar} /> Estadisticas
            </li>
          </Link>
          <Link to="qrcodes">
            <li className="hover:border-color1 hover:text-color1 border p-1 transition-all ">
              <FontAwesomeIcon icon={faQrcode} /> Codigos QR
            </li>
          </Link> */}
        </ul>
      </div>
      <button
        className="text-color2 flex gap-2"
        onClick={() => setIsOpen(true)}
      >
        <img className="h-6 w-6" src="/src/assets/icons/joystick.png"></img>Menu
      </button>
      <h1 className="text-color1">
        <Logout />
      </h1>
    </nav>
  );
};

export default DashHeader;
