import ConversationHistory from "@/components/user/conversation-history";

export default async function History(){


  return(<div>
    <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white py-6">Historial</h1>
    <ConversationHistory ></ConversationHistory>
  </div>);
}