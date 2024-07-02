// Select.jsx
import PropTypes from "prop-types";

const Select = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  name,
  disabled,
  id,
}) => {
  return (
    <div className="flex flex-col items-start justify-center">
      <label htmlFor={id}>{id}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`bg-color2 p-2 w-full rounded-md ${className}`}
        name={name}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Select;
