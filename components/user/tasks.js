"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";
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
              key={i}
              position="relative"
              borderRadius="lg"
              overflow="hidden"
              bg={
                value.completed === 0
                  ? "linear-gradient(to right, #7471D9, #805AD5)"
                  : "gray.300"
              }
              p="2px"
            >
              <Box
                bg="white"
                borderRadius="lg"
                p={4}
                position="relative"
                overflow="hidden"
              >
                {value.completed === 0 && (
                  <Badge
                    bgGradient="linear(to-r, #7471D9, #805AD5)"
                    color="white"
                    position="absolute"
                    top={2}
                    right={2}
                  >
                    New
                  </Badge>
                )}
                <Flex alignItems="center" gap={4}>
                  <PuzzlePieceIcon
                    className={`h-12 w-12 ${
                      value.completed === 0
                        ? "bg-gradient-to-r from-[#3A378C] to-[#6C63FF] text-transparent bg-clip-text"
                        : "text-gray-500"
                    }`}
                  />
                  <Box>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      className={
                        value.completed === 0
                          ? "bg-gradient-to-r from-[#3A378C] to-[#6C63FF] text-transparent bg-clip-text"
                          : "text-gray-800"
                      }
                    >
                      {value.task.name}
                      {value.completed === 0 && (
                        <Button
                          ml={2}
                          bgGradient="linear(to-r, #7471D9, #805AD5)"
                          color="white"
                          size="sm"
                          onClick={() => completeTask(i)}
                        >
                          Complete
                        </Button>
                      )}
                    </Text>
                    <Text
                      className={
                        value.completed === 0
                          ? "text-gray-600"
                          : "text-gray-500"
                      }
                    >
                      {value.task.content}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Tasks;
