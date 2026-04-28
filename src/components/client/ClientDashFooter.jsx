import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
const ClientDashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => {
    navigate("/clientdash");
  };

  let goHomeButton;
  if (pathname !== "/clientdash") {
    goHomeButton = (
      <button title="Home" onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  return (
    <div className="flex justify-between p-4 bg-color2">
      <h1>Client Panel</h1>
      {goHomeButton}
    </div>
  );
};

export default ClientDashFooter;
