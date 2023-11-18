import ChatContainer from "@/components/user/chat/chat-container";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return(
  <div>
    <ChatContainer {...session}></ChatContainer>
  </div>);
}