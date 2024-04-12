// notificationUtils.js

export const checkIfMessageIsRisky = async (message) => {
  try {
    const response = await fetch("/api/database/messages/is-risky", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error checking if message is risky");
    }
  } catch (error) {
    console.error("Error checking if message is risky:", error);
    return false;
  }
};

export const displayNotification = (message) => {
  // Create the notification element
  const notification = document.createElement("div");
  notification.classList.add(
    "fixed",
    "top-4",
    "right-4",
    "bg-red-500",
    "text-white",
    "px-4",
    "py-2",
    "rounded",
    "shadow",
    "cursor-pointer"
  );

  // Create an anchor element for the link
  const link = document.createElement("a");
  link.href = "/user/notificaciones";
  link.textContent = message;

  // Append the link to the notification element
  notification.appendChild(link);

  // Append the notification to the document body
  document.body.appendChild(notification);

  // Remove the notification after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
};
