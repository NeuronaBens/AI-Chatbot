// ThemeManager.js
export class ThemeManager {
  static async resolveThemeClass(session) {
    let theme = "Claro"; // Default theme

    try {
      const res = await fetch(
        `/api/database/students/${session.user.id}/settings`
      );
      if (res.ok) {
        const data = await res.json();
        theme = data.theme || theme; // Use the fetched theme, or fallback to default
      } else {
        // Handle errors if needed
      }
    } catch (error) {
      // Handle fetch errors if needed
    }

    // Determine the theme class based on the 'theme' value
    return theme === "Oscuro" ? "bg-slate-800" : "bg-white";
  }
}
