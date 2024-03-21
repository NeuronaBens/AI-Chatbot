export class TaskManager {
  static async getAllTasks() {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}api/database/tasks`
    );
    const tasks = await response.json();
    return tasks;
  }

  static async getStudentTasks(userId) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}api/database/students/${userId}/tasks`
    );
    const studentTasks = await response.json();
    return studentTasks;
  }

  static async createStudentTask(userId, taskId) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}api/database/student-tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          student_id: userId,
          task_id: taskId,
        }),
      }
    );
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
          text.toLowerCase().includes(task.name.toLowerCase()) &&
          !existingTaskIds.includes(task.id)
      );

      //if (matchingTask) {
      await TaskManager.createStudentTask(userId, matchingTask.id);
      return { success: true, message: "Task processed successfully" };
      //}
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
