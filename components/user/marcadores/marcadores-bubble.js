"use client";

import React, { useState } from "react";

const MarcadoresBubble = ({ mensaje, eraseMarcador }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClick = () => {
    eraseMarcador(mensaje.id);
  };

  return (
    <div className="w-2/3 mx-auto relative">
      <div className="w-full rounded-xl my-2 mx-5 px-4 py-2 rounded bg-[#AAA7F2] py-2 ml-auto flex justify-between items-center">
        <p>{mensaje.text}</p>
        <div>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowDelete(!showDelete)}
          >
            <span className="text-3xl ml-4">...</span>
          </button>
          {showDelete && (
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
              onClick={handleDeleteClick}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarcadoresBubble;
