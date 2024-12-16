import { Link } from "react-router-dom";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import axios from "../api/axios";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion"; // Import useAnimation
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./machinehero.css";
import ASCIIVideo from "./ASCIIVideo";

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

  // Animation controls for the CRT TV effect
  const controls = useAnimation();
  const videoRef = useRef(null);

  const [showInterference, setShowInterference] = useState(true);
  const [controlsStarted, setControlsStarted] = useState(false);

  // Start the CRT TV animation after the interference effect ends
  useEffect(() => {
    if (controlsStarted) {
      const sequence = async () => {
        // Initial animation: screen turning on
        await controls.start({
          scaleY: [0, 0.01, 0.9, 1],
          scaleX: [100, 1, 1, 1],
          opacity: [0, 1],
          filter: ["brightness(0)", "brightness(3)", "brightness(1)"],
          transition: {
            duration: 1,
            times: [0, 0.5, 0.8, 1],
            ease: "easeInOut",
          },
        });
        // Flicker effect
        await controls.start({
          opacity: [1, 0.8, 1, 0.8, 1],
          transition: {
            duration: 0.5,
            times: [0, 0.25, 0.5, 0.75, 1],
          },
        });
      };
      sequence();

      // Start playing the video
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  }, [controlsStarted]);

  // Show interference effect on component mount
  useEffect(() => {
    const interferenceDuration = 2000; // Duration of interference effect in milliseconds
    const timeoutId = setTimeout(() => {
      setShowInterference(false);
      setControlsStarted(true);
    }, interferenceDuration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const shineControls = useAnimation();
  return (
    <div className="flex flex-col">
      {/* Enhanced Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden  ">
        {/* Background Video with CRT TV animation */}
        <motion.div
          className="absolute md:h-[80%] h-full md:top-10 top-0 md:w-[95%] w-full"
          initial={{ scaleY: 0, opacity: 0, filter: "brightness(0)" }}
          animate={controls}
        >
          <video
            ref={videoRef}
            className="absolute top-0 left-0 rounded-xl flex m-auto w-full h-full object-cover"
            src="/assets/images/MarioHero.mp4" // Use your own video or a placeholder
            autoPlay={false} // Start video playback manually
            loop
            muted
            loading="lazy"
          />
        </motion.div>
        {/* Interference Effect */}
        {showInterference && <div className="interference"></div>}
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        {/* Animated Headline */}
        <div className="relative -mb-40"></div>
        <motion.h1
          className="relative text-white text-4xl md:text-6xl font-bold font-press-start text-center px-4"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          Welcome to the Arcade!
        </motion.h1>
        {/* Subheading */}
        <motion.p
          className="relative text-white text-lg md:text-2xl text-center mt-4 px-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 50 }}
        >
          Relive the classic games of the golden era.
        </motion.p>
        {/* Call to Action Button */}
        <motion.button
          className="relative mt-8 px-8 py-4 bg-color1 text-white font-bold rounded-full hover:bg-color2 transition-colors"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 50 }}
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Rest of your component... */}
      {/* Enhanced Juegos Disponibles Carousel Section */}
      <section className="flex flex-col items-center justify-center py-32 bg-gradient-to-b from-gray-900 to-black">
        {/* Section Title */}
        <motion.h1
          className="font-press-start md:text-5xl text-3xl text-center text-color1 mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Juegos Disponibles
        </motion.h1>

        {/* Server Message */}
        {msg ? (
          <p className="p-2 text-center text-red-500">
            Mensaje del servidor: {msg}
          </p>
        ) : (
          <div className="w-full md:w-[90vw] lg:w-[80vw] xl:w-[70vw] m-auto">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              navigation
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                // Responsive breakpoints
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {games?.map((each) => (
                <SwiperSlide key={each.MachineID} className="group">
                  <Link
                    to={`gameinfo/${each.Game}/${each.CreditsPerGame}/${each.Running}`}
                    className="cursor-pointer"
                  >
                    {/* Card Container */}
                    <motion.div
                      className="relative overflow-hidden rounded-xl shadow-lg bg-color2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Game Image */}
                      <img
                        src={`/assets/gamesArt/${each.Game}.jpg`}
                        className="object-cover w-full h-64 md:h-72 lg:h-80 group-hover:blur-sm"
                        alt={each.Game}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300"></div>

                      {/* Game Title */}
                      <div className="absolute bottom-0 left-0 p-4">
                        <h2 className="text-2xl font-bold text-color4">
                          {each.Game}
                        </h2>
                      </div>

                      {/* Additional Info on Hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-white px-4">
                          <p className="text-lg">
                            Credits Per Game: {each.CreditsPerGame}
                          </p>
                          <p className="mt-2">
                            Status: {each.Running ? "Running" : "Not Running"}
                          </p>
                          <button className="mt-4 px-6 py-2 bg-color1 text-black font-semibold rounded-full hover:bg-color1 transition-colors">
                            Ver más
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>

      {/* Parallax Effect Section with Shine Animation */}
      <div className="parallax-section relative">
        <div
          className="parallax-bg bg-fixed bg-center bg-cover h-[50vh]"
          style={{
            backgroundImage: 'url("/assets/images/heroHD.png")',
          }}
        >
          <div className="text-center p-5 absolute flex flex-col items-center justify-center h-full w-full">
            <motion.div
              className="relative p-6 rounded-full bg-black/50 overflow-hidden border border-white shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1 },
                },
              }}
              onAnimationComplete={() => {
                // Start the shine animation after the component is in view
                shineControls.start({
                  x: ["-150%", "150%"],
                  opacity: [1, 1],
                  transition: { duration: 2, ease: "linear" },
                });
              }}
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute top-0 left-0 h-full w-full"
                style={{
                  background:
                    "linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                  transform: "rotate(25deg)",
                }}
                initial={{ x: "-150%", opacity: 0 }} // Start off-screen and invisible
                animate={shineControls}
              />

              <div className="relative z-10">
                <h2 className="md:text-4xl text-2xl font-bold text-white">
                  Experience the Nostalgia!
                </h2>
                <p className="mt-2 text-white">
                  Relive classic arcade games with a modern twist.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section my-12">
        <h2 className="text-2xl text-center font-bold mb-6">
          What Players Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 p-6">
          <motion.div
            className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p>"This arcade is amazing! I love the retro feel."</p>
            <h3 className="mt-4 font-bold">- Player One</h3>
          </motion.div>
          <motion.div
            className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p>"A great place to unwind and play classic games."</p>
            <h3 className="mt-4 font-bold">- Player Two</h3>
          </motion.div>
          <motion.div
            className="testimonial-card bg-gray-800 p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p>"Highly recommend for all arcade enthusiasts."</p>
            <h3 className="mt-4 font-bold">- Player Three</h3>
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section bg-color1 text-center py-12">
        <h2 className="text-3xl font-bold text-white">
          Join the Arcade Community!
        </h2>
        <p className="text-white mt-4">
          Sign up now and get exclusive access to new games and events.
        </p>
        <button className="mt-6 px-6 py-3 bg-white text-color1 font-bold rounded-full">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Public;
