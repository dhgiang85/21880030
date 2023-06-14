import React from 'react'
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
const QuillField =  ({ field, form, label, placeholder })  => {
    const { setFieldValue } = form;

    const handleChange = (value) => {
      setFieldValue(field.name, value);
    };
  
    const handleBlur = () => {
      form.setFieldTouched(field.name, true);
    };
  
    return (
      <ReactQuill
        value={field.value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    );
  };

export default QuillField