import React, { useState } from "react";

export const DropDown = ({ options, onSelect, label, avatar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {!avatar ? (
        <>
          <button
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none active:scale-95 transition-transform duration-200 ease-in-out"
            onClick={handleToggle}
            type="button"
          >
            {label}
          </button>
        </>
      ) : (
        <>
          <button
            className="inline-flex justify-center w-full rounded-full text-sm font-medium  border-2 border-emerald-400 shadow-sm active:scale-95 transition-transform duration-200 ease-in-out"
            onClick={handleToggle}
            type="button"
          >
            <img
              className="inline-block size-10 rounded-full"
              src={avatar}
              alt="Avatar"
            />
          </button>
        </>
      )}

      {isOpen && (
        <ul className="absolute right-0 z-10 w-56 mt-1 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
