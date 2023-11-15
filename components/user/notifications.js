"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { NewspaperIcon } from "@heroicons/react/24/outline";


const Notifications = ()=>{
  const {data: session, status} = useSession();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if(status != "loading" ){
      fetch(`/api/database/students/${session.user.id}/notifications`)
        .then(response => response.json())
        .then(data => {
          setNotifications(data)
        })
    }
}, [status])

  return(
    <div>
      {status == "loading" ?<div></div>:
        <div className="grid gap-4">
          {notifications.map((value, i)=>(
            <div id={i} className="flex flex row">
              <NewspaperIcon class="h-12 w-12 text-black" />
              <div className="grid">
                <h3>{value.name}</h3>
                <div>
                  {value.content}
                </div>
              </div>
            </div>)) 
          }
        </div>
      }
    </div>
  )
};

export default Notifications;