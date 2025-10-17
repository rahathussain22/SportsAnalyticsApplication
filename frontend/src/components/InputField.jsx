import React from 'react';

const InputField = ({ label, name, placeholder, type = 'text', options, fullWidth = false, onChange, value }) => {
  const isSelect = Array.isArray(options);

  return (
    <div className={`form-group ${fullWidth ? 'full-width' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {isSelect ? (
        <select
          id={name}
          name={name}
          onChange={onChange}
          value={value}
          // Add a class for specific styling on the Sport dropdown
          className={name === 'sport' ? 'sport-select' : ''}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value || option.label}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      )}
    </div>
  );
};

export default InputField;