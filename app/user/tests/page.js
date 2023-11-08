"use client"

import Card from "@/components/general/card"
import Dialog from "@/components/general/modal"
import { useState } from "react";

export default function Home(){
  const [showModalGAD, setShowModalGAD] = useState(false);
  const [showModalPSS, setShowModalPSS] = useState(false);
  const stringStylesWidth = "w-[1200px] max-w-fullbg-gray-200 flex flex-col";
  const stringStylesGridGAD7 = "grid grid-cols-5 grid-rows-8 gap-2 px-2 py-2 text-xs";
  const stringStylesGridPSS14 = "grid grid-cols-6 grid-rows-15 gap-2 px-2 py-2 text-xs";

  async function onClose() {
    console.log("Modal has closed")
    setShowModalGAD(false)
    setShowModalPSS(false)
  }

  async function onOk() {
    console.log("Ok was clicked")
  }

  return(
    <div>
      <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white py-6">Tests de ansiedad y estres</h1>
      <div className="flex flex-wrap gap-4">
      <Card props={{title: "Cuestionario GAD-7", description:"Aqui podras dar el cuestionario GAD-7 para medir tus niveles de ansiedad actuales", image: "/ansiedad.jpg"}}>
      <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setShowModalGAD(true)}
        >
            Empezar
             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
      </Card>
      <Card props={{title: "Cuestionario PSS-14", description: "Aqui podras dar el cuestionario PSS-14 para medir tus niveles de estres actuales", image: "/estres.jpg"}}>
        <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setShowModalPSS(true)}
        >
            Empezar
             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
      </Card>
      <div>
        <Dialog props={{title: "GAD-7", type: "questions", showDialog: showModalGAD ,onClose: onClose,onOk: onOk, stringStylesWidth: stringStylesWidth, stringStylesGrid: stringStylesGridGAD7}}>
          {{values: ["Pregunta", "Nunca", "Varios dias", "La mitad de los dias", "Casi cada dia"],}}
          {{values: ["Sentirse nervioso, ansioso, notar que se le ponen los nervios de punta.", 0, 1, 2, 3],}}
          {{values: ["No ser capaz de parar o controlar sus preocupaciones.	", 0, 1, 2, 3],}}
          {{values: ["Preocuparse demasiado sobre diferentes cosas.	", 0, 1, 2, 3],}}
          {{values: ["Dificultad para relajarse.	", 0, 1, 2, 3],}}
          {{values: ["Estar tan desasosegado que le resulta difícil parar quieto.	", 0, 1, 2, 3],}}
          {{values: ["Sentirse fácilmente disgustado o irritable.	", 0, 1, 2, 3],}}
          {{values: ["Sentirse asustado como si algo horrible pudiese pasar.	", 0, 1, 2, 3],}}        
        </Dialog>
        <Dialog props={{title: "PSS-14", type: "questions", showDialog: showModalPSS ,onClose: onClose,onOk: onOk, stringStylesWidth: stringStylesWidth, stringStylesGrid: stringStylesGridPSS14}}>
          {{values: ["Pregunta", "Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"],}}
          {{values: ["En el último mes, ¿con qué frecuencia te has sentido afectado por algo que ocurrió inesperadamente?", 0, 1, 2, 3, 4],}}
          {{values: ["En el último mes, ¿con qué frecuencia te has sentido incapaz de controlar las cosas importantes en tu vida?", 0, 1, 2, 3, 4],}}
          {{values: ["En el último mes, ¿con qué frecuencia te has sentido nervioso o estresado?", 0, 1, 2, 3, 4],}}
          {{values: ["En el último mes, ¿con qué frecuencia has manejado con éxito los pequeños problemas irritantes de la vida?", 4, 3, 2, 1, 0],}}
          {{values: ["En el último mes, ¿con qué frecuencia has sentido que has afrontado efectivamente los cambios importantes que han estado ocurriendo en tu vida?", 4, 3, 2, 1, 0],}}
          {{values: ["En el último mes, ¿con qué frecuencia has estado seguro sobre tu capacidad para manejar tus problemas personales?", 4, 3, 2, 1, 0],}}
          {{values: ["En el último mes, ¿con qué frecuencia has sentido que las cosas van bien?", 4, 3, 2, 1, 0],}}
          {{values: ["En el último mes, ¿con qué frecuencia has sentido que no podías afrontar todas las cosas que tenías que hacer?", 0, 1, 2, 3, 4],}}
          {{values: ["En el último mes, ¿con qué frecuencia has podido controlar las dificultades de tu vida?", 4, 3, 2, 1, 0],}}
          {{values: ["En el último mes, ¿con qué frecuencia has sentido que tenías todo bajo control?", 4, 3, 2, 1, 0],}}
          {{values: ["En el último mes, ¿con qué frecuencia has estado enfadado porque las cosas que te han ocurrido estaban fuera de tu control?", 0, 1, 2, 3, 4],}}
          {{values: [" En el último mes, ¿con qué frecuencia has pensado sobre las cosas que te faltan por hacer?", 0, 1, 2, 3, 4],}}
          {{values: [" En el último mes, ¿con qué frecuencia has podido controlar la forma de pasar el tiempo?", 4, 3, 2, 1, 0],}}
          {{values: ["En el último mes, ¿con qué frecuencia has sentido que las dificultades se acumulan tanto que no puedes superarlas?", 0, 1, 2, 3, 4],}}   
        </Dialog>
      </div> 
    </div>
    </div>
    
  )    
}