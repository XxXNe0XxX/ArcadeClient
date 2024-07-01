import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {
  faHouseChimney,
  faPeopleArrows,
  faPersonCirclePlus,
  faCoins,
  faGamepad,
  faCashRegister,
  faQrcode,
  faWrench,
  faQuestion,
  faQuestionCircle,
  faLocation,
} from "@fortawesome/free-solid-svg-icons";
import Pacmanopen from "../assets/icons/Pacmanopen";
import Pacmanclosed from "../assets/icons/Pacmanclosed";
const Navbar = () => {
  const [open, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!location.pathname.includes("/dash" || "/clientdash") && (
        <nav className="text-color4 z-20 sticky p-1 flex items-center justify-between bg-color4 font-pixel-emulator w-full tracking-tighter overflow-hidden">
          <div
            ref={navRef}
            className={` ${
              open ? "w-[250px]" : "w-0"
            } fixed h-full z-10 top-0 left-0 bg-color2 overflow-x-hidden transition-all py-3 flex flex-col`}
          >
            <button
              className="group text-end px-2"
              onClick={() => setIsOpen(!open)}
            >
              <span className="group-hover:border-color1 group-hover:text-color1 transition-colors border p-1">
                X
              </span>
            </button>
            <ul className="p-3 flex flex-col justify-center gap-6">
              <Link to="/">
                <li
                  className="hover:border-color1 hover:text-color1 border p-1 transition-all"
                  onClick={() => setIsOpen(!open)}
                >
                  <FontAwesomeIcon icon={faHouseChimney} /> Inicio
                </li>
              </Link>
              <Link to="recoverqr">
                <li
                  className="hover:border-color1 hover:text-color1 border p-1 transition-all"
                  onClick={() => setIsOpen(!open)}
                >
                  <FontAwesomeIcon icon={faQrcode} /> Recuperar QR
                </li>
              </Link>
              <Link to="contact">
                <li
                  className="hover:border-color1 hover:text-color1 border p-1 transition-all"
                  onClick={() => setIsOpen(!open)}
                >
                  <FontAwesomeIcon icon={faWrench} /> Soporte
                </li>
              </Link>
              <Link to="howitworks">
                <li
                  className="hover:border-color1 hover:text-color1 border p-1 transition-all"
                  onClick={() => setIsOpen(!open)}
                >
                  <FontAwesomeIcon icon={faQuestion} /> Como funciona
                </li>
              </Link>
              <Link to="faq">
                <li
                  className="hover:border-color1 hover:text-color1 border p-1 transition-all"
                  onClick={() => setIsOpen(!open)}
                >
                  <FontAwesomeIcon icon={faQuestionCircle} /> Preguntas
                </li>
              </Link>
              {/* <Link to="locations">
                <li
                  className="hover:border-color1 hover:text-color1 border p-1 transition-all"
                  onClick={() => setIsOpen(!open)}
                >
                  <FontAwesomeIcon icon={faLocation} /> Ubicaciones
                </li>
              </Link> */}
              <Link to="phrase">
                <div className="border hover:h-20 hover:w-full bg-[url('./assets/images/bricks.jpg')] hover:blur-none w-1 blur-sm transition-all bg-cover bg-repeat-x bg-center"></div>
              </Link>
            </ul>
          </div>
          <button
            onClick={() => setIsOpen(!open)}
            className={`${open ? "ml-[250px]" : ""} transition-all`}
          >
            {open ? <Pacmanopen /> : <Pacmanclosed />}
          </button>
          {location.pathname === "/login" ? (
            <button className="text-color1 px-2">
              <Link to="/">
                Inicio
                <FontAwesomeIcon
                  className="px-1"
                  icon={faHouseChimney}
                ></FontAwesomeIcon>
              </Link>
            </button>
          ) : (
            <button className="p-1 flex text-color1">
              <Link to="login">
                Login
                <FontAwesomeIcon
                  className="px-1 animate-bounce"
                  icon={faArrowRight}
                ></FontAwesomeIcon>
              </Link>
            </button>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
