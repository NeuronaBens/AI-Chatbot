"use client";

import React, { useState, useEffect } from "react";
import MarcadoresBubble from "./marcadores-bubble";
import MarcadoresGreeting from "./marcadores-greeting";
import { useSession } from "next-auth/react";

const MarcadoresContainer = () => {
  const session = useSession().data;
  const [marcadores, setMarcadores] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const res = await fetch(`/api/database/students/${session.user.id}/messages/bookmarked`);
      const data = await res.json();
      setMarcadores(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [marcadores.length]);

  return (
    <div>
      <MarcadoresGreeting />
      {marcadores.length > 0 && <div className="w-2/3 mx-auto">
        {marcadores.map((marcador) => (
          <MarcadoresBubble
            key={marcador.id}
            mensaje={marcador}
            eraseMarcador={async (id) => {
              try {
                const res = await fetch(`/api/database/messages/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                bookmarked: false,
                }),
                headers: {
                "Content-Type": "application/json",
                },
                });
                if (!res.ok) {
                  throw new Error(`API call failed with status: ${res.status}`);
                }
                setMarcadores([]);

              } catch (error) {
                console.error(error);
              }
            }}
          />
        ))}
      </div>}
    </div>
  );
};

export default MarcadoresContainer;
