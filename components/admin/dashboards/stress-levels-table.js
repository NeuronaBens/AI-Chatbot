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

const StressLevelsTable = () => {
  const [stressLevelsList, setStressLevels] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStressLevels = async () => {
      const response = await fetch(
        `api/database/stress-levels/paginated?pageSize=${pageSize}&page=${page}`
      );
      const data = await response.json();
      setStressLevels(data.stressLevels);
      setTotalPages(data.totalPages);
    };
    fetchStressLevels();
  }, [page, pageSize]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Stress Levels Table</h3>
      <Table className="table-auto table-fixed ">
        <Thead>
          <Tr>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">ID</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Stress Levels</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Date</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">StudentID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stressLevelsList.map((stressLevel) => (
            <Tr key={stressLevel.id} className="hover:bg-[#E0DFFF]">
              <Td className="border px-4 py-2 text-left">{stressLevel.id}</Td>
              <Td className="border px-4 py-2 text-left">
                {stressLevel.stress}
              </Td>
              <Td className="border px-4 py-2 text-left">{stressLevel.date}</Td>
              <Td className="border px-4 py-2 text-left">
                {stressLevel.student_id}
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

export default StressLevelsTable;
