import React from 'react';

const FormSection = ({ title, children, isPredictionSection = false }) => (
  <div className="form-section">
    <h3 className="section-title">{title}</h3>
    {/* Conditional class for the predictions section to handle the 4-column layout */}
    <div className={`section-content ${isPredictionSection ? 'four-columns' : 'two-columns'}`}>
      {children}
    </div>
  </div>
);

export default FormSection;