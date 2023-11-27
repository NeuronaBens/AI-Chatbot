"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import {Badge} from "@chakra-ui/react";


const Notifications = ()=>{
  const {data: session, status} = useSession();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = ()=>{
    fetch(`/api/database/students/${session.user.id}/notifications`)
        .then(response => response.json())
        .then(data => {
          setNotifications(data)
        })
  }

  useEffect(() => {
    if(status != "loading" ){
      fetchNotifications();
    }
}, [status])

  const updateNotification = async (id)=>{
    try{
      const res = await fetch(`/api/database/student-notifications/${id}`,{
        method: "PUT",
        body: JSON.stringify({
        read:true
      }),
        headers: {
        "Content-Type": "application/json",
      },
      });

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }

      fetchNotifications();
    }catch(error){
      console.error(error);
    }
  }

  return(
    <div>
      {status == "loading" ?<div></div>:
        <div className="grid gap-8 mx-8">       
          {notifications.map((value, i)=>(
            <div className=" rounded bg-[#AAA7F2] py-2" onClick={()=> updateNotification(value.id)}>
              <div key={i} className=" grid grid-cols-12 grid-rows-2" >
                <div className="ml-2"><NewspaperIcon class="h-12 w-12 text-black col-span-1" /></div>
              
                <div className="max-w-full grid row-span-2 col-span-10">
                  <div className="text-xl font-semibold">{value.notification.name}</div> 
                  <div>{value.notification.content}</div>
                </div>
                {value.read == false && <div className="ml-8" >
                  <Badge ml='1' colorScheme='green' className="col-span-1">
                    New
                  </Badge>
                </div>}
              </div>
            </div>)) 
          }
        </div>
      }
    </div>
  )
};

export default Notifications;