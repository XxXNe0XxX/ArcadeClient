import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
const ClientDashFooter = () => {
  return (
    <div className="sticky  self-end items-center max-h-10  w-full bg-color2 flex z-10 justify-between p-1">
      <h1>ClientDashFooter</h1>
      <Link to={"/"}>
        <button>
          <FontAwesomeIcon icon={faHouseChimney}></FontAwesomeIcon>{" "}
        </button>
      </Link>
    </div>
  );
};

export default ClientDashFooter;
