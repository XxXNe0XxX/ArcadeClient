// ConfirmationModal.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ConfirmationModal = ({
  type,
  isOpen,
  message,
  countdown,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className=" fixed top-0 flex md:justify-start justify-center w-full m-auto ">
      <div className="p-2  rounded-md shadow-md text-center border bg-black border-color1 mt-12 flex gap-2 ">
        <div className="flex  *:px-2 gap-2 items-center justify-end w-full ">
          <h1>{message}</h1>
          {type == "message" ? (
            <>
              <button className="border " onClick={onCancel}>
                X
              </button>
              {countdown}
            </>
          ) : (
            <>
              <button className="border" onClick={onConfirm}>
                ✓
              </button>
              <button className="border " onClick={onCancel}>
                X
              </button>
              {countdown}
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
