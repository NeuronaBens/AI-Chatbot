import React, { useState } from "react";
import OptionsMenu from "./options-menu";

const TextBubble = ({ chatMessage }) => {
  const bubbleColor =
    chatMessage.sender == "AI" ? "bg-orange-300" : "bg-gray-300";
  const bubblePosition = chatMessage.sender == "AI" ? "mr-auto" : "ml-auto";
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = async (option) => {
    if (option === "Eliminar") {
      try {
        const res = await fetch(`/api/database/messages/${chatMessage.id}`, {
        method: "PUT",
        body: JSON.stringify({
        deleted: true,
        }),
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
    } else if (option === "Guardar") {
      try {
        const res = await fetch(`/api/database/messages/${chatMessage.id}`, {
        method: "PUT",
        body: JSON.stringify({
        bookmarked: true,
        }),
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
    }else if (option === "Denunciar") {
      try {
        const res = await fetch("/api/database/complaints", {
        method: "POST",
        body: JSON.stringify({
        content: true,
        message_id: chatMessage.id
        }),
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
    }
    setShowOptions(false);
  };

  return (
    <div className="w-5/6 mx-auto relative">
      <div className="w-1/3"></div>
      <div
        className={`w-2/3 rounded-xl my-2 mx-5 px-4 py-2 ${bubbleColor} ${bubblePosition} flex justify-between items-center`}
      >
        <p>{chatMessage.text}</p>
        <div>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowOptions(!showOptions)}
          >
            <span className="text-3xl ml-4">...</span>
          </button>
          {showOptions && <OptionsMenu handleOptionClick={handleOptionClick} />}
        </div>
      </div>
    </div>
  );
};

export default TextBubble;
