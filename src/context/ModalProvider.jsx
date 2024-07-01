import React, { createContext, useContext, useState, useCallback } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
    type: "message",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const openModal = useCallback(({ message, onConfirm, type = "message" }) => {
    setModalState({
      isOpen: true,
      message,
      type,
      onConfirm: () => {
        onConfirm();
        closeModal();
      },
      onCancel: () => {
        closeModal();
      },
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <ModalContext.Provider value={openModal}>
      {children}
      <ConfirmationModal
        isOpen={modalState.isOpen}
        message={modalState.message}
        type={modalState.type}
        onConfirm={modalState.onConfirm}
        onCancel={modalState.onCancel}
      />
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
