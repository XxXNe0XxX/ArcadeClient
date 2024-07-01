import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => {
    navigate("/dash");
  };
  let goHomeButton;
  if (pathname !== "/") {
    goHomeButton = (
      <button title="Home" onClick={onGoHomeClicked}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }
  return (
    <div className="flex justify-between p-1 bg-color2">
      <h1>Administracion</h1>
      {goHomeButton}
    </div>
  );
};

export default DashFooter;
