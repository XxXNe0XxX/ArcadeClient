import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const ClientChangePassword = ({ email }) => {
  const axiosPrivate = useAxiosPrivate();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState("");
  const [msg, setMsg] = useState("");
  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        `/api/clients/changePassword/${email}`,
        JSON.stringify({
          currentPassword: currentPassword,
          newPassword: password,
        })
      );
      if (response.statusText === "OK") {
        setMsg("Contraseña cambiada con exito");
      }
    } catch (error) {
      setMsg(error.message);
    }
  };
  return (
    <form className="p-1">
      <label htmlFor="currentpassword">Contraseña actual</label>
      <div className="flex items-center gap-1">
        <input
          type={showCurrent ? "text" : "password"}
          id="currentpassword"
          className="w-full p-1 font-press-start"
          placeholder="********"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        ></input>
        {showCurrent ? (
          <FontAwesomeIcon
            onClick={() => setShowCurrent(!showCurrent)}
            icon={faEye}
            className=" w-8 h-8 scale-75 "
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            onClick={() => setShowCurrent(!showCurrent)}
            icon={faEyeSlash}
            className=" w-8 h-8 scale-75 "
          ></FontAwesomeIcon>
        )}
      </div>
      <label htmlFor="password">Nueva contraseña</label>
      <div className="flex items-center gap-1">
        <input
          type={show ? "text" : "password"}
          id="password"
          className="w-full p-1 font-press-start"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {show ? (
          <FontAwesomeIcon
            onClick={() => setShow(!show)}
            icon={faEye}
            className=" w-8 h-8 scale-75 "
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            onClick={() => setShow(!show)}
            icon={faEyeSlash}
            className=" w-8 h-8 scale-75 "
          ></FontAwesomeIcon>
        )}
      </div>
      <label htmlFor="repeatpassword">Repetir contraseña</label>
      <div className="flex items-center gap-1">
        <input
          type={showRepeat ? "text" : "password"}
          id="repeatpassword"
          className="w-full p-1 font-press-start"
          placeholder="********"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        ></input>
        {showRepeat ? (
          <FontAwesomeIcon
            onClick={() => setShowRepeat(!showRepeat)}
            icon={faEye}
            className=" w-8 h-8 scale-75 "
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            onClick={() => setShowRepeat(!showRepeat)}
            icon={faEyeSlash}
            className=" w-8 h-8  scale-75"
          ></FontAwesomeIcon>
        )}
      </div>

      <button
        type="submit"
        className="p-1 text-center border w-full bg-color1"
        onClick={changePassword}
      >
        Cambiar
      </button>
      {msg && <h1 className="border border-color1 p-1">{msg}</h1>}
    </form>
  );
};

export default ClientChangePassword;
