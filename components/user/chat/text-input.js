"use client";

import React, { useState } from "react";

const TextInput = ({ onUserMessage }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onUserMessage(text);
    setText("");
  };

  return (
    <div className="fixed bottom-0 w-full bg-white">
      <div className="flex">
        <div className="w-1/6"></div>
        <div className="w-2/3">
          <div className="p-5 flex">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full mr-2 p-2 rounded-l bg-gray-200 "
            />
            <button
              onClick={handleSend}
              className="bg-orange-400 text-white rounded-r p-2"
            >
              {"➤"}
            </button>
          </div>
        </div>
        <div className="w-1/6"></div>
      </div>
    </div>
  );
};

export default TextInput;
