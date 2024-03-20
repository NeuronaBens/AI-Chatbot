import ChatContainer from "@/components/user/chat/chat-container";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AIChat from "@/components/user/new-chat/chat";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <AIChat {...session}></AIChat>
    </div>
  );
}
