"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {  PuzzlePieceIcon } from "@heroicons/react/24/outline";
import {Badge} from "@chakra-ui/react";


const Tasks = ()=>{
  const {data: session, status} = useSession();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(status != "loading" ){
      fetch(`/api/database/students/${session.user.id}/tasks`)
        .then(response => response.json())
        .then(data => {
          setTasks(data)
        })
    }
}, [status])

  return(
    <div>
      {status == "loading"?<div></div>:
        <div className="grid gap-8 mx-2">       
          {tasks.map((value, i)=>(
            <div className=" rounded bg-gray-300 py-5 mx-10">
              <div id={i} className="w-[1200px] w-full flex flex row ml-4 gap-8">
                <PuzzlePieceIcon class="h-12 w-12 text-black" />
                <div className=" grid">
                  <div className="grid grid-cols-6 text-xl font-semibold mb-4">
                    <div className="flex flex-col col-span-5">{value.task.name}</div> 
                    <Badge ml='1' colorScheme='green' className="flex flex-col ">
                      New
                    </Badge>
                  </div>
                <div>
                <div>{value.task.content}</div>
              </div>
                </div>  
              </div>
            </div>)) 
          }
        </div>
      }
    </div>
  )
};

export default Tasks;