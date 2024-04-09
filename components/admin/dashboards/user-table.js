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
  HStack,
} from "@chakra-ui/react";

const UserTable = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(
        `api/database/students/paginated/include-all?pageSize=${pageSize}&page=${page}`
      );
      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.totalPages);
    };
    fetchStudents();
  }, [page, pageSize]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Student Table</h3>
      <Table className="table-auto table-fixed ">
        <Thead>
          <Tr>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">ID</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Name</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Email</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Career</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Sex</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((student) => (
            <Tr key={student.student_id} className="hover:bg-[#E0DFFF]">
              <Td className="border px-4 py-2 text-left">
                {student.student_id}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {student.user.name}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {student.user.email}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {student.career.name}
              </Td>
              <Td className="border px-4 py-2 text-left">{student.sex.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack mt={4} justifyContent="flex-end">
        <Button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-orange-500 text-white disabled:opacity-50 rounded-md p-1 font-bold"
        >
          Prev
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-orange-500 text-white disabled:opacity-50 rounded-md p-1 font-bold"
        >
          Next
        </Button>
      </HStack>
    </div>
  );
};

export default UserTable;
