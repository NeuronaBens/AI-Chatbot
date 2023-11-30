"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { Badge } from "@chakra-ui/react";

const Tasks = () => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (status != "loading") {
      fetch(`/api/database/students/${session.user.id}/tasks`)
        .then((response) => response.json())
        .then((data) => {
          setTasks(data);
        });
    }
  }, [status]);

  const completeTask = async (index) => {
    // Make a copy of the tasks array to modify the completed task
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true; // Assuming you have a 'completed' property in your task object

    try {
      const response = await fetch(
        `http://localhost:3000/api/database/student-tasks/${updatedTasks[index].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }), // Assuming 'true' represents completion
        }
      );

      if (response.ok) {
        // Task updated successfully
        const updatedTask = await response.json();
        console.log("Task updated:", updatedTask);
        // You can handle further actions if needed after successful completion update
      } else {
        // Handle error scenarios
        console.error("Failed to update task:", response.statusText);
        // Handle error scenarios as required
      }
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle any unexpected errors
    }

    // Update state to reflect the completion
    setTasks(updatedTasks);
  };

  return (
    <div>
      {status === "loading" ? (
        <div></div>
      ) : (
        <div className="grid gap-8 mx-8">
          {tasks.map((value, i) => (
            <div
              key={i}
              className={`rounded ${
                value.completed
                  ? "bg-white border-2 border-purple-500"
                  : "bg-[#AAA7F2]"
              } py-2`}
            >
              <div className="grid grid-cols-12 grid-rows-2">
                <div className="ml-2">
                  <PuzzlePieceIcon class="h-12 w-12 text-black col-span-1" />
                </div>

                <div className="max-w-full grid row-span-2 col-span-10">
                  <div className="text-xl font-semibold">
                    {value.task.name}{" "}
                    {!value.completed && (
                      <button
                        onClick={() => completeTask(i)}
                        className="ml-2 bg-purple-500 text-white py-1 px-2 mr-4 rounded"
                      >
                        Completar
                      </button>
                    )}
                  </div>

                  <div>{value.task.content}</div>
                </div>
                <div className="ml-8">
                  <Badge ml="1" colorScheme="green" className="col-span-1">
                    New
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
