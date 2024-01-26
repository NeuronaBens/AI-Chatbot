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
          console.log("resolveThemClass function activation");
          document.body.className = "vsc-initialized";
          document.body.classList.add("text-white");
          document.body.style.backgroundColor = "rgb(63, 63, 70)";
        } else if (data.theme == "Claro") {
          console.log("resolveThemClass function activation");
          document.body.className = "vsc-initialized";
          document.body.style.backgroundColor = "";
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
