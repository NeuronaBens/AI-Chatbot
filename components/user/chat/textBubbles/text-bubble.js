import React, { useState } from "react";
import OptionsMenu from "./options-menu";
import Dialog from "@/components/general/modal";

const TextBubble = ({ chatMessage, onDelete }) => {
  const buttonColor = chatMessage.sender == false ? "text-white hover:text-gray-200": "text-gray-500 hover:text-gray-700"
  const bubbleColor =
    chatMessage.sender == false ? "bg-[#7471D9] text-white" : "bg-gray-300";
  const bubblePosition = chatMessage.sender == false ? "mr-auto" : "ml-auto";
  const [showOptions, setShowOptions] = useState(false);
  const [showDialogComplaint, setShowDialogComplaint] = useState(false);
  const stringStylesWidth = "w-[500px] max-w-fullbg-gray-200 flex flex-col";

  async function onClose() {
    console.log("Modal has closed")
    setShowDialogComplaint(false)
  }

  async function onOk() {
    console.log("Ok was clicked")
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

        await onDelete(chatMessage.order);
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
      setShowDialogComplaint(true);
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
            className={`${buttonColor} focus:outline-none`}
            onClick={() => setShowOptions(!showOptions)}
          >
            <span className="text-3xl ml-4">...</span>
          </button>
          {showOptions && <OptionsMenu handleOptionClick={handleOptionClick} />}
        </div>
      </div>
      <Dialog props={{title: "¿Deseas denunciar este mensaje?", type: "complaint", showDialog: showDialogComplaint ,onClose: onClose,onOk: onOk, width:"500px", message_id: chatMessage.id }}/>
    </div>
  );
};

export default TextBubble;
