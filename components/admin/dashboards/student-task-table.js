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
  const [idFilter, setIdFilter] = useState("");
  const [completedFilter, setCompletedFilter] = useState("");
  const [studentIdFilter, setStudentIdFilter] = useState("");
  const [taskIdFilter, setTaskIdFilter] = useState("");
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

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

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

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "id":
        setIdFilter(value);
        debouncedApplyFilters(filterType, value);
        break;
      case "completed":
        setCompletedFilter(value);
        debouncedApplyFilters(filterType, value);
        break;
      case "student_id":
        setStudentIdFilter(value);
        debouncedApplyFilters(filterType, value);
        break;
      case "task_id":
        setTaskIdFilter(value);
        debouncedApplyFilters(filterType, value);
        break;
      // Add cases for other filters as needed
      default:
        break;
    }
  };

  const applyFilters = (filterType, filterValue) => {
    let filteredData = studentTasks;

    // Apply previous filters

    if (filterType != "id" && idFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.id.toLowerCase().includes(idFilter.toLowerCase())
      );
    }

    if (filterType != "completed" && completedFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.completed
          .toString()
          .toLowerCase()
          .includes(completedFilter.toLowerCase())
      );
    }

    if (filterType != "student_id" && studentIdFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.student_id.toLowerCase().includes(studentIdFilter.toLowerCase())
      );
    }

    if (filterType != "task_id" && taskIdFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.task_id.toLowerCase().includes(taskIdFilter.toLowerCase())
      );
    }

    //Applly current filter

    if (filterType === "id") {
      filteredData = filteredData.filter((row) =>
        row.id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (filterType === "completed") {
      filteredData = filteredData.filter((row) =>
        row.completed
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    if (filterType === "student_id") {
      filteredData = filteredData.filter((row) =>
        row.student_id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (filterType === "task_id") {
      filteredData = filteredData.filter((row) =>
        row.task_id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    setFilteredData(filteredData);
  };

  const debouncedApplyFilters = debounce(applyFilters, 3000);

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Student Task Table</h3>
      {studentTasks && (
        <TableContainer className="rounded-md shadow-xl">
          <Table size="sm">
            <Thead>
              <Tr className="bg-[#7A72DE] ">
                <Th className="w-1/6">
                  <button
                    class="w-full h-full my-1 flex justify-between items-center font-bold text-black"
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
                <Th className="w-1/6 ">
                  <button
                    class="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                    onClick={() => orderData("completed")}
                  >
                    <span>COMPLETED</span>
                    {order[1] == 1 && (
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

                    {order[1] == -1 && (
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
                <Th className="w-1/6 ">
                  <button
                    class="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                    onClick={() => orderData("student_id")}
                  >
                    <span>STUDENT ID</span>
                    {order[2] == 1 && (
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

                    {order[2] == -1 && (
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
                <Th className="w-1/6 ">
                  <button
                    class="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                    onClick={() => orderData("task_id")}
                  >
                    <span>TASK ID</span>
                    {order[3] == 1 && (
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

                    {order[3] == -1 && (
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
                <Th>
                  <input
                    type="text"
                    value={idFilter}
                    onChange={(e) => handleFilterChange("id", e.target.value)}
                    className="w-full h-full border text-sm font-normal text-black"
                  ></input>
                </Th>
                <Th>
                  <select
                    value={completedFilter}
                    onChange={(e) =>
                      handleFilterChange("completed", e.target.value)
                    }
                    className="w-full h-full border text-sm font-normal text-black"
                  >
                    <option value="">Select an option</option>
                    <option value="1">True</option>
                    <option value="0">False</option>
                  </select>
                </Th>
                <Th>
                  <input
                    value={studentIdFilter}
                    onChange={(e) =>
                      handleFilterChange("student_id", e.target.value)
                    }
                    className="w-full h-full border text-sm font-normal text-black"
                  ></input>
                </Th>
                <Th>
                  <input
                    value={taskIdFilter}
                    onChange={(e) =>
                      handleFilterChange("task_id", e.target.value)
                    }
                    className="w-full h-full border text-sm font-normal text-black"
                  ></input>
                </Th>
              </Tr>
            </Thead>
            <Tbody className="bg-[#F6F3FA]">
              {slicedData.map((studentTask) => (
                <Tr key={studentTask.id} className="hover:bg-[#E0DFFF]">
                  <Td className=" px-4 py-2 text-left">{studentTask.id}</Td>
                  <Td className=" px-4 py-2 text-left">
                    {studentTask.completed ? "True" : "False"}
                  </Td>
                  <Td className=" px-4 py-2 text-left">
                    {studentTask.student_id}
                  </Td>
                  <Td className=" px-4 py-2 text-left">
                    {studentTask.task_id}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <HStack mt={4} justifyContent="flex-end">
        <PaginationControls
          hasNextPage={end < filteredData.length}
          hasPrevPage={start > 0}
        ></PaginationControls>
      </HStack>
    </div>
  );
};

export default StudentTaskTable;
