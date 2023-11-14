"use client"
import ConfigDialog from "./config-dialog";
import { signOut } from "next-auth/react";
import { useState } from "react";


const UserProfile = (session) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="relative m-4 w-36">
      <button className="flex items-center gap-4" onClick={()=>setShowMenu(!showMenu)}>
        <img className="w-10 h-10 rounded-full w-1/5" src={session.user.image} alt=""/>
        <div className="font-medium dark:text-white w-4/5">
          <div>{session.user.name}</div>
        </div>
      </button>
      {showMenu && (
        <div className="absolute bottom-10 left-0 z-10 w-36 px-2 py-4 bg-white rounded-md shadow-lg">
          <button className="block text-sm text-gray-700 py-2 hover:bg-gray-100" onClick={()=> setShowDialog(true)}>
            Configuración
          </button>
          {showDialog &&
            <ConfigDialog session = {...session} title={"Configuración"} onClose={()=>setShowDialog(false)} showDialog={true}/>
          }
          <button onClick={() => { signOut({callbackUrl: "/",});}}>
            <p className="text-gray-400 flex py-2">
              Cerrar Sesion
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </p>
          </button>
        </div>
      )}
  </div>
   
  );
};

export default UserProfile;