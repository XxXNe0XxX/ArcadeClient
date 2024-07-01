import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";
import Button from "./Button";
import { regions } from "../data/regions"; // Import the regions data
import {
  mapKeysToFirstCharLowerCase,
  mapKeysToFirstCharUpperCase,
} from "../utils/lowerCaseUpperCase";

const fieldComponents = {
  input: Input,
  select: Select,
  textarea: TextArea,
};

const Form = ({ fields, onSubmit, className, initialValues = {}, title }) => {
  const [formData, setFormData] = useState({});
  const [municipalityOptions, setMunicipalityOptions] = useState([]);

  useEffect(() => {
    // Initialize formData with initialValues or empty strings
    const initialFormData = {};
    const mappedKeys = mapKeysToFirstCharLowerCase(initialValues);
    fields.forEach((field) => {
      initialFormData[field.name] = mappedKeys[field.name] || "";
    });
    setFormData(initialFormData);

    // Set initial municipality options if province is already selected
    if (initialValues.province) {
      setMunicipalityOptions(regions[initialValues.province] || []);
    }
  }, [fields]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update municipality options based on selected province
    if (name === "province") {
      if (regions[value]) {
        setMunicipalityOptions(regions[value]);
      } else {
        setMunicipalityOptions([]);
      }
      // Reset municipality value when province changes
      setFormData((prevData) => ({
        ...prevData,
        municipality: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const renderField = (field) => {
    const FieldComponent = fieldComponents[field.type];
    const options =
      field.name === "municipality"
        ? municipalityOptions.map((each) => {
            return { value: each, label: each };
          })
        : field.options;

    return (
      <FieldComponent
        id={field.id}
        key={field.name}
        name={field.name}
        placeholder={field.placeholder}
        options={options}
        value={formData[field.name] || ""}
        onChange={(e) => handleChange(field.name, e.target.value)}
        disabled={field.dependentField && !formData[field.dependentField]}
        {...field.props}
      />
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-[1200px] mt-3 w-full m-auto gap-2 flex flex-col items-center  rounded-md   ${className}`}
    >
      <h1 className=" py-6 text-4xl text-center colortext bg-gradient-to-r from-orange-500 to-orange-100  ">
        {title}
      </h1>
      <div className="grid md:gap-2  border border-color1 p-6 rounded-md  shadow-inner  shadow-white md:grid-cols-2 items-center px-6 w-full ">
        {fields.map((field) => renderField(field))}
      </div>
      <Button type="submit" className=" ">
        Continuar
        <span className="font-press-start  tracking-tighter">...</span>?
      </Button>
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["input", "select", "textarea"]).isRequired,
      placeholder: PropTypes.string,
      options: PropTypes.array,
      dependentField: PropTypes.string,
      props: PropTypes.object,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
  initialValues: PropTypes.object,
  title: PropTypes.string,
};

export default Form;
