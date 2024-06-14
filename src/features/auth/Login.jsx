import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";
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
        JSON.stringify({ ClientEmail: email, ClientPassword: password }),
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
      console.log(JSON.stringify(response.data));
      if (role === "Admin") {
        navigate("/dash");
      } else if (role === "Client") {
        navigate("/clientdash");
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
      className=" relative  mt-[20%] rounded-md flex max-w-[600px] p-7 min-w-[350px] m-auto flex-col bg-color2"
    >
      <h1 className="text-3xl font-press-start py-2 text-center">Login</h1>
      <input
        className="border-color3 border p-2 "
        placeholder="email"
        type="text"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        className="border-color3 border p-2 "
        placeholder="********"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        type="submit"
        className="flex justify-center  items-center gap-2 bg-color1 p-2 "
      >
        Continue<span className="text-sm font-press-start block">...</span>?
      </button>
      <div className="flex items-center justify-end gap-1 py-4">
        <label className="text-color1" htmlFor="persist">
          Confias en el dispositivo
        </label>
        <input
          className=""
          type="checkbox"
          id="persist"
          onChange={() => setPersist((prev) => !prev)}
          checked={persist}
        ></input>
      </div>
      {msg && <h1 className=" text-center border-color1 border p-2">{msg}</h1>}
    </form>
  );
};

export default Login;