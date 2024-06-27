// Input.jsx
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const Input = ({ id, type, value, onChange, placeholder, className, name }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{id}</label>
      <div className="flex items-center justify-start">
        <input
          id={id}
          type={
            name === "password" ||
            name === "currentPassword" ||
            name === "newPassword" ||
            name === "repeatPassword"
              ? "password"
              : name === "email"
              ? "email"
              : name === "contact" ||
                name === "add" ||
                name === "subtract" ||
                name === "amount" ||
                name === "creditAmount" ||
                name === "creditsPerGame"
              ? "number"
              : type
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`p-2 rounded-md border border-color2 w-full rounded-md${className}`}
          name={name}
          min={1}
        />
        {/* {name === "password" ||
        name === "currentPassword" ||
        name === "repeatPassword" ||
        name === "newPassword" ? (
          <FontAwesomeIcon
            onClick={() => {
              setShow(!show);
              console.log(show);
            }}
            icon={faEye}
            className=" w-8 h-8 scale-75 "
          ></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon
            onClick={() => setShow(!show)}
            icon={faEyeSlash}
            className=" w-8 h-8 scale-75 "
          ></FontAwesomeIcon>
        )} */}
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
