import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import axios from "../api/axios";
import { useEffect, useState } from "react";

const Public = () => {
  const [games, setGames] = useState([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    let isMounted = false;
    const getGames = async () => {
      try {
        const response = await axios.get("/api/arcademachines");
        setGames(response?.data);
      } catch (error) {
        setMsg("Error solicitando los juegos disponibles");
      }
    };
    getGames();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="relative flex justify-center pb-4">
        <h1 className=" absolute top-5 rounded-3xl bg-black  text-center px-5 py-2 text-3xl text-color1 tracking-tighter font-press-start">
          Bienvenid@
        </h1>
        <img
          src="/src/assets/images/hero.png"
          className="h-80 md:h-[600px] w-full object-cover "
        ></img>
      </div>

      <div className="flex *:border flex-col gap-2"></div>
      <section className="p-2">
        <h1 className="font-press-start text-xl text-center text-color1 p-3">
          Juegos Disponibles
        </h1>
        {msg ? (
          <p className="p-2">Mensaje del servidor: {msg}</p>
        ) : (
          <ul className=" flex flex-col space-y-10">
            {games?.map((each) => {
              return (
                <li className="relative group" key={each.MachineID}>
                  <img
                    className="w-full h-24 object-cover "
                    src={`/src/assets/gamesArt/${each.Game}.jpg`}
                  ></img>
                  <h1 className="absolute -bottom-8 text-color4 backdrop-blur-lg right-0 p-2  opacity-0 transition-all w-full group-hover:opacity-100">
                    {each.Game}
                  </h1>
                </li>
              );
            })}
          </ul>
        )}
        <div className=" overflow-hidden absolute bottom-0 right-0 -z-10">
          <div className="relative rounded-full bg-color3 translate-x-[50px] translate-y-16">
            <img
              className="h-40 w-40"
              src="/src/assets/icons/arcade-cabinet.png"
            ></img>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Public;
