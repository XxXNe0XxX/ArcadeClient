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
      className={` active:bg-color4 active:text-color2 active:shadow-none active:translate-y-1  border-b-4  border-r-1 border-l-1 active:border-color1  shadow-white  flex justify-center bg-color1 m-3 p-3 text-md text-center  rounded-md transition-all  ${className}`}
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
