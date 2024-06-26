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

const MessageTable = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(
        `api/database/messages/paginated?pageSize=${pageSize}&page=${page}`
      );
      const data = await response.json();
      setMessages(data.messages);
      setTotalPages(data.totalPages);
    };
    fetchMessages();
  }, [page, pageSize]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-6/6 m-4" id="message-dashboard">
      <h3 className="font-bold">Messages Table</h3>
      <Table className="table-auto table-fixed ">
        <Thead>
          <Tr>
            <Th className="px-4 py-2 w-2/12 bg-[#7A72DE]">ID</Th>
            <Th className="px-4 py-2 w-1/12 bg-[#7A72DE]">Sender</Th>
            <Th className="px-4 py-2 w-1/12 bg-[#7A72DE]">Bookmarked</Th>
            <Th className="px-4 py-2 w-2/12 bg-[#7A72DE]">Date Sent</Th>
            <Th className="px-4 py-2 w-1/12 bg-[#7A72DE]">Deleted</Th>
            <Th className="px-4 py-2 w-2/12 bg-[#7A72DE]">Student ID</Th>
            <Th className="px-4 py-2 w-4/12 bg-[#7A72DE]">Text</Th>
          </Tr>
        </Thead>
        <Tbody>
          {messages.map((message) => (
            <Tr key={message.id} className="hover:bg-[#E0DFFF]">
              <Td className="border px-4 py-2 text-left">{message.id}</Td>
              <Td className="border px-4 py-2 text-left">
                {message.sender ? "True" : "False"}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {message.bookmarked ? "True" : "False"}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {message.date_send}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {message.deleted ? "True" : "False"}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {message.student_id}
              </Td>
              <Td className="border px-4 py-2 text-left">{message.text}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <a href="#message-dashboard">
        <HStack mt={4} justifyContent="flex-end">
          <Button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-[#7A72DE] text-white disabled:opacity-50 rounded-md p-1 font-bold"
          >
            Prev
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-[#7A72DE] text-white disabled:opacity-50 rounded-md p-1 font-bold"
          >
            Next
          </Button>
        </HStack>
      </a>
    </div>
  );
};

export default MessageTable;
