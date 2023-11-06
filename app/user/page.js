import ChatContainer from "@/components/user/chat/chat-container";
import Dialog from "@/components/general/modal";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getData(id) {
  const res = await fetch(`http://localhost:3000//api/database/students/${id}`,{
    cache:'no-cache',
  })

  //console.log(res.status)
  if(res.status == "404"){
    return null;
  }
  const data = await res.json()
  return data
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const data = await getData(session.user.id)

  async function onClose() {
    "use server"
    console.log("Modal has closed")
  }

  async function onOk() {
    "use server"
    console.log("Ok was clicked")
  }

  const loadModal = ()=>{
    if (!data){
      return true;
    }

    return false;
  }

  return(
  <div>
    <Dialog title="Student Information" user= {session.user.id} type = "form" width = "1200px" showDialog = {loadModal()} lenght={0} onClose={onClose} onOk={onOk}>
    </Dialog>
    <ChatContainer></ChatContainer>
  </div>);
}