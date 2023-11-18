import Greeting from "@/components/general/greeting";
import ConversationHistory from "@/components/user/conversation-history";

export default async function History(){


  return(<div>
    <Greeting title={"Tu Historial!"} text={"Acá podrás ver las conversaciones que has tenido con Calmbot cada día."}></Greeting>
    <ConversationHistory ></ConversationHistory>
  </div>);
}