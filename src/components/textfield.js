import React from 'react';

export default ({ input, label, type,value, meta: { touched, error } }) => (
  <div className="form-group">
    <label>{label}</label>

      <textarea {...input} placeholder={label} type={type}  className="form-control" value={value}/>
      <div>
      {touched && error && <span style={{color: "red" }}>{error}</span>}
      </div>
  </div>
);
