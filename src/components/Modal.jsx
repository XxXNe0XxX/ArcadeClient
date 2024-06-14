import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Modal = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setCountdown(5);

      const timerId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timerId);
            setIsVisible(false);
            onClose();
          }
          return prevCountdown - 1;
        });
      }, 5000);

      return () => clearInterval(timerId);
    }
  }, [message]);

  if (!isVisible) return null;

  return (
    <div className=" fixed top-0 left-0  max-w-[500px] max-h-24 overflow-y-auto  m-auto ">
      <div className="p-2 rounded-md shadow-md text-center border bg-black border-color1 mt-12 flex gap-2 ">
        <div className="flex *:px-2 gap-2 items-center justify-end w-full ">
          <p>{message}</p>
          <button
            onClick={() => {
              setIsVisible(false);
            }}
            className="border"
          >
            X
          </button>
          {countdown}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
