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

const NotificationTable = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch(
        `../api/database/notifications/paginated?pageSize=${pageSize}&page=${page}`
      );
      const data = await response.json();
      console.log(data);
      setNotifications(data.notifications);
      setTotalPages(data.totalPages);
    };
    fetchNotifications();
  }, [page, pageSize, shouldReload]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="w-5/6 m-4">
      <h3 className="font-bold">Notification Table</h3>
      <Button
        onClick={() => setShouldReload(!shouldReload)}
        className="mb-4 bg-orange-500 text-white rounded-md p-1 font-bold"
      >
        🔄
      </Button>
      <Table className="table-auto table-fixed ">
        <Thead>
          <Tr>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">ID</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Admin ID</Th>
            <Th className="px-4 py-2 w-2/6 bg-[#7A72DE]">Content</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Date Sent</Th>
            <Th className="px-4 py-2 w-1/6 bg-[#7A72DE]">Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {notifications.map((notification) => (
            <Tr key={notification.id} className="hover:bg-[#E0DFFF]">
              <Td className="border px-4 py-2 text-left">{notification.id}</Td>
              <Td className="border px-4 py-2 text-left">
                {notification.admin_id}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {notification.content}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {notification.date_sent}
              </Td>
              <Td className="border px-4 py-2 text-left">
                {notification.name}
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

export default NotificationTable;
