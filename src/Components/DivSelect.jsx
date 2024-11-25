import React from 'react';

const DivSelect = ({ icon, required, value, className, options, handleChange }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text">
        <i className={`fa ${icon}`}></i>
      </span>
      <select 
        value={value} 
        onChange={handleChange} 
        className={className} 
        required={required}
      >
        <option value="">Seleccione una Marca</option>
        {options && options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.marca} {/* Mostrar el nombre de la marca */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DivSelect;
