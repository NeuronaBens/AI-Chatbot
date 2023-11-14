"use client";
import React, { useState } from "react";

const NotificacionesForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = async () => {
    const notificationData = {
      name: name,
      description: description,
      recipient: sendToAll ? "all" : userId,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/database/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        }
      );

      if (response.ok) {
        // Handle success
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-md shadow-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Notification Name"
        className="w-full mb-4 p-2 rounded-md border border-gray-300"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Notification Description"
        className="w-full mb-4 p-2 rounded-md border border-gray-300"
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={sendToAll}
          onChange={() => setSendToAll(!sendToAll)}
          className="mr-2"
        />
        Send to all users
      </label>
      {!sendToAll && (
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          className="w-full mb-4 p-2 rounded-md border border-gray-300"
        />
      )}
      <button
        onClick={handleSubmit}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default NotificacionesForm;
