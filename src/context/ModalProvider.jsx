// ModalProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
    countdown: 5,
    type: "message",
    onConfirm: () => {},
    onCancel: () => {},
  });

  useEffect(() => {
    if (modalState.isOpen) {
      const timerId = setInterval(() => {
        setModalState((prevState) => {
          if (prevState.countdown <= 1) {
            clearInterval(timerId);
            prevState.onCancel();
            return { ...prevState, isOpen: false, countdown: 5 };
          }
          return { ...prevState, countdown: prevState.countdown - 1 };
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [modalState.isOpen]);

  const openModal = ({ message, onConfirm, type = "message" }) => {
    setModalState({
      isOpen: true,
      message,
      countdown: 5,
      type,
      onConfirm: () => {
        onConfirm();
        setModalState((prev) => ({ ...prev, isOpen: false, countdown: 5 }));
      },
      onCancel: () =>
        setModalState((prev) => ({ ...prev, isOpen: false, countdown: 5 })),
    });
  };

  return (
    <ModalContext.Provider value={openModal}>
      {children}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        type={modalState.type}
        countdown={modalState.countdown}
        onConfirm={modalState.onConfirm}
        onCancel={modalState.onCancel}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
