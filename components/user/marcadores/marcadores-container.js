"use client";

import React, { useState, useEffect } from "react";
import MarcadoresBubble from "./marcadores-bubble";
import { useSession } from "next-auth/react";

const MarcadoresContainer = () => {
  const {data:session, status} = useSession();
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
    if(status === "authenticated"){
      fetchBookmarks();
    }
  }, [status, marcadores.length]);

  return (
    <div>
      {status === "loading"?<div>Loading...</div>:
      <div>
        <div className="w-2/3 mx-auto">
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
        </div>
      </div>}
    </div>
  );
};

export default MarcadoresContainer;
