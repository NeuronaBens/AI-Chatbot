import React from "react";

const TextBubble = ({ text, aiResponse }) => {
  const bubbleColor = aiResponse ? "bg-orange-300" : "bg-gray-300";
  const bubblePosition = aiResponse ? "ml-auto" : "mr-auto";

  return (
    <div>
      <div className="w-1/3"></div>
      <div
        className={`w-2/3 rounded-full my-2 mx-5 px-4 py-2 ${bubbleColor} ${bubblePosition}`}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TextBubble;
