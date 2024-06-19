// Select.js
import React from "react";
import PropTypes from "prop-types";

const Select = ({
  value,
  onChange = () => {},
  options,
  className = "",
  disabled = false,
  defaultValue = "",
  id,
  ...props
}) => {
  return (
    <>
      <label>{id}</label>
      <select
        value={value}
        onChange={onChange}
        className={`bg-color4 text-color2 p-1 ${className}`}
        disabled={disabled}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Select;
