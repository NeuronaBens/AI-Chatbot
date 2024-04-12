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

const UserTable = ({ page, per_page }) => {
  const [students, setStudents] = useState([]);
  const [slicedData, setSlicedData] = useState([]);
  const [order, setOrder] = useState(Array(5).fill(0));
  const [filteredData, setFilteredData] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [careerFilter, setCarrerFilter] = useState("");
  const [sexFilter, setSexFilter] = useState("");

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch("/api/database/students/include-all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStudents(data);
      setFilteredData(data);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const data = filteredData.slice(start, end);
    if (data.length < parseInt(per_page) && data.length > 0) {
      const nulosAAgregar = Array(parseInt(per_page) - data.length).fill(null);
      const newData = [...data, ...nulosAAgregar];
      setSlicedData(newData);
    } else {
      setSlicedData(data);
    }
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
      const newOrder = new Array(5).fill(0);
      newOrder[0] = order[0] == 0 ? 1 : order[0] * -1;
      setOrder(newOrder);

      if (newOrder[0] == 1 || newOrder[0] == 0) {
        const data = filteredData.sort((a, b) =>
          a.student_id.localeCompare(b.student_id)
        );
        setFilteredData(data);
      } else if (newOrder[0] == -1) {
        const data = filteredData.sort((a, b) =>
          b.student_id.localeCompare(a.student_id)
        );
        setFilteredData(data);
      }
    } else if (field == "name") {
      const newOrder = new Array(5).fill(0);
      newOrder[1] = order[1] == 0 ? 1 : order[1] * -1;
      setOrder(newOrder);

      if (newOrder[1] == 1 || newOrder[1] == 0) {
        const data = filteredData.sort((a, b) =>
          a.user.name.localeCompare(b.user.name.toString())
        );
        setFilteredData(data);
      } else if (newOrder[1] == -1) {
        const data = filteredData.sort((a, b) =>
          b.user.name.toString().localeCompare(a.user.name.toString())
        );
        setFilteredData(data);
      }
    } else if (field == "email") {
      const newOrder = new Array(5).fill(0);
      newOrder[2] = order[2] == 0 ? 1 : order[2] * -1;
      setOrder(newOrder);

      if (newOrder[2] == 1 || newOrder[2] == 0) {
        const data = filteredData.sort((a, b) =>
          a.user.email.localeCompare(b.user.email)
        );
        setFilteredData(data);
      } else if (newOrder[2] == -1) {
        const data = filteredData.sort((a, b) =>
          b.user.email.localeCompare(a.user.email)
        );
        setFilteredData(data);
      }
    } else if (field == "career") {
      const newOrder = new Array(5).fill(0);
      newOrder[3] = order[3] == 0 ? 1 : order[3] * -1;
      setOrder(newOrder);

      if (newOrder[3] == 1 || newOrder[3] == 0) {
        const data = filteredData.sort((a, b) =>
          a.career.name.localeCompare(b.career.name)
        );
        setFilteredData(data);
      } else if (newOrder[3] == -1) {
        const data = filteredData.sort((a, b) =>
          b.career.name.localeCompare(a.career.name)
        );
        setFilteredData(data);
      }
    } else if (field == "sex") {
      const newOrder = new Array(5).fill(0);
      newOrder[4] = order[4] == 0 ? 1 : order[4] * -1;
      setOrder(newOrder);

      if (newOrder[4] == 1 || newOrder[4] == 0) {
        const data = filteredData.sort((a, b) =>
          a.sex.name.localeCompare(b.sex.name)
        );
        setFilteredData(data);
      } else if (newOrder[4] == -1) {
        const data = filteredData.sort((a, b) =>
          b.sex.name.localeCompare(a.sex.name)
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
      case "name":
        setNameFilter(value);
        debouncedApplyFilters(filterType, value);
        break;
      case "email":
        setEmailFilter(value);
        debouncedApplyFilters(filterType, value);
        break;
      case "career":
        setCarrerFilter(value);
        debouncedApplyFilters(filterType, value);
        break;
      case "sex":
        setSexFilter(value);
        debouncedApplyFilters(filterType, value);
        break;
      // Add cases for other filters as needed
      default:
        break;
    }
  };

  const applyFilters = (filterType, filterValue) => {
    let filteredData = students;

    // Apply previous filters

    if (filterType != "id" && idFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.student_id.toLowerCase().includes(idFilter.toLowerCase())
      );
    }

    if (filterType != "name" && nameFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.user.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (filterType != "email" && emailFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.user.email.toLowerCase().includes(emailFilter.toLowerCase())
      );
    }

    if (filterType != "career" && careerFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.career.name.toLowerCase().includes(careerFilter.toLowerCase())
      );
    }

    if (filterType != "sex" && sexFilter != "") {
      filteredData = filteredData.filter((row) =>
        row.sex.name.toLowerCase().includes(sexFilter.toLowerCase())
      );
    }

    //Applly current filter

    if (filterType === "id") {
      filteredData = filteredData.filter((row) =>
        row.student_id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (filterType === "name") {
      filteredData = filteredData.filter((row) =>
        row.user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (filterType === "email") {
      filteredData = filteredData.filter((row) =>
        row.user.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (filterType === "career") {
      filteredData = filteredData.filter((row) =>
        row.career.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (filterType === "sex") {
      filteredData = filteredData.filter((row) =>
        row.sex.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    setFilteredData(filteredData);
  };

  const debouncedApplyFilters = debounce(applyFilters, 3000);

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Student Table</h3>
      {students && (
        <TableContainer className="rounded-md shadow-xl">
          <Table size="sm">
            <Thead>
              <Tr className="bg-[#7A72DE]">
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
                <Th className="w-1/6">
                  <button
                    class="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                    onClick={() => orderData("name")}
                  >
                    <span>Name</span>
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
                <Th className="w-1/6">
                  <button
                    class="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                    onClick={() => orderData("email")}
                  >
                    <span>Email</span>
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
                <Th className="w-1/6">
                  <button
                    class="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                    onClick={() => orderData("career")}
                  >
                    <span>Career</span>
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
                <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">
                  <button
                    class="w-full h-full my-1 flex justify-between items-center font-bold text-black"
                    onClick={() => orderData("sex")}
                  >
                    <span>Sex</span>
                    {order[4] == 1 && (
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

                    {order[4] == -1 && (
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
                  <input
                    type="text"
                    value={nameFilter}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                    className="w-full h-full border text-sm font-normal text-black"
                  ></input>
                </Th>
                <Th>
                  <input
                    value={emailFilter}
                    onChange={(e) =>
                      handleFilterChange("email", e.target.value)
                    }
                    className="w-full h-full border text-sm font-normal text-black"
                  ></input>
                </Th>
                <Th>
                  <input
                    value={careerFilter}
                    onChange={(e) =>
                      handleFilterChange("career", e.target.value)
                    }
                    className="w-full h-full border text-sm font-normal text-black"
                  ></input>
                </Th>
                <Th>
                  <input
                    value={sexFilter}
                    onChange={(e) => handleFilterChange("sex", e.target.value)}
                    className="w-full h-full border text-sm font-normal text-black"
                  ></input>
                </Th>
              </Tr>
            </Thead>
            <Tbody className="bg-[#F6F3FA]">
              {slicedData.map((student) => (
                <>
                  {student ? (
                    <Tr key={student.student_id} className="hover:bg-[#E0DFFF]">
                      <Td className="px-4 py-2 text-left">
                        {student.student_id}
                      </Td>
                      <Td className="px-4 py-2 text-left">
                        {student.user.name}
                      </Td>
                      <Td className="px-4 py-2 text-left">
                        {student.user.email}
                      </Td>
                      <Td className="px-4 py-2 text-left">
                        {student.career.name}
                      </Td>
                      <Td className="px-4 py-2 text-left">
                        {student.sex.name}
                      </Td>
                    </Tr>
                  ) : (
                    <Tr className="hover:bg-[#E0DFFF]">
                      <Td className="text-[#F6F3FA] hover:text-[#E0DFFF] px-4 py-2 text-left">
                        Nulo
                      </Td>
                      <Td className=" px-4 py-2 text-left"></Td>
                      <Td className=" px-4 py-2 text-left"></Td>
                      <Td className=" px-4 py-2 text-left"></Td>
                    </Tr>
                  )}
                </>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      <HStack mt={4}>
        <PaginationControls
          hasNextPage={end < filteredData.length}
          hasPrevPage={start > 0}
          totalRecords={filteredData.length}
          pageSize={per_page}
        ></PaginationControls>
      </HStack>
    </div>
  );
};

export default UserTable;
