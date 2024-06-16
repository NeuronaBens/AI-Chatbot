import React from "react";

const OptionsMenu = ({ handleOptionClick }) => {
  return (
    <div className="absolute z-10 mt-1 md:mt-2 w-28 md:w-32 rounded-md shadow-lg">
      <div className="rounded-md shadow-xs bg-[#FFFFFF] w-full">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <button
            className="px-4 py-1 md:py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left w-full"
            role="menuitem"
            onClick={() => handleOptionClick("Eliminar")}
          >
            Eliminar
          </button>
          <button
            className="px-4 py-1 md:py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left w-full"
            role="menuitem"
            onClick={() => handleOptionClick("Guardar")}
          >
            Guardar
          </button>
          <button
            className="px-4 py-1 md:py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-left w-full"
            role="menuitem"
            onClick={() => handleOptionClick("Denunciar")}
          >
            Denunciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsMenu;
