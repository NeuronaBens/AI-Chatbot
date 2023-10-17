"use client";

import React, { useState, useEffect } from "react";
import MarcadoresBubble from "./marcadores-bubble";
import MarcadoresGreeting from "./marcadores-greeting";

const MarcadoresContainer = () => {
  const [marcadores, setMarcadores] = useState([]);

  useEffect(() => {
    // Fetch bookmarks from database and store them in state
    const bookmarks = fetchBookmarks();
    setMarcadores(bookmarks);
  }, []);

  const fetchBookmarks = () => {
    // Fetch bookmarks from database and return them as an array of objects
    return [
      { id: 1, texto: "Bookmark 1" },
      { id: 2, texto: "Bookmark 2" },
      { id: 3, texto: "Bookmark 3" },
    ];
  };

  return (
    <div>
      <MarcadoresGreeting />
      <div className="w-2/3 mx-auto">
        {marcadores.map((marcador) => (
          <MarcadoresBubble
            key={marcador.id}
            mensaje={marcador}
            eliminarMarcador={() => {
              // Handle delete bookmark
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MarcadoresContainer;
