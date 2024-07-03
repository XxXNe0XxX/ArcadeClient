import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const [msg, setMsg] = useState("");
  const [attempts, setAttempts] = useState(() => {
    const savedAttempts = localStorage.getItem("attempts");
    return savedAttempts ? parseInt(savedAttempts) : 3;
  });
  const [isTimeout, setIsTimeout] = useState(() => {
    const savedTimeout = localStorage.getItem("timeout");
    return savedTimeout ? parseInt(savedTimeout) > 0 : false;
  });
  const [timeout, setTimeoutState] = useState(() => {
    const savedTimeout = localStorage.getItem("timeout");
    return savedTimeout ? parseInt(savedTimeout) : 60;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isTimeout) return; // Disable submit during timeout

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
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
      localStorage.setItem("email", email);
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
      setAttempts((prev) => {
        const newAttempts = prev - 1;
        localStorage.setItem("attempts", newAttempts);
        return newAttempts;
      });
      setMsg(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  useEffect(() => {
    let timeoutId;
    if (attempts === 0) {
      setIsTimeout(true);
      timeoutId = setInterval(() => {
        setTimeoutState((prev) => {
          if (prev === 1) {
            clearInterval(timeoutId);
            localStorage.removeItem("timeout");
            localStorage.setItem("attempts", 3);
            setAttempts(3);
            setIsTimeout(false);
            return 60; // Reset timeout
          }
          localStorage.setItem("timeout", prev - 1);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timeoutId);
  }, [attempts]);

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        <img
          key={i}
          className="h-8 w-9"
          src={
            i < 3 - attempts
              ? "assets/icons/heartEmpty.png"
              : "assets/icons/heart.png"
          }
          alt={i < 3 - attempts ? "Empty Heart" : "Full Heart"}
        />
      );
    }
    return hearts;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[25vh] justify-center h-full rounded-md flex max-w-[600px] p-2 min-w-[350px] m-auto flex-col bg-color2"
    >
      <h1 className="text-3xl font-press-start py-2 text-center">Login</h1>
      <input
        className="border-color3 border-2 mx-4 my-1 p-2"
        placeholder="correo"
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border-color3 border-2 mx-4 my-1 p-2"
        placeholder="********"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        className="flex justify-center items-center gap-2 bg-color1 p-2 my-2 disabled:bg-color3 "
        disabled={isTimeout} // Disable button during timeout
      >
        Continuar
        <span className="text-sm font-press-start block">...</span>?
      </Button>
      <div className="flex items-center justify-end gap-2 p-2">
        <label
          className={`${
            persist ? "text-color4" : "text-color3"
          } transition-colors`}
          htmlFor="persist"
        >
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
      <div className="flex items-center justify-end gap-2 p-2">
        {attempts != 0 && renderHearts()}
        {attempts === 0 && (
          <>
            {isTimeout && (
              <div className="text-center text-red-600">
                Espera {timeout} segundos antes de intentar nuevamente.
              </div>
            )}
            <img
              className="h-12 w-12"
              src="assets/icons/grave.png"
              alt="Grave"
            />
          </>
        )}
      </div>
      {msg && <h1 className="text-center border-color1 border p-2">{msg}</h1>}
    </form>
  );
};

export default Login;
