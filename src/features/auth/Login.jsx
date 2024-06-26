import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      const accessToken = response?.data?.accessToken;
      const role = response?.data.role;
      setAuth({ accessToken, role });
      response?.status === 200 && localStorage.setItem("email", email);
      if (role === "ADMIN") {
        navigate("/dash");
      } else if (role === "CLIENT") {
        navigate("/clientdash");
      } else if (role === "TECHNICIAN") {
        navigate("/techniciandash");
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
      setMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[25vh] justify-center h-full rounded-md flex max-w-[600px] p-2 min-w-[350px] m-auto flex-col bg-color2"
    >
      <h1 className="text-3xl font-press-start py-2 text-center">Login</h1>
      <input
        className="border-color3 border-2 mx-4 my-1 p-2 "
        placeholder="correo"
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="border-color3 border-2 mx-4 my-1 p-2 "
        placeholder="********"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button
        type="submit"
        className="flex justify-center  items-center gap-2 bg-color1 p-2 my-2 "
      >
        Continuar<span className="text-sm font-press-start block">...</span>?
      </Button>
      <div className="flex items-center justify-end gap-2 p-2">
        <label className="text-color3" htmlFor="persist">
          Confio en el dispositivo
        </label>
        <input
          type="checkbox"
          id="persist"
          onChange={() => setPersist((prev) => !prev)}
          checked={persist}
          className="appearance-none w-4 h-4 checked:bg-color1 border default:ring-2 default:ring-white transition-all"
        ></input>
      </div>
      {msg && <h1 className=" text-center border-color1 border p-2">{msg}</h1>}
    </form>
  );
};

export default Login;
