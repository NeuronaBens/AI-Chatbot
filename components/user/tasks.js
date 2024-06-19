"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Badge, Box, Text, Button, Flex } from "@chakra-ui/react";

const Tasks = () => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (status !== "loading") {
      fetch(`/api/database/students/${session.user.id}/tasks`)
        .then((response) => response.json())
        .then((data) => {
          setTasks(data);
        });
    }
  }, [status]);

  const completeTask = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = 1;

    try {
      const response = await fetch(
        `/api/database/student-tasks/${updatedTasks[index].id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: 1 }),
        }
      );

      if (response.ok) {
        const updatedTask = await response.json();
      } else {
        console.error("Failed to update task:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }

    setTasks(updatedTasks);
  };

  return (
    <Box>
      {status === "loading" ? (
        <div></div>
      ) : (
        <Flex flexWrap="wrap" gap={8} mx={8}>
          {tasks.map((value, i) => (
            <Box
              borderRadius="lg"
              p={4}
              position="relative"
              overflow="hidden"
              border="1px solid #E1E1E1"
              key={i}
            >
              {value.completed === 0 && (
                <Badge
                  bg="#7A72DE"
                  color="white"
                  position="absolute"
                  top={2}
                  right={2}
                >
                  New
                </Badge>
              )}
              <Flex alignItems="center" gap={4}>
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    {value.task.name}
                    {value.completed === 0 && (
                      <Button
                        ml={2}
                        bg="#7A72DE"
                        color="white"
                        size="sm"
                        onClick={() => completeTask(i)}
                      >
                        Complete
                      </Button>
                    )}
                  </Text>
                  <Text>{value.task.content}</Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Tasks;
