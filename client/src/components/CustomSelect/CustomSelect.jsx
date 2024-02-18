import React, { useState } from "react";
import "./CustomSelect.css";

const CustomSelect = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    options.length > 0 ? options[0] : null
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container">
      <div className="selected-option" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : "Select an option"}
      </div>
      {isOpen && (
        <div className="options-container">
          {options.map((option) => (
            <div
              key={option.value}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;