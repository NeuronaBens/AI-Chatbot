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
      {status == "loading" ?<div></div>:
        <div className="grid gap-8 mx-8">       
          {tasks.map((value, i)=>(
            <div className=" rounded bg-[#AAA7F2] py-2">
              <div key={i} className=" grid grid-cols-12 grid-rows-2" >
                <div className="ml-2"><PuzzlePieceIcon class="h-12 w-12 text-black col-span-1" /></div>
              
                <div className="max-w-full grid row-span-2 col-span-10">
                  <div className="text-xl font-semibold">{value.task.name}</div> 
                  <div>{value.task.content}</div>
                </div>
                <div className="ml-8">
                  <Badge ml='1' colorScheme='green' className="col-span-1">
                    New
                  </Badge>
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