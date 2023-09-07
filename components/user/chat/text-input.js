"use client";

import React, { useState } from "react";

const TextInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    onSend(text);
    setText("");
  };

  return (
    <div className="p-5 flex items-center w-3/4 w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full mr-2 p-2 rounded-l bg-gray-100"
      />
      <button
        onClick={handleSend}
        className="bg-orange-400 text-white rounded-r p-2"
      >
        {"➤"}
      </button>
    </div>
  );
};

export default TextInput;
