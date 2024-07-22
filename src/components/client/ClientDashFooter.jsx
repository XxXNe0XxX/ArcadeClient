import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
const ClientDashFooter = () => {
  return (
    <div className="bottom-0 items-center max-h-10  w-full bg-color2 flex z-10 justify-between p-1">
      <h1>Panel de administracion</h1>
      <Link to={"/"}>
        <button>
          <FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>{" "}
        </button>
      </Link>
    </div>
  );
};

export default ClientDashFooter;
