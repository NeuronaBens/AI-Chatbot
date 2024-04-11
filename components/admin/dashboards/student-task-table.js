"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  HStack,
} from "@chakra-ui/react";

import PaginationControls from "@/components/general/pag-controls";

const StudentTaskTable = ({ page, per_page }) => {
  const [studentTasks, setStudentTasks] = useState([]);
  const [slicedData, setSlicedData] = useState([]);
  const [order, setOrder] = useState(Array(4).fill(0));
  const [filteredData, setFilteredData] = useState([]);
  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15

  useEffect(() => {
    const fetchStudentTasks = async () => {
      const response = await fetch("/api/database/student-tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStudentTasks(data);
      setFilteredData(data);
    };
    fetchStudentTasks();
  }, []);

  useEffect(() => {
    setSlicedData(filteredData.slice(start, end));
  }, [page, per_page, filteredData, order]);

  const orderData = (field) => {
    if (field == "id") {
      const newOrder = new Array(4).fill(0);
      newOrder[0] = order[0] == 0 ? 1 : order[0] * -1;
      setOrder(newOrder);

      if (newOrder[0] == 1 || newOrder[0] == 0) {
        const data = filteredData.sort((a, b) => a.id.localeCompare(b.id));
        setFilteredData(data);
      } else if (newOrder[0] == -1) {
        const data = filteredData.sort((a, b) => b.id.localeCompare(a.id));
        setFilteredData(data);
      }
    } else if (field == "completed") {
      const newOrder = new Array(4).fill(0);
      newOrder[1] = order[1] == 0 ? 1 : order[1] * -1;
      setOrder(newOrder);

      if (newOrder[1] == 1 || newOrder[1] == 0) {
        const data = filteredData.sort((a, b) =>
          a.completed.toString().localeCompare(b.completed.toString())
        );
        setFilteredData(data);
      } else if (newOrder[1] == -1) {
        const data = filteredData.sort((a, b) =>
          b.completed.toString().localeCompare(a.completed.toString())
        );
        setFilteredData(data);
      }
    } else if (field == "student_id") {
      const newOrder = new Array(4).fill(0);
      newOrder[2] = order[2] == 0 ? 1 : order[2] * -1;
      setOrder(newOrder);

      if (newOrder[2] == 1 || newOrder[2] == 0) {
        const data = filteredData.sort((a, b) =>
          a.student_id.localeCompare(b.student_id)
        );
        setFilteredData(data);
      } else if (newOrder[2] == -1) {
        const data = filteredData.sort((a, b) =>
          b.student_id.localeCompare(a.student_id)
        );
        setFilteredData(data);
      }
    } else if (field == "task_id") {
      const newOrder = new Array(4).fill(0);
      newOrder[3] = order[3] == 0 ? 1 : order[3] * -1;
      setOrder(newOrder);

      if (newOrder[3] == 1 || newOrder[3] == 0) {
        const data = filteredData.sort((a, b) =>
          a.task_id.localeCompare(b.task_id)
        );
        setFilteredData(data);
      } else if (newOrder[3] == -1) {
        const data = filteredData.sort((a, b) =>
          b.task_id.localeCompare(a.task_id)
        );
        setFilteredData(data);
      }
    }
  };

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Student Task Table</h3>
      {studentTasks && (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE] border">
                  <button
                    class="w-full h-full flex justify-between items-center"
                    onClick={() => orderData("id")}
                  >
                    <span>ID</span>
                    {order[0] == 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 7.639c-.63-.901-1.637-.884-2.236.038L6.09 24.323C5.491 25.245 5.9 26 7 26h23c1.1 0 1.483-.737.854-1.639L19.146 7.639z"
                        />
                      </svg>
                    )}

                    {order[0] == -1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 26.361c-.63.901-1.637.884-2.236-.038L6.09 9.677C5.491 8.754 5.9 8 7 8h23c1.1 0 1.483.737.854 1.639L19.146 26.361z"
                        />
                      </svg>
                    )}
                  </button>
                </Th>
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE] border">
                  <button
                    class="w-full h-full flex justify-between items-center"
                    onClick={() => orderData("completed")}
                  >
                    <span>COMPLETED</span>
                    {order[0] == 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 7.639c-.63-.901-1.637-.884-2.236.038L6.09 24.323C5.491 25.245 5.9 26 7 26h23c1.1 0 1.483-.737.854-1.639L19.146 7.639z"
                        />
                      </svg>
                    )}

                    {order[0] == -1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 26.361c-.63.901-1.637.884-2.236-.038L6.09 9.677C5.491 8.754 5.9 8 7 8h23c1.1 0 1.483.737.854 1.639L19.146 26.361z"
                        />
                      </svg>
                    )}
                  </button>
                </Th>
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE] border">
                  <button
                    class="w-full h-full flex justify-between items-center"
                    onClick={() => orderData("student_id")}
                  >
                    <span>STUDENT ID</span>
                    {order[0] == 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 7.639c-.63-.901-1.637-.884-2.236.038L6.09 24.323C5.491 25.245 5.9 26 7 26h23c1.1 0 1.483-.737.854-1.639L19.146 7.639z"
                        />
                      </svg>
                    )}

                    {order[0] == -1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 26.361c-.63.901-1.637.884-2.236-.038L6.09 9.677C5.491 8.754 5.9 8 7 8h23c1.1 0 1.483.737.854 1.639L19.146 26.361z"
                        />
                      </svg>
                    )}
                  </button>
                </Th>
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE] border">
                  <button
                    class="w-full h-full flex justify-between items-center"
                    onClick={() => orderData("task_id")}
                  >
                    <span>TASK ID</span>
                    {order[0] == 1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 7.639c-.63-.901-1.637-.884-2.236.038L6.09 24.323C5.491 25.245 5.9 26 7 26h23c1.1 0 1.483-.737.854-1.639L19.146 7.639z"
                        />
                      </svg>
                    )}

                    {order[0] == -1 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 36 36"
                      >
                        <path
                          fill="#6b7280"
                          d="M19.146 26.361c-.63.901-1.637.884-2.236-.038L6.09 9.677C5.491 8.754 5.9 8 7 8h23c1.1 0 1.483.737.854 1.639L19.146 26.361z"
                        />
                      </svg>
                    )}
                  </button>
                </Th>
              </Tr>

              <Tr>
                <Th className="border">
                  <input className="w-full h-full border text-sm"></input>
                </Th>
                <Th className="border">
                  <select className="w-full h-full border text-sm font-normal">
                    <option value="">Select an option</option>
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </select>
                </Th>
                <Th className="border ">
                  <input className="w-full h-full border text-sm font-normal"></input>
                </Th>
                <Th className="border">
                  <input className="w-full h-full border text-sm"></input>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {slicedData.map((studentTask) => (
                <Tr key={studentTask.id} className="hover:bg-[#E0DFFF]">
                  <Td className="border px-4 py-2 text-left">
                    {studentTask.id}
                  </Td>
                  <Td className="border px-4 py-2 text-left">
                    {studentTask.completed ? "True" : "False"}
                  </Td>
                  <Td className="border px-4 py-2 text-left">
                    {studentTask.student_id}
                  </Td>
                  <Td className="border px-4 py-2 text-left">
                    {studentTask.task_id}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <HStack mt={4} justifyContent="flex-end">
            <PaginationControls
              hasNextPage={end < studentTasks.length}
              hasPrevPage={start > 0}
            ></PaginationControls>
          </HStack>
        </TableContainer>
      )}
    </div>
  );
};

export default StudentTaskTable;
