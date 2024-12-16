// Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {
  faHouseChimney,
  faQrcode,
  faWrench,
  faQuestion,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence, px } from "framer-motion";

const Navbar = () => {
  const [open, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const [count, setCount] = useState(10);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {!location.pathname.includes("/dash") &&
        !location.pathname.includes("/clientdash") && (
          <nav className="text-color4 z-20 flex items-center justify-between bg-repeat bg-bottom bg-contain fixed top-0 left-0 w-full shadow-lg bg-[url('/assets/images/bricks.png')]">
            {/* Background Overlay */}
            <div className="flex absolute justify-center w-full h-full -z-30 ">
              <div className="bg-black opacity-20 flex-grow h-16"></div>
              <div
                className="bg-black opacity-20 w-[60px] hover:bg-transparent hover:opacity-100 transition-all h-16"
                onClick={() => {
                  setCount((prev) => prev - 1);
                }}
              >
                {count === 0 && (
                  <Link to="/phrase">
                    <button onClick={() => setCount(0)}>Found</button>
                  </Link>
                )}
              </div>
              <div className="bg-black opacity-20 flex-grow h-16"></div>
            </div>

            {/* Sidebar Menu */}
            <AnimatePresence>
              {open && (
                <motion.div
                  ref={navRef}
                  initial={{ width: 0 }}
                  animate={{ width: 250 }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed h-full z-20 top-0 left-0  overflow-hidden  flex flex-col border-r-2 border-color3 bg-[rgba(55,58,64,0.6)]"
                >
                  <button
                    className="group text-end px-4 h-16 flex items-center justify-end "
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="group-hover:border-color1 group-hover:text-color1 transition-colors border p-1 ">
                      X
                    </span>
                  </button>
                  <div className="h-[1px] w-[90%] mx-auto bg-color3"> </div>
                  <ul className="p-4 flex flex-col justify-center gap-6 *:border *:border-color4 *:p-2 *:rounded-md *:w-[200px] *:m-auto  *:bg-[rgba(55,58,64,1)]">
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="/"
                      className="flex items-center gap-2 hover:text-color1 hover:border-color1 transition-colors "
                    >
                      <FontAwesomeIcon icon={faHouseChimney} /> Inicio
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="recoverqr"
                      className="flex items-center gap-2 hover:text-color1 hover:border-color1 transition-colors"
                    >
                      <FontAwesomeIcon icon={faQrcode} /> Recuperar QR
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="contact"
                      className="flex items-center gap-2 hover:text-color1 hover:border-color1 transition-colors"
                    >
                      <FontAwesomeIcon icon={faWrench} /> Soporte
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="howitworks"
                      className="flex items-center gap-2 hover:text-color1 hover:border-color1 transition-colors"
                    >
                      <FontAwesomeIcon icon={faQuestion} /> Cómo funciona
                    </Link>
                    <Link
                      onClick={() => setIsOpen(false)}
                      to="faq"
                      className="flex items-center gap-2 hover:text-color1 hover:border-color1 transition-colors"
                    >
                      <FontAwesomeIcon icon={faQuestionCircle} /> Preguntas
                    </Link>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!open)}
              className="transition-all p-2"
            >
              <motion.div
                className="h-12 w-12"
                animate={{ x: open ? 250 : 0 }} // Move horizontally to the right
                transition={{ duration: 0.3 }}
              >
                {open ? (
                  <img
                    className="h-full w-full"
                    src="/assets/icons/pacmanopen.png"
                    alt="Menu Open"
                  />
                ) : (
                  <img
                    className="h-full w-full"
                    src="/assets/icons/pacmanclosed.png"
                    alt="Menu Closed"
                  />
                )}
              </motion.div>
            </button>

            {/* Login or Home Button */}
            <Link to={location.pathname === "/login" ? "/" : "login"}>
              <button className="p-2 mr-4 flex items-center text-color1 bg-color5 rounded-md hover:bg-color1 hover:text-white  hover:translate-y-[2px] hover:border-color2 border-b-[3px] border-color3 transition-all">
                {location.pathname === "/login" ? "Inicio" : "Login"}
                <FontAwesomeIcon
                  className="px-1 animate-bounce"
                  icon={
                    location.pathname === "/login"
                      ? faHouseChimney
                      : faArrowRight
                  }
                />
              </button>
            </Link>
          </nav>
        )}
    </>
  );
};

export default Navbar;
