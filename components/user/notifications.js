"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import { Badge } from "@chakra-ui/react";

const Notifications = () => {
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    fetch(`/api/database/students/${session.user.id}/notifications`)
      .then((response) => response.json())
      .then((data) => {
        setNotifications(data);
      });
  };

  useEffect(() => {
    if (status != "loading") {
      fetchNotifications();
    }
  }, [status]);

  const updateNotification = async (id) => {
    try {
      const res = await fetch(`/api/database/student-notifications/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          read: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }

      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {status === "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="xl" color="blue.500" />
        </div>
      ) : (
        <div className="grid gap-8 mx-8">
          {notifications.map((value, i) => (
            <div
              key={i}
              className="rounded-lg bg-gradient-to-r from-[#7471D9] to-purple-700 p-4 shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
              onClick={() => updateNotification(value.id)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <NewspaperIcon className="h-12 w-12 text-white" />
                </div>
                <div className="ml-4">
                  <div className="text-xl font-semibold text-white">
                    {value.notification.name}
                  </div>
                  <div className="mt-1 text-gray-100">
                    {value.notification.content}
                  </div>
                </div>
                {!value.read && (
                  <div className="ml-auto">
                    <Badge colorScheme="green" fontSize="sm">
                      New
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
