"use client"

import { useSession } from 'next-auth/react';
import { useRef, useEffect, useState } from 'react'
 
export default function ConfigDialog({session, title, onClose, showDialog , children}) {
  const dialogRef = useRef(null);
  const [showProfile, setShowProfile] = useState(true);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showGeneral, setShowGeneral] = useState(false);
  const [name, setName] = useState(session.user.name);
  const [email, setEmail] = useState(session.user.email);
  const [theme, setTheme] = useState("Claro");
  const {update} = useSession(); 
  //const [password, setPassword] = useState("");


  useEffect(() => {
    if (showDialog === true) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [showDialog])

  const closeDialog = () => {
    dialogRef.current?.close()
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      update({name,email});
      console.log(session)

    }catch(error){
      console.error(error);
    }
        
  };
    

  const dialog = showDialog === true
    ? (
      <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50">
        <div className="w-[600px] h-[450px] max-w-full bg-blue-500 text-white flex flex-col">
          <div className="flex flex-row justify-between mb-4 pt-2 px-5">
            <h1 className="group relative w-full flex justify-center py-2 px-4 text-lg font-medium text-white">{title}</h1>
            <button onClick={closeDialog} className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white">x</button>
          </div>
          <hr className=" bg-blue-500 mx-2 py-2"></hr>
          {session.user.role == "Student" &&
            <div className="config-structure grid grid-cols-4 gap-6 mx-4">
              <div className="side-bar flex flex-col col-span-1">
                <a href='#' className={showProfile?"bg-black rounded-lg my-2 p-2":"p-2 my-2"} 
                onClick={()=>{setShowProfile(true);setShowPrivacy(false);setShowGeneral(false);}}>
                  Perfil
                </a >
                <a href='#' className={showPrivacy?"bg-black rounded-lg my-2 p-2":"p-2 my-2"} 
                onClick={()=>{setShowProfile(false);setShowPrivacy(true);setShowGeneral(false);}}>
                  Privacidad
                </a >
                <a href='#' className={showGeneral?"bg-black rounded-lg my-2 p-2":"p-2 my-2"} 
                onClick={()=>{setShowProfile(false);setShowPrivacy(false);setShowGeneral(true);}}>
                  General
                </a >
              </div>
              <div className="content col-span-3 ">
                {showProfile &&<div>
                  <form className="space-y-2 text-base" onSubmit={handleSubmit}>
                    <img className="mx-auto h-1/2 w-1/3 rounded-full" src={session.user.image} alt=""/>
                    <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                      <label htmlFor="name" className='w-1/5 pt-3'> Nombre: </label>
                      <input id="name" name="name" autoComplete="name" required value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                      placeholder="Name"/>
                    </div>
                    <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                      <label htmlFor="email" className='w-1/5 pt-3'> Correo: </label>
                      <input id="email" name="email" autoComplete="email" required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                      placeholder="Email"/>
                    </div>
                    <div className='flex justify-center items-center py-4'>
                      <button type="submit"
                      className="group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>}
                {showPrivacy && <div className='grid gap-4'>
                  <div className="space-y-4 flex flex-row justify-between">
                    <label htmlFor='data' className=' pt-3'> Recopilación de Datos </label>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input id="data" type="checkbox" value="" class="sr-only peer" checked disabled/>
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="space-y-4 flex flex-row justify-between">
                    <label htmlFor='eliminate-account' className=' pt-3'> Borrar cuenta </label>
                    <button id='eliminate-account'
                      className="group relative w-1/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500">
                        Borrar
                    </button>
                  </div>
                </div>}
                {showGeneral && <div className='grid gap-4'>
                  <div className="space-y-4 flex flex-row justify-between">
                    <label htmlFor='theme' className=' pt-3'> Tema </label>
                    <select id ="theme" name="theme" value={theme} onChange={(e) => setTheme(e.target.value)}
                      className=" w-2/6 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10  ">
                        <option value="Claro" > Claro </option>
                        <option value="Oscuro" > Oscuro </option>
                    </select>
                  </div>
                  <div className="space-y-4 flex flex-row justify-between">
                    <label htmlFor='clear-history' className=' pt-3'> Borrar historial de conversacion </label>
                    <button id='clear-history'
                      className="group relative w-1/5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500">
                        Borrar
                    </button>
                  </div>
                </div>}
              </div>

            </div>
          }
          {session.user.role == "Admin" &&
            <div className="config-structure grid grid-cols-4 gap-6 mx-4">
              <div className="side-bar flex flex-col col-span-1">
                <a href='#' className="bg-black rounded-lg my-2 p-2">
                  Perfil
                </a >
              </div>
              <div className="content col-span-3 ">
                <form className="space-y-2 text-base" onSubmit={handleSubmit}>
                  <img className="mx-auto h-1/2 w-1/3 rounded-full" src={session.user.image} alt=""/>
                  <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                    <label htmlFor="name" className='w-1/5 pt-3'> Nombre: </label>
                    <input id="name" name="name" autoComplete="name" required value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                    placeholder="Name"/>
                  </div>
                  <div className="rounded-md shadow-sm space-y-4 flex flex-row">
                    <label htmlFor="email" className='w-1/5 pt-3'> Correo: </label>
                    <input id="email" name="email" autoComplete="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-4/5 p-1 border border-gray-300 placeholder-gray-500 placeholder:text-base text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                    placeholder="Email"/>
                  </div>
                  <div className='flex justify-center items-center py-4'>
                    <button type="submit"
                    className="group relative w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }
        </div>
      </dialog>
    ) : null


  return dialog
}