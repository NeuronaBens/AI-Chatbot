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
  const [slicedData, setSlicedData] = useState([]);
  const [order, setOrder] = useState(Array(4).fill(0));
  const [filteredData, setFilteredData] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [completedFilter, setCompletedFilter] = useState("");
  const [studentIdFilter, setStudentIdFilter] = useState("");
  const [taskIdFilter, setTaskIdFilter] = useState("");

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
      <Table className="table-auto table-fixed ">
        <Thead>
          <Tr>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">ID</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Anxiety Levels</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Date</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">StudentID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {anxietyLevelsList.map((anxietyLevels) => (
            <Tr key={anxietyLevels.id} className="hover:bg-[#E0DFFF]">
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
