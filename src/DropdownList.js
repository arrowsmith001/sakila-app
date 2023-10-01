import React, { useState } from 'react';
import * as sakilaApi from './sakilaApi';

const DropdownList = ({ label, items, selectedOption, onOptionChange, wrapLabel, wrapSelect, rootOverride }) => {

  const handleChange = (event) => {
    onOptionChange(event.target.value);
  };

  var labelComponent = (<label>{label}: </label>);

  var selectComponent = (
    <select value={selectedOption} onChange={handleChange}>
      {Object.entries(items).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </select>);

  var wrappedLabel = wrapLabel === undefined ? labelComponent : wrapLabel(labelComponent);
  var wrappedSelect = wrapSelect === undefined ? selectComponent : wrapSelect(selectComponent);

  var contents = [wrappedLabel, wrappedSelect];

  return (
    rootOverride === undefined ? <div>{contents}</div> : rootOverride(contents)
  );
};

export default DropdownList;
