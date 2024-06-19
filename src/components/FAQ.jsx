import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    question: "¿Cómo puedo comprar créditos?",
    answer:
      "Puedes comprar créditos en nuestras máquinas o a través de nuestra aplicación.",
  },
  {
    question: "¿Dónde puedo usar mi código QR?",
    answer:
      "Puedes usar tu código QR en cualquier máquina de nuestra red para empezar a jugar.",
  },
  {
    question: "¿Qué hago si tengo un problema con una máquina?",
    answer:
      "Si tienes algún problema con una máquina, por favor contacta a nuestro soporte técnico a través del chat en la aplicación.",
  },
  {
    question: "¿Cómo puedo enviar comentarios?",
    answer:
      "Puedes enviar tus comentarios a través del formulario de comentarios en nuestra aplicación.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="max-w-xl mx-auto  ">
      <h1 className="text-4xl p-6 font-bold text-color1 font-press-start text-center mb-10">
        Preguntas Frecuentes
      </h1>
      {faqData.map((faq, index) => (
        <div key={index} className="my-4 px-1">
          <div
            onClick={() => toggleFAQ(index)}
            className="cursor-pointer rounded-lg"
          >
            <h2
              className={`${
                activeIndex === index ? "bg-color1" : ""
              } text-xl font-semibold rounded-md p-4 border transition-all`}
            >
              {faq.question}
            </h2>
          </div>
          <AnimatePresence initial={false}>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 150 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  opacity: { duration: 0.3 },
                  height: { duration: 0.3 },
                }}
                className="overflow-auto flex items-center bg-color2 p-4 rounded-md"
              >
                <h1 className="">{faq.answer}</h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
