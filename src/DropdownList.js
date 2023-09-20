import React, { useState } from 'react';
import * as sakilaApi from './sakilaApi';

const DropdownList = ({ label, items, selectedOption, onOptionChange }) => {

  const handleChange = (event) => {
    onOptionChange(event.target.value);
  };

  return (
    <div>
      <label>{label}: </label>
      <select value={selectedOption} onChange={handleChange}>
        {Object.entries(items).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      {selectedOption && (
        <p>{items.selectedOption}</p>
      )}
    </div>
  );
};

export default DropdownList;
