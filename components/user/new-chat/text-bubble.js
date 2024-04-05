import React, { useState } from "react";
import OptionsMenu from "./options-menu";
import Dialog from "@/components/general/modal";

const TextBubble = ({
  chatMessage,
  onDelete,
  messagesLength,
  index,
  lastResComplete,
}) => {
  const buttonColor =
    chatMessage.role == "assistant"
      ? "text-white hover:text-gray-200"
      : "text-gray-500 hover:text-gray-700";
  const bubbleColor =
    chatMessage.role == "assistant" ? "bg-[#7471D9] text-white" : "bg-gray-300";
  const bubblePosition =
    chatMessage.role == "assistant" ? "mr-auto" : "ml-auto";
  const [showOptions, setShowOptions] = useState(false);
  const [showDialogComplaint, setShowDialogComplaint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAudio = async (messageText) => {
    setIsLoading(true);

    try {
      // Make a POST request to the server's API endpoint to generate audio
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: messageText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio data.");
      }

      // Get the audio data as an ArrayBuffer
      const data = await response.arrayBuffer();

      // Convert ArrayBuffer to Blob and create a URL for the audio
      const blob = new Blob([data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      audio.play();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  async function onClose() {
    console.log("Modal has closed");
    setShowDialogComplaint(false);
  }

  async function onOk() {
    console.log("Ok was clicked");
  }

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

        await onDelete(index + 1);
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
    } else if (option === "Denunciar") {
      setShowDialogComplaint(true);
    }
    setShowOptions(false);
  };

  return (
    <div className="w-5/6 mx-auto relative">
      <div
        key={index}
        className={`w-2/3 rounded-xl my-2 mx-5 px-4 py-2 ${bubbleColor} ${bubblePosition} flex justify-between items-center`}
      >
        <p>{chatMessage.content}</p>
        {chatMessage.role === "assistant" &&
          (messagesLength - 1 == index ? lastResComplete : true) && (
            <div>
              <button
                type="button"
                onClick={() => handleGetAudio(chatMessage.content)}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 898 1026"
                  >
                    <path
                      fill="#ffffff"
                      d="m62.397 8l819 467q16 9 16 39.5t-16 37.5l-819 467q-12 8-30 5.5t-32-17.5V22q31-34 62-14z"
                    />
                  </svg>
                )}
              </button>
              <button
                className={`${buttonColor} focus:outline-none`}
                onClick={() => setShowOptions(!showOptions)}
              >
                <span className="text-3xl ml-4">...</span>
              </button>
              {showOptions && (
                <OptionsMenu handleOptionClick={handleOptionClick} />
              )}
            </div>
          )}

        {chatMessage.role === "user" && (
          <div>
            <button
              className={`${buttonColor} focus:outline-none`}
              onClick={() => setShowOptions(!showOptions)}
            >
              <span className="text-3xl ml-4">...</span>
            </button>
            {showOptions && (
              <OptionsMenu handleOptionClick={handleOptionClick} />
            )}
          </div>
        )}
      </div>
      <Dialog
        props={{
          title: "¿Deseas denunciar este mensaje?",
          type: "complaint",
          showDialog: showDialogComplaint,
          onClose: onClose,
          onOk: onOk,
          width: "500px",
          message_id: chatMessage.id,
        }}
      />
    </div>
  );
};

export default TextBubble;