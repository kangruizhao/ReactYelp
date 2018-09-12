import React from 'react';

export default ({ input, label, type,meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>

      <input {...input} placeholder={label} type={type}  className="form-control" min="0.01" step="0.01"/>
      <div>
      {touched && error && <span style={{color: "red" }}>{error}</span>}
      </div>
  </div>
);
