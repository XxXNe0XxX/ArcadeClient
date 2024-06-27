import React from "react";
import PropTypes from "prop-types";

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-b hover:shadow-none shadow-sm shadow-white  flex justify-center bg-color1 m-3 p-3 text-md text-center hover:bg-color4 hover:text-color2 rounded-md transition-all  ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
