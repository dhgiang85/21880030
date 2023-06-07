import Select from "react-select";
const SelectField = ({ field, form, options, placeholder }) => {
  const handleChange = (selectedOptions) => {
    form.setFieldValue(field.name, selectedOptions.map(option => ({
      value: option.value,
      label: option.label
    })));
  };

  const handleBlur = () => {
    form.setFieldTouched(field.name, true);
  };
  const selectedValues = options.filter(option =>
    field.value.find(value => value.value === option.value)
  );
  return (
    <div>
      <Select
        id={field.name}
        name={field.name}
        value={selectedValues}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        isMulti
      />

      {form.touched[field.name] && form.errors[field.name] && (
        <p className="input-error col-span-4 mb-4 mt-3">
          {form.errors[field.name]}
        </p>
      )}
    </div>
  );
};

export default SelectField;
