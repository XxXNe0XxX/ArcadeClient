import PropTypes from "prop-types";

const Textarea = ({ id, value, onChange, placeholder, className, name }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{id}</label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full flex border rounded-md p-2 ${className}`}
        name={name}
      />
    </div>
  );
};

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

Textarea.defaultProps = {
  placeholder: "",
  className: "",
};

export default Textarea;
