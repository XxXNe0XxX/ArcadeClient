import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons/faBackward";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div>
      Unauthorized{" "}
      <button onClick={() => navigate(-1)}>
        Go back
        <FontAwesomeIcon icon={faBackward} />
      </button>
      <button onClick={() => navigate("/")}>
        Go Home
        <FontAwesomeIcon icon={faHouse} />
      </button>
    </div>
  );
};

export default Unauthorized;
