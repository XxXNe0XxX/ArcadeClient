import axios from "../../api/axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const { setAuth } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post("/auth/logout");
      response?.status === 200 && setMessage("Logged out");
      setAuth({});
      localStorage.removeItem("email");
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <button onClick={handleLogout} className="p-1  text-color1">
      Logout <FontAwesomeIcon className="" icon={faSignOut} />{" "}
      {message && <p>{message}</p>}
    </button>
  );
};

export default Logout;
