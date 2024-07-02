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
    <div className="flex flex-col relative">
      <div className="relative flex justify-center pb-4">
        <h1 className=" absolute top-5 rounded-3xl bg-black  text-center px-5 py-2 md:text-5xl text-2xl text-color1 tracking-tighter font-press-start">
          Arcade!
        </h1>
        <img
          src="/assets/images/hero1.jpg"
          className="h-[95vh] md:h-[600px] w-full object-cover "
        ></img>
      </div>

      {/* 

*/}
      <div className="md:flex hidden justify-between absolute  w-full md:h-[60vh] h-[45vh]  items-end overflow-hidden ">
        <div className="machine shake-slow machine2  ">
          <div className="shine"></div>
          <div className="top w-full">
            <div className="screwTop"></div>
            <div className="panels">
              <div className="panel"></div>
              <div className="panel"></div>
              <div className="panel"></div>
            </div>
          </div>
          <div className="flex">
            <div className="screen"></div>
            <div className="w-full bg-[#3498db]"></div>
          </div>
          <div className="table color">
            <div className="button"></div>
            <div className="stick"></div>
          </div>
          <div className="bottom color">
            <div className="line"></div>
            <div className="line"></div>
            <div className="screw"></div>
            <div className="panels">
              <div className="panel"></div>
              <div className="panel"></div>
              <div className="panel"></div>
              <div className="panel"></div>
              <div className="panel"></div>
            </div>
            <div className="screwRight"></div>
          </div>
        </div>
        {/* 

*/}
        {/*
         */}
        <div className="machine shake-slow ">
          <div className="shine"></div>
          <div className="top w-full">
            <div className="screwTop"></div>
            <div className="panels">
              <div className="panel"></div>
              <div className="panel"></div>
              <div className="panel"></div>
            </div>
          </div>
          <div className="flex">
            <div className="screen"></div>
            <div className="w-full bg-[#3498db]"></div>
          </div>
          <div className="table color">
            <div className="button"></div>
            <div className="stick"></div>
          </div>
          <div className="bottom color">
            <div className="line"></div>
            <div className="line"></div>
            <div className="screw"></div>
            <div className="panels">
              <div className="panel"></div>
              <div className="panel"></div>
              <div className="panel"></div>
              <div className="panel"></div>
              <div className="panel"></div>
            </div>
            <div className="screwRight"></div>
          </div>
        </div>
        {/*
         */}
      </div>

      <div className="flex *:border flex-col gap-2"></div>
      <section className="p-2 mt-12">
        <h1 className="font-press-start text-2xl text-center text-color1 p-3">
          Juegos Disponibles
        </h1>
        {msg ? (
          <p className="p-2">Mensaje del servidor: {msg}</p>
        ) : (
          <ul className=" flex flex-col space-y-10 max-w-[800px] m-auto">
            {games?.map((each) => {
              return (
                <Link
                  key={each.MachineID}
                  to={`gameinfo/${each.Game}/${each.CreditsPerGame}/${each.Running}`}
                  className="cursor-pointer"
                >
                  <li className="relative group">
                    <img
                      className="w-full h-32 object-cover "
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
        <div className=" overflow-hidden fixed  bottom-0 right-0 -z-10">
          <div className="relative rounded-full bg-color4 translate-x-[50px] translate-y-16">
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
