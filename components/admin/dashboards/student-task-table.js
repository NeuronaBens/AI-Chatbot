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
    };
    fetchStudentTasks();
  }, []);

  useEffect(() => {
    setSlicedData(studentTasks.slice(start, end));
  }, [page, per_page, studentTasks]);

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Student Task Table</h3>
      {studentTasks && (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE] border">
                  <button class="w-full h-full flex justify-between items-center">
                    <span>ID</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 36 36"
                    >
                      <path
                        fill="#6b7280"
                        d="M19.146 7.639c-.63-.901-1.637-.884-2.236.038L6.09 24.323C5.491 25.245 5.9 26 7 26h23c1.1 0 1.483-.737.854-1.639L19.146 7.639z"
                      />
                    </svg>
                  </button>
                </Th>
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE] border">
                  Completed
                </Th>
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE] border">
                  Student ID
                </Th>
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE] border">Task ID</Th>
              </Tr>

              <Tr>
                <Th className="border">
                  <input className="w-full h-full border text-sm"></input>
                </Th>
                <Th className="border">
                  <select className="w-full h-full border text-sm font-normal">
                    <option value="">Select an option</option>
                    <option value="">True</option>
                    <option value="">False</option>
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
