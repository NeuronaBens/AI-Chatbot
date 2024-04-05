"use client";
import React, { useState } from "react";

const NotificacionesForm = ({ session }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = async () => {
    const notificationData = {
      name: name,
      content: description,
      admin_id: session.user.id, // Get current admin id
    };

    const recipient = sendToAll ? "all" : userId;

    try {
      // Create the Notification record
      const notificationResponse = await fetch(
        "http://localhost:3000/api/database/notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notificationData),
        }
      );

      if (!notificationResponse.ok) {
        throw new Error("Failed to create notification");
      }

      const notification = await notificationResponse.json();

      if (recipient === "all") {
        // Send notification to all users
        const allUsersResponse = await fetch(
          "http://localhost:3000/api/database/students/get-all-ids"
        );

        if (!allUsersResponse.ok) {
          throw new Error("Failed to get all user IDs");
        }

        const allUsers = await allUsersResponse.json();

        // Create StudentNotification records for all users
        const studentNotificationsPromises = allUsers.map(async (userId) => {
          const studentNotificationData = {
            student_id: userId,
            notification_id: notification.id,
          };

          const studentNotificationResponse = await fetch(
            "http://localhost:3000/api/database/student-notifications",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(studentNotificationData),
            }
          );

          if (!studentNotificationResponse.ok) {
            throw new Error(
              `Failed to create student notification for user ${userId}`
            );
          }

          return studentNotificationResponse.json();
        });

        await Promise.all(studentNotificationsPromises);
      } else {
        // Create StudentNotification record for the specific user
        const studentNotificationData = {
          student_id: recipient,
          notification_id: notification.id,
        };

        const studentNotificationResponse = await fetch(
          "http://localhost:3000/api/database/student-notifications",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(studentNotificationData),
          }
        );

        if (!studentNotificationResponse.ok) {
          throw new Error(
            `Failed to create student notification for user ${recipient}`
          );
        }
      }

      // Handle success
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8  rounded-md shadow-md">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Notification Name"
        className="w-full mb-4 p-2 rounded-md border border-gray-300"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Notification Description"
        className="w-full mb-4 p-2 rounded-md border border-gray-300"
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={sendToAll}
          onChange={() => setSendToAll(!sendToAll)}
          className="mr-2"
        />
        Send to all users
      </label>
      {!sendToAll && (
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          className="w-full mb-4 p-2 rounded-md border border-gray-300"
        />
      )}
      <button
        onClick={handleSubmit}
        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default NotificacionesForm;
