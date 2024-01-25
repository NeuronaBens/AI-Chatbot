// ThemeManager.js
export class ThemeManager {
  static async resolveThemeClass(userId) {
    const endpoint = `api/database/students/${encodeURIComponent(
      userId
    )}/settings`;

    try {
      const response = await fetch(endpoint);

      if (response.ok) {
        const data = await response.json();

        if (data.theme === "Oscuro") {
          document.body.classList.add("bg-slate-800");
          document.body.classList.add("text-white");
        }
      } else {
        console.error(
          `Failed to fetch theme settings. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error fetching theme settings:", error);
    }
  }
}
