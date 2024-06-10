"use client";
import React, { useState } from "react";

const NotificacionesForm = (session) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sendToAll, setSendToAll] = useState(false);
  const [userId, setUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const notificationData = {
      name: name,
      content: description,
      admin_id: session.user.id, // Get current admin id
    };

    const recipient = sendToAll ? "all" : userId;

    try {
      // Create the Notification record
      const notificationResponse = await fetch("/api/database/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      });

      if (!notificationResponse.ok) {
        throw new Error("Failed to create notification");
      }

      const notification = await notificationResponse.json();

      if (recipient === "all") {
        // Send notification to all users
        const allUsersResponse = await fetch(
          "/api/database/students/get-all-ids"
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
            "/api/database/student-notifications",
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
          "/api/database/student-notifications",
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
    setIsSubmitting(false);
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
        className="bg-[#7A72DE] text-white px-4 py-2 rounded-md hover:bg-[#E0DFFF] flex items-center justify-center"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Submit"
        )}
      </button>
    </div>
  );
};

export default NotificacionesForm;
