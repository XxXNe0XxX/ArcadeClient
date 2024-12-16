// FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

  // Variants for the accordion item
  const itemVariants = {
    collapsed: { opacity: 0, height: 0, marginTop: 0 },
    expanded: {
      opacity: 1,
      height: "auto",
      marginTop: 16,
      transition: {
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  };

  // Variants for the icon rotation
  const iconVariants = {
    collapsed: { rotate: 0 },
    expanded: { rotate: 180 },
  };

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.4 * i },
    }),
  };

  // Item variants for individual FAQ items
  const faqItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-orange-500 font-press-start"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Preguntas Frecuentes
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className="my-4 border-b border-gray-200 pb-4 p-4 rounded-md bg-color2 "
            variants={faqItemVariants}
          >
            <div
              onClick={() => toggleFAQ(index)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h2
                className={`${
                  activeIndex == index
                    ? "text-color4 p-2"
                    : "text-xl font-semibold text-color3"
                } transition-all`}
              >
                {faq.question}
              </h2>
              <motion.span
                variants={iconVariants}
                initial="collapsed"
                animate={activeIndex === index ? "expanded" : "collapsed"}
                transition={{ duration: 0.3 }}
              >
                {activeIndex === index ? (
                  <FaChevronUp className="text-color1" />
                ) : (
                  <FaChevronDown className="text-color3" />
                )}
              </motion.span>
            </div>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={itemVariants}
                  style={{ overflow: "hidden" }}
                >
                  <motion.p
                    className="text-color4 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQ;
