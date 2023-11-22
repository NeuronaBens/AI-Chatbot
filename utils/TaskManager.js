class TaskManager {
  static async getAllTasks() {
    const response = await fetch("/api/database/tasks");
    const tasks = await response.json();
    return tasks;
  }

  static async getStudentTasks(userId) {
    const response = await fetch(`/api/database/students/${userId}/tasks`);
    const studentTasks = await response.json();
    return studentTasks;
  }

  static async createStudentTask(userId, taskId) {
    const response = await fetch("/api/database/student-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: userId,
        task_id: taskId,
      }),
    });
    const createdTask = await response.json();
    return createdTask;
  }

  static async processTasks(text, userId) {
    try {
      const allTasks = await TaskManager.getAllTasks();
      const studentTasks = await TaskManager.getStudentTasks(userId);

      const existingTaskIds = studentTasks.map((task) => task.task.id);

      const matchingTask = allTasks.find(
        (task) =>
          task.text.toLowerCase().includes(text.toLowerCase()) &&
          !existingTaskIds.includes(task.id)
      );

      if (matchingTask) {
        await TaskManager.createStudentTask(userId, matchingTask.id);
        return { success: true, message: "Task processed successfully" };
      }

      return {
        success: true,
        message: "No matching task found or already exists in student tasks",
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
