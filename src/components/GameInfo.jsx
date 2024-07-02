// GameInfo.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const GameInfo = () => {
  const { game, creditsPerGame, running } = useParams();

  // Dummy data for game information. Replace with actual data as needed.
  const gameInfo = {
    "Guitar Hero Arcade": {
      description:
        "Guitar Hero Arcade es un juego de ritmo musical donde los jugadores usan un controlador en forma de guitarra para simular tocar música rock.",
      image: "/assets/images/Guitar Hero Arcade.jpg",
    },
    "Mario Kart DX": {
      description:
        "Mario Kart DX es un juego de carreras de arcade donde los jugadores compiten usando karts y potenciadores.",
      image: "/assets/images/Mario Kart DX.jpg",
    },
    "Ultra Street Fighter IV": {
      description:
        "Ultra Street Fighter IV es un juego de lucha que presenta una gran lista de personajes con habilidades y estilos de lucha únicos.",
      image: "/assets/images/Ultra Street Fighter IV.jpg",
    },
  };
  const currentGame = gameInfo[game];

  return (
    <div className=" flex m-auto md:flex-row flex-col p-6 ">
      <div className="md:w-1/3 w-full md:h-[600px] h-[400px] overflow-hidden flex items-center justify-center border  rounded-lg">
        <img
          src={currentGame.image}
          alt={game}
          className="object-cover w-full h-full  "
        />
      </div>
      <div className="md:w-2/3 w-full md:pl-6 p-6">
        <h1 className="text-3xl font-bold mb-4">{game}</h1>
        <p className="text-md mb-4">{currentGame.description}</p>
        <div className="flex justify-between items-center md:flex ">
          <div className=" border p-1 rounded-md px-2">
            <h1>
              Partida
              <span className="flex items-center gap-1">
                X {creditsPerGame}
                <img
                  className="h-8 w-8"
                  src="/src/assets/icons/cherries.png"
                ></img>
              </span>{" "}
            </h1>
          </div>
          <div
            className={`px-4 py-2 rounded ${
              running === "true" ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {running === "true" ? "Activa" : "Inactiva"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameInfo;
