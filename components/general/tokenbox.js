import React, { useState } from "react";

const TokenBox = ({ options, onChange }) => {
  const [selectedTokens, setSelectedTokens] = useState([]);

  const handleTokenSelect = (e) => {
    const selectedOption = e.target.value;
    if (!selectedTokens.includes(selectedOption)) {
      setSelectedTokens([...selectedTokens, selectedOption]);
      onChange(selectedTokens.concat(selectedOption));
    }
    e.target.value = "";
  };

  const handleTokenRemove = (token) => {
    const updatedTokens = selectedTokens.filter((t) => t !== token);
    setSelectedTokens(updatedTokens);
    onChange(updatedTokens);
  };

  const filteredOptions = options.filter(
    (option) => !selectedTokens.includes(option)
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        <select
          className="w-48 bg-gray-100 rounded-lg px-4 py-2 text-black"
          onChange={handleTokenSelect}
        >
          <option value="" disabled>
            Select an option
          </option>
          {filteredOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap ml-2">
          {selectedTokens.map((token, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 flex items-center"
            >
              {token}
              <button
                type="button"
                className="ml-2 focus:outline-none"
                onClick={() => handleTokenRemove(token)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenBox;
