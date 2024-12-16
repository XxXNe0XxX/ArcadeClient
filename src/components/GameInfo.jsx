// GameInfo.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="flex flex-col md:flex-row p-6 max-w-6xl mx-auto ">
      {/* Image Section */}
      <motion.div
        className="md:w-1/2 w-full md:h-[600px] h-[400px] overflow-hidden flex items-center justify-center border rounded-lg shadow-lg"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.img
          src={currentGame.image}
          alt={game}
          className="object-cover w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="md:w-1/2 w-full md:pl-10 p-6 flex flex-col justify-center"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-4 text-color1 font-press-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {game}
        </motion.h1>
        <motion.p
          className="text-lg mb-6 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {currentGame.description}
        </motion.p>

        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mt-6">
          <motion.div
            className="flex items-center mb-4 md:mb-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="border p-2 rounded-md px-4 bg-white shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                Partida X {creditsPerGame}
                <img
                  className="h-8 w-8 ml-2"
                  src="/assets/icons/cherries.png"
                  alt="Cherries"
                />
              </h2>
            </div>
          </motion.div>

          <motion.div
            className={`px-6 py-3 rounded-full text-white font-semibold shadow-lg ${
              running === "true" ? "bg-green-500" : "bg-red-500"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            {running === "true" ? "Activa" : "Inactiva"}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default GameInfo;
