import React, { useState } from "react";
import PropTypes from "prop-types";

const Form = ({
  onSubmit = () => {},
  children,
  className = "",
  title = "No title",
}) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderChildrenWithProps = () => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          onChange: handleChange,
          value: formData[child.props.name] || child.props.defaultValue || "",
        });
      }
      return child;
    });
  };

  return (
    <form
      className={`flex flex-col p-4 rounded-md border w-full gap-1 max-w-[600px] m-auto ${className}`}
      onSubmit={handleSubmit}
    >
      <h1 className="font-press-start p-2 text-3xl text-center mb-2">
        {title}
      </h1>
      {renderChildrenWithProps()}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Form;
