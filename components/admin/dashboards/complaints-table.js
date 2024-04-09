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

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch(
        `api/database/complaints/paginated/include-all?pageSize=${pageSize}&page=${page}`
      );
      const data = await response.json();
      setComplaints(data.complaints);
      setTotalPages(data.totalPages);
    };
    fetchComplaints();
  }, [page, pageSize]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Complaints Table</h3>
      <Table className="table-auto table-fixed ">
        <Thead>
          <Tr>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">ID</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Content</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Message Id</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Message Text</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {complaints.map((complaint) => (
            <Tr key={complaint.id} className="hover:bg-[#E0DFFF]">
              <Td className="border px-4 py-2 text-left">{complaint.id}</Td>
              <Td className="border px-4 py-2 text-left">
                {complaint.content}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {complaint.message.id}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {complaint.message.text}
              </Td>
              <Td className="border px-4 py-2 text-left">{complaint.date}</Td>
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

export default ComplaintTable;
