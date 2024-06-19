import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    title: "Ir a una tienda",
    description: "Dirigete a un local que tenga una maquina arcade.",
    image: "src/assets/images/howto1.webp",
  },
  {
    title: "Comprar QR",
    description: "Adquiere un QR con la persona a cargo de el local",
    image: "src/assets/images/howto2.jpg",
  },
  {
    title: "Escanear QR",
    description: "Usa tu codigo QR en la maquina para comenzar una partida",
    image: "src/assets/images/howto3.webp",
  },
];

const HowItWorks = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="p-6">
      <div className="text-center py-5">
        <h1 className="text-4xl font-press-start font-bold text-orange-500">
          Como Funciona
        </h1>
      </div>
      <div className="max-w-xl mx-auto border rounded-md overflow-hidden ">
        <div className="flex justify-center space-x-4 py-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full  ${
                index === step
                  ? "bg-color1 text-color4"
                  : "bg-color3 text-color2"
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-lg  text-center"
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              {steps[step].title}
            </h2>
            <img
              src={steps[step].image}
              alt={steps[step].title}
              className="mx-auto mb-4 h-[35vh] w-full object-contain"
            />
            <p className="text-lg text-color4 mb-4">
              {steps[step].description}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between w-full p-2 *:transition-colors">
          {step > 0 ? (
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Anterior
            </button>
          ) : (
            <div></div>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Siguiente
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
