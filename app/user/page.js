import TextInput from "@/components/user/chat/text-input";
import TextBubble from "@/components/user/chat/text-bubble";

export default function Home() {
  return (
    <div className="grow">
      <TextBubble text={"Hello dear friend"} aiResponse={true}></TextBubble>
      <TextBubble text={"Hello AI chatbot"} aiResponse={false}></TextBubble>
      <TextInput></TextInput>
    </div>
  );
}
