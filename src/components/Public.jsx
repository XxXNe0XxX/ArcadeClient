import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import "./machine.css";
const Public = () => {
  const [games, setGames] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    let isMounted = true;
    const getGames = async () => {
      try {
        const response = await axios.get("/api/arcademachines");
        if (isMounted) {
          const uniqueGames = [];
          const gameNames = new Set();
          response?.data.forEach((machine) => {
            if (!gameNames.has(machine.Game)) {
              gameNames.add(machine.Game);
              uniqueGames.push(machine);
            }
          });
          setGames(uniqueGames);
        }
      } catch (error) {
        if (isMounted) {
          setMsg("Error solicitando los juegos disponibles");
        }
      }
    };
    getGames();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col ">
      <div className="relative flex justify-center">
        <h1 className=" absolute top-5 rounded-3xl bg-black  text-center px-5 py-2 md:text-5xl text-2xl border-color1 border text-color1 tracking-tighter font-press-start">
          Arcade!
        </h1>
        <img
          src="/assets/images/heroHD.png"
          className=" opacity-90  object-cover rounded-md  max-w-[1400px] -z-10 max-h-[70vh] h-full w-full  mt-10 flex items-center justify-center"
        ></img>
      </div>

      <section className="p-2 mt-12 flex flex-col">
        <h1 className="font-press-start text-2xl text-center text-color1 p-3">
          Juegos Disponibles
        </h1>
        {msg ? (
          <p className="p-2">Mensaje del servidor: {msg}</p>
        ) : (
          <ul className=" flex flex-col space-y-10 max-w-[1200px] m-auto">
            {games?.map((each) => {
              return (
                <Link
                  key={each.MachineID}
                  to={`gameinfo/${each.Game}/${each.CreditsPerGame}/${each.Running}`}
                  className="cursor-pointer"
                >
                  <li className="relative group">
                    <img
                      className="w-full h-40 rounded-md border object-cover "
                      src={`/assets/gamesArt/${each.Game}.jpg`}
                    ></img>
                    <h1 className="absolute -bottom-8 text-color4 backdrop-blur-lg right-0 p-2  opacity-0 transition-all w-full group-hover:opacity-100">
                      {each.Game}
                    </h1>
                  </li>
                </Link>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Public;
