import ConversationHistory from "@/components/user/conversation-history";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function History(){
  const session = await getServerSession(authOptions)

  return(<div>
    <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white py-6">Historial</h1>
    <ConversationHistory {...session}></ConversationHistory>
  </div>);
}