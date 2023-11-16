import ChatContainer from "@/components/user/chat/chat-container";
import Dialog from "@/components/general/modal";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getData(id) {
  const res = await fetch(`http://localhost:3000//api/database/students/${id}`,{
    cache:'no-cache',
  })

  if(res.status == "404"){
    return null;
  }else {
    const data = await res.json()
    return data;
  }
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

  const modalProps = {
    title: "Student Information",
    type: "form",
    showDialog: loadModal(),
    width: "600px",
    onClose: onClose,
    onOk: onOk,
  };

  return(
  <div>
    <Dialog props = {modalProps}></Dialog>
    <ChatContainer {...session}></ChatContainer>
  </div>);
}