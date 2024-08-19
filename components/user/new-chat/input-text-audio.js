"use client";

import React, { useState, useEffect } from "react";

const TextInput = ({
  handleSubmit,
  handleInputChange,
  input,
  setInput,
  disabled,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const handleStartListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const handleStopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const newRecognition = new SpeechRecognition();
      newRecognition.lang = "es-ES"; // Set the language to Spanish
      setRecognition(newRecognition);
    }
  }, []);

  useEffect(() => {
    if (recognition) {
      const handleResult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setInput(transcript);
      };

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.addEventListener("result", handleResult);

      return () => {
        recognition.removeEventListener("result", handleResult);
      };
    }
  }, [recognition]);

  return (
    <form
      onSubmit={async (e) => {
        handleStopListening();
        await handleSubmit(e);
      }}
      className="flex items-center w-full max-w-screen-md mx-auto px-4"
    >
      <input
        disabled={disabled}
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Escribe un mensaje..."
        className="text-black flex-1 px-4 py-2 border border-[#D5D1E5] rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#7A72DE] bg-white bg-opacity-25"
      />
      <button
        type="button"
        onClick={isListening ? handleStopListening : handleStartListening}
        className="p-2 focus:outline-none"
      >
        {isListening ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 56 56"
            className="w-6 h-6"
          >
            <path
              fill="#7A72DE"
              d="M28 51.906c13.055 0 23.906-10.828 23.906-23.906c0-13.055-10.875-23.906-23.93-23.906C14.899 4.094 4.095 14.945 4.095 28c0 13.078 10.828 23.906 23.906 23.906m0-3.984C16.937 47.922 8.1 39.062 8.1 28c0-11.04 8.813-19.922 19.876-19.922c11.039 0 19.921 8.883 19.945 19.922c.023 11.063-8.883 19.922-19.922 19.922m-6.422-11.04h2.227c1.101 0 1.617-.609 1.617-1.5v-14.74c0-.891-.516-1.5-1.617-1.5h-2.227c-1.148 0-1.664.609-1.664 1.5v14.742c0 .89.516 1.5 1.664 1.5m10.594 0h2.226c1.125 0 1.641-.609 1.641-1.5V20.642c0-.891-.516-1.5-1.64-1.5h-2.227c-1.102 0-1.64.609-1.64 1.5v14.742c0 .89.538 1.5 1.64 1.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              fill="#7A72DE"
              d="M12 15a4 4 0 0 0 4-4V5a4 4 0 0 0-8 0v6a4 4 0 0 0 4 4ZM10 5a2 2 0 0 1 4 0v6a2 2 0 0 1-4 0Zm10 6a1 1 0 0 0-2 0a6 6 0 0 1-12 0a1 1 0 0 0-2 0a8 8 0 0 0 7 7.93V21H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.07A8 8 0 0 0 20 11Z"
            />
          </svg>
        )}
      </button>
      <button
        type="submit"
        className="p-2 bg-[#7A72DE] text-white rounded-r-md focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 512 512"
          className="w-6 h-6"
        >
          <path
            fill="currentColor"
            d="M496 16L15.88 208L195 289L448 64L223 317l81 179L496 16z"
          />
        </svg>
      </button>
    </form>
  );
};

export default TextInput;
