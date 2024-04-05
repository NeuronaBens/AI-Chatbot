"use client";

import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export default function DescriptionUpdate() {
  const { data: session, status } = useSession();
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const res = await fetch(`/api/database/students/${session.user.id}`);
        if (res.ok) {
          const student = await res.json();
          setDescription(student.description);
        } else {
          throw new Error(`API call failed with status: ${res.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (status === "authenticated") {
      fetchDescription();
    }
  }, [status, session]);

  const handleDescriptionUpdate = async () => {
    alert(session.user.id);
    try {
      const res = await fetch(`/api/database/students/${session.user.id}`, {
        method: "PUT",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <label htmlFor="description" className="block mb-2">
        Descripción:
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-1 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        rows="3"
      />
      <div className="flex justify-center items-center py-4">
        <Button
          onClick={handleDescriptionUpdate}
          className="mt-2 py-2 px-4 text-sm font-medium"
        >
          Actualizar descripción
        </Button>
      </div>
      <div className="mb-4"></div>
    </div>
  );
}
