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

const AnxietyLevelsTable = () => {
  const [anxietyLevelsList, setAnxietyLevels] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAnxietyLevels = async () => {
      const response = await fetch(
        `api/database/anxiety-levels/paginated?pageSize=${pageSize}&page=${page}`
      );
      const data = await response.json();
      setAnxietyLevels(data.anxietyLevels);
      setTotalPages(data.totalPages);
    };
    fetchAnxietyLevels();
  }, [page, pageSize]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  //id	anxiety	date	student_id
  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Anxiety Levels Table</h3>
      <Table className="table-auto table-fixed bg-white">
        <Thead>
          <Tr>
            <Th className="px-4 py-2 w-1/6 bg-orange-300">ID</Th>
            <Th className="px-4 py-2 w-1/6 bg-orange-300">Anxiety Levels</Th>
            <Th className="px-4 py-2 w-1/6 bg-orange-300">Date</Th>
            <Th className="px-4 py-2 w-1/6 bg-orange-300">StudentID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {anxietyLevelsList.map((anxietyLevels) => (
            <Tr key={anxietyLevels.id} className="hover:bg-orange-100">
              <Td className="border px-4 py-2 text-left">{anxietyLevels.id}</Td>
              <Td className="border px-4 py-2 text-left">
                {anxietyLevels.anxiety}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {anxietyLevels.date}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {anxietyLevels.student_id}
              </Td>
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

export default AnxietyLevelsTable;
