import React, { useState } from "react";
import calender from "../../assets/CalendarBlank.svg";
import caret from "../../assets/CaretDown.svg";
interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
      >
        {/* Calendar Icon */}

        <img src={calender} alt="" />
        {/* Label */}
        <span>{label}</span>
        {/* Chevron Down Icon */}
        <img src={caret} className={isOpen ? "rotate-180" : ""} alt="" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
