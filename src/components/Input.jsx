import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Input = ({ id, type, value, onChange, placeholder, className, name }) => {
  const [show, setShow] = useState(false);

  const inputTypeMapping = {
    password: show ? "text" : "password",
    currentPassword: show ? "text" : "password",
    newPassword: show ? "text" : "password",
    repeatPassword: show ? "text" : "password",
    email: "email",
    contact: "number",
    add: "number",
    subtract: "number",
    amount: "number",
    creditAmount: "number",
    creditsPerGame: "number",
    exchangeRate: "number",
  };

  const inputType = inputTypeMapping[name] || type;

  const isPasswordInput = [
    "password",
    "currentPassword",
    "newPassword",
    "repeatPassword",
  ].includes(name);

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{id}</label>
      <div className="flex items-center justify-center">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`p-2 border border-color2 w-full rounded-md ${className}`}
          name={name}
          step="0.00000001"
          min={name === "exchangeRate" ? 0.00000001 : 1}
        />
        {isPasswordInput && (
          <button type="button" onClick={() => setShow(!show)} className="mx-2">
            {show ? (
              <FontAwesomeIcon icon={faEye} className="w-6" />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} className="w-6" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Input;
