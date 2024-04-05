import React from "react";

const OptionsMenu = ({ handleOptionClick }) => {
  return (
    <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg">
      <div className="rounded-md  shadow-xs">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            role="menuitem"
            onClick={() => handleOptionClick("Eliminar")}
          >
            Eliminar
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
            role="menuitem"
            onClick={() => handleOptionClick("Guardar")}
          >
            Guardar
          </button>
          <button
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
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
