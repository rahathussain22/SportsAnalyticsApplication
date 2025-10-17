import React from 'react';

const TeamLineupField = ({ label, name, placeholder, onChange, value }) => (
  <div className="form-group ">
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      rows="4"
      onChange={onChange}
      value={value}
    ></textarea>
  </div>
);

export default TeamLineupField;