import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const ConfirmationModal = ({ type, isOpen, message, onConfirm, onCancel }) => {
  const [countdown, setCountdown] = useState(5);
  const timerIdRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCountdown(5);
      timerIdRef.current = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timerIdRef.current);
            handleCancel();
            return 5;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    }

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, [isOpen]);

  useEffect(() => {
    // Reset the countdown when the modal opens or the message changes
    if (isOpen || message !== "") {
      setCountdown(5);
    }
  }, [isOpen, message]); // Include message in the dependency array

  const handleCancel = () => {
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 flex md:justify-start justify-center w-full m-auto">
      <div className="p-2 rounded-md shadow-md text-center border bg-black border-color1 mt-12 flex gap-2">
        <div className="flex gap-2 items-center justify-end w-full">
          <h1>{message}</h1>
          {type === "message" ? (
            <>
              <button className="border px-1" onClick={handleCancel}>
                X
              </button>
              <p>{countdown}</p>
            </>
          ) : (
            <>
              <button className="border px-1" onClick={onConfirm}>
                ✓
              </button>
              <button className="border px-1" onClick={handleCancel}>
                X
              </button>
              <p>{countdown}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  type: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationModal;
