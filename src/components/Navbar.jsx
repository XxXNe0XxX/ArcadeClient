import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { useState } from "react";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const [open, setIsOpen] = useState(false);
  const location = useLocation();
  return (
    <>
      {!location.pathname.includes("/dash" || "/clientdash") && (
        <nav className="text-color4 z-20 sticky p-1 flex items-center justify-between bg-color4 font-pixel-emulator tracking-tighter">
          <div
            className={` ${
              open ? "w-[250px]" : "w-0"
            } fixed h-full z-10 top-0 left-0 bg-color2 overflow-x-hidden transition-all py-3 flex flex-col`}
          >
            <button
              className=" group text-end px-2 "
              onClick={() => setIsOpen(!open)}
            >
              <span className="group-hover:border-color1 group-hover:text-color1 transition-colors border p-1  ">
                X
              </span>
            </button>
            <ul className="p-3">
              <li href="#">About</li>
              <li href="#">Services</li>
              <li href="#">Clients</li>
              <li href="#">Contact</li>
            </ul>
          </div>
          <button onClick={() => setIsOpen(!open)}>
            {open ? (
              <img
                className="h-10 w-10 transition-all ml-[250px]"
                src="src/assets/icons/pacmenuclosed.png"
              />
            ) : (
              <img className="h-10 w-10" src="src/assets/icons/pacmenu.png" />
            )}
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
            <button className="p-1 flex  text-color1">
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
