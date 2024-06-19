import React from "react";
import PropTypes from "prop-types";

const Textarea = ({
  value = "",
  onChange = () => {},
  placeholder = "",
  className = "",
  disabled = false,
  id = "",
  defaultValue,
  img = "",
  ...props
}) => {
  return (
    <div className={`flex ${img ? "justify-start" : "flex-col"} `}>
      {img && (
        <div className="w-10 flex items-center justify-center mr-2">
          <img className=" " src={img}></img>
        </div>
      )}
      <label htmlFor={id}>{id}</label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-color2 p-1 text-color4 w-full ${className}`}
        disabled={disabled}
        {...props}
      ></textarea>
    </div>
  );
};

Textarea.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Textarea;
