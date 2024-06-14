import React from "react";
import PropTypes from "prop-types";

const Input = ({
  type = "text",
  value = "",
  onChange = () => {},
  placeholder = "",
  className = "",
  disabled = false,
  id = "",
  options = [],
  defaultValue,
  forCurrency = false,
  img = "",
  ...props
}) => {
  if (type === "select") {
    return (
      <>
        <label htmlFor={id}>{id}</label>
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="bg-color4 p-1 text-color2 "
          disabled={disabled}
          {...props}
        >
          <option value={""}>{defaultValue || "Sin Cliente"}</option>
          {options.map((option, index) =>
            forCurrency ? (
              <option key={index} value={option.currency}>
                {option.currency}
              </option>
            ) : (
              <option key={index} value={option.ClientID}>
                {option.ClientEmail || option[index]}
              </option>
            )
          )}
        </select>
      </>
    );
  }
  return (
    <div className={`flex ${img ? "justify-start" : "flex-col"} `}>
      {img && (
        <div className="w-10 flex items-center justify-center mr-2">
          <img className=" " src={img}></img>
        </div>
      )}
      <label htmlFor={id}>{id}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-color2 p-1 text-color4 w-full ${className}`}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })
  ),
};

export default Input;
