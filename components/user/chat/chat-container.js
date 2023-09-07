import React from "react";
import TextBubble from "./text-bubble";
import TextInput from "./text-input";

const ChatContainer = () => {
  return (
    <div className="w-full">
      <div className="grow">
        <div className="h-5/6 mb-32">
          <TextBubble text={"Hello dear friend"} aiResponse={true}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
          <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
        </div>
        <div className="w-full resize-none">
          <TextInput></TextInput>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
