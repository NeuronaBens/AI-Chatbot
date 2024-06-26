"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import { Badge, Spinner } from "@chakra-ui/react";

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

  const updateNotification = async (value) => {
    if (value.read == true) return;

    try {
      const res = await fetch(
        `/api/database/student-notifications/${value.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            read: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
              className="p-4 rounded border-[#E1E1E1] border-[1px] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
              onClick={() => updateNotification(value)}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <NewspaperIcon className="h-12 w-12" />
                </div>
                <div className="ml-4">
                  <div className="text-xl font-semibold">
                    {value.notification.name}
                  </div>
                  <div className="mt-1">{value.notification.content}</div>
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
