import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Ir a una tienda",
    description: "Dirígete a un local que tenga una máquina arcade.",
    image: "/assets/images/howto1.webp",
  },
  {
    title: "Comprar QR",
    description: "Adquiere un QR con la persona a cargo del local.",
    image: "/assets/images/howto2.jpg",
  },
  {
    title: "Escanear QR",
    description: "Usa tu código QR en la máquina para comenzar una partida.",
    image: "/assets/images/howto3.webp",
  },
];

const HowItWorks = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Track if animation is happening

  const nextStep = () => {
    if (step < steps.length - 1 && !isAnimating) {
      setIsAnimating(true); // Disable buttons
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0 && !isAnimating) {
      setIsAnimating(true); // Disable buttons
      setStep(step - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="text-center py-5">
        <h1 className="text-4xl font-press-start font-bold text-orange-500">
          Cómo Funciona
        </h1>
        <p className="text-gray-600 mt-2">Sigue estos sencillos pasos</p>
      </div>

      {/* Steps Indicator */}
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center items-center space-x-4 py-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                index === step
                  ? "bg-color1 text-color4 border-color1"
                  : "bg-color2 text-color3 border-color3"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <motion.div
            className="absolute top-0 left-0 h-2 bg-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                duration: 0.5,
                onComplete: () => setIsAnimating(false), // Enable buttons after animation
              }}
              className="p-6 text-center"
            >
              <h2 className="text-3xl font-bold text-orange-500 mb-4 h-20">
                {steps[step].title}
              </h2>
              <div className="flex justify-center">
                <motion.img
                  src={steps[step].image}
                  alt={steps[step].title}
                  className="mx-auto mb-4 h-72 w-auto object-contain rounded-lg shadow-md"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-lg text-gray-700 mb-4">
                {steps[step].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center w-full p-4">
          {step > 0 ? (
            <button
              onClick={prevStep}
              className={`px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ${
                isAnimating ? "opacity-50 cursor-not-allowed" : ""
              }`} // Disable button when animating
              disabled={isAnimating}
            >
              Anterior
            </button>
          ) : (
            <div className="w-24"></div>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className={`px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
                isAnimating ? "opacity-50 cursor-not-allowed" : ""
              }`} // Disable button when animating
              disabled={isAnimating}
            >
              Siguiente
            </button>
          ) : (
            <div className="w-24"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
