import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div>
      No autorizado{" "}
      <button onClick={() => navigate(-1)}>
        Regresar
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button onClick={() => navigate("/")}>
        Inicio
        <FontAwesomeIcon icon={faHouse} />
      </button>
    </div>
  );
};

export default Unauthorized;
